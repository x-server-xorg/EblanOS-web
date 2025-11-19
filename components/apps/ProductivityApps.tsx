import React, { useState, useEffect, useRef } from 'react';
import { Wallpaper, LanguageID } from '../../types';
import { WALLPAPERS, TRANSLATIONS } from '../../constants';
import { playSound } from '../../utils/sound';

// --- Music Player App ---
export const MusicPlayerApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Using reliable MP3 sources for demonstration
  const songs = [
    { 
      id: 1, 
      title: "Midnight City (Demo)", 
      artist: "M83", 
      cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
    },
    { 
      id: 2, 
      title: "Starboy (Demo)", 
      artist: "The Weeknd", 
      cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000&auto=format&fit=crop", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },
    { 
      id: 3, 
      title: "Get Lucky (Demo)", 
      artist: "Daft Punk", 
      cover: "https://images.unsplash.com/photo-1598556776374-0a8b6471e1c4?q=80&w=1000&auto=format&fit=crop", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    { 
      id: 4, 
      title: "Starlight (Demo)", 
      artist: "Muse", 
      cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
    },
    { 
      id: 5, 
      title: "Levitating (Demo)", 
      artist: "Dua Lipa", 
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop", 
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
    }
  ];

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  // Reset and auto-play when song changes
  useEffect(() => {
    setIsPlaying(true);
  }, [currentSongIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSongEnd = () => {
    nextSong();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const togglePlay = () => {
    playSound('tap');
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    playSound('tap');
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    playSound('tap');
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage for styling the range input background
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full h-full bg-white dark:bg-black flex flex-col transition-colors duration-300">
      <audio 
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />

      <div className="h-14 flex items-center px-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <h2 className="font-bold text-2xl text-red-500">Music</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        {/* Now Playing Section (Mini) */}
        <div className="p-6 flex flex-col items-center bg-gray-50 dark:bg-[#121212] mb-4 shadow-sm">
            <div className="w-48 h-48 rounded-lg shadow-2xl mb-6 overflow-hidden relative group">
               <img src={currentSong.cover} alt="Album Art" className="w-full h-full object-cover" />
               {isPlaying && (
                   <div className="absolute bottom-2 right-2 flex gap-1 bg-black/50 p-1 rounded-md backdrop-blur-sm">
                      <div className="w-1 h-3 bg-red-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-1 h-5 bg-red-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-2 bg-red-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   </div>
               )}
            </div>
            <div className="text-center mb-6">
               <h3 className="text-xl font-bold text-black dark:text-white mb-1">{currentSong.title}</h3>
               <p className="text-gray-500 text-sm font-medium">{currentSong.artist}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs mb-6 group">
               <input 
                 type="range"
                 min={0}
                 max={duration || 100}
                 value={currentTime}
                 onChange={handleSeek}
                 className="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                 style={{
                   background: `linear-gradient(to right, #ef4444 ${progressPercent}%, ${document.documentElement.classList.contains('dark') ? '#374151' : '#d1d5db'} ${progressPercent}%)`
                 }}
               />
               <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
               </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8">
               <button onClick={prevSong} className="text-gray-800 dark:text-white hover:text-gray-500 transition-colors active:scale-90">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
               </button>
               <button onClick={togglePlay} className="text-black dark:text-white transform hover:scale-110 active:scale-95 transition-all">
                  {isPlaying ? (
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
               </button>
               <button onClick={nextSong} className="text-gray-800 dark:text-white hover:text-gray-500 transition-colors active:scale-90">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
               </button>
            </div>
        </div>

        {/* Library List */}
        <div className="px-4">
           <h3 className="text-lg font-bold text-black dark:text-white mb-3">Library</h3>
           <div className="flex flex-col gap-2">
              {songs.map((song, idx) => (
                 <div 
                    key={song.id} 
                    onClick={() => { 
                      playSound('tap'); 
                      setCurrentSongIndex(idx); 
                      setIsPlaying(true); 
                    }}
                    className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${currentSongIndex === idx ? 'bg-red-50 dark:bg-red-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                 >
                    <div className="w-12 h-12 rounded bg-gray-300 overflow-hidden mr-3 relative">
                        <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                        {currentSongIndex === idx && isPlaying && (
                           <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                               <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                           </div>
                        )}
                    </div>
                    <div className="flex-1">
                       <h4 className={`font-semibold text-sm ${currentSongIndex === idx ? 'text-red-600 dark:text-red-400' : 'text-black dark:text-white'}`}>{song.title}</h4>
                       <p className="text-xs text-gray-500">{song.artist}</p>
                    </div>
                    {currentSongIndex === idx && (
                       <div className="mr-2">
                          <div className="flex gap-0.5 items-end h-3">
                             <div className="w-0.5 bg-red-500 animate-[bounce_1s_infinite] h-2"></div>
                             <div className="w-0.5 bg-red-500 animate-[bounce_1.2s_infinite] h-3"></div>
                             <div className="w-0.5 bg-red-500 animate-[bounce_0.8s_infinite] h-1.5"></div>
                          </div>
                       </div>
                    )}
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Terminal ---
export const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to EblanOS Terminal', 'Type "help" for commands.']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      playSound('keyboard');
      const cmd = input.trim().toLowerCase();
      let response = '';
      
      switch (cmd) {
        case 'help': response = 'Available commands: help, clear, date, echo [text], whoami'; break;
        case 'clear': setHistory([]); setInput(''); return;
        case 'date': response = new Date().toString(); break;
        case 'whoami': response = 'root@eblan-device'; break;
        default: 
          if (cmd.startsWith('echo ')) response = cmd.substring(5);
          else response = `Command not found: ${cmd}`;
      }
      
      setHistory([...history, `$ ${input}`, response]);
      setInput('');
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="w-full h-full bg-black text-green-400 p-4 font-mono text-sm overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-1">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center mt-2 border-t border-gray-800 pt-2">
        <span className="mr-2 text-white">$</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none text-white"
          autoFocus
        />
      </div>
    </div>
  );
};

// --- Browser ---
export const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [displayUrl, setDisplayUrl] = useState('wikipedia.org');
  const [loading, setLoading] = useState(false);

  const handleGo = (e?: React.FormEvent) => {
    e?.preventDefault();
    playSound('tap');
    let target = displayUrl;
    if (!target.includes('.')) {
        target = `https://www.bing.com/search?q=${encodeURIComponent(target)}`;
    } else if (!target.startsWith('http')) {
        target = 'https://' + target;
    }
    
    setLoading(true);
    setUrl(target);
    
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-[#121212] transition-colors duration-300">
      {/* Top Navigation Bar */}
      <div className="h-16 bg-[#f0f0f0] dark:bg-[#202124] flex items-center px-4 gap-3 border-b border-gray-300 dark:border-gray-800 shrink-0 transition-colors duration-300">
         <div className="flex gap-4 text-gray-500 dark:text-gray-400">
            <button onClick={() => playSound('tap')} className="hover:text-black dark:hover:text-white transition-colors" title="Back">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => playSound('tap')} className="hover:text-black dark:hover:text-white transition-colors" title="Forward">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
         </div>

         {/* Address Bar */}
         <form onSubmit={handleGo} className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                {url.startsWith('https') ? (
                    <svg className="w-3 h-3 text-green-600 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                ) : (
                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /></svg>
                )}
            </div>
            <input 
                className="w-full bg-white dark:bg-[#303134] text-black dark:text-white border border-gray-300 dark:border-transparent rounded-full pl-9 pr-9 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                value={displayUrl}
                onChange={(e) => setDisplayUrl(e.target.value)}
                placeholder="Search or enter address"
            />
             <button 
                type="button"
                onClick={() => { playSound('tap'); setLoading(true); setTimeout(()=>setLoading(false), 800); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
         </form>
         
         <button onClick={() => playSound('tap')} className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
         </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
          <div className="h-0.5 w-full bg-gray-200 dark:bg-[#202124]">
              <div className="h-full bg-blue-500 animate-subtle-progress w-1/2"></div>
          </div>
      )}

      <div className="flex-1 relative bg-white dark:bg-black overflow-hidden">
        <iframe 
          src={url} 
          className="w-full h-full border-0 opacity-100 dark:opacity-90 transition-opacity"
          sandbox="allow-scripts allow-same-origin allow-forms"
          title="Browser"
        />
        <div className="absolute bottom-0 w-full bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur border-t dark:border-gray-700 p-2 text-[10px] text-gray-500 dark:text-gray-400 text-center">
          Not all websites allow embedding. Try Wikipedia or Bing.
        </div>
      </div>
    </div>
  );
};

// --- Notes ---
export const NotesApp: React.FC = () => {
  const [text, setText] = useState(() => localStorage.getItem('eblanos-note') || 'Start typing...');

  useEffect(() => {
    localStorage.setItem('eblanos-note', text);
  }, [text]);

  return (
    <div className="w-full h-full bg-yellow-50 dark:bg-gray-800 flex flex-col transition-colors duration-300">
      <div className="h-12 flex items-center px-4 border-b border-yellow-200 dark:border-gray-700 bg-yellow-100 dark:bg-gray-900 transition-colors duration-300">
        <h2 className="font-bold text-yellow-900 dark:text-yellow-500">Notes</h2>
      </div>
      <textarea 
        className="flex-1 p-4 bg-transparent resize-none outline-none text-gray-800 dark:text-gray-200 leading-relaxed placeholder-gray-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

// --- File Manager ---
export const FilesApp: React.FC = () => {
  const files = [
    { name: 'Documents', type: 'folder', size: '--' },
    { name: 'Images', type: 'folder', size: '--' },
    { name: 'Work Project', type: 'folder', size: '--' },
    { name: 'budget_2025.pdf', type: 'file', size: '1.2 MB' },
    { name: 'profile_pic.jpg', type: 'file', size: '2.4 MB' },
    { name: 'notes.txt', type: 'file', size: '4 KB' },
  ];

  return (
    <div className="w-full h-full bg-white dark:bg-[#1c1c1e] flex flex-col transition-colors duration-300">
      <div className="h-12 flex items-center justify-between px-4 border-b dark:border-gray-800 bg-gray-50 dark:bg-[#1c1c1e] transition-colors duration-300">
        <h2 className="font-semibold text-lg text-black dark:text-white">On My Phone</h2>
        <button onClick={() => playSound('tap')} className="text-blue-500 text-sm">Edit</button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {files.map((f, i) => (
          <div key={i} onClick={() => playSound('tap')} className="flex items-center p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
             <div className={`w-10 h-10 rounded flex items-center justify-center mr-4 ${f.type === 'folder' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'}`}>
               {f.type === 'folder' ? (
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/></svg>
               ) : (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
               )}
             </div>
             <div className="flex-1">
               <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{f.name}</p>
               <p className="text-xs text-gray-500 dark:text-gray-400">{f.type} • {f.size}</p>
             </div>
             <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Settings ---
interface SettingsProps {
  setWallpaper: (id: string) => void;
  currentWallpaper: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: LanguageID;
  setLanguage: (lang: LanguageID) => void;
}

export const SettingsApp: React.FC<SettingsProps> = ({ 
  setWallpaper, 
  currentWallpaper, 
  isDarkMode, 
  toggleDarkMode, 
  language, 
  setLanguage 
}) => {
  const [screen, setScreen] = useState<'main' | 'language'>('main');
  const t = TRANSLATIONS[language].settings;
  const langNames = TRANSLATIONS[language].languages;

  const handleBack = () => {
    playSound('tap');
    setScreen('main');
  };

  if (screen === 'language') {
    return (
      <div className="w-full h-full bg-[#f2f2f7] dark:bg-black flex flex-col transition-colors duration-300">
         <div className="h-14 flex items-center px-2 border-b dark:border-gray-800 bg-white dark:bg-[#1c1c1e] shrink-0 transition-colors duration-300 relative">
            <button onClick={handleBack} className="absolute left-2 flex items-center text-blue-500 p-2 -ml-1 z-10">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                <span className="text-base ml-1">{t.title}</span>
            </button>
            <div className="w-full text-center font-bold text-lg text-black dark:text-white">{t.language}</div>
         </div>
         <div className="p-4 flex-1 overflow-y-auto">
            <div className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden shadow-sm transition-colors duration-300">
                <div className="flex flex-col">
                   {['ru', 'uk', 'be', 'en'].map((langCode) => {
                       const isSelected = language === langCode;
                       return (
                         <div 
                            key={langCode}
                            onClick={() => { playSound('tap'); setLanguage(langCode as LanguageID); }}
                            className="flex justify-between items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0 cursor-pointer active:bg-gray-50 dark:active:bg-gray-800"
                         >
                            <span className={`text-sm font-medium ${isSelected ? 'text-blue-500' : 'text-black dark:text-white'}`}>
                                {langNames[langCode as LanguageID]}
                            </span>
                            {isSelected && (
                               <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            )}
                         </div>
                       );
                   })}
                </div>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#f2f2f7] dark:bg-black flex flex-col transition-colors duration-300">
      {/* Main Header */}
      <div className="h-14 flex items-center justify-center border-b dark:border-gray-800 bg-white dark:bg-[#1c1c1e] shrink-0 transition-colors duration-300 relative">
        <h2 className="font-bold text-xl text-black dark:text-white">{t.title}</h2>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        
        {/* General Section (Language) */}
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase ml-4 mb-2">{t.general}</h3>
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden shadow-sm mb-6 transition-colors duration-300">
            <div 
                onClick={() => { playSound('tap'); setScreen('language'); }}
                className="flex justify-between items-center px-4 py-3 cursor-pointer active:bg-gray-50 dark:active:bg-gray-800"
            >
                <span className="text-sm font-medium text-black dark:text-white">{t.language}</span>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 dark:text-gray-500">{langNames[language]}</span>
                    <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </div>
            </div>
        </div>

        {/* Appearance Section */}
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase ml-4 mb-2">{t.appearance}</h3>
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden shadow-sm mb-6 transition-colors duration-300">
            <div className="p-4 flex flex-col gap-4">
                <div className="flex justify-center gap-6">
                    {/* Light Mode Option */}
                    <button 
                        onClick={() => { if(isDarkMode) toggleDarkMode(); }}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className={`w-20 h-12 rounded-lg border-2 flex items-center justify-center bg-[#f2f2f7] ${!isDarkMode ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200 dark:border-gray-700'}`}>
                            <span className="text-xs font-medium text-black">Aa</span>
                        </div>
                        <span className={`text-xs ${!isDarkMode ? 'text-blue-500 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>{t.light}</span>
                    </button>

                    {/* Dark Mode Option */}
                    <button 
                        onClick={() => { if(!isDarkMode) toggleDarkMode(); }}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className={`w-20 h-12 rounded-lg border-2 flex items-center justify-center bg-[#1c1c1e] ${isDarkMode ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200 dark:border-gray-700'}`}>
                            <span className="text-xs font-medium text-white">Aa</span>
                        </div>
                        <span className={`text-xs ${isDarkMode ? 'text-blue-500 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>{t.dark}</span>
                    </button>
                </div>

                <div className="flex items-center justify-between border-t dark:border-gray-800 pt-4">
                    <span className="text-base text-black dark:text-white">{t.auto}</span>
                    <div onClick={() => playSound('toggle')} className="w-12 h-7 bg-green-500 rounded-full p-1 flex justify-end cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Wallpaper Section */}
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase ml-4 mb-2">{t.wallpaper}</h3>
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden shadow-sm mb-6 transition-colors duration-300">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {WALLPAPERS.map(wp => (
                <div 
                  key={wp.id}
                  onClick={() => setWallpaper(wp.id)}
                  className={`aspect-[9/19] rounded-lg overflow-hidden cursor-pointer border-4 transition-all ${currentWallpaper === wp.id ? 'border-blue-500 scale-95 shadow-lg' : 'border-transparent hover:scale-105'}`}
                >
                  <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase ml-4 mb-2">{t.about}</h3>
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl overflow-hidden shadow-sm mb-6 transition-colors duration-300">
             <div className="flex flex-col">
                 <div className="p-6 flex flex-col items-center border-b border-gray-100 dark:border-gray-800">
                     <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-3 shadow-lg flex items-center justify-center text-white font-bold text-2xl">
                        18
                     </div>
                     <h4 className="text-xl font-semibold text-black dark:text-white">EblanOS</h4>
                     <p className="text-sm text-gray-500 dark:text-gray-400">Designed by AI</p>
                 </div>
                 
                 <div className="pl-4">
                     <div className="flex justify-between items-center pr-4 py-3 border-b border-gray-100 dark:border-gray-800">
                         <span className="text-sm font-medium text-black dark:text-white">{t.version}</span>
                         <span className="text-sm text-gray-500 dark:text-gray-400">18.1.0</span>
                     </div>
                     <div className="flex justify-between items-center pr-4 py-3 border-b border-gray-100 dark:border-gray-800">
                         <span className="text-sm font-medium text-black dark:text-white">{t.build}</span>
                         <span className="text-sm text-gray-500 dark:text-gray-400">24A5279</span>
                     </div>
                     <div className="flex justify-between items-center pr-4 py-3">
                         <span className="text-sm font-medium text-black dark:text-white">{t.kernel}</span>
                         <span className="text-sm text-gray-500 dark:text-gray-400">EblanKernel 5.15.0</span>
                     </div>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};