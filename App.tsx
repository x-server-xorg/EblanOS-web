
import React, { useState, useEffect } from 'react';
import { StatusBar } from './components/StatusBar';
import { APPS, WALLPAPERS, TRANSLATIONS } from './constants';
import { AppID, NotificationItem, LanguageID } from './types';
import { CalculatorApp, ClockApp, CalendarApp } from './components/apps/UtilityApps';
import { MusicPlayerApp, TerminalApp, BrowserApp, NotesApp, FilesApp, SettingsApp } from './components/apps/ProductivityApps';
import { playSound } from './utils/sound';
import { LockScreen } from './components/LockScreen';
import { BootScreen } from './components/BootScreen';

// Helper to render specific app content
const AppContent = ({ 
  id, 
  setWallpaper, 
  currentWallpaper,
  isDarkMode,
  toggleDarkMode,
  language,
  setLanguage
}: { 
  id: AppID, 
  setWallpaper: (id: string) => void, 
  currentWallpaper: string,
  isDarkMode: boolean,
  toggleDarkMode: () => void,
  language: LanguageID,
  setLanguage: (lang: LanguageID) => void
}) => {
  switch (id) {
    case 'calculator': return <CalculatorApp />;
    case 'clock': return <ClockApp />;
    case 'calendar': return <CalendarApp />;
    case 'music': return <MusicPlayerApp />;
    case 'terminal': return <TerminalApp />;
    case 'browser': return <BrowserApp />;
    case 'notes': return <NotesApp />;
    case 'files': return <FilesApp />;
    case 'settings': return <SettingsApp setWallpaper={setWallpaper} currentWallpaper={currentWallpaper} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} language={language} setLanguage={setLanguage} />;
    default: return null;
  }
};

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [runningApps, setRunningApps] = useState<AppID[]>([]);
  const [activeApp, setActiveApp] = useState<AppID | null>(null);
  const [wallpaperId, setWallpaperId] = useState(WALLPAPERS[0].id);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [language, setLanguage] = useState<LanguageID>('ru');

  const currentWallpaper = WALLPAPERS.find(w => w.id === wallpaperId) || WALLPAPERS[0];

  // Get localized app names
  const getAppName = (id: AppID) => {
    return TRANSLATIONS[language].appName[id] || APPS.find(a => a.id === id)?.name;
  };

  // Add initial notifications
  useEffect(() => {
    setTimeout(() => {
      addNotification({
        id: '1',
        app: 'Settings',
        title: 'Software Update',
        message: 'EblanOS 18.1 is installed and ready.',
        time: 'Now'
      });
    }, 4500); // Delayed to appear after boot
    
    setTimeout(() => {
      addNotification({
        id: '2',
        app: 'Calendar',
        title: 'Meeting with Team',
        message: 'Project discussion at 3:00 PM',
        time: '1h ago'
      });
    }, 6500);
  }, []);

  const addNotification = (notif: NotificationItem) => {
    // Only play sound if not locked and not booting
    if (!isLocked && !isBooting) playSound('tap');
    setNotifications(prev => [notif, ...prev]);
  };

  const toggleDarkMode = () => {
    playSound('toggle');
    setIsDarkMode(!isDarkMode);
  };

  // Launch or Focus App
  const openApp = (id: AppID) => {
    if (!runningApps.includes(id)) {
      playSound('open');
      setRunningApps([...runningApps, id]);
    } else if (activeApp !== id) {
      playSound('open');
    }
    setActiveApp(id);
    setShowSwitcher(false);
    setShowNotifications(false);
  };

  // Close App (Remove from running)
  const closeApp = (id: AppID, e?: React.MouseEvent) => {
    e?.stopPropagation();
    playSound('close');
    setRunningApps(prev => prev.filter(appId => appId !== id));
    if (activeApp === id) {
      setActiveApp(null);
    }
    // If no apps left, close switcher
    if (runningApps.length === 1 && showSwitcher) {
       setShowSwitcher(false);
    }
  };

  // Minimize (Return to Home, keep running)
  const minimizeApp = () => {
    playSound('close');
    setActiveApp(null);
  };

  // Toggle App Switcher
  const toggleSwitcher = () => {
    playSound('open');
    setShowSwitcher(true);
    setActiveApp(null);
    setShowNotifications(false);
  };

  // Toggle Notifications
  const toggleNotifications = () => {
    if (isLocked) return; // Disable notification shade on lock screen
    playSound('open');
    setShowNotifications(!showNotifications);
  };

  const handleUnlock = () => {
    playSound('open');
    setIsLocked(false);
  };

  return (
    <>
      {/* Boot Screen Overlay */}
      {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}

      <div 
        className={`relative w-full h-[100dvh] overflow-hidden bg-cover bg-center transition-all duration-500 ease-in-out ${isDarkMode ? 'dark' : ''}`}
        style={{ backgroundImage: `url(${currentWallpaper.url})` }}
      >
        <StatusBar onToggleNotifications={toggleNotifications} isLocked={isLocked} />
        
        {/* Lock Screen Overlay */}
        {!isBooting && <LockScreen isLocked={isLocked} onUnlock={handleUnlock} />}

        {/* Main App Container */}
        <div className={`w-full h-full transition-all duration-500 ${isLocked ? 'scale-95 opacity-0 pointer-events-none grayscale' : 'scale-100 opacity-100'}`}>
          
          {/* Home Screen Content */}
          <div className={`h-full pt-14 pb-24 px-4 flex flex-col transition-all duration-300 ${activeApp || showSwitcher || showNotifications ? 'scale-90 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}>
            
            {/* App Grid */}
            <div className="grid grid-cols-4 gap-y-8 gap-x-4 mt-4">
              {APPS.map((app) => (
                <button 
                  key={app.id} 
                  onClick={() => openApp(app.id)}
                  className="flex flex-col items-center gap-2 group active:scale-90 transition-transform duration-200"
                >
                  <div className={`${app.iconColor} w-16 h-16 rounded-[16px] shadow-lg flex items-center justify-center overflow-hidden text-white`}>
                    {app.iconComponent}
                  </div>
                  <span className="text-xs font-medium text-white drop-shadow-md tracking-wide">{getAppName(app.id)}</span>
                </button>
              ))}
            </div>

            {/* Dock */}
            <div className={`absolute bottom-6 left-4 right-4 h-24 rounded-[35px] flex items-center justify-around px-4 shadow-2xl border transition-colors duration-300 ${isDarkMode ? 'glass-panel-dark border-white/10' : 'glass-panel border-white/20'}`}>
               {APPS.slice(0, 4).map((app) => (
                 <button 
                  key={'dock-' + app.id}
                  onClick={() => openApp(app.id)}
                  className="flex flex-col items-center justify-center active:scale-90 transition-transform duration-200"
                >
                  <div className={`${app.iconColor} w-14 h-14 rounded-[14px] shadow-lg flex items-center justify-center overflow-hidden text-white`}>
                    {app.iconComponent}
                  </div>
                </button>
               ))}
            </div>
          </div>

          {/* Notification Center Overlay */}
          <div 
            className={`absolute inset-0 z-40 transition-all duration-500 ease-out backdrop-blur-xl bg-black/40 flex flex-col pt-14 px-4 ${showNotifications ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}
            onClick={toggleNotifications}
          >
             <div className="flex justify-between items-center mb-6 px-2">
                <div className="flex flex-col">
                    <h1 className="text-5xl font-thin text-white mb-1">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</h1>
                    <p className="text-lg text-white/80">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
             </div>
             
             <div className="flex-1 overflow-y-auto pb-20 space-y-3">
                {notifications.length === 0 && (
                  <p className="text-center text-white/50 mt-20">No Notifications</p>
                )}
                {notifications.map(n => (
                   <div key={n.id} onClick={(e) => e.stopPropagation()} className="bg-white/20 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                         <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center text-xs text-white font-bold">
                               {n.app[0]}
                            </div>
                            <span className="text-xs font-bold text-white/90 uppercase tracking-wide">{n.app}</span>
                         </div>
                         <span className="text-xs text-white/60">{n.time}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-0.5">{n.title}</h4>
                      <p className="text-sm text-white/90 leading-tight">{n.message}</p>
                   </div>
                ))}
             </div>
             
             {/* Bottom Handle */}
             <div className="absolute bottom-2 left-0 right-0 flex justify-center py-4">
                <div className="w-32 h-1 bg-white/40 rounded-full"></div>
             </div>
          </div>

          {/* Running Apps Layer */}
          {runningApps.map(appId => {
            const isAppActive = activeApp === appId;
            // Determine style based on state
            let wrapperClass = "translate-y-full opacity-0 pointer-events-none scale-95"; // Default hidden state
            
            if (isAppActive) {
                wrapperClass = "translate-y-0 opacity-100 scale-100 pointer-events-auto";
            }

            return (
                <div 
                    key={appId}
                    className={`absolute inset-0 z-40 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${wrapperClass}`}
                >
                   {/* App Window Container */}
                   <div className="flex-1 flex flex-col bg-black overflow-hidden shadow-2xl relative">
                      
                      {/* Actual App Content */}
                      <div className="flex-1 relative overflow-hidden bg-white dark:bg-black pt-12">
                        {/* Top Safe Area / Handle for dragging (visual only) */}
                        <div className="absolute top-0 left-0 right-0 h-8 z-20 flex justify-center pt-2 pointer-events-none">
                           <div className="w-12 h-1.5 bg-black/10 dark:bg-white/10 rounded-full backdrop-blur-sm"></div>
                        </div>
                        <AppContent 
                            id={appId} 
                            setWallpaper={(id) => { playSound('tap'); setWallpaperId(id); }} 
                            currentWallpaper={wallpaperId}
                            isDarkMode={isDarkMode}
                            toggleDarkMode={toggleDarkMode}
                            language={language}
                            setLanguage={setLanguage}
                        />
                      </div>

                      {/* Android-style Bottom Navigation Bar */}
                      <div className="h-14 bg-black text-white flex items-center justify-evenly shrink-0 z-50 pb-3 pt-1 px-4 border-t border-white/10">
                         {/* Multitask (Grid/Square) */}
                         <button 
                            onClick={toggleSwitcher} 
                            className="p-4 active:opacity-50 transition-opacity flex flex-col items-center justify-center"
                            title="Multitask"
                         >
                             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <rect x="4" y="4" width="16" height="16" rx="2" />
                             </svg>
                         </button>

                         {/* Home / Minimize (Circle) */}
                         <button 
                            onClick={minimizeApp} 
                            className="p-4 active:opacity-50 transition-opacity flex flex-col items-center justify-center"
                            title="Minimize"
                         >
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                               <circle cx="12" cy="12" r="8" />
                            </svg>
                         </button>

                         {/* Close (X) */}
                         <button 
                            onClick={(e) => closeApp(appId, e)} 
                            className="p-4 active:opacity-50 transition-opacity flex flex-col items-center justify-center text-gray-300 hover:text-red-400"
                            title="Close App"
                         >
                            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                         </button>
                      </div>
                   </div>
                </div>
            );
          })}

          {/* App Switcher Overlay */}
          {showSwitcher && (
            <div 
                className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-center gap-6 overflow-x-auto px-8 py-20 snap-x animate-in fade-in duration-200"
                onClick={() => { playSound('close'); setShowSwitcher(false); }}
            >
               {runningApps.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xl font-medium pointer-events-none">
                    No apps running
                  </div>
               )}
               
               {runningApps.map(appId => {
                 const appDef = APPS.find(a => a.id === appId);
                 return (
                   <div 
                     key={appId} 
                     onClick={(e) => { e.stopPropagation(); openApp(appId); }}
                     className="min-w-[260px] w-[260px] h-[480px] bg-gray-50 dark:bg-[#1c1c1e] rounded-[32px] relative shadow-2xl border border-white/10 flex flex-col items-center justify-center gap-6 cursor-pointer transition-all hover:scale-105 hover:border-white/30 snap-center group"
                   >
                      {/* App Header Preview */}
                      <div className="absolute top-4 left-0 right-0 flex justify-center">
                          <span className="text-xs text-gray-500 dark:text-white/40 font-medium">{getAppName(appId)}</span>
                      </div>

                      {/* App Icon Large */}
                      <div className={`${appDef?.iconColor} w-24 h-24 rounded-[24px] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        {appDef?.iconComponent}
                      </div>
                      
                      <span className="text-gray-900 dark:text-white font-semibold text-xl tracking-wide">{getAppName(appId)}</span>
                      
                      {/* Close Button in Switcher */}
                      <button 
                        onClick={(e) => closeApp(appId, e)}
                        className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 rounded-full text-white flex items-center justify-center shadow-lg hover:bg-red-600 hover:scale-110 transition-all z-20"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                   </div>
                 )
               })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;