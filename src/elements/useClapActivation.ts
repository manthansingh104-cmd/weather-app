import { useEffect, useRef } from "react";

const THRESHOLD = 0.35;
const COOLDOWN_MS = 1200;

export function useClapActivation(onClap: () => void, enabled: boolean) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | undefined>(undefined); 
  const lastClapRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;

        const AudioContextClass =
          window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContextClass();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.2;
        source.connect(analyser);

        const data = new Uint8Array(analyser.frequencyBinCount);

        function tick() {
          analyser.getByteTimeDomainData(data);

          let peak = 0;
          for (let i = 0; i < data.length; i++) {
            const deviation = Math.abs(data[i] - 128) / 128;
            if (deviation > peak) peak = deviation;
          }

          const now = Date.now();
          if (peak > THRESHOLD && now - lastClapRef.current > COOLDOWN_MS) {
            lastClapRef.current = now;
            onClap();
          }

          rafRef.current = requestAnimationFrame(tick);
        }

        tick();
      } catch (err) {
        console.error("Clap detection: microphone access failed", err);
      }
    }

    start();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      audioContextRef.current?.close();
      streamRef.current = null;
      audioContextRef.current = null;
    };
  }, [enabled, onClap]);
}