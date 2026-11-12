import * as THREE from 'three';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { MOMENTS, NICKS, LETTER } from './moments.js';
import { SCENES } from './scenes/index.js';
import { buildMap, MAP_ENV, MAP_CAM } from './map.js';
import { music } from './audio.js';
import { heart, M, waterNormal } from './kit.js';

const $ = (id) => document.getElementById(id);
const KEY = 'nas-svet-v1';
// prezývky, ktoré zámok neprijme (hľadá sa aj vo vnútri slova, bez diakritiky)
const UGLY = ['krava', 'svina', 'hlup', 'sprost', 'debil', 'idiot', 'kreten', 'blb', 'tupa', 'tupan', 'tlst', 'skared', 'hnus', 'odporn', 'oskliv', 'kurv', 'pica', 'pice', 'picka', 'jeb', 'kokot', 'curak', 'cubka', 'suka', 'stetk', 'pobehl', 'flandr', 'mrcha', 'potvor', 'besti', 'striga', 'carodejnic', 'ropuch', 'hovn', 'srac', 'zmrd', 'chuj', 'dement', 'magor', 'luzer', 'truba', 'trubk', 'trdlo', 'sliepk', 'koza', 'osol', 'somar', 'bitch', 'fuck', 'ugly', 'stupid', 'whore', 'slut'];

// ---------- uložený stav ----------
let state = { unlocked: false, nick: '', visited: [], hearts: [], muted: false, letterSeen: false };
try { state = { ...state, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { /* nič */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* nič */ } };

// ---------- three.js ----------
const canvas = $('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 1, 0.3, 600);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; controls.dampingFactor = 0.08; controls.rotateSpeed = 0.7; controls.zoomSpeed = 0.9;

const hemi = new THREE.HemisphereLight(0xffffff, 0xffc0d8, 2);
const sun = new THREE.DirectionalLight(0xffffff, 2.5);
sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.radius = 5;
Object.assign(sun.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14, near: 1, far: 80 });
sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.04;
scene.add(hemi, sun, sun.target);

// obloha ako prechod farieb
const skyC = document.createElement('canvas'); skyC.width = 4; skyC.height = 256;
const skyT = new THREE.CanvasTexture(skyC); skyT.colorSpace = THREE.SRGBColorSpace;
scene.background = skyT;
function setSky(top, bottom) {
  const x = skyC.getContext('2d'); const gr = x.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, top); gr.addColorStop(0.75, bottom); gr.addColorStop(1, bottom);
  x.fillStyle = gr; x.fillRect(0, 0, 4, 256); skyT.needsUpdate = true;
}

const pmrem = new THREE.PMREMGenerator(renderer);
const envScene = new THREE.Scene();
const envSky = new THREE.Mesh(new THREE.SphereGeometry(50, 24, 16), new THREE.MeshBasicMaterial({ map: skyT, side: THREE.BackSide }));
envScene.add(envSky);
let envRT = null;

// hviezdy
const stars = (() => {
  const n = 500, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, e = Math.random() * 1.3 + 0.12, r = 180;
    pos[i * 3] = Math.cos(a) * Math.cos(e) * r; pos[i * 3 + 1] = Math.sin(e) * r; pos[i * 3 + 2] = Math.sin(a) * Math.cos(e) * r;
  }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const p = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: true, fog: false, transparent: true, opacity: 0.9 }));
  p.visible = false; scene.add(p); return p;
})();

// častice: sneh, dážď, lupienky, svetlušky, srdiečka
const FX = {
  snow: { color: '#ffffff', size: 0.16, vy: -1.1, sway: 0.5, n: 420, opacity: 0.95 },
  rain: { color: '#bcd7ff', size: 0.07, vy: -9, sway: 0, n: 520, opacity: 0.7 },
  petals: { color: '#ffb7d3', size: 0.17, vy: -0.6, sway: 0.9, n: 160, opacity: 0.95 },
  fireflies: { color: '#fff3a0', size: 0.2, vy: 0.12, sway: 0.8, n: 70, opacity: 0.9, add: true },
  sparkle: { color: '#ffffff', size: 0.14, vy: 0.2, sway: 0.5, n: 140, opacity: 0.85, add: true },
  hearts: { color: '#ff8fb8', size: 0.24, vy: 0.5, sway: 0.6, n: 60, opacity: 0.9 },
};
const dot = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, '#fff'); g.addColorStop(0.5, '#fff'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
})();
const PN = 520, pPos = new Float32Array(PN * 3), pSeed = new Float32Array(PN);
for (let i = 0; i < PN; i++) { pPos[i * 3] = (Math.random() - 0.5) * 22; pPos[i * 3 + 1] = Math.random() * 12; pPos[i * 3 + 2] = (Math.random() - 0.5) * 22; pSeed[i] = Math.random() * 100; }
const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
const pMat = new THREE.PointsMaterial({ map: dot, transparent: true, depthWrite: false, size: 0.15, sizeAttenuation: true });
const particles = new THREE.Points(pGeo, pMat); particles.frustumCulled = false; particles.visible = false; scene.add(particles);
let fx = null;
function setFx(name) {
  fx = FX[name] || null; particles.visible = !!fx; if (!fx) return;
  pMat.color.set(fx.color); pMat.size = fx.size; pMat.opacity = fx.opacity;
  pMat.blending = fx.add ? THREE.AdditiveBlending : THREE.NormalBlending; pMat.needsUpdate = true;
  pGeo.setDrawRange(0, fx.n);
}
function updateFx(t, dt) {
  if (!fx) return;
  for (let i = 0; i < fx.n; i++) {
    const s = pSeed[i];
    pPos[i * 3] += Math.sin(t * 0.9 + s) * fx.sway * dt;
    pPos[i * 3 + 2] += Math.cos(t * 0.7 + s * 1.3) * fx.sway * dt;
    let y = pPos[i * 3 + 1] + fx.vy * (0.7 + (s % 1) * 0.6) * dt;
    if (y < 0) y += 12; if (y > 12) y -= 12;
    pPos[i * 3 + 1] = y;
  }
  pGeo.attributes.position.needsUpdate = true;
}

function applyEnv(e) {
  setSky(e.sky[0], e.sky[1]);
  scene.fog = e.fog ? new THREE.Fog(e.fog[0], e.fog[1], e.fog[2]) : null;
  sun.color.set(e.sun[0]); sun.intensity = e.sun[1]; sun.position.set(...e.sun[2]); sun.target.position.set(0, 0, 0);
  sun.castShadow = e.shadows !== false;
  hemi.color.set(e.hemi[0]); hemi.groundColor.set(e.hemi[1]); hemi.intensity = e.hemi[2] * 0.72;
  stars.visible = !!e.stars;
  setFx(e.fx);
  // okolité svetlo a odlesky podľa farieb oblohy
  envSky.material.map.needsUpdate = true;
  const rt = pmrem.fromScene(envScene, 0.03);
  if (envRT) envRT.dispose();
  envRT = rt; scene.environment = rt.texture;
}

// ---------- mapa a scény ----------
let mode = 'map', current = null, mapCam = null;
const built = {};
const total = MOMENTS.length;
const byId = Object.fromEntries(MOMENTS.map(m => [m.id, m]));

const map = buildMap({ onLetter });
scene.add(map.group);
MOMENTS.forEach(m => map.mark(m.id, state.visited.includes(m.id), state.hearts.includes(m.id)));

function buildScene(id) {
  if (built[id]) return built[id];
  const def = SCENES[id];
  const g = new THREE.Group(); const updates = [];
  const ctx = {
    g,
    anim: (fn) => updates.push(fn),
    tap: (obj, say, h) => { obj.userData.tap = say; if (h != null) obj.userData.tapH = h; return obj; },
    secret: (pos, size = 0.3) => {
      if (state.hearts.includes(id)) return;
      const hg = new THREE.Group(); hg.position.set(...pos); g.add(hg);
      const h = heart(hg, size, M('#ff3f86', { emissive: '#ff3f86', emissiveIntensity: 0.55 }));
      h.castShadow = false;
      const hit = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
      hg.add(hit);
      updates.push(t => { h.rotation.y = t * 1.6; h.position.y = Math.sin(t * 2.2) * 0.06; });
      hg.userData.tap = () => collect(id, hg); hg.userData.secret = true;
    },
  };
  def.build(ctx);
  return (built[id] = { g, updates, def });
}

function collect(id, hg) {
  if (state.hearts.includes(id)) return;
  state.hearts.push(id); save();
  hg.userData.tap = null;
  const t0 = performance.now();
  const pop = () => {
    const k = (performance.now() - t0) / 450;
    if (k >= 1) { hg.parent && hg.parent.remove(hg); return; }
    hg.scale.setScalar(1 + k * 2.2); hg.position.y += 0.03; hg.rotation.y += 0.3;
    requestAnimationFrame(pop);
  };
  pop();
  music.chime();
  map.mark(id, true, true);
  refreshHud();
  const n = state.hearts.length;
  toast(n === total ? 'Máš všetky srdiečka! 💗' : `Našla si srdiečko! 💗 ${n}/${total}`);
  if (n === total) setTimeout(startFinale, 2200);
  if (current === id) $('p-hint').textContent = 'Srdiečko z tejto spomienky už máš 💗';
}

function setControls(scn) {
  if (scn) {
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    controls.screenSpacePanning = true;
    controls.minDistance = 2.5; controls.maxDistance = 46; controls.minPolarAngle = 0.15; controls.maxPolarAngle = 1.52;
    controls.autoRotate = true; controls.autoRotateSpeed = 0.3;
  } else {
    controls.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_ROTATE };
    controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE };
    controls.screenSpacePanning = false;
    controls.minDistance = 16; controls.maxDistance = 150; controls.minPolarAngle = 0.2; controls.maxPolarAngle = 1.18;
    controls.autoRotate = false;
  }
}
controls.addEventListener('start', () => { controls.autoRotate = false; hideHint(); });

let tween = null;
function flyTo(pos, target, dur = 1.4) {
  const p0 = camera.position.clone(), t0 = controls.target.clone();
  const p1 = new THREE.Vector3(...pos), t1 = new THREE.Vector3(...target);
  const start = performance.now();
  controls.enabled = false;
  tween = () => {
    let k = Math.min(1, (performance.now() - start) / (dur * 1000));
    k = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    camera.position.lerpVectors(p0, p1, k); controls.target.lerpVectors(t0, t1, k);
    if (k >= 1) { tween = null; controls.enabled = true; }
  };
}

const mapHome = () => { const f = innerWidth < innerHeight ? 1.45 : 1; return { pos: MAP_CAM.pos.map(v => v * f), target: MAP_CAM.target }; };
const fade = $('fade');
function through(fn) {
  fade.classList.add('on');
  setTimeout(() => { fn(); requestAnimationFrame(() => setTimeout(() => fade.classList.remove('on'), 120)); }, 380);
}

function enterScene(id) {
  if (!SCENES[id] || tween) return;
  hideBubble(); closeSheet(); hideHint();
  through(() => {
    if (mode === 'map') mapCam = { pos: camera.position.toArray(), target: controls.target.toArray() };
    if (current && built[current]) scene.remove(built[current].g);
    map.group.visible = false;
    const s = buildScene(id);
    scene.add(s.g);
    mode = 'scene'; current = id;
    applyEnv(s.def.env);
    setControls(true);
    const cam = s.def.cam || {};
    const narrow = innerWidth < 760, tg = [...(cam.target || [0, 1.4, 0])], p0 = cam.pos || [0, 6.5, 15];
    const base = Math.hypot(p0[0] - tg[0], p0[1] - tg[1], p0[2] - tg[2]);
    const f = Math.max(1, 3.9 / (Math.tan(camera.fov * Math.PI / 360) * camera.aspect) / base);
    const pos = [tg[0] + (p0[0] - tg[0]) * f, tg[1] + (p0[1] - tg[1]) * f, tg[2] + (p0[2] - tg[2]) * f];
    if (narrow) { tg[1] -= 1.6; pos[1] -= 0.6; }
    controls.target.set(...tg);
    camera.position.set(tg[0] + (pos[0] - tg[0]) * 1.5, tg[1] + (pos[1] - tg[1]) * 1.5, tg[2] + (pos[2] - tg[2]) * 1.5);
    flyTo(pos, tg, 2.2);
    if (!state.visited.includes(id)) { state.visited.push(id); save(); }
    map.mark(id, true, state.hearts.includes(id));
    showPanel(id);
    music.play(id);
    $('back').hidden = false; $('brand').hidden = true;
    refreshHud();
  });
}
function exitScene() {
  if (mode !== 'scene' || tween) return;
  hideBubble();
  through(() => {
    if (current && built[current]) scene.remove(built[current].g);
    current = null; mode = 'map';
    map.group.visible = true;
    applyEnv(MAP_ENV); setControls(false);
    const c = mapCam || mapHome();
    camera.position.set(...c.pos); controls.target.set(...c.target);
    $('panel').hidden = true; $('back').hidden = true; $('brand').hidden = false;
    music.play('mapa');
    refreshHud();
  });
}

// ---------- kartička spomienky ----------
function showPanel(id) {
  const m = byId[id];
  $('p-emoji').textContent = m.emoji;
  $('p-title').textContent = m.title;
  $('p-meta').textContent = [m.place, m.when].filter(Boolean).join(' · ');
  $('p-text').textContent = m.text;
  const ph = $('p-photos'); ph.innerHTML = '';
  (m.photos || []).forEach(src => {
    const im = new Image(); im.src = src; im.loading = 'lazy'; im.alt = m.title;
    im.style.setProperty('--r', (Math.random() * 6 - 3).toFixed(1) + 'deg');
    im.onclick = () => { $('lightbox-img').src = src; $('lightbox').hidden = false; };
    im.onerror = () => im.remove();
    ph.appendChild(im);
  });
  ph.hidden = !(m.photos || []).length;
  $('p-hint').textContent = state.hearts.includes(id) ? 'Srdiečko z tejto spomienky už máš 💗' : 'Ťukni na nás aj na veci okolo. Niekde tu je schované srdiečko 💗';
  const p = $('panel'); p.hidden = false; p.classList.remove('min');
  p.scrollTop = 0;
}
$('p-toggle').onclick = () => $('panel').classList.toggle('min');
$('lightbox').onclick = () => { $('lightbox').hidden = true; };
$('back').onclick = exitScene;

// ---------- bublina, toast, nápoveď ----------
const bubble = $('bubble'); let bubbleAt = null, bubbleTimer = 0;
const sayIdx = new WeakMap();
function showBubble(text, worldPos) {
  bubble.textContent = text; bubble.hidden = false; bubbleAt = worldPos.clone();
  bubble.classList.remove('pop'); void bubble.offsetWidth; bubble.classList.add('pop');
  clearTimeout(bubbleTimer); bubbleTimer = setTimeout(hideBubble, 3600);
  placeBubble();
}
function hideBubble() { bubble.hidden = true; bubbleAt = null; }
const v3 = new THREE.Vector3();
function placeBubble() {
  if (!bubbleAt) return;
  v3.copy(bubbleAt).project(camera);
  const x = (v3.x * 0.5 + 0.5) * innerWidth, y = (-v3.y * 0.5 + 0.5) * innerHeight;
  bubble.style.left = Math.max(90, Math.min(innerWidth - 90, x)) + 'px';
  bubble.style.top = Math.max(70, y) + 'px';
}
let toastTimer = 0;
function toast(text) {
  const t = $('toast'); t.textContent = text; t.hidden = false;
  t.classList.remove('pop'); void t.offsetWidth; t.classList.add('pop');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 3400);
}
function hideHint() { $('hint').classList.add('gone'); }

// ---------- ťuknutie ----------
const ray = new THREE.Raycaster(); const ndc = new THREE.Vector2();
let down = null;
canvas.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; });
canvas.addEventListener('pointerup', e => {
  if (!down) return;
  const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y), dt = performance.now() - down.t;
  down = null;
  if (moved > 9 || dt > 600 || tween) return;
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const root = mode === 'map' ? map.group : built[current]?.g;
  if (!root) return;
  const hits = ray.intersectObject(root, true);
  // schované srdiečko má prednosť, aj keď je za niečím
  for (const hit of hits) { let o = hit.object; while (o && o !== root && !o.userData.secret) o = o.parent; if (o && o !== root && o.userData.tap) { o.userData.tap(); return; } }
  for (const hit of hits) {
    let o = hit.object;
    while (o && o !== root && !o.userData.tap && !o.userData.moment) o = o.parent;
    if (!o || o === root) continue;
    if (o.userData.moment) return enterScene(o.userData.moment);
    const tap = o.userData.tap;
    if (typeof tap === 'function') { const r = tap(); if (typeof r === 'string') bubbleFor(o, r, hit); return; }
    let text = tap;
    if (Array.isArray(tap)) { const i = sayIdx.get(o) || 0; text = tap[i % tap.length]; sayIdx.set(o, i + 1); }
    bubbleFor(o, text, hit);
    return;
  }
});
function bubbleFor(o, text, hit) {
  const p = new THREE.Vector3();
  if (o.userData.tapH != null) { o.getWorldPosition(p); p.y += o.userData.tapH; } else { p.copy(hit.point); p.y += 0.5; }
  showBubble(text, p);
}

// ---------- HUD, zoznam, list ----------
function refreshHud() {
  $('hearts').textContent = `💗 ${state.hearts.length}/${total}`;
  $('sound').textContent = state.muted ? '🔇' : '🔊';
}
$('sound').onclick = () => { state.muted = !state.muted; save(); music.setMuted(state.muted); refreshHud(); };
$('hearts').onclick = () => toast(state.hearts.length === total ? 'Máš všetky srdiečka 💗' : `V každej spomienke je schované jedno srdiečko. Máš ${state.hearts.length} z ${total}.`);
function openSheet() {
  const ul = $('sheet-list'); ul.innerHTML = '';
  MOMENTS.forEach(m => {
    const b = document.createElement('button'); b.className = 'row';
    const seen = state.visited.includes(m.id);
    b.innerHTML = `<span class="e"></span><span class="t"><b></b><i></i></span><span class="s"></span>`;
    b.querySelector('.e').textContent = m.emoji;
    b.querySelector('b').textContent = seen ? m.title : 'Ešte neobjavené…';
    b.querySelector('i').textContent = seen ? m.place : 'nájdi ma na mape alebo ťukni sem';
    b.querySelector('.s').textContent = state.hearts.includes(m.id) ? '💗' : seen ? '🤍' : '';
    b.onclick = () => enterScene(m.id);
    ul.appendChild(b);
  });
  const l = document.createElement('button'); l.className = 'row letter';
  const all = state.hearts.length === total;
  l.innerHTML = `<span class="e">${all ? '💌' : '🔒'}</span><span class="t"><b>Tajný list</b><i>${all ? 'otvor ma' : `ešte ${total - state.hearts.length} srdiečok`}</i></span><span class="s"></span>`;
  l.onclick = () => { closeSheet(); const r = onLetter(); if (r) toast(r); };
  ul.appendChild(l);
  const cr = document.createElement('div'); cr.className = 'credits'; cr.textContent = 'Hudba: Kevin MacLeod (incompetech.com), licencia CC BY 4.0'; ul.appendChild(cr);
  $('sheet').hidden = false;
}
function closeSheet() { $('sheet').hidden = true; }
$('menu').onclick = openSheet;
$('sheet-close').onclick = closeSheet;
$('sheet').onclick = (e) => { if (e.target.id === 'sheet') closeSheet(); };

function onLetter() {
  const left = total - state.hearts.length;
  if (left > 0) return left === 1 ? 'Ešte ti chýba 1 srdiečko 💗' : `Ešte ti chýba ${left} srdiečok 💗`;
  $('l-title').textContent = LETTER.title;
  const b = $('l-body'); b.innerHTML = '';
  LETTER.body.forEach(p => { const el = document.createElement('p'); el.textContent = p; b.appendChild(el); });
  $('l-sign').textContent = LETTER.sign;
  $('letter').hidden = false;
  state.letterSeen = true; save();
}
$('l-close').onclick = () => { $('letter').hidden = true; };
$('l-again').onclick = () => { $('letter').hidden = true; startFinale(); };
// srdiečka plávajúce za listom
(() => { const box = $('l-float'), e = ['💗', '💕', '💖', '🩷', '🤍'];
  for (let i = 0; i < 26; i++) { const s = document.createElement('span'); s.textContent = e[i % e.length]; s.style.left = (i * 37 % 100) + '%'; s.style.fontSize = (16 + (i * 7 % 22)) + 'px'; s.style.animationDuration = (7 + (i * 13 % 8)) + 's'; s.style.animationDelay = (-(i * 1.7 % 12)) + 's'; box.appendChild(s); } })();

// ---------- finále po poslednom srdiečku ----------
const FW = 1100, fwPos = new Float32Array(FW * 3).fill(9999), fwVel = new Float32Array(FW * 3), fwLife = new Float32Array(FW), fwCol = new Float32Array(FW * 3);
const fwGeo = new THREE.BufferGeometry(); fwGeo.setAttribute('position', new THREE.BufferAttribute(fwPos, 3)); fwGeo.setAttribute('color', new THREE.BufferAttribute(fwCol, 3));
const fireworks = new THREE.Points(fwGeo, new THREE.PointsMaterial({ map: dot, size: 1.15, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
fireworks.frustumCulled = false; fireworks.visible = false; scene.add(fireworks);
let fwNext = 0;
const FWC = ['#ff5d96', '#ffd24a', '#ffffff', '#ff9cc4', '#ffb020', '#c9a0ff'];
function burst(x, y, z, n = 90) {
  const c = new THREE.Color(FWC[Math.floor(Math.random() * FWC.length)]), sp = 5 + Math.random() * 4;
  for (let k = 0; k < n; k++) {
    const i = fwNext; fwNext = (fwNext + 1) % FW;
    const a = Math.random() * Math.PI * 2, e = Math.acos(Math.random() * 2 - 1), v = sp * (0.6 + Math.random() * 0.4);
    fwPos[i * 3] = x; fwPos[i * 3 + 1] = y; fwPos[i * 3 + 2] = z;
    fwVel[i * 3] = Math.sin(e) * Math.cos(a) * v; fwVel[i * 3 + 1] = Math.cos(e) * v; fwVel[i * 3 + 2] = Math.sin(e) * Math.sin(a) * v;
    fwLife[i] = 1.4 + Math.random() * 0.9; fwCol[i * 3] = c.r; fwCol[i * 3 + 1] = c.g; fwCol[i * 3 + 2] = c.b;
  }
  fwGeo.attributes.color.needsUpdate = true;
}
function updateFireworks(dt) {
  if (!fireworks.visible) return;
  let alive = false;
  for (let i = 0; i < FW; i++) {
    if (fwLife[i] <= 0) continue;
    fwLife[i] -= dt; alive = true;
    if (fwLife[i] <= 0) { fwPos[i * 3 + 1] = 9999; continue; }
    fwVel[i * 3 + 1] -= 4.5 * dt; const d = 1 - 1.2 * dt;
    for (let k = 0; k < 3; k++) { fwVel[i * 3 + k] *= d; fwPos[i * 3 + k] += fwVel[i * 3 + k] * dt; }
    if (fwLife[i] < 0.5) { fwCol[i * 3] *= 0.94; fwCol[i * 3 + 1] *= 0.94; fwCol[i * 3 + 2] *= 0.94; }
  }
  fwGeo.attributes.position.needsUpdate = true; fwGeo.attributes.color.needsUpdate = true;
  if (!alive && !finale) fireworks.visible = false;
}
let finale = null;
const FINALE_ENV = { sky: ['#191343', '#d9588f'], fog: ['#4a2f6e', 120, 320], sun: ['#ffd0e0', 1.5, [30, 50, 20]], hemi: ['#c9b8ff', '#ff9cc4', 1.7], shadows: false, stars: true, fx: 'hearts' };
function startFinale() {
  if (finale) return;
  if (mode === 'scene') { if (tween) return setTimeout(startFinale, 600); exitScene(); return setTimeout(startFinale, 1500); }
  if (tween) return setTimeout(startFinale, 600);
  const F = map.finale, T = F.target;
  hideBubble(); hideHint(); closeSheet(); $('letter').hidden = true;
  map.setComplete(false);
  finale = { t0: clock.elapsedTime + 0.5, fw: 0, letter: false };
  fireworks.visible = true;
  music.play('finale');
  // noc, aby ohňostroj vynikol
  through(() => { applyEnv(FINALE_ENV); controls.maxPolarAngle = 1.55; });
  const far = innerWidth < innerHeight ? 1.55 : 1;
  flyTo([T[0] + 2, 10.5, T[2] + 30 * far], [T[0], 10, T[2]], 3.4);
}
const easeOut = (k) => 1 - Math.pow(1 - k, 3);
function updateFinale(t) {
  if (!finale) return;
  const F = map.finale, T = F.target, tt = t - finale.t0, n = F.flyers.length;
  // srdiečka letia zo všetkých spomienok k obláčiku
  F.flyers.forEach((f, i) => {
    const k = (tt - 1.6 - i * 0.16) / 1.7;
    f.mesh.visible = k > 0 && k < 1;
    if (!f.mesh.visible) return;
    const e = k * k * (3 - 2 * k);
    f.mesh.position.set(f.from[0] + (T[0] - f.from[0]) * e, f.from[1] + (T[1] - f.from[1]) * e + Math.sin(k * Math.PI) * 9, f.from[2] + (T[2] - f.from[2]) * e);
    f.mesh.rotation.y = tt * 5 + i; f.mesh.scale.setScalar(0.9 * (1 - e * 0.5));
  });
  const tBig = 1.6 + n * 0.16 + 1.2;
  if (tt > tBig) {
    const k = Math.min(1, (tt - tBig) / 1.3), el = 1 + Math.pow(2, -9 * k) * Math.sin((k * 9 - 0.75) * 2.094) * (k < 1 ? 1 : 0);
    F.big.visible = F.halo.visible = true; F.big.scale.setScalar(3.4 * Math.max(0.01, k < 1 ? el * easeOut(k) + (1 - easeOut(k)) * 0.01 : 1 + Math.sin(t * 2.4) * 0.06));
    F.big.rotation.y = Math.sin(t * 0.7) * 0.5;
    if (tt > finale.fw) { finale.fw = tt + 0.28 + Math.random() * 0.3; const a = Math.random() * Math.PI * 2, r = 6 + Math.random() * 13; burst(T[0] + Math.cos(a) * r, 8 + Math.random() * 11, T[2] + Math.sin(a) * r * 0.6 - 3); }
  }
  if (tt > tBig + 1.6) { const k = Math.min(1, (tt - tBig - 1.6) / 0.9); F.words.visible = true; F.words.scale.set(11 * easeOut(k), 2.2 * easeOut(k), 1); }
  if (tt > tBig + 7.5 && !finale.letter) { finale.letter = true; onLetter(); }
  if (tt > tBig + 20 && $('letter').hidden) { finale = null; map.setComplete(true); state.finaleSeen = true; save(); through(() => { applyEnv(MAP_ENV); setControls(false); fwLife.fill(0); fwPos.fill(9999); fwGeo.attributes.position.needsUpdate = true; fireworks.visible = false; const h = mapHome(); camera.position.set(...h.pos); controls.target.set(...h.target); }); }
}


// ---------- zámok a úvod ----------
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
// Vianoce: pri úplne prvom otvorení a potom každý rok od 20. decembra do 6. januára
const now = new Date(), xmasTime = (now.getMonth() === 11 && now.getDate() >= 20) || (now.getMonth() === 0 && now.getDate() <= 6);
function showIntro() {
  $('gate-lock').hidden = true; $('gate-intro').hidden = false;
  if (!(xmasTime || !state.introSeen)) return;
  $('gate').classList.add('xmas');
  $('intro-e').textContent = '🎄';
  $('intro-h').textContent = 'Šťastné a veselé Vianoce, cukrík';
  $('intro-p').innerHTML = 'Tento rok som ti chcel dať niečo, čo sa nedá kúpiť.<br>Postavil som ti svet z našich spomienok. Na každom ostrove nejaká čaká. Pozri si ich v akom poradí chceš a v každej skús nájsť jedno schované srdiečko.';
  const box = $('snow');
  if (!box.childElementCount) for (let i = 0; i < 40; i++) { const s = document.createElement('span'); s.textContent = i % 3 ? '❄' : '•'; s.style.left = (i * 53 % 100) + '%'; s.style.fontSize = (10 + (i * 7 % 16)) + 'px'; s.style.animationDuration = (6 + (i * 11 % 9)) + 's'; s.style.animationDelay = (-(i * 1.3 % 12)) + 's'; s.style.opacity = 0.5 + (i % 5) * 0.1; box.appendChild(s); }
}
$('gate-form').onsubmit = (e) => {
  e.preventDefault();
  const raw = $('gate-input').value.trim(), n = norm(raw);
  const ugly = UGLY.some(w => n.includes(w));
  const ok = n === 'cukrik';
  if (ok) { state.unlocked = true; state.nick = 'cukrík'; save(); showIntro(); return; }
  const f = $('gate-form'); f.classList.remove('shake'); void f.offsetWidth; f.classList.add('shake');
  $('gate-msg').textContent = ugly ? 'Takto by som ťa nikdy nenazval 🙈' : 'To nie je ono 🙂 Ako ťa volám najradšej?';
};
$('start').onclick = () => {
  state.introSeen = true; save();
  music.unlock(); music.setMuted(state.muted); music.play('mapa');
  $('gate').classList.add('gone'); setTimeout(() => { $('gate').hidden = true; }, 700);
  flyTo(mapHome().pos, MAP_CAM.target, 2.6);
  setTimeout(() => $('hint').classList.remove('gone'), 2600);
};
if (state.unlocked) showIntro(); else $('gate-lock').hidden = false;

// ---------- slučka ----------
function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h;
  camera.fov = w < h ? 52 : 42; camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();
applyEnv(MAP_ENV); setControls(false);
camera.position.set(MAP_CAM.pos[0] * 1.5, MAP_CAM.pos[1] * 1.7, MAP_CAM.pos[2] * 1.7); controls.target.set(...MAP_CAM.target);
refreshHud();

const clock = new THREE.Clock();
const lim = new THREE.Vector3();
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
  if (tween) tween();
  // kamera nesmie ujsť príliš ďaleko
  if (mode === 'map') { controls.target.x = THREE.MathUtils.clamp(controls.target.x, -48, 46); controls.target.z = THREE.MathUtils.clamp(controls.target.z, -34, 44); if (!finale) controls.target.y = 0; }
  else { lim.copy(controls.target); lim.y = 0; if (lim.length() > 7) { lim.setLength(7); controls.target.x = lim.x; controls.target.z = lim.z; } controls.target.y = THREE.MathUtils.clamp(controls.target.y, -1.5, 6); }
  controls.update();
  if (mode === 'map') map.update(t);
  else if (built[current]) for (const f of built[current].updates) f(t, dt);
  updateFx(t, dt);
  updateFinale(t); updateFireworks(dt);
  waterNormal.offset.set(t * 0.012, t * 0.008);
  placeBubble();
  renderer.render(scene, camera);
});

// ladenie: ?scene=tatry otvorí rovno scénu
if (state.hearts.length === total) map.setComplete(true);
if (xmasTime) { MAP_ENV.fx = 'snow'; setFx('snow'); }
window.__world = { startFinale,  enterScene, exitScene, buildScene, state, camera, controls, music };
if ('serviceWorker' in navigator && !['localhost', '127.0.0.1'].includes(location.hostname)) navigator.serviceWorker.register('sw.js').catch(() => {});
