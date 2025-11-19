
import React, { useState, useEffect } from 'react';
import { playSound } from '../../utils/sound';

// --- Calculator ---
export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [newNum, setNewNum] = useState(true);

  const handleNum = (num: string) => {
    playSound('tap');
    if (newNum) {
      setDisplay(num);
      setNewNum(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (operation: string) => {
    playSound('tap');
    const current = parseFloat(display);
    if (prev === null) {
      setPrev(current);
    } else if (op) {
      const result = calculate(prev, current, op);
      setPrev(result);
      setDisplay(String(result));
    }
    setOp(operation);
    setNewNum(true);
  };

  const calculate = (a: number, b: number, operation: string) => {
    switch (operation) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEqual = () => {
    playSound('tap');
    if (op && prev !== null) {
      const current = parseFloat(display);
      const result = calculate(prev, current, op);
      setDisplay(String(result));
      setPrev(null);
      setOp(null);
      setNewNum(true);
    }
  };

  const handleClear = () => {
    playSound('tap');
    setDisplay('0');
    setPrev(null);
    setOp(null);
    setNewNum(true);
  };

  const Btn = ({ label, color, onClick, wide }: any) => (
    <button
      onClick={onClick}
      className={`${color} ${wide ? 'col-span-2' : ''} h-16 w-full rounded-full text-2xl font-medium text-white active:opacity-70 transition-opacity flex items-center justify-center`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-black p-4 text-white">
      <div className="flex-1 flex items-end justify-end pb-4">
        <span className="text-6xl font-light truncate">{display}</span>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-8">
        <Btn label="C" color="bg-gray-400 text-black" onClick={handleClear} />
        <Btn label="+/-" color="bg-gray-400 text-black" onClick={() => { playSound('tap'); setDisplay(String(parseFloat(display) * -1)); }} />
        <Btn label="%" color="bg-gray-400 text-black" onClick={() => { playSound('tap'); setDisplay(String(parseFloat(display) / 100)); }} />
        <Btn label="÷" color="bg-orange-500" onClick={() => handleOp('/')} />
        <Btn label="7" color="bg-gray-800" onClick={() => handleNum('7')} />
        <Btn label="8" color="bg-gray-800" onClick={() => handleNum('8')} />
        <Btn label="9" color="bg-gray-800" onClick={() => handleNum('9')} />
        <Btn label="×" color="bg-orange-500" onClick={() => handleOp('*')} />
        <Btn label="4" color="bg-gray-800" onClick={() => handleNum('4')} />
        <Btn label="5" color="bg-gray-800" onClick={() => handleNum('5')} />
        <Btn label="6" color="bg-gray-800" onClick={() => handleNum('6')} />
        <Btn label="-" color="bg-orange-500" onClick={() => handleOp('-')} />
        <Btn label="1" color="bg-gray-800" onClick={() => handleNum('1')} />
        <Btn label="2" color="bg-gray-800" onClick={() => handleNum('2')} />
        <Btn label="3" color="bg-gray-800" onClick={() => handleNum('3')} />
        <Btn label="+" color="bg-orange-500" onClick={() => handleOp('+')} />
        <Btn label="0" color="bg-gray-800" wide onClick={() => handleNum('0')} />
        <Btn label="." color="bg-gray-800" onClick={() => handleNum('.')} />
        <Btn label="=" color="bg-orange-500" onClick={handleEqual} />
      </div>
    </div>
  );
};

// --- Clock ---
export const ClockApp: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate angles
  const hAngle = (hours % 12) * 30 + minutes * 0.5;
  const mAngle = minutes * 6;
  const sAngle = seconds * 6;

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center text-white">
       <div className="relative w-64 h-64 border-4 border-gray-700 rounded-full flex items-center justify-center bg-gray-900 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
         {/* Hour Marks */}
         {[...Array(12)].map((_, i) => (
           <div key={i} className="absolute w-1 h-3 bg-gray-400" 
                style={{ transform: `rotate(${i * 30}deg) translateY(-110px)` }} />
         ))}

         {/* Hands */}
         <div className="absolute w-2 h-24 bg-white rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2" 
              style={{ transform: `translateX(-50%) rotate(${hAngle}deg)` }} />
         <div className="absolute w-1.5 h-32 bg-gray-300 rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2"
              style={{ transform: `translateX(-50%) rotate(${mAngle}deg)` }} />
         <div className="absolute w-0.5 h-36 bg-orange-500 rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2"
              style={{ transform: `translateX(-50%) rotate(${sAngle}deg)` }} />
         
         <div className="absolute w-3 h-3 bg-orange-500 rounded-full z-10" />
       </div>
       <div className="mt-12 text-5xl font-thin font-mono">
          {time.toLocaleTimeString()}
       </div>
    </div>
  );
};

// --- Calendar ---
export const CalendarApp: React.FC = () => {
  const date = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthName = date.toLocaleString('default', { month: 'long' });
  const currentDay = date.getDate();

  return (
    <div className="h-full w-full bg-white dark:bg-black text-black dark:text-white flex flex-col transition-colors duration-300">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-500">{monthName}</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">{date.getFullYear()}</p>
      </div>
      <div className="grid grid-cols-7 text-center p-2 bg-gray-50 dark:bg-[#1c1c1e] font-bold text-gray-400 text-sm transition-colors duration-300">
        {days.map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 flex-1 auto-rows-fr p-2 gap-1">
         {/* Mocking a simple month view layout */}
         {[...Array(35)].map((_, i) => {
            const d = i - 2; // Offset for visual demo
            const isToday = d === currentDay;
            return (
              <div key={i} className="flex items-start justify-center pt-2 relative">
                {d > 0 && d <= 31 && (
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full ${isToday ? 'bg-red-600 text-white font-bold' : 'text-gray-800 dark:text-gray-200'}`}>
                    {d}
                  </span>
                )}
              </div>
            )
         })}
      </div>
    </div>
  );
};
