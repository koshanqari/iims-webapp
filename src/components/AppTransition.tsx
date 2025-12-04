"use client";

import { useEffect, useState } from "react";
import { Play, ChevronRight } from "lucide-react";

interface AppTransitionProps {
  appName: string;
  onComplete: () => void;
}

export default function AppTransition({ appName, onComplete }: AppTransitionProps) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    const phase1 = setTimeout(() => setPhase(1), 300);
    const phase2 = setTimeout(() => setPhase(2), 800);
    const phase3 = setTimeout(() => setPhase(3), 1200);
    const ready = setTimeout(() => setIsReady(true), 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(phase1);
      clearTimeout(phase2);
      clearTimeout(phase3);
      clearTimeout(ready);
    };
  }, [appName]);

  const handleStart = () => {
    setIsLaunching(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Scanning lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-full h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #dc2626, transparent)',
            boxShadow: '0 0 20px #dc2626, 0 0 40px #dc2626',
            animation: 'scanV 2s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-[2px] h-full"
          style={{
            background: 'linear-gradient(180deg, transparent, #dc2626, transparent)',
            boxShadow: '0 0 20px #dc2626, 0 0 40px #dc2626',
            animation: 'scanH 3s ease-in-out infinite'
          }}
        />
      </div>

      {/* Circuit patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0" />
            <stop offset="50%" stopColor="#dc2626" stopOpacity="1" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[15, 30, 45, 60, 75, 85].map((y, i) => (
          <g key={`h-${i}`}>
            <line
              x1="0" y1={y} x2="100" y2={y}
              stroke="url(#circuit-gradient)"
              strokeWidth="0.1"
              style={{ animation: `circuitFlow 2s ease-in-out infinite ${i * 0.2}s` }}
            />
            <circle
              cx={20 + i * 12} cy={y} r="0.5"
              fill="#dc2626"
              style={{ animation: `pulseNode 1.5s ease-in-out infinite ${i * 0.15}s` }}
            />
          </g>
        ))}
        {[20, 35, 50, 65, 80].map((x, i) => (
          <line
            key={`v-${i}`}
            x1={x} y1="0" x2={x} y2="100"
            stroke="url(#circuit-gradient)"
            strokeWidth="0.1"
            style={{ animation: `circuitFlowV 2.5s ease-in-out infinite ${i * 0.25}s` }}
          />
        ))}
      </svg>

      {/* Particle field */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-red-600 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 6px #dc2626',
              animation: `float ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Logo container with reveal */}
        <div 
          className="relative w-[200px] h-[200px] flex items-center justify-center"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'scale(1)' : 'scale(0.5)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {/* Geometric frame around logo */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="frame-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            <path
              d="M100,10 L180,50 L180,150 L100,190 L20,150 L20,50 Z"
              fill="none"
              stroke="url(#frame-gradient)"
              strokeWidth="1"
              style={{ 
                strokeDasharray: 1000, 
                strokeDashoffset: 1000,
                animation: 'drawFrame 1.5s ease-out forwards'
              }}
            />
            <path
              d="M100,20 L170,55 L170,145 L100,180 L30,145 L30,55 Z"
              fill="none"
              stroke="#dc2626"
              strokeWidth="0.5"
              strokeDasharray="5,5"
              style={{ 
                transformOrigin: 'center',
                animation: 'rotateFrame 10s linear infinite'
              }}
            />
            {[[100,10], [180,50], [180,150], [100,190], [20,150], [20,50]].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx} cy={cy} r="4"
                fill="#dc2626"
                style={{ animation: `pulseDot 1s ease-in-out infinite ${i * 0.1}s` }}
              />
            ))}
          </svg>

          {/* Logo */}
          <div 
            className="relative"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.6s ease-out 0.3s'
            }}
          >
            <img
              src="https://iba-consulting-prod.b-cdn.net/gj-logos/UELMS_darkbg.png"
              alt="UELMS"
              className="w-32 h-auto"
              style={{
                filter: 'brightness(1.1)',
                animation: 'logoPulse 2s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute -inset-5"
              style={{
                background: 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)',
                animation: 'glowPulse 2s ease-in-out infinite'
              }}
            />
          </div>
        </div>

        {/* System text */}
        <div 
          className="mt-8"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out'
          }}
        >
          <span className="text-xs tracking-[0.5em] text-gray-500 uppercase font-mono">
            Unified Equipment Lifecycle Management
          </span>
        </div>

        {/* Loading text with glitch */}
        <div 
          className="mt-8 text-center"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out'
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {!isReady && (
              <div 
                className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full"
                style={{ animation: 'spin 1s linear infinite' }}
              />
            )}
            <span className="text-white font-mono text-sm tracking-wider">
              {isReady ? 'SYSTEM READY' : 'INITIALIZING'}
            </span>
          </div>

          {/* App name with continuous animation */}
          <div className="relative">
            {/* Main text container */}
            <div className="relative overflow-hidden">
              <h2 
                className="text-4xl md:text-5xl font-bold tracking-wider uppercase font-mono text-white relative"
                style={{ 
                  textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(220,38,38,0.2)',
                  animation: 'textPulse 3s ease-in-out infinite'
                }}
              >
                {appName}
              </h2>
              
              {/* Scanning light effect - continuous */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                  animation: 'scanText 2s linear infinite',
                  width: '50%'
                }}
              />
              
              {/* Top highlight line */}
              <div 
                className="absolute -top-1 left-0 right-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.8), transparent)',
                  animation: 'lineGlow 2s ease-in-out infinite'
                }}
              />
              
              {/* Bottom highlight line */}
              <div 
                className="absolute -bottom-1 left-0 right-0 h-[1px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.8), transparent)',
                  animation: 'lineGlow 2s ease-in-out infinite 1s'
                }}
              />
            </div>
            
            {/* Animated underline */}
            <div className="relative mt-3 h-[2px] overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                style={{ animation: 'underlineSweep 1.5s ease-in-out infinite' }}
              />
              <div className="absolute inset-0 bg-red-900/30" />
            </div>
            
            {/* Data indicators */}
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <div 
                  className="w-2 h-2 rounded-full bg-green-500"
                  style={{ animation: 'dotPulse 1s ease-in-out infinite' }}
                />
                <span className="text-[9px] font-mono text-gray-500">ONLINE</span>
              </div>
              <div className="h-3 w-[1px] bg-gray-700" />
              <span className="text-[9px] font-mono text-gray-500 tracking-wider">
                SYS.{appName.toUpperCase().replace(' ', '_')}
              </span>
              <div className="h-3 w-[1px] bg-gray-700" />
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-mono text-red-500" style={{ animation: 'dataFlicker 0.5s linear infinite' }}>
                  ▸▸
                </span>
                <span className="text-[9px] font-mono text-gray-500">READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div 
          className="mt-8 w-[300px]"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out 0.2s'
          }}
        >
          <div className="relative">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full relative"
                style={{ 
                  width: `${progress}%`,
                  background: progress >= 100 ? '#22c55e' : 'linear-gradient(90deg, #dc2626, #f87171, #dc2626)',
                  backgroundSize: '200% 100%',
                  animation: progress >= 100 ? 'none' : 'gradientShift 2s linear infinite',
                  transition: 'width 0.1s linear, background 0.3s ease'
                }}
              >
                {progress < 100 && (
                  <div 
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-600 rounded-full"
                    style={{ boxShadow: '0 0 10px #dc2626, 0 0 20px #dc2626' }}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between mt-1">
              {[0, 25, 50, 75, 100].map((mark) => (
                <div
                  key={mark}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    progress >= mark ? (progress >= 100 ? 'bg-green-500' : 'bg-red-600') : 'bg-white/20'
                  }`}
                  style={{ boxShadow: progress >= mark ? (progress >= 100 ? '0 0 6px #22c55e' : '0 0 6px #dc2626') : 'none' }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs font-mono">
            <span className="text-gray-500">{isReady ? 'READY TO LAUNCH' : 'SYSTEM BOOT'}</span>
            <span className={`tabular-nums ${progress >= 100 ? 'text-green-500' : 'text-red-500'}`}>{progress}%</span>
          </div>
        </div>

        {/* Boot sequence messages */}
        <div 
          className="mt-6"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease-out 0.4s'
          }}
        >
          <div className="font-mono text-[10px] text-gray-600 space-y-1">
            {[
              { threshold: 10, text: "Loading core modules..." },
              { threshold: 30, text: "Establishing secure connection..." },
              { threshold: 50, text: "Authenticating user credentials..." },
              { threshold: 70, text: "Initializing equipment interface..." },
              { threshold: 90, text: "System initialized successfully", isReady: true }
            ].map((item, i) => (
              <p 
                key={i}
                className="transition-all duration-300"
                style={{
                  opacity: progress > item.threshold ? 1 : 0,
                  transform: progress > item.threshold ? 'translateX(0)' : 'translateX(-10px)'
                }}
              >
                <span className={item.isReady ? 'text-green-500' : 'text-red-500'}>
                  [{item.isReady ? 'READY' : 'OK'}]
                </span>{' '}
                {item.text}
              </p>
            ))}
          </div>
        </div>

        {/* START BUTTON */}
        <div 
          className="mt-10"
          style={{
            opacity: isReady ? 1 : 0,
            transform: isReady ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            pointerEvents: isReady ? 'auto' : 'none'
          }}
        >
          <button
            onClick={handleStart}
            disabled={isLaunching}
            className="group relative px-12 py-4 bg-transparent overflow-hidden"
          >
            {/* Button border frame */}
            <div className="absolute inset-0">
              <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="btn-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="50%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
                {/* Hexagonal button shape */}
                <path
                  d="M20,0 L180,0 L200,30 L180,60 L20,60 L0,30 Z"
                  fill="none"
                  stroke="url(#btn-gradient)"
                  strokeWidth="2"
                  className="transition-all duration-300 group-hover:stroke-[3]"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.5))' }}
                />
                {/* Inner glow on hover */}
                <path
                  d="M20,0 L180,0 L200,30 L180,60 L20,60 L0,30 Z"
                  fill="rgba(220, 38, 38, 0.1)"
                  className="transition-all duration-300 group-hover:fill-[rgba(220,38,38,0.2)]"
                />
              </svg>
            </div>

            {/* Animated background on hover */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ animation: 'shimmer 2s linear infinite' }}
            />

            {/* Button content */}
            <div className="relative flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500"
                style={{ 
                  boxShadow: '0 0 20px rgba(220, 38, 38, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                  animation: isReady && !isLaunching ? 'buttonPulse 2s ease-in-out infinite' : 'none'
                }}
              >
                {isLaunching ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Play size={20} className="text-white ml-1" fill="white" />
                )}
              </div>
              <div className="text-left">
                <span className="block text-white font-bold text-lg tracking-wider group-hover:text-red-100 transition-colors">
                  {isLaunching ? 'LAUNCHING...' : 'START'}
                </span>
                <span className="block text-gray-500 text-[10px] font-mono tracking-wider">
                  PRESS TO LAUNCH {appName.toUpperCase()}
                </span>
              </div>
              <ChevronRight 
                size={24} 
                className="text-red-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-400"
                style={{ animation: isReady && !isLaunching ? 'arrowBounce 1s ease-in-out infinite' : 'none' }}
              />
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-4 w-2 h-2 border-t-2 border-l-2 border-red-500" />
            <div className="absolute top-0 right-4 w-2 h-2 border-t-2 border-r-2 border-red-500" />
            <div className="absolute bottom-0 left-4 w-2 h-2 border-b-2 border-l-2 border-red-500" />
            <div className="absolute bottom-0 right-4 w-2 h-2 border-b-2 border-r-2 border-red-500" />
          </button>
        </div>
      </div>

      {/* Corner decorations */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position, i) => (
        <div
          key={position}
          className={`absolute w-20 h-20 border border-red-600/30 ${
            position === 'top-left' ? 'top-5 left-5 border-r-0 border-b-0' :
            position === 'top-right' ? 'top-5 right-5 border-l-0 border-b-0' :
            position === 'bottom-left' ? 'bottom-5 left-5 border-r-0 border-t-0' :
            'bottom-5 right-5 border-l-0 border-t-0'
          }`}
          style={{ animation: `cornerPulse 2s ease-in-out infinite ${i * 0.5}s` }}
        />
      ))}

      {/* Edge lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent" />

      {/* Launch flash */}
      <div 
        className="absolute inset-0 bg-white pointer-events-none"
        style={{
          opacity: 0,
          animation: isLaunching ? 'flash 0.6s ease-out forwards' : 'none'
        }}
      />

      <style jsx global>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes scanV {
          0%, 100% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes scanH {
          0%, 100% { left: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes circuitFlow {
          0%, 100% { stroke-dasharray: 0 100; }
          50% { stroke-dasharray: 50 50; }
        }
        @keyframes circuitFlowV {
          0%, 100% { stroke-dasharray: 0 100; }
          50% { stroke-dasharray: 30 70; }
        }
        @keyframes pulseNode {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
        }
        @keyframes drawFrame {
          to { stroke-dashoffset: 0; }
        }
        @keyframes rotateFrame {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes logoPulse {
          0%, 100% { filter: brightness(1.1) drop-shadow(0 0 10px rgba(220, 38, 38, 0.5)); }
          50% { filter: brightness(1.3) drop-shadow(0 0 30px rgba(220, 38, 38, 0.8)); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        @keyframes cornerPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes flash {
          0% { opacity: 0; }
          30% { opacity: 1; }
          100% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes buttonPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.2); }
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        @keyframes textPulse {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(220,38,38,0.2);
            opacity: 1;
          }
          50% { 
            text-shadow: 0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(220,38,38,0.4);
            opacity: 0.95;
          }
        }
        @keyframes scanText {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes lineGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes underlineSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes dotPulse {
          0%, 100% { 
            opacity: 1; 
            box-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
          }
          50% { 
            opacity: 0.6; 
            box-shadow: 0 0 4px rgba(34, 197, 94, 0.4);
          }
        }
        @keyframes dataFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
