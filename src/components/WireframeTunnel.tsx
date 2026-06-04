import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Frustum (truncated-pyramid) tunnel: a large near opening shrinking to a
 * small, clearly visible back wall — matching the reference's "looking into a
 * 3D box" feel. Wall/floor/ceiling grid lines converge from the opening to the
 * back wall, with nested depth frames in between.
 */
const NEAR = { hw: 11, hh: 6.5, z: 4.5 };
const FAR = { hw: 2.4, hh: 1.5, z: -9 };

const LINE_NEAR = "#525252";
const LINE_FAR = "#262626";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Box-surface point at depth t (0=near opening, 1=back wall). */
function frame(t: number) {
  return {
    hw: lerp(NEAR.hw, FAR.hw, t),
    hh: lerp(NEAR.hh, FAR.hh, t),
    z: lerp(NEAR.z, FAR.z, t),
  };
}

function geom(points: THREE.Vector3[]) {
  return new THREE.BufferGeometry().setFromPoints(points);
}

export function WireframeTunnel() {
  const groupRef = useRef<THREE.Group>(null);

  const segments = useMemo(() => {
    const items: Array<{
      geom: THREE.BufferGeometry;
      opacity: number;
      color: string;
    }> = [];
    const push = (pts: THREE.Vector3[], opacity: number, color = LINE_NEAR) =>
      items.push({ geom: geom(pts), opacity, color });

    const ringCount = 16;
    const wallDivX = 8; // floor/ceiling longitudinal lines
    const wallDivY = 5; // wall longitudinal lines

    // Nested rectangular depth frames (near opening → back wall).
    for (let i = 0; i < ringCount; i++) {
      const t = i / (ringCount - 1);
      const f = frame(t);
      const opacity = 0.3 * (1 - t * 0.55) + 0.04;
      const color = t > 0.6 ? LINE_FAR : LINE_NEAR;
      push(
        [
          new THREE.Vector3(-f.hw, -f.hh, f.z),
          new THREE.Vector3(f.hw, -f.hh, f.z),
          new THREE.Vector3(f.hw, f.hh, f.z),
          new THREE.Vector3(-f.hw, f.hh, f.z),
          new THREE.Vector3(-f.hw, -f.hh, f.z),
        ],
        opacity,
        color,
      );
    }

    // Longitudinal converging lines on floor + ceiling.
    for (let i = 0; i <= wallDivX; i++) {
      const u = i / wallDivX; // 0..1 across width
      const xNear = lerp(-NEAR.hw, NEAR.hw, u);
      const xFar = lerp(-FAR.hw, FAR.hw, u);
      // Floor
      push(
        [
          new THREE.Vector3(xNear, -NEAR.hh, NEAR.z),
          new THREE.Vector3(xFar, -FAR.hh, FAR.z),
        ],
        0.2,
      );
      // Ceiling
      push(
        [
          new THREE.Vector3(xNear, NEAR.hh, NEAR.z),
          new THREE.Vector3(xFar, FAR.hh, FAR.z),
        ],
        0.2,
      );
    }

    // Longitudinal converging lines on left + right walls.
    for (let i = 0; i <= wallDivY; i++) {
      const v = i / wallDivY; // 0..1 across height
      const yNear = lerp(-NEAR.hh, NEAR.hh, v);
      const yFar = lerp(-FAR.hh, FAR.hh, v);
      // Left wall
      push(
        [
          new THREE.Vector3(-NEAR.hw, yNear, NEAR.z),
          new THREE.Vector3(-FAR.hw, yFar, FAR.z),
        ],
        0.2,
      );
      // Right wall
      push(
        [
          new THREE.Vector3(NEAR.hw, yNear, NEAR.z),
          new THREE.Vector3(FAR.hw, yFar, FAR.z),
        ],
        0.2,
      );
    }

    // Back wall internal grid (the bright small rectangle in the distance).
    const backDivX = 6;
    const backDivY = 4;
    for (let i = 1; i < backDivX; i++) {
      const x = lerp(-FAR.hw, FAR.hw, i / backDivX);
      push(
        [
          new THREE.Vector3(x, -FAR.hh, FAR.z),
          new THREE.Vector3(x, FAR.hh, FAR.z),
        ],
        0.16,
        LINE_FAR,
      );
    }
    for (let i = 1; i < backDivY; i++) {
      const y = lerp(-FAR.hh, FAR.hh, i / backDivY);
      push(
        [
          new THREE.Vector3(-FAR.hw, y, FAR.z),
          new THREE.Vector3(FAR.hw, y, FAR.z),
        ],
        0.16,
        LINE_FAR,
      );
    }

    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle breathing drift in depth.
      groupRef.current.position.z =
        Math.sin(state.clock.elapsedTime * 0.06) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {segments.map(({ geom: g, opacity, color }, i) => (
        <line key={i}>
          <primitive object={g} attach="geometry" />
          <lineBasicMaterial
            color={color}
            transparent
            opacity={opacity}
            depthWrite={false}
          />
        </line>
      ))}
    </group>
  );
}
