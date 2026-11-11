// Hudba: hrá sa súbor music/<id>.mp3 (tvoj vlastný má prednosť) alebo music/<id>.m4a.
// Ak žiadny nie je, zahrá sa vstavaná skladbička (klavír alebo gitara).
// Priložené skladby: Kevin MacLeod (incompetech.com), licencia CC BY 4.0.

// Motívy: prog = akordy po taktoch (stupne stupnice), mel = melódia po osminách (null = pauza)
const _ = null;
const THEMES = {
  warm: {
    steps: 8, prog: [0, 4, 5, 3, 0, 4, 3, 0],
    mel: [[2, _, 4, _, 7, _, 6, 5], [4, _, _, _, 1, _, 4, _], [5, _, 7, _, 9, _, 8, 7], [7, _, _, 5, _, _, _, _],
      [2, _, 4, _, 7, _, 8, 9], [8, _, _, 6, _, 4, _, _], [7, _, 5, _, 3, _, 5, _], [4, _, _, _, _, _, _, _]],
  },
  play: {
    steps: 8, prog: [0, 3, 4, 0, 0, 3, 4, 0],
    mel: [[0, 2, 4, 2, 7, _, 4, _], [3, 5, 7, 5, 10, _, 7, _], [4, 6, 8, 6, 11, _, 8, _], [9, 8, 7, _, 4, _, 7, _],
      [0, 2, 4, 2, 7, _, 9, _], [10, _, 9, _, 7, _, 5, _], [8, _, 6, _, 4, _, 6, _], [7, _, _, _, _, _, _, _]],
  },
  waltz: {
    steps: 6, prog: [0, 5, 1, 4, 0, 5, 4, 0],
    mel: [[4, _, _, _, 7, _], [9, _, _, _, 7, _], [8, _, _, _, 5, _], [6, _, _, _, _, _],
      [4, _, _, _, 7, _], [9, _, _, _, 11, _], [10, _, 8, _, 6, _], [7, _, _, _, _, _]],
  },
  jazz: {
    steps: 8, prog: [1, 4, 0, 5, 1, 4, 0, 0], swing: 0.3,
    mel: [[5, _, 7, 8, _, 7, 5, _], [6, _, 8, _, 10, 8, _, 6], [7, _, _, 4, _, _, 2, _], [5, _, 4, _, 2, _, _, _],
      [3, 5, 7, _, 8, _, 7, _], [6, _, _, 8, _, 6, 4, _], [2, _, 4, _, 7, _, _, _], [_, _, _, _, _, _, _, _]],
  },
  summer: {
    steps: 8, prog: [0, 5, 3, 4, 0, 5, 3, 4], swing: 0.1,
    mel: [[4, _, 2, 4, _, 7, _, _], [5, _, 4, 5, _, 7, _, _], [5, _, 7, _, 10, _, 9, _], [8, _, _, 6, _, 4, _, _],
      [4, _, 2, 4, _, 7, _, _], [9, _, 7, 9, _, 12, _, _], [10, _, 9, _, 7, _, 5, _], [8, _, 6, _, 4, _, _, _]],
  },
};
// ktorá scéna hrá čo: [motív, nástroj, tempo, základný tón]
const TRACKS = {
  mapa: ['warm', 'piano', 76, 60], stanica: ['warm', 'piano', 68, 57], ruze: ['warm', 'piano', 74, 65],
  bombonik: ['play', 'guitar', 100, 55], tatry: ['play', 'piano', 96, 62], motokary: ['play', 'guitar', 124, 52],
  korcule: ['play', 'guitar', 114, 60], narodky: ['play', 'piano', 106, 65], tokaj: ['summer', 'guitar', 96, 57],
  polignano: ['waltz', 'guitar', 132, 55], jaskyne: ['warm', 'guitar', 66, 62], stuzkova: ['waltz', 'piano', 132, 58],
  gelnica: ['waltz', 'piano', 122, 60], budapest: ['warm', 'piano', 72, 63], jazz: ['jazz', 'piano', 112, 58],
  praha: ['summer', 'piano', 100, 55], holandsko: ['play', 'guitar', 104, 62], alghero: ['summer', 'guitar', 108, 57],
  lod: ['warm', 'guitar', 70, 64],
};
const MAJOR = [0, 2, 4, 5, 7, 9, 11];
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

class Music {
  constructor() {
    this.ctx = null; this.muted = false; this.timer = null; this.cur = null;
    this.el = new Audio(); this.el.loop = true; this.el.preload = 'auto';
    this.fileOK = new Map();
  }
  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const c = this.ctx = new AC();
      this.master = c.createGain(); this.master.gain.value = 0;
      this.bus = c.createGain();
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 4200; lp.Q.value = 0.3;
      // jemný dozvuk miestnosti
      const len = Math.floor(c.sampleRate * 1.7), ir = c.createBuffer(2, len, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2); }
      const rev = c.createConvolver(); rev.buffer = ir;
      const wet = c.createGain(); wet.gain.value = 0.2;
      this.bus.connect(lp); lp.connect(this.master); lp.connect(rev); rev.connect(wet); wet.connect(this.master);
      this.master.connect(c.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    if (!this.blessed) { // iOS: prvé prehratie musí byť priamo z ťuknutia
      this.blessed = true;
      this.el.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
      this.el.play().then(() => this.el.pause()).catch(() => {});
    }
  }
  setMuted(m) {
    this.muted = m; this.el.muted = m;
    if (this.ctx) this.master.gain.setTargetAtTime(m || this.usingFile ? 0 : 0.55, this.ctx.currentTime, 0.2);
  }
  play(id) {
    if (this.cur === id) return;
    this.cur = id; this.stopSynth(); this.el.pause(); this.usingFile = false;
    const known = this.fileOK.get(id);
    if (known === false) return this.startSynth(id);
    const urls = [`music/${id}.mp3`, `music/${id}.m4a`];
    const tryFile = (url) => {
      this.el.onerror = () => { this.fileOK.set(id, false); if (this.cur === id) this.startSynth(id); };
      this.el.oncanplay = () => {
        this.el.oncanplay = null; this.fileOK.set(id, url);
        if (this.cur !== id) return;
        this.usingFile = true; this.el.volume = 0.6; this.el.muted = this.muted;
        this.el.play().catch(() => {});
      };
      this.el.src = url; this.el.load();
    };
    if (known) return tryFile(known);
    const probe = (i) => {
      if (i >= urls.length) { this.fileOK.set(id, false); if (this.cur === id) this.startSynth(id); return; }
      fetch(urls[i], { method: 'HEAD' }).then(r => {
        const ty = r.headers.get('content-type') || '';
        if (r.ok && (ty.includes('audio') || ty.includes('mp4') || ty.includes('octet'))) { if (this.cur === id) tryFile(urls[i]); }
        else probe(i + 1);
      }).catch(() => probe(i + 1));
    };
    probe(0);
  }
  stopSynth() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    if (this.ctx) this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.12);
  }
  startSynth(id) {
    if (!this.ctx) return;
    const [themeName, inst, bpm, root] = TRACKS[id] || TRACKS.mapa;
    const th = THEMES[themeName];
    const deg = (n) => root + MAJOR[((n % 7) + 7) % 7] + 12 * Math.floor(n / 7);
    const steps = th.steps, stepDur = 60 / bpm / 2, bars = th.prog.length;
    const isJazz = themeName === 'jazz', isWaltz = themeName === 'waltz';
    let step = 0, next = this.ctx.currentTime + 0.3;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setTargetAtTime(this.muted ? 0 : 0.55, this.ctx.currentTime + 0.2, 0.6);
    const lead = isJazz ? 'ep' : inst;
    const tick = () => {
      while (next < this.ctx.currentTime + 0.25) {
        const s = step % steps, b = Math.floor(step / steps) % bars, d = th.prog[b];
        const t = next + (s % 2 === 1 ? (th.swing || 0) * stepDur : 0);
        const ch = [deg(d), deg(d + 2), deg(d + 4)];
        const soft = 0.9 + Math.sin(step * 1.7) * 0.1;
        if (isJazz) {
          if (s % 2 === 0) this.voice('bass', [deg(d), deg(d + 2), deg(d + 4), deg(d + 5)][s / 2] - 24, t, stepDur * 1.9, 0.3);
          if (s % 2 === 0) this.noise(t, 0.06, 0.02); if (s === 3 || s === 7) this.noise(t, 0.04, 0.014);
          if (s === 3 || s === 6) [...ch, deg(d + 6)].forEach((n, i) => this.voice('ep', n - 12, t + i * 0.008, stepDur * 1.6, 0.05));
        } else if (isWaltz) {
          if (s === 0) this.voice('bass', ch[0] - 24, t, stepDur * 2.4, 0.3);
          if (s === 2 || s === 4) ch.forEach((n, i) => this.voice(inst, n - 12, t + i * 0.012, stepDur * 1.4, 0.055 * soft));
        } else if (inst === 'piano') {
          if (s === 0) this.voice('bass', ch[0] - 24, t, stepDur * 4, 0.24);
          const arp = [ch[0] - 12, ch[2] - 12, ch[0], ch[1], ch[2] - 12, ch[0], ch[1], ch[0]][s];
          this.voice('piano', arp, t, stepDur * 2.2, 0.06 * soft);
        } else {
          if (s === 0 || s === 4) this.voice('bass', (s === 4 ? ch[2] : ch[0]) - 24, t, stepDur * 2.2, 0.26);
          if (s === 2 || s === 3 || s === 6 || s === 7) ch.forEach((n, i) => this.voice('guitar', n - 12, t + i * 0.014, stepDur * 1.2, (s % 2 ? 0.04 : 0.055) * soft));
        }
        const m = th.mel[b][s];
        if (m != null) {
          let hold = 1; while (s + hold < steps && th.mel[b][s + hold] == null && hold < 4) hold++;
          this.voice(lead, deg(m), t, stepDur * (hold + 0.6), (lead === 'guitar' ? 0.2 : 0.17) * soft);
        }
        next += stepDur; step++;
      }
    };
    tick();
    this.timer = setInterval(tick, 80);
  }
  voice(kind, midi, t, dur, vol) {
    const c = this.ctx, f = hz(midi);
    const g = c.createGain(); let out = g;
    const osc = (type, freq, v = 1) => {
      const o = c.createOscillator(); o.type = type; o.frequency.value = freq;
      if (v === 1) o.connect(g); else { const gg = c.createGain(); gg.gain.value = v; o.connect(gg); gg.connect(g); }
      o.start(t); o.stop(t + dur + 1.6); return o;
    };
    const G = g.gain;
    if (kind === 'piano') {
      osc('triangle', f); osc('triangle', f * 1.0025, 0.5); osc('sine', f * 2, 0.3); osc('sine', f * 3, 0.1);
      G.setValueAtTime(0.0001, t); G.linearRampToValueAtTime(vol, t + 0.006);
      G.exponentialRampToValueAtTime(vol * 0.38, t + 0.28); G.exponentialRampToValueAtTime(0.0001, t + Math.max(dur, 0.9) + 1.0);
    } else if (kind === 'guitar') {
      osc('sawtooth', f, 0.55); osc('triangle', f, 0.7);
      const flt = c.createBiquadFilter(); flt.type = 'lowpass'; flt.Q.value = 1.2;
      flt.frequency.setValueAtTime(Math.min(5200, f * 7), t); flt.frequency.exponentialRampToValueAtTime(Math.max(300, f * 1.6), t + 0.35);
      g.connect(flt); out = flt;
      G.setValueAtTime(0.0001, t); G.linearRampToValueAtTime(vol, t + 0.004);
      G.exponentialRampToValueAtTime(vol * 0.3, t + 0.3); G.exponentialRampToValueAtTime(0.0001, t + Math.max(dur, 0.6) + 0.7);
    } else if (kind === 'ep') {
      osc('sine', f); osc('sine', f * 2, 0.22); osc('triangle', f, 0.25);
      G.setValueAtTime(0.0001, t); G.linearRampToValueAtTime(vol, t + 0.012);
      G.exponentialRampToValueAtTime(vol * 0.45, t + 0.35); G.exponentialRampToValueAtTime(0.0001, t + Math.max(dur, 0.7) + 0.6);
    } else { // bass
      osc('sine', f); osc('triangle', f, 0.35);
      G.setValueAtTime(0.0001, t); G.linearRampToValueAtTime(vol, t + 0.015);
      G.exponentialRampToValueAtTime(vol * 0.5, t + 0.3); G.exponentialRampToValueAtTime(0.0001, t + Math.max(dur, 0.5) + 0.3);
    }
    out.connect(this.bus);
  }
  noise(t, dur, vol) {
    const c = this.ctx;
    if (!this.nbuf) {
      this.nbuf = c.createBuffer(1, c.sampleRate * 0.2, c.sampleRate);
      const d = this.nbuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const s = c.createBufferSource(); s.buffer = this.nbuf;
    const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 6500;
    const g = c.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(hp); hp.connect(g); g.connect(this.master); s.start(t); s.stop(t + dur + 0.02);
  }
  chime() { // zvuk pri nájdení srdiečka
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    if (this.master.gain.value < 0.05) { this.master.gain.cancelScheduledValues(t); this.master.gain.setValueAtTime(0.55, t); if (this.usingFile) this.master.gain.setTargetAtTime(0, t + 1.5, 0.2); }
    [72, 76, 79, 84].forEach((n, i) => this.voice('piano', n, t + i * 0.09, 0.8, 0.14));
  }
}
export const music = new Music();
