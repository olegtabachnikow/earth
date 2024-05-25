import { FC } from 'react';
import * as THREE from 'three';
import {
  Environment,
  OrbitControls,
  useCamera,
  useTexture,
} from '@react-three/drei';
import Earth from '../Earth/Earth';
import Spaceship from '../Spaceship/Spaceship';
import { useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import LensFlare from '@/utils/LensFlare';

const Scene = () => {
  const dirtTexture = useTexture('./textures/lensDirt.png');

  return (
    <>
      <OrbitControls />

      <EffectComposer multisampling={0}>
        <Bloom />
        <LensFlare
          lensDirtTexture={dirtTexture}
          blendFunction={BlendFunction.NORMAL}
          opacity={0.05}
          glareSize={0.5}
          flareSize={0.1}
          animated={false}
          flareSpeed={0}
          starPoints={0}
          starBurst={false}
          ghostScale={0.1}
          lensPosition={[-130, 0, -60]}
        />
      </EffectComposer>

      <Environment
        files={[
          './textures/px.jpg',
          './textures/nx.jpg',
          './textures/py.jpg',
          './textures/ny.jpg',
          './textures/pz.jpg',
          './textures/nz.jpg',
        ]}
        background
        backgroundIntensity={1}
        environmentIntensity={0}
      />
      <Earth />
      <Spaceship />
    </>
  );
};

export default Scene;
