import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Sky } from "@react-three/drei";
import { Water } from "three/examples/jsm/objects/Water.js";

extend({ Water });

const WaterScene: React.FC = () => {
  const waterRef = useRef<any>();
  const { scene, gl } = useThree();

  useEffect(() => {
    const sun = new THREE.Vector3();

    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    waterRef.current = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        "https://threejs.org/examples/textures/waternormals.jpg",
        (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      sunDirection: sun.clone().normalize(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
    });

    waterRef.current.rotation.x = -Math.PI / 2;
    scene.add(waterRef.current);

    // Environment for reflection
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const renderTarget = pmremGenerator.fromScene(new THREE.Scene());
    scene.environment = renderTarget.texture;

    return () => {
      renderTarget.dispose();
    };
  }, [scene, gl]);

  useFrame((_, delta) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms.time.value += delta;
    }
  });

  return null;
};

const WaterPlane: React.FC = () => {
  return (
    <div className="water-plane-container">
      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        camera={{ position: [30, 10, 100] }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Sky
          distance={450000} // Distance to the horizon
          sunPosition={[100, 20, 100]}
          inclination={0} // Sun inclination
          azimuth={0.25} // Horizontal position
        />
        <WaterScene />
      </Canvas>
    </div>
  );
};

export default WaterPlane;
