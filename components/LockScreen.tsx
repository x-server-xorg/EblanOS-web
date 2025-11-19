
import React, { useState, useEffect, useRef } from 'react';
import { playSound } from '../utils/sound';

interface LockScreenProps {
  onUnlock: () => void;
  isLocked: boolean;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, isLocked }) => {
  const [time, setTime] = useState(new Date());
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Touch/Mouse Handlers for Swipe
  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startY.current = clientY;
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diff = clientY - startY.current;
    // Only allow dragging up (negative diff)
    if (diff < 0) {
      setOffsetY(diff);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (offsetY < -150) {
      // Unlock threshold reached
      onUnlock();
    } else {
      // Reset
      setOffsetY(0);
    }
  };

  if (!isLocked) return null;

  return (
    <div 
      className="absolute inset-0 z-[60] flex flex-col items-center text-white overflow-hidden transition-transform duration-300 ease-out"
      style={{ 
        transform: `translateY(${offsetY}px)`,
        opacity: 1 + (offsetY / 600), // Slight fade on drag
        backdropFilter: isDragging ? 'blur(2px)' : 'none'
      }}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
       {/* Status Bar Placeholder (Invisible but takes space) */}
       <div className="h-12 w-full shrink-0"></div>

       {/* Main Lock Content */}
       <div className="flex flex-col items-center mt-8 w-full select-none pointer-events-none">
          <div className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2 backdrop-blur-sm px-3 py-1 rounded-full bg-black/10">
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M17 8V7a5 5 0 00-10 0v1a3 3 0 00-3 3v7a3 3 0 003 3h10a3 3 0 003-3v-7a3 3 0 00-3-3zm-7-1a2 2 0 114 0v1h-4V7z" clipRule="evenodd" /></svg>
             <span>Swipe up to unlock</span>
          </div>
          
          <div className="text-xl font-medium text-white/90 mb-0">
             {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <div className="text-[5.5rem] font-bold leading-none tracking-tighter text-white drop-shadow-xl font-[Inter]">
             {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })}
          </div>
       </div>

       <div className="flex-1"></div>

       {/* Bottom Controls */}
       <div className="w-full px-12 pb-12 flex justify-between items-end relative pointer-events-auto">
          <button 
            onClick={() => playSound('toggle')}
            className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-lg flex items-center justify-center active:bg-white/20 transition-all shadow-lg hover:scale-105"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm9.192 7.657a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zm-3.535 12.02a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 111.414-1.414l1.414 1.414a1 1 0 010 1.414zM4.222 9.657a1 1 0 011.414-1.414l1.414 1.414a1 1 0 11-1.414 1.414L4.222 9.657zm3.535 12.02a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 1.414l-1.414 1.414zM12 22a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1zM5 12a1 1 0 01-1-1V9a1 1 0 112 0v2a1 1 0 01-1 1zm14 0a1 1 0 01-1-1V9a1 1 0 112 0v2a1 1 0 01-1 1z"/></svg>
          </button>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
             <div className="w-36 h-1.5 bg-white rounded-full shadow-sm"></div>
          </div>

          <button 
             onClick={() => playSound('tap')}
             className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-lg flex items-center justify-center active:bg-white/20 transition-all shadow-lg hover:scale-105"
          >
             <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm8 3a3 3 0 100 6 3 3 0 000-6z"/></svg>
          </button>
       </div>
    </div>
  );
}
