import { Environment, OrbitControls, useTexture } from '@react-three/drei';
import Earth from '../Earth/Earth';
import Moon from '../Moon/Moon';
import Spaceship from '../Spaceship/Spaceship';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import LensFlare from '@/utils/LensFlare';

const Scene = () => {
  const dirtTexture = useTexture('./textures/lensDirt.jpg');

  return (
    <>
      <OrbitControls autoRotate />

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
      <Moon />
      <Earth />
      <Spaceship />
    </>
  );
};

export default Scene;
