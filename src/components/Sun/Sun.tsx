import { FC } from 'react';
import { planetGeometry } from '@/utils/constants';
import { useTexture } from '@react-three/drei';

const Sun: FC = () => {
  const sunTexture = useTexture('./textures/sun.jpeg');
  return (
    <mesh
      position={[-130, 0, -60]}
      scale={0.5}
      userData={{ lensflare: 'no-occlusion' }}
    >
      {planetGeometry}
      <meshBasicMaterial map={sunTexture} />
    </mesh>
  );
};

export default Sun;
