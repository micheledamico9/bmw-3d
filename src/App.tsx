
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import {
  Environment,
  ContactShadows,
  OrbitControls,
  Html,
} from '@react-three/drei';

import { CarModel } from './components/CarModel';
import { BlueprintLayer } from './components/BlueprintLayer';
import { OrthographicViews } from './components/OrthographicViews';
import { ExplodedDetails } from './components/ExplodedDetails';
import { UIControls } from './components/UIControls';
import { useCarStore } from './store';

function Scene() {
  const blueprint = useCarStore((s) => s.blueprint);
  const ortho = useCarStore((s) => s.ortho);
  const exploded = useCarStore((s) => s.exploded);

  return (
    <>
      <color attach="background" args={[blueprint ? '#e8f1f5' : '#11161c']} />
      <ambientLight intensity={blueprint ? 1.6 : 0.45} />

      {!blueprint && (
        <>
          <directionalLight
            position={[5, 8, 5]}
            intensity={3}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <Environment preset="studio" />
        </>
      )}

      <Suspense
        fallback={
          <Html center>
            <span className="loading">Assemblaggio concept…</span>
          </Html>
        }
      >
        <CarModel />

        {blueprint && <BlueprintLayer />}
        {ortho && <OrthographicViews />}
        {exploded && <ExplodedDetails />}
      </Suspense>

      {!blueprint && (
        <ContactShadows
          position={[0, -0.95, 0]}
          opacity={0.45}
          scale={12}
          blur={2.4}
          far={4}
        />
      )}

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={3.5}
        maxDistance={14}
        target={[0, 0.1, 0]}
      />
    </>
  );
}

export default function App() {
  const blueprint = useCarStore((s) => s.blueprint);

  return (
    <main className={`app ${blueprint ? 'blueprint' : ''}`}>
      <header className="topbar">
        <div className="brand">
          <span className="mark">M</span>
          <div>
            <b>IM3 / DESIGN LAB</b>
            <small>BMW · ELECTRIC PERFORMANCE STUDY / 2027</small>
          </div>
        </div>

        <div className="topmeta">
          <span>CONCEPT 01</span>
          <span className="live">
            <i /> LIVE CONFIGURATION
          </span>
        </div>
      </header>

      <section className="workspace">
        <div className="stage">
          <div className="stage-label">
            <span>01 — VEHICLE STUDY</span>
            <span>{blueprint ? 'TECHNICAL / WIREFRAME' : 'STUDIO / PBR'}</span>
          </div>

          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [5.4, 2.5, 6.5], fov: 38 }}
          >
            <Scene />
          </Canvas>

          <div className="stage-foot">
            <span>IM3 · G82 EV INTERPRETATION</span>
            <span>DRAG TO ORBIT ↗</span>
          </div>
        </div>

        <aside className="sidepanel">
          <UIControls />
        </aside>
      </section>

      <footer className="footer">
        <span>INDEPENDENT DESIGN EXERCISE · NOT AN OFFICIAL BMW PRODUCT</span>
        <span>THREE.JS / R3F / 60 FPS TARGET</span>
      </footer>
    </main>
  );
}
