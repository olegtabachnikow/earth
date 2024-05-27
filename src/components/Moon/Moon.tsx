import { FC, useRef, useState } from 'react';
import * as THREE from 'three';
import { planetGeometry as geometry } from '@/utils/constants';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Moon: FC = () => {
  const [angle, setAngle] = useState(20);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    setAngle((prev) => prev + 0.0005);
    if (moonRef.current) {
      moonRef.current.rotation.x += 0.15 * delta;
      const radius = 3.5;
      const x = -radius * Math.cos(angle);
      const y = (radius / 2) * Math.cos(angle);
      const z = radius * Math.sin(angle);
      moonRef.current.position.set(x, y, z);
    }
  });
  const texture = useTexture('./textures/moon.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return (
    <mesh ref={moonRef} scale={0.27} receiveShadow>
      {geometry}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Moon;
