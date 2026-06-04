import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { FloatingMediaPanel } from "./FloatingMediaPanel";
import { WireframeTunnel } from "./WireframeTunnel";
import { PANEL_IMAGES } from "@/lib/panelImages";

interface PanelSlot {
  position: [number, number, number];
  size: [number, number];
  rotation: [number, number, number];
}

const PANEL_SLOTS: PanelSlot[] = [
  // Left wall — angled inward (strong +Y), receding into depth.
  { position: [-6.0, 0.7, -0.6], size: [2.6, 1.45], rotation: [0.04, 0.68, 0.02] },
  { position: [-4.9, 1.7, -1.0], size: [2.1, 0.95], rotation: [0.05, 0.6, -0.03] },
  { position: [-3.85, 0.2, 0.4], size: [1.7, 1.05], rotation: [0.03, 0.5, 0] },
  { position: [-4.5, -1.5, 0.6], size: [2.7, 1.35], rotation: [-0.12, 0.52, -0.02] },
  { position: [-2.3, 0.55, 0.3], size: [0.7, 0.78], rotation: [0.02, 0.3, 0] },
  // Floor — wide foreground panel tilted up.
  { position: [-2.4, -2.5, 1.3], size: [3.2, 1.15], rotation: [-0.5, 0.22, 0] },
  // Ceiling strips — tilted down.
  { position: [-3.4, 2.5, -1.4], size: [2.2, 0.62], rotation: [0.34, 0.32, 0.02] },
  { position: [-0.4, 2.25, -1.6], size: [2.0, 0.6], rotation: [0.36, 0, 0] },
  { position: [2.1, 2.5, -1.3], size: [2.45, 0.7], rotation: [0.34, -0.32, 0.02] },
  // Small ocean panel deep behind, near back wall (does not cover logo).
  { position: [0.2, 1.25, -2.6], size: [1.0, 0.36], rotation: [0.06, 0, 0] },
  // Right wall — angled inward (strong -Y).
  { position: [5.0, 1.1, -0.3], size: [3.3, 1.7], rotation: [0.04, -0.62, 0.03] },
  { position: [3.5, 0.1, -0.6], size: [1.85, 0.85], rotation: [0.04, -0.5, 0] },
  { position: [2.6, -0.35, 0.45], size: [1.05, 0.68], rotation: [0.02, -0.34, 0.01] },
  { position: [2.05, 0.8, -0.9], size: [0.46, 0.78], rotation: [0.02, -0.3, 0] },
  { position: [4.85, -1.6, 0.5], size: [2.7, 1.25], rotation: [-0.06, -0.56, 0.02] },
  // Floor — beauty face under logo, tilted up.
  { position: [-0.85, -1.75, 0.9], size: [1.65, 0.8], rotation: [-0.55, 0.06, 0.02] },
  // Floor — desert runner front-right, large and close.
  { position: [2.1, -2.45, 1.3], size: [2.7, 1.55], rotation: [-0.52, -0.16, 0.02] },
  // Small center-bottom grey panel.
  { position: [0.9, -1.25, 0.3], size: [1.4, 0.58], rotation: [-0.28, -0.06, 0] },
];

const MOBILE_INDICES = [0, 3, 4, 10, 11, 14, 15, 16, 17];

const CAMERA_Z = 7.2;
const LOOK_AT = new THREE.Vector3(0, 0, -0.5);
const PARALLAX_X = 0.22;
const PARALLAX_Y = 0.15;

function CameraParallax() {
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX / window.innerWidth - 0.5;
      target.current.y = e.clientY / window.innerHeight - 0.5;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      target.current.x = t.clientX / window.innerWidth - 0.5;
      target.current.y = t.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  useFrame((state, delta) => {
    const cam = state.camera;
    const tx = target.current.x * PARALLAX_X;
    const ty = -target.current.y * PARALLAX_Y;
    const k = 1 - Math.pow(0.001, delta);
    cam.position.x += (tx - cam.position.x) * k * 0.35;
    cam.position.y += (ty - cam.position.y) * k * 0.35;
    cam.position.z = CAMERA_Z;
    cam.lookAt(LOOK_AT);
  });
  return null;
}

export function Hero3DScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    PANEL_IMAGES.forEach((url) => useTexture.preload(url));
  }, []);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const panels = useMemo(() => {
    const indices = isMobile ? MOBILE_INDICES : PANEL_SLOTS.map((_, i) => i);
    return indices.map((idx, i) => {
      const slot = PANEL_SLOTS[idx];
      return {
        url: PANEL_IMAGES[idx],
        position: slot.position,
        rotation: slot.rotation,
        width: slot.size[0],
        height: slot.size[1],
        phase: i * 1.7 + idx * 0.3,
      };
    });
  }, [isMobile]);

  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, CAMERA_Z], fov: isMobile ? 58 : 65 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      frameloop="always"
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 10, 22]} />
      <ambientLight intensity={1.15} />
      <WireframeTunnel />
      <Suspense fallback={null}>
        {panels.map((p, i) => (
          <FloatingMediaPanel key={`${p.url}-${i}`} {...p} />
        ))}
      </Suspense>
      <CameraParallax />
    </Canvas>
  );
}
