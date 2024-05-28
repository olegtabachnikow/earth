import { FC, useRef, useState } from 'react';
import * as THREE from 'three';
import { planetGeometry as geometry } from '@/utils/constants';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import vertexMoonShader from '@/shaders/moon/vertex';
import fragmentMoonShader from '@/shaders/moon/fragment';

const Moon: FC = () => {
  const [angle, setAngle] = useState<number>(0);
  const moonRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('./textures/moon.jpg');

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  const sunSpherical = new THREE.Spherical(1, 1.6, -2.7);
  const sunDirection = new THREE.Vector3().setFromSpherical(sunSpherical);

  const moonUniforms = {
    uTexture: new THREE.Uniform(texture),
    uSunDirection: new THREE.Uniform(sunDirection),
    uAtmosphereDayColor: new THREE.Uniform(new THREE.Color('#00aaff')),
    uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color('#ff6600')),
  };

  useFrame((_, delta) => {
    setAngle((prev) => prev + 0.0005);
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.15 * delta;
      // const radius = 3.5;
      // const x = -radius * Math.cos(angle);
      // const y = (radius / 2) * Math.cos(angle);
      // const z = radius * Math.sin(angle);
      // moonRef.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={moonRef} scale={0.27} position={2.1}>
      {geometry}
      <shaderMaterial
        uniforms={moonUniforms}
        vertexShader={vertexMoonShader}
        fragmentShader={fragmentMoonShader}
      />
    </mesh>
  );
};

export default Moon;
