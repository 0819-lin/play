
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';
import { TreeState } from './types';
import { COLORS } from './constants';

const App: React.FC = () => {
  const [state, setState] = useState<TreeState>(TreeState.CHAOS);
  const [progress, setProgress] = useState(0);

  // Smoothly interpolate progress based on state
  useEffect(() => {
    let animationFrame: number;
    const target = state === TreeState.FORMED ? 1 : 0;
    const speed = 0.015;

    const animate = () => {
      setProgress((prev) => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.001) return target;
        return prev + diff * speed;
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [state]);

  const toggleState = () => {
    setState(prev => prev === TreeState.CHAOS ? TreeState.FORMED : TreeState.CHAOS);
  };

  return (
    <div className="relative w-full h-full select-none">
      <Canvas
        shadows
        gl={{ antialias: false }} // 移除 stencil: false，保留默认值以支持后期处理
        dpr={[1, 2]}
      >
        <Experience progress={progress} />
      </Canvas>

      {/* Luxury UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-12">
        <header className="flex justify-between items-start opacity-80">
          <div>
            <h1 className="text-2xl md:text-4xl font-serif tracking-widest text-[#D4AF37] drop-shadow-lg">
              GRANDEUR
            </h1>
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-60">
              Interactive 3D Experience
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-[10px] tracking-widest uppercase opacity-40">Est. 2024</span>
          </div>
        </header>

        <div className="flex flex-col items-center gap-6">
          <div className="text-center space-y-2 max-w-md">
            <h2 className="text-xl md:text-2xl font-light italic tracking-wide text-white/90">
              {state === TreeState.CHAOS ? "Whispers in the Void" : "A Glimmer of Order"}
            </h2>
            <div className="h-[1px] w-24 bg-[#D4AF37]/40 mx-auto" />
          </div>

          <button
            onClick={toggleState}
            className="pointer-events-auto group relative px-10 py-4 bg-transparent overflow-hidden border border-[#D4AF37]/50 transition-all duration-700 hover:border-[#D4AF37]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative text-[#D4AF37] font-serif tracking-[0.4em] uppercase text-sm">
              {state === TreeState.CHAOS ? "Manifest" : "Dissolve"}
            </span>
          </button>
        </div>

        <footer className="flex justify-between items-end text-[10px] tracking-[0.2em] uppercase opacity-40">
          <div>&copy; L'Atelier de Noël</div>
          <div className="flex gap-4">
            <span>Particles: 25k</span>
            <span>State: {state}</span>
          </div>
        </footer>
      </div>

      {/* Visual Accents */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-[#D4AF37]/10 m-4" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(1,18,11,0.4)_100%)]" />
    </div>
  );
};

export default App;
