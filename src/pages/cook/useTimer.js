import { useCallback, useEffect, useRef, useState } from 'react';

const playAlarm = (context) => {
  if (!context) return;
  context.resume();
  // Three short beeps.
  [0, 0.4, 0.8].forEach((offset) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.25, context.currentTime + offset);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + offset + 0.3);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime + offset);
    oscillator.stop(context.currentTime + offset + 0.3);
  });
};

/** A single countdown timer that beeps and vibrates when it finishes. */
const useTimer = () => {
  const [timer, setTimer] = useState(null); // { minutes, endsAt }
  const [now, setNow] = useState(Date.now());
  const [finished, setFinished] = useState(false);
  const audioRef = useRef(null);

  const remaining = timer ? Math.max(0, Math.ceil((timer.endsAt - now) / 1000)) : 0;

  useEffect(() => {
    if (!timer) return undefined;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (!timer || remaining > 0) return;
    setTimer(null);
    setFinished(true);
    playAlarm(audioRef.current);
    navigator.vibrate?.([300, 150, 300, 150, 300]);
  }, [timer, remaining]);

  const start = useCallback((minutes) => {
    // Audio may only start after a user gesture, so create it on click.
    try {
      audioRef.current ||= new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      audioRef.current = null;
    }
    setFinished(false);
    setNow(Date.now());
    setTimer({ minutes, endsAt: Date.now() + minutes * 60 * 1000 });
  }, []);

  const cancel = useCallback(() => setTimer(null), []);
  const dismiss = useCallback(() => setFinished(false), []);

  return { timer, remaining, finished, start, cancel, dismiss };
};

export const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = String(seconds % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
};

export default useTimer;
