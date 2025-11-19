
// Simple Procedural Sound Synthesis using Web Audio API
// Re-tuned to mimic iOS 18 style "organic" and "haptic" audio cues

const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

export const playSound = (type: 'tap' | 'open' | 'close' | 'keyboard' | 'toggle' | 'lock' | 'startup') => {
  try {
    const ctx = initAudio();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'tap') {
      // iOS Navigation Click: High pitched, extremely short, almost wood-block like
      osc.type = 'sine';
      // Quick pitch drop for "pop" effect
      osc.frequency.setValueAtTime(800, t); 
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.03);
      
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      
      osc.start(t);
      osc.stop(t + 0.04);
    } 
    else if (type === 'toggle') {
      // iOS Toggle: Cleaner, slightly hollow click
      osc.type = 'triangle'; // Triangle gives it that "plastic" switch sound
      osc.frequency.setValueAtTime(600, t);
      
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      
      osc.start(t);
      osc.stop(t + 0.1);
    }
    else if (type === 'open') {
      // iOS App Launch: Very subtle "air displacement" or "zoom"
      // Not a sci-fi swoosh, but a low frequency push
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.linearRampToValueAtTime(300, t + 0.2);
      
      gain.gain.setValueAtTime(0.0, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.05);
      gain.gain.linearRampToValueAtTime(0.0, t + 0.2);
      
      osc.start(t);
      osc.stop(t + 0.25);
    } 
    else if (type === 'close') {
      // iOS App Close: Quick implosion/dampening
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.15);
      
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      
      osc.start(t);
      osc.stop(t + 0.15);
    }
    else if (type === 'keyboard') {
      // iOS Keyboard: Distinctive "pop" / "tock"
      // Needs to be sharp but with body
      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(500, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);
      
      // Filter to remove harshness, making it sound like a physical key
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1500, t);
      filter.frequency.exponentialRampToValueAtTime(100, t + 0.05);
      
      osc.disconnect();
      osc.connect(filter);
      filter.connect(gain);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      
      osc.start(t);
      osc.stop(t + 0.06);
    }
    else if (type === 'lock') {
      // iOS Lock Sound: Mechanical "click-lock"
      osc.type = 'square'; 
      osc.frequency.setValueAtTime(200, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);
      
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      
      osc.start(t);
      osc.stop(t + 0.06);
    }
    else if (type === 'startup') {
      // Elegant Startup Chime (Major Chord)
      const freqs = [220, 330, 440, 554.37]; // A3, E4, A4, C#5
      const duration = 2.5;
      
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = f;
        
        osc.connect(g);
        g.connect(ctx.destination);
        
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.03, t + 0.1);
        g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
        
        osc.start(t);
        osc.stop(t + duration);
      });
    }

  } catch (e) {
    // Silently fail if audio context is not available or blocked
  }
};