import { useEffect, useState } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import Earth from '../Earth/Earth';
import Moon from '../Moon/Moon';
import Spaceship from '../Spaceship/Spaceship';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import LensFlare from '@/utils/LensFlare';
import Sun from '../Sun/Sun';

const Scene = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const onResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <OrbitControls />
      <EffectComposer multisampling={0} key={width}>
        <Bloom />
        <LensFlare
          blendFunction={BlendFunction.NORMAL}
          opacity={0.05}
          glareSize={0.5}
          flareSize={0.05}
          animated={false}
          flareSpeed={0}
          starPoints={0}
          starBurst={false}
          ghostScale={0.1}
          position={{ x: -130, y: 0, z: -60 }}
        />
      </EffectComposer>

      <Environment
        files={[
          './textures/px.png',
          './textures/nx.png',
          './textures/py.png',
          './textures/ny.png',
          './textures/pz.png',
          './textures/nz.png',
        ]}
        background
        backgroundIntensity={1}
        environmentIntensity={0}
      />
      <Sun />
      <Moon />
      <Earth />
      <Spaceship />
    </>
  );
};

export default Scene;
