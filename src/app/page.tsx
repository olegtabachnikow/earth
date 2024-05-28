'use client';
import { Canvas } from '@react-three/fiber';
import styles from './page.module.css';
import Scene from '@/components/Scene/Scene.jsx';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className={styles.main}>
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p>Loading...</p>
          </div>
        }
      >
        <Canvas
          className='canvas'
          dpr={[1, 2]}
          gl={{ preserveDrawingBuffer: true }}
        >
          <color args={['#000000']} attach='background' />
          <Scene />
        </Canvas>
      </Suspense>
    </main>
  );
}
