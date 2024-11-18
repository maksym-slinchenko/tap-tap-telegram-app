import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { speedFactor } from "../app.config";

type TProps = { onTap: boolean };

const WavySphere: React.FC<TProps> = ({ onTap }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const [waveAmplituda, setWaveAmplituda] = React.useState(0.15);

  useEffect(() => {
    if (onTap) {
      setWaveAmplituda(0.3);
    } else {
      setWaveAmplituda(0.15);
    }
  }, [onTap]);

  // Store initial base distances and phases
  const { baseDistances, phases } = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1.3, 40, 40);
    const positions = geometry.attributes.position.array as Float32Array;
    const baseDistances = [];
    const phases = [];

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      const baseDistance = Math.sqrt(x * x + y * y + z * z);

      baseDistances.push(baseDistance);
      phases.push(Math.random() * Math.PI * 2); // random phase shift
    }
    return { baseDistances, phases };
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.SphereGeometry;
      const position = geometry.attributes.position;

      // Update vertex positions for smooth animation
      for (let i = 0; i < position.count; i++) {
        const baseDistance = baseDistances[i];

        // Oscillation is based on phase and speed
        phases[i] += delta * speedFactor;
        const offset = Math.sin(phases[i]) * waveAmplituda;

        const newDistance = baseDistance + offset;

        const x = position.getX(i);
        const y = position.getY(i);
        const z = position.getZ(i);
        const length = Math.sqrt(x * x + y * y + z * z);

        position.setXYZ(
          i,
          (x / length) * newDistance,
          (y / length) * newDistance,
          (z / length) * newDistance
        );
      }

      position.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <sphereGeometry args={[1, 35, 35]} />
      <meshStandardMaterial wireframe color="white" />
    </mesh>
  );
};

const WavySphereAnimation: React.FC<TProps> = ({ onTap }) => {
  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <Canvas>
        <directionalLight position={[0, 0, 5]} intensity={3} />
        <ambientLight intensity={5} />
        <WavySphere onTap={onTap} />
      </Canvas>
    </div>
  );
};

export default WavySphereAnimation;
