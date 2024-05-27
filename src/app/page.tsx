'use client';
import { Canvas } from '@react-three/fiber';
import styles from './page.module.css';
import Scene from '@/components/Scene/Scene.jsx';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <Canvas dpr={1} gl={{ antialias: true }} shadows>
          <color args={['#000000']} attach='background' />
          <Scene />
        </Canvas>
      </Suspense>
    </main>
  );
}
