import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Spaceship: FC = () => {
  const { scene, animations } = useGLTF('./spaceship.glb');
  const modelRef = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, scene);
  const actionsArray = Object.values(actions);

  useEffect(() => {
    actionsArray.forEach((action) => {
      action?.play();
    });
  }, []);

  useFrame((_, delta) => {
    if (modelRef.current) modelRef.current.rotation.z += 0.4 * delta;
  });

  return (
    <group ref={modelRef} rotation={[Math.PI * 0.75, 1.3, 0]}>
      <primitive
        object={scene}
        scale={0.03}
        position={[0, -2.25, 0]}
        rotation={[Math.PI, Math.PI * 0.5, 0]}
      />
    </group>
  );
};

export default Spaceship;
