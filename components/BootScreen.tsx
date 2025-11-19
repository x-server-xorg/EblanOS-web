import React, { useEffect, useState } from 'react';
import { playSound } from '../utils/sound';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Attempt to play sound. Note: Browsers often block audio without user interaction first.
    // This might only work if the user has interacted with the page previously or settings allow it.
    const soundTimer = setTimeout(() => {
        playSound('startup');
    }, 500);

    // Total boot time: 3 seconds wait, then fade out
    const bootTimer = setTimeout(() => {
      setOpacity(0);
      // Wait for fade transition to finish before unmounting
      setTimeout(onComplete, 1000);
    }, 3000);

    return () => {
        clearTimeout(soundTimer);
        clearTimeout(bootTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ease-in-out"
      style={{ opacity }}
    >
      <div className="flex flex-col items-center animate-pulse">
         {/* Minimalist Logo for EblanOS */}
         <svg className="w-24 h-24 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
         </svg>
      </div>
    </div>
  );
};