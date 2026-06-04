import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export interface FloatingMediaPanelProps {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  width: number;
  height: number;
  phase?: number;
}

export function FloatingMediaPanel({
  url,
  position,
  rotation = [0, 0, 0],
  width,
  height,
  phase = 0,
}: FloatingMediaPanelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  const targetColor = useRef(new THREE.Color(0x888888));
  const liveColor = useRef(new THREE.Color(0x888888));
  const scaleRef = useRef(1);
  const floatAmp = useRef(0.04 + (phase % 4) * 0.007);
  const rotAmp = useRef(0.01 + (phase % 3) * 0.004);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    const t = state.clock.elapsedTime * 0.32 + phase;
    const amp = Math.min(floatAmp.current, 0.07);
    const rAmp = Math.min(rotAmp.current, 0.02);

    g.position.x = position[0] + Math.cos(t * 0.55) * amp * 0.4;
    g.position.y = position[1] + Math.sin(t) * amp;
    g.position.z =
      position[2] + (hovered ? 0.08 : 0) + Math.sin(t * 0.75) * amp * 0.25;

    g.rotation.x = rotation[0] + Math.sin(t * 0.45) * rAmp;
    g.rotation.y = rotation[1] + Math.cos(t * 0.38) * rAmp;
    g.rotation.z = rotation[2] + Math.sin(t * 0.6) * rAmp * 0.7;

    const k = 1 - Math.pow(0.001, delta);
    const targetScale = hovered ? 1.035 : 1;
    scaleRef.current += (targetScale - scaleRef.current) * k * 0.45;
    g.scale.setScalar(scaleRef.current);

    if (materialRef.current) {
      targetColor.current.setScalar(hovered ? 0.92 : 0.72);
      liveColor.current.lerp(targetColor.current, k * 0.45);
      materialRef.current.color.copy(liveColor.current);
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial ref={materialRef} map={texture} toneMapped={false} />
      </mesh>

      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial color="#0d0d0d" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}
