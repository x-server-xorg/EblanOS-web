
import React, { useState, useEffect } from 'react';

interface StatusBarProps {
  onToggleNotifications?: () => void;
  isLocked?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ onToggleNotifications, isLocked }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="h-12 w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 text-white font-medium text-sm select-none mix-blend-difference cursor-pointer active:opacity-70 transition-opacity"
      onClick={onToggleNotifications}
    >
      <div className="w-20 flex justify-start">
        {/* Hide status bar time if locked, as lock screen has a giant clock */}
        <span className={`transition-opacity duration-300 ${isLocked ? 'opacity-0' : 'opacity-100'}`}>{time}</span>
      </div>
      
      {/* Dynamic Island Placeholder */}
      <div className="h-7 w-28 bg-black rounded-full mx-auto hidden sm:block transition-all duration-300"></div>

      <div className="w-20 flex justify-end gap-2 items-center">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
        <div className="w-6 h-3 border border-white rounded-sm relative">
          <div className="absolute top-0.5 left-0.5 h-2 bg-white w-4"></div>
          <div className="absolute top-1 -right-1 h-1 w-0.5 bg-white rounded-r-sm"></div>
        </div>
      </div>
    </div>
  );
};
