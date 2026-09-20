let ctx: AudioContext | null = null;
let wind: OscillatorNode | null = null;
let gain: GainNode | null = null;

function ensure() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
  }
  return ctx;
}

export async function setGardenAudio(on: boolean) {
  const audio = ensure();
  if (!audio) return;
  if (!on) {
    gain?.gain.setTargetAtTime(0, audio.currentTime, 0.2);
    return;
  }
  if (audio.state === "suspended") await audio.resume();
  if (!wind) {
    const osc = audio.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = 110;
    const g = audio.createGain();
    g.gain.value = 0;
    const filter = audio.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    osc.connect(filter);
    filter.connect(g);
    g.connect(audio.destination);
    osc.start();
    wind = osc;
    gain = g;
  }
  gain?.gain.setTargetAtTime(0.015, audio.currentTime, 0.4);
}

export function chimeUnlock() {
  const audio = ensure();
  if (!audio || !gain || gain.gain.value <= 0.001) return;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.frequency.value = 784;
  osc.type = "sine";
  g.gain.value = 0.04;
  osc.connect(g);
  g.connect(audio.destination);
  osc.start();
  g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.8);
  osc.stop(audio.currentTime + 0.85);
}
