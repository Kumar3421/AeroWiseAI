import React, { useEffect, useRef, useState } from 'react';
import { Wind, RotateCcw, Play, Pause, Sparkles } from 'lucide-react';

interface AirflowSimulatorProps {
  cadrCfm: number;
  roomSqFt: number;
  hasShroud: boolean;
  fanSpeed: 'low' | 'med' | 'high';
}

export const AirflowSimulator: React.FC<AirflowSimulatorProps> = ({
  cadrCfm,
  roomSqFt,
  hasShroud,
  fanSpeed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [indoorPM25, setIndoorPM25] = useState<number>(360);
  const indoorPM25Ref = useRef<number>(360);

  indoorPM25Ref.current = indoorPM25;

  const handleReset = () => {
    setIndoorPM25(360);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    const height = (canvas.height = 240);

    // Box fan is positioned at center-bottom
    const fanX = width / 2;
    const fanY = height - 35;
    const fanWidth = 60;
    const fanHeight = 35;

    // Simulation particles
    const particleCount = 85;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      isCleaned: boolean;
      life: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * (height - 50),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        isCleaned: Math.random() > 0.8,
        life: Math.random() * 100,
      });
    }

    let lastTime = Date.now();

    const render = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Drop indoor PM2.5 gradually when running
      if (isPlaying && indoorPM25Ref.current > 8) {
        const cleanRate = (cadrCfm / (roomSqFt * 9)) * 1.2 * dt;
        setIndoorPM25((prev) => Math.max(8, Number((prev - cleanRate).toFixed(1))));
      }

      ctx.clearRect(0, 0, width, height);

      // Draw Room Walls & Floor
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(4, 4, width - 8, height - 8);

      // Draw Box Fan / CR Box Unit
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(fanX - fanWidth / 2, fanY - fanHeight / 2, fanWidth, fanHeight, 6);
      ctx.fill();
      ctx.stroke();

      // Fan Grille Lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 1;
      for (let gx = -fanWidth / 2 + 8; gx < fanWidth / 2; gx += 8) {
        ctx.beginPath();
        ctx.moveTo(fanX + gx, fanY - fanHeight / 2 + 4);
        ctx.lineTo(fanX + gx, fanY + fanHeight / 2 - 4);
        ctx.stroke();
      }

      // Shroud Ring Highlight
      if (hasShroud) {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(fanX, fanY, 14, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Particles Physics
      const speedMultiplier = fanSpeed === 'low' ? 0.7 : fanSpeed === 'med' ? 1.0 : 1.4;

      particles.forEach((p) => {
        // Distance to fan
        const dx = fanX - p.x;
        const dy = fanY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (isPlaying) {
          // If close to fan, suck inward
          if (dist < 110) {
            p.vx += (dx / dist) * 1.2 * speedMultiplier;
            p.vy += (dy / dist) * 1.2 * speedMultiplier;

            // When entering fan, it is filtered and expelled upward!
            if (dist < 22) {
              p.isCleaned = true;
              p.y = fanY - 26;
              p.vy = -3.5 * speedMultiplier;
              p.vx = (Math.random() - 0.5) * 2;
            }
          } else {
            // Ambient convective loop: air rises up ceiling, moves to edges, falls down walls
            if (p.isCleaned) {
              if (p.y < 35) {
                // At ceiling: push towards left and right walls
                p.vx += p.x < width / 2 ? -0.2 : 0.2;
              } else if (p.x < 30 || p.x > width - 30) {
                // Down along walls
                p.vy += 0.15;
              }
            }
          }

          // Apply velocity and drag
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.97;
          p.vy *= 0.97;

          // Boundary bounce
          if (p.x < 12) { p.x = 12; p.vx *= -0.6; }
          if (p.x > width - 12) { p.x = width - 12; p.vx *= -0.6; }
          if (p.y < 12) { p.y = 12; p.vy *= -0.6; }
          if (p.y > height - 16) { p.y = height - 16; p.vy *= -0.6; }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.isCleaned ? 2.5 : 2.0, 0, Math.PI * 2);
        if (p.isCleaned) {
          ctx.fillStyle = 'rgba(34, 211, 238, 0.85)';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#06b6d4';
        } else {
          ctx.fillStyle = 'rgba(244, 63, 94, 0.7)';
          ctx.shadowBlur = 3;
          ctx.shadowColor = '#f43f5e';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, cadrCfm, roomSqFt, hasShroud, fanSpeed]);

  return (
    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md relative overflow-hidden space-y-3">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-200">
            Real-Time Fluid Dynamics & Particle Clearance Simulator
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700/80 text-[11px] font-mono">
            Simulated PM2.5:{' '}
            <strong className={indoorPM25 > 35 ? 'text-rose-400' : 'text-emerald-400'}>
              {indoorPM25} µg/m³
            </strong>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset Room Air to 360 µg/m³"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="w-full relative rounded-xl border border-slate-800/80 overflow-hidden bg-slate-950/90 shadow-inner">
        <canvas ref={canvasRef} className="block w-full h-[240px]" />
        
        {/* Floating Legend */}
        <div className="absolute top-2 left-2 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px]">
          <span className="flex items-center gap-1 text-rose-300">
            <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500 inline-block" />
            Smog Aerosols (PM2.5)
          </span>
          <span className="flex items-center gap-1 text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 inline-block" />
            Filtered Clean Air Stream
          </span>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 text-center">
        Shows Brownian motion & convection currents: Dirty aerosols enter the 4-sided MERV 13 filter cube and exit vertically as pure clean airflow.
      </p>
    </div>
  );
};
