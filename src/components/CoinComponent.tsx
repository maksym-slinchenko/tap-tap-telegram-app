import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

import { GradientTexture, Text } from "@react-three/drei";
import {
  leftAnimationTime,
  scaleChangingSpeed,
  boosterValue,
} from "../app.config";

type Coin3DProps = {
  isVisible: boolean;
  positionLeft: number;
  activeTime: number;
};

const Coin: React.FC<Coin3DProps> = ({ isVisible, activeTime }) => {
  const [leftTime, setLeftTime] = useState(activeTime);
  const meshRef = useRef<THREE.Mesh>(null);
  let rotationSpeedRef = useRef(20);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVisible && meshRef.current) {
      meshRef.current.scale.set(0, 0, 0);
      rotationSpeedRef.current = 20;

      setLeftTime(activeTime);
      // Start timer
      interval = setInterval(() => {
        setLeftTime((prev) => prev - 100);
      }, 100);
    }
    // Reset coin size when isVisible is false
    if (!isVisible && meshRef.current) {
      meshRef.current.scale.z = 0;
      meshRef.current.scale.x = 0;
      meshRef.current.scale.y = 0;
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeTime, isVisible]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Increase coin size when isVisible is true
      if (
        isVisible &&
        meshRef.current.scale.z < 2 &&
        leftTime > leftAnimationTime
      ) {
        // Scale coin
        meshRef.current.scale.z += delta * scaleChangingSpeed;
        meshRef.current.scale.x += delta * scaleChangingSpeed;
        meshRef.current.scale.y += delta * scaleChangingSpeed;
      }

      // Reduce coin size when time is less than leftAnimationTime
      if (leftTime <= leftAnimationTime && meshRef.current.scale.z > 0) {
        meshRef.current.scale.z -= delta * scaleChangingSpeed;
        meshRef.current.scale.x -= delta * scaleChangingSpeed;
        meshRef.current.scale.y -= delta * scaleChangingSpeed;
      }

      // Reduce rotation speed when coin is visible
      if (isVisible && rotationSpeedRef.current > 2) {
        rotationSpeedRef.current -= delta * rotationSpeedRef.current;
      } else {
      }
      meshRef.current.rotation.z += 0.05 * rotationSpeedRef.current;
    }
  });

  return isVisible ? (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={2}
    >
      <cylinderGeometry args={[1, 1, 0.14, 16]} />
      <Text
        position={[0, 0.075, 0]} // Налаштуйте, щоб трохи підняти текст над поверхнею
        fontSize={1}
        fontWeight={"bold"}
        color="blue"
        rotation={[-Math.PI / 2, 0, 0]} // Обертання для вирівнювання з поверхнею
        anchorX="center"
        anchorY="middle"
      >
        {`x${boosterValue}`}
      </Text>
      <Text
        position={[0, -0.075, 0]} // Налаштуйте, щоб трохи підняти текст над поверхнею
        fontSize={1}
        fontWeight={"bold"}
        lineHeight={1}
        color="blue"
        rotation={[-Math.PI / 2, Math.PI, 0]} // Обертання для вирівнювання з поверхнею
        anchorX="center"
        anchorY="middle"
      >
        {`x${boosterValue}`}
      </Text>
      <meshStandardMaterial>
        <GradientTexture
          attach="map"
          stops={[0, 1]}
          colors={["#FFD700", "#FFA500"]}
        />
      </meshStandardMaterial>
    </mesh>
  ) : null;
};

const CoinComponent: React.FC<Coin3DProps> = (props) => {
  return (
    <div
      className="absolute top-32 w-14 h-14"
      style={{ left: `${props.positionLeft}%` }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={2.5} />
        <directionalLight position={[-3, -3, 5]} /> <Coin {...props} />
      </Canvas>
    </div>
  );
};

export default CoinComponent;
