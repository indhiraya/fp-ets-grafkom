// src/components/FlyingUFO.tsx

import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { Mesh, ConeGeometry, MeshBasicMaterial } from "three";
import { useGameStore } from "../stores/useGameStore";

// Komponen Cahaya UFO
const UFOBeam: React.FC = () => {
  const beamRef = useRef<Mesh<ConeGeometry, MeshBasicMaterial> | null>(null);
  useFrame((state) => {
    const mesh = beamRef.current;
    if (mesh) {
      mesh.rotation.y += 0.01;
      mesh.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <mesh ref={beamRef} position={[0, -15, 0]}>
      <coneGeometry args={[8, 30, 32, 1, true]} />
      <meshBasicMaterial
        color="#00ff88"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// Komponen Utama UFO yang Bergerak
export function FlyingUFO() {
  const ufoRef = useRef<THREE.Group>(null!);
  const { nodes, materials } = useGLTF("/models/invasion_environment.glb") as any;
  const endCinematic = useGameStore((state) => state.endCinematic);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ufoRef.current) {
      const hoverDuration = 3.0;
      if (time < hoverDuration) {
        // Diam
      } else {
        if (useGameStore.getState().isCinematicPlaying) {
          endCinematic();
        }
        const flightTime = time - hoverDuration;
        ufoRef.current.position.x = -25 + flightTime * 8;
        if (ufoRef.current.position.x > 50) {
          ufoRef.current.position.x = 50;
        }
      }
    }
  });

  return (
    <group ref={ufoRef} position={[-25, 31, -18]}>
      <mesh
        name="UFO"
        geometry={nodes.UFO.geometry}
        material={materials.city_tex}
        scale={0.691}
      />
      <UFOBeam />
    </group>
  );
}