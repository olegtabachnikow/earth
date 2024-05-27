import { FC, useRef } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import vertexEarthShader from '@/shaders/earth/vertex';
import fragmentEarthShader from '@/shaders/earth/fragment';
import vertexAtmosphereShader from '@/shaders/atmosphere/vertex';
import fragmentAtmosphereShader from '@/shaders/atmosphere/fragment';
import { planetGeometry as geometry } from '@/utils/constants';

const Earth: FC = () => {
  const sceneRef = useRef<THREE.Group>(null);

  const [dayTexture, nightTexture, specularTexture] = useTexture([
    './textures/earth/day.jpg',
    './textures/earth/night.jpg',
    './textures/earth/specularClouds.jpg',
  ]);
  dayTexture.colorSpace = THREE.SRGBColorSpace;
  dayTexture.anisotropy = 8;
  nightTexture.colorSpace = THREE.SRGBColorSpace;
  nightTexture.anisotropy = 8;

  const sunSpherical = new THREE.Spherical(1, 1.6, -2.7);
  const sunDirection = new THREE.Vector3().setFromSpherical(sunSpherical);

  const atmosphereUniforms = {
    uSunDirection: new THREE.Uniform(sunDirection),
    uAtmosphereDayColor: new THREE.Uniform(new THREE.Color('#00aaff')),
    uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color('#ff6600')),
  };

  const earthUniforms = {
    uDayTexture: new THREE.Uniform(dayTexture),
    uNightTexture: new THREE.Uniform(nightTexture),
    uSpecularCloudsTexture: new THREE.Uniform(specularTexture),
    ...atmosphereUniforms,
  };

  useFrame((_, delta) => {
    if (sceneRef.current) sceneRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group position={[0, 0, 0]} ref={sceneRef}>
      <mesh scale={1.03}>
        {geometry}
        <shaderMaterial
          uniforms={atmosphereUniforms}
          vertexShader={vertexAtmosphereShader}
          fragmentShader={fragmentAtmosphereShader}
          side={THREE.BackSide}
          transparent
        />
      </mesh>
      <mesh castShadow>
        {geometry}
        <shaderMaterial
          uniforms={earthUniforms}
          vertexShader={vertexEarthShader}
          fragmentShader={fragmentEarthShader}
        />
      </mesh>
    </group>
  );
};

export default Earth;
