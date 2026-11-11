// Stavebnica: základné tvary, postavičky a rekvizity pre všetky scény.
import * as THREE from 'three';
export { THREE };

const mats = new Map();
/** hladký materiál; o.flatShading pre hranaté veci */
export function M(color, o) {
  if (color && color.isMaterial) return color;
  const key = color + (o ? JSON.stringify(o) : '');
  let m = mats.get(key);
  if (!m) { m = new THREE.MeshStandardMaterial({ color, roughness: 0.86, metalness: 0, envMapIntensity: 0.4, ...o }); mats.set(key, m); }
  return m;
}
const FLAT = { flatShading: true };
const glows = new Map();
export function glow(color, opacity = 1) {
  const key = color + '|' + opacity;
  let m = glows.get(key);
  if (!m) { m = new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity }); glows.set(key, m); }
  return m;
}
export const glass = (color = '#bfe6ff', opacity = 0.45) => M(color, { transparent: true, opacity, roughness: 0.15 });

function fin(mesh, parent, pos, rot) {
  if (pos) mesh.position.set(pos[0], pos[1], pos[2]);
  if (rot) mesh.rotation.set(rot[0], rot[1], rot[2]);
  const lit = !mesh.material.isMeshBasicMaterial && !mesh.material.transparent;
  mesh.castShadow = lit; mesh.receiveShadow = lit;
  if (parent) parent.add(mesh);
  return mesh;
}
export const G = (parent, pos, rot) => {
  const g = new THREE.Group();
  if (pos) g.position.set(pos[0], pos[1], pos[2]);
  if (rot) g.rotation.set(rot[0], rot[1], rot[2]);
  if (parent) parent.add(g);
  return g;
};
/** kváder [š, v, h] */
export const B = (p, s, c, pos, rot) => fin(new THREE.Mesh(new THREE.BoxGeometry(s[0], s[1], s[2]), M(c)), p, pos, rot);
/** valec [rHore, rDole, výška, segmenty]; málo segmentov = hranatý */
export const C = (p, s, c, pos, rot) => {
  const seg = s[3] || 20;
  return fin(new THREE.Mesh(new THREE.CylinderGeometry(s[0], s[1], s[2], seg), seg <= 8 ? M(c, FLAT) : M(c)), p, pos, rot);
};
/** kužeľ [r, výška, segmenty] */
export const K = (p, s, c, pos, rot) => {
  const seg = s[2] || 20;
  return fin(new THREE.Mesh(new THREE.ConeGeometry(s[0], s[1], seg), seg <= 8 ? M(c, FLAT) : M(c)), p, pos, rot);
};
/** guľa r, voliteľná mierka [x,y,z] */
export const S = (p, r, c, pos, scale, seg = 16) => {
  const sg = Math.max(seg, 14);
  const m = fin(new THREE.Mesh(new THREE.SphereGeometry(r, sg, Math.max(10, sg - 4)), M(c)), p, pos);
  if (scale) m.scale.set(scale[0], scale[1], scale[2]);
  return m;
};
/** prstenec [r, hrúbka, oblúk] */
export const T = (p, s, c, pos, rot) => fin(new THREE.Mesh(new THREE.TorusGeometry(s[0], s[1], 10, 28, s[2] || Math.PI * 2), M(c)), p, pos, rot);

// ---------- šum a prírodné tvary ----------
const hash = (x, y, z) => { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return s - Math.floor(s); };
const sm = (t) => t * t * (3 - 2 * t);
export function noise3(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), xf = sm(x - xi), yf = sm(y - yi), zf = sm(z - zi);
  const l = (a, b, t) => a + (b - a) * t;
  return l(l(l(hash(xi, yi, zi), hash(xi + 1, yi, zi), xf), l(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), xf), yf),
    l(l(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), xf), l(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), xf), yf), zf) * 2 - 1;
}
const fbm = (x, y, z) => noise3(x, y, z) * 0.65 + noise3(x * 2.1, y * 2.1, z * 2.1) * 0.35;
/** posunie vrcholy podľa šumu (rovnaká poloha = rovnaký posun, takže nevznikajú škáry) */
export function displace(geo, amp, freq = 1, seed = 0) {
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    p.setXYZ(i, x + fbm(x * freq + seed, y * freq, z * freq) * amp, y + fbm(x * freq, y * freq + seed + 31, z * freq) * amp * 0.6, z + fbm(x * freq, y * freq, z * freq + seed + 67) * amp);
  }
  geo.computeVertexNormals();
  return geo;
}
/** organický tvar (koruna stromu, kopec snehu, krík) */
export function blob(p, r, color, pos, scale, o = {}) {
  const geo = displace(new THREE.SphereGeometry(r, 18, 14), r * (o.amp ?? 0.16), (o.freq ?? 1.6) / r, o.seed ?? (pos ? pos[0] * 3.1 + pos[2] * 1.7 : 0));
  const m = fin(new THREE.Mesh(geo, M(color, o.flat ? FLAT : undefined)), p, pos);
  if (scale) m.scale.set(scale[0], scale[1], scale[2]);
  return m;
}
const rockMat = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.96, envMapIntensity: 0.3 });
/** skala / útes z kvádra s nerovným povrchom a vrstvami */
export function cliff(p, pos, size, color = '#d9c7a6', o = {}) {
  const [w, h, d] = size;
  const sg = (v) => Math.max(2, Math.min(14, Math.round(v / (o.cell ?? 0.5))));
  const geo = new THREE.BoxGeometry(w, h, d, sg(w), sg(h), sg(d));
  const P = geo.attributes.position, seed = o.seed ?? (pos[0] * 1.37 + pos[2] * 2.91);
  for (let i = 0; i < P.count; i++) {
    let x = P.getX(i), y = P.getY(i), z = P.getZ(i);
    const t = (y + h / 2) / h, tp = 1 - (o.taper ?? 0.12) * t;
    x *= tp; z *= tp;
    if (y > h / 2 - 0.01) y += fbm(x * 0.7 + seed, 0, z * 0.7) * (o.top ?? 0.25);
    P.setXYZ(i, x, y, z);
  }
  displace(geo, o.amp ?? 0.24, o.freq ?? 0.9, seed);
  const base = new THREE.Color(color), c = new THREE.Color(), col = new Float32Array(P.count * 3);
  for (let i = 0; i < P.count; i++) {
    const x = P.getX(i), y = P.getY(i), z = P.getZ(i);
    const k = 1 + Math.sin(y * 4.2 + fbm(x * 0.5, y, z * 0.5) * 2.5) * 0.07 + fbm(x * 1.3 + seed, y * 1.3, z * 1.3) * 0.1;
    c.copy(base).multiplyScalar(k); col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const m = new THREE.Mesh(geo, rockMat); m.position.set(pos[0], pos[1], pos[2]);
  if (o.ry) m.rotation.y = o.ry;
  m.castShadow = m.receiveShadow = true; p.add(m);
  return m;
}

// ---------- srdce ----------
const hs = new THREE.Shape();
hs.moveTo(0, -0.55);
hs.bezierCurveTo(-0.95, 0.05, -0.6, 0.8, 0, 0.3);
hs.bezierCurveTo(0.6, 0.8, 0.95, 0.05, 0, -0.55);
const heartGeo = new THREE.ExtrudeGeometry(hs, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 2, curveSegments: 8 });
heartGeo.center();
export function heart(p, size, color, pos, rot) {
  const m = fin(new THREE.Mesh(heartGeo, M(color)), p, pos, rot);
  m.scale.setScalar(size);
  return m;
}

// ---------- text ----------
export function textTexture(text, o = {}) {
  const w = o.cw || 512, h = o.ch || 128;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d');
  if (o.bg) {
    x.fillStyle = o.bg;
    const r = o.radius ?? 24;
    x.beginPath(); x.roundRect(0, 0, w, h, r); x.fill();
  }
  x.fillStyle = o.fg || '#333';
  x.textAlign = 'center'; x.textBaseline = 'middle';
  let size = Math.min(o.size || Math.floor(h * 0.6), Math.floor(h * 0.66));
  const font = o.font || '800 %px ui-rounded, "SF Pro Rounded", "Avenir Next", "Segoe UI", system-ui, sans-serif';
  x.font = font.replace('%', size);
  while (x.measureText(text).width > w * 0.9 && size > 10) { size -= 2; x.font = font.replace('%', size); }
  x.fillText(text, w / 2, h / 2 + size * 0.04);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
/** tabuľa s textom (plochá) */
export function label(p, text, w, h, o = {}, pos, rot) {
  const tex = textTexture(text, { cw: 512, ch: Math.round(512 * h / w), ...o });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide }));
  return fin(m, p, pos, rot);
}
/** text otočený vždy ku kamere */
export function sprite(p, text, w, h, o = {}, pos) {
  const tex = textTexture(text, { cw: 512, ch: Math.round(512 * h / w), ...o });
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  s.scale.set(w, h, 1);
  if (pos) s.position.set(pos[0], pos[1], pos[2]);
  if (p) p.add(s);
  return s;
}

// ---------- povrchy ----------
function canvasTex(size, draw, repeat = 1) {
  const c = document.createElement('canvas'); c.width = c.height = size; draw(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); t.anisotropy = 4;
  return t;
}
// jemná nepravidelnosť povrchu (tráva, piesok, sneh, dlažba): násobí farbu materiálu
const mottle = canvasTex(256, (x, n) => {
  const img = x.createImageData(n, n), d = img.data, w = (v) => v - Math.floor(v);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const u = i / n * 8, v = j / n * 8;
    // dlaždicovateľný šum: súčet sínusov + zrno
    const k = 0.5 + 0.2 * Math.sin(u * 0.785 + Math.sin(v * 1.57) * 1.3) * Math.cos(v * 0.785 + Math.sin(u * 1.57)) + 0.12 * Math.sin(u * 3.14 + v * 2.36) + (w(Math.sin(i * 12.9898 + j * 78.233) * 43758.5453) - 0.5) * 0.22;
    const g = Math.max(0, Math.min(255, 205 + (k - 0.5) * 120)), p = (j * n + i) * 4;
    d[p] = d[p + 1] = d[p + 2] = g; d[p + 3] = 255;
  }
  x.putImageData(img, 0, 0);
}, 5);
mottle.colorSpace = THREE.SRGBColorSpace;
// vlnky na vode ako normálová mapa (posúva sa v hlavnej slučke)
export const waterNormal = canvasTex(256, (x, n) => {
  const img = x.createImageData(n, n), d = img.data, P = Math.PI * 2;
  const h = (u, v) => Math.sin(P * (u * 3 + v * 1)) * 0.5 + Math.sin(P * (u * -2 + v * 4) + 1.3) * 0.35 + Math.sin(P * (u * 5 - v * 3) + 2.1) * 0.25 + Math.sin(P * (u * 7 + v * 6) + 0.7) * 0.15 + Math.sin(P * (u * -9 + v * 5) + 4.0) * 0.1;
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const u = i / n, v = j / n, e = 1 / n;
    const dx = (h(u + e, v) - h(u - e, v)) * 3.2, dy = (h(u, v + e) - h(u, v - e)) * 3.2, l = Math.hypot(dx, dy, 1), p = (j * n + i) * 4;
    d[p] = (-dx / l * 0.5 + 0.5) * 255; d[p + 1] = (-dy / l * 0.5 + 0.5) * 255; d[p + 2] = (1 / l * 0.5 + 0.5) * 255; d[p + 3] = 255;
  }
  x.putImageData(img, 0, 0);
}, 5);
/** materiál vodnej hladiny s odleskami */
export const waterMat = (color, opacity = 0.85) => new THREE.MeshStandardMaterial({ color, transparent: true, opacity, roughness: 0.08, metalness: 0.25, normalMap: waterNormal, normalScale: new THREE.Vector2(0.55, 0.55), envMapIntensity: 1.4 });

// ---------- podstavec diorámy ----------
export function base(g, o = {}) {
  const r = o.r || 8, top = o.top || '#9bd67a', side = o.side || '#b98a5e';
  const tm = new THREE.MeshStandardMaterial({ color: top, map: mottle, roughness: 0.95, envMapIntensity: 0.35 });
  const t = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.5, 64), [M(top), tm, M(top)]);
  t.position.y = -0.25; t.receiveShadow = true; g.add(t);
  C(g, [r, r * 0.86, 0.9, 64], side, [0, -0.95, 0]).castShadow = false;
  C(g, [r * 0.86, r * 0.35, 2.2, 28], o.under || '#8f6846', [0, -2.5, 0]).castShadow = false;
  return t;
}
export function water(g, r, color = '#5fd0e0', y = 0.02, opacity = 0.88) {
  const m = new THREE.Mesh(new THREE.CircleGeometry(r, 64), waterMat(color, opacity));
  m.rotation.x = -Math.PI / 2; m.position.y = y; m.receiveShadow = true; g.add(m);
  return m;
}

// ---------- postavy ----------
export const WHO = {
  d: { h: 1.9, sw: 0.235, hair: '#4f3320', eye: '#4a2a14', style: 'messy', skin: '#e8b995', lip: '#b8746a' },
  m: { h: 1.7, sw: 0.185, hair: '#e2c477', eye: '#4c9a5a', style: 'long', skin: '#f2cdb3', lip: '#cf7d7d', female: true },
  boy: { h: 1.45, sw: 0.19, hair: '#2b2622', eye: '#333', style: 'short', skin: '#e8b995', lip: '#b8746a' },
  npc: { h: 1.75, sw: 0.21, hair: '#3a2a20', eye: '#333', style: 'short', skin: '#e3b593', lip: '#b8746a' },
};
const NOM = 1.87; // výška postavy v jednotkách modelu

export function person(parent, who, outfit = {}, pos, ry = 0) {
  const W = typeof who === 'string' ? WHO[who] : { ...WHO.npc, ...who };
  if (W.style === 'long' && W.female == null) W.female = true;
  const o = { top: '#7d5238', topType: 'sweater', bottom: '#26262b', bottomType: 'pants', shoes: '#f4f4f4', sleeves: 'long', ...outfit };
  const skin = W.skin, sw = W.sw || 0.21, fem = !!W.female;
  const root = G(parent, pos, [0, ry, 0]);
  const k = W.h / NOM;
  const body = G(root); body.scale.setScalar(k);
  const parts = { body, k };
  const bikini = o.topType === 'bikini';
  const bare = o.sleeves === 'none' || bikini;

  // nohy
  const pants = o.bottomType === 'pants';
  const legCol = pants ? o.bottom : skin;
  for (const side of [1, -1]) {
    const hip = G(body, [side * (fem ? 0.085 : 0.092), 0.9, 0]);
    C(hip, pants ? [0.088, 0.074, 0.45, 14] : [fem ? 0.08 : 0.084, 0.058, 0.45, 14], legCol, [0, -0.225, 0]);
    if (o.bottomType === 'shorts') C(hip, [0.098, 0.1, 0.25, 14], o.bottom, [0, -0.105, 0]);
    const knee = G(hip, [0, -0.45, 0]);
    S(knee, pants ? 0.074 : 0.058, legCol);
    C(knee, pants ? [0.074, 0.066, 0.4, 14] : [0.06, 0.042, 0.4, 14], legCol, [0, -0.2, 0]);
    if (!pants) S(knee, 0.056, skin, [0, -0.13, -0.012], [1, 1.9, 1]);
    if (o.shoeType === 'sandal') { B(knee, [0.092, 0.022, 0.24], o.shoes, [0, -0.455, 0.045]); S(knee, 0.046, skin, [0, -0.42, 0.06], [0.95, 0.5, 2.1]); B(knee, [0.094, 0.012, 0.03], o.shoes, [0, -0.405, 0.09]); }
    else if (o.shoeType === 'heel') { S(knee, 0.05, o.shoes, [0, -0.425, 0.05], [0.92, 0.62, 2.3]); B(knee, [0.04, 0.07, 0.04], o.shoes, [0, -0.445, -0.045]); }
    else if (o.shoeType === 'bare') { S(knee, 0.046, skin, [0, -0.44, 0.055], [0.95, 0.55, 2.1]); }
    else { S(knee, 0.058, o.shoes, [0, -0.425, 0.05], [0.95, 0.74, 2.15]); B(knee, [0.1, 0.028, 0.255], '#e9e9e9', [0, -0.465, 0.05]); }
    parts[side > 0 ? 'legL' : 'legR'] = hip; parts[side > 0 ? 'kneeL' : 'kneeR'] = knee;
  }
  // boky / sukňa / šaty
  const hipCol = (o.topType === 'dress' || o.topType === 'coat') ? o.top : o.bottom;
  S(body, 0.17, hipCol, [0, 0.93, 0], [fem ? 1.04 : 1, 0.66, 0.72]);
  if (o.bottomType === 'skirt') C(body, [0.16, 0.27, 0.4, 20], o.bottom, [0, 0.8, 0]).scale.z = 0.8;
  if (o.topType === 'dress') {
    const len = o.dressLen || 0.5;
    C(body, [0.155, 0.155 + len * 0.36, len, 22], o.top, [0, 1.0 - len / 2, 0]).scale.z = 0.8;
  }
  // trup
  const torsoCol = bikini ? skin : o.top;
  const waist = fem ? 0.128 : 0.15;
  if (o.topType === 'coat') {
    C(body, [sw * 0.86 + 0.01, fem ? 0.15 : 0.17, 0.42, 20], o.top, [0, 1.3, 0]).scale.z = 0.66;
    C(body, [fem ? 0.15 : 0.17, fem ? 0.21 : 0.2, 0.58, 20], o.top, [0, 0.8, 0]).scale.z = 0.7;
    S(body, sw * 0.92 + 0.01, o.top, [0, 1.48, 0], [1, 0.46, 0.6]);
    B(body, [0.012, 0.9, 0.012], shade(o.top, 0.8), [0, 1.0, (fem ? 0.125 : 0.132)]).castShadow = false;
    for (const y of [1.2, 1.0, 0.8]) S(body, 0.014, shade(o.top, 0.7), [0.03, y, 0.128]);
    C(body, [0.075, 0.1, 0.07, 16], o.top, [0, 1.545, -0.01]).scale.z = 0.85;
  } else if (o.topType === 'jacket') {
    C(body, [sw * 0.9 + 0.03, 0.2, 0.36, 20], o.top, [0, 1.33, 0]).scale.z = 0.74;
    C(body, [0.2, 0.205, 0.3, 20], o.top, [0, 1.03, 0]).scale.z = 0.76;
    S(body, sw * 0.96 + 0.03, o.top, [0, 1.48, 0], [1, 0.48, 0.68]);
    for (const y of [1.0, 1.16, 1.32]) T(body, [0.2, 0.012], o.top, [0, y, 0], [Math.PI / 2, 0, 0]).scale.set(1, 0.75, 1);
    C(body, [0.085, 0.115, 0.09, 16], o.top, [0, 1.555, -0.01]).scale.z = 0.85;
  } else {
    C(body, [sw * 0.84, waist, 0.36, 20], torsoCol, [0, 1.32, 0]).scale.z = 0.62;
    C(body, [waist, fem ? 0.158 : 0.162, 0.24, 20], torsoCol, [0, 1.03, 0]).scale.z = 0.68;
    S(body, sw * 0.9, torsoCol, [0, 1.478, 0], [1, 0.46, 0.58]);
    if (!fem && !bikini) S(body, 0.1, torsoCol, [0, 1.36, 0.045], [1.5, 0.85, 0.7]);
  }
  if (fem && o.topType !== 'coat' && o.topType !== 'jacket') for (const side of [1, -1]) S(body, 0.05, bikini ? o.top : torsoCol, [side * 0.058, 1.35, 0.058], [1.05, 0.95, 0.75]);
  if (bikini) { C(body, [sw * 0.8, 0.138, 0.07, 20], o.top, [0, 1.355, 0]).scale.z = 0.66; for (const side of [1, -1]) B(body, [0.012, 0.16, 0.012], o.top, [side * 0.06, 1.46, 0.06], [-0.35, 0, 0]); }
  if (o.topType === 'suit' || o.collar) {
    B(body, [0.085, 0.24, 0.02], o.shirt || '#ffffff', [0, 1.39, sw * 0.5 + 0.012]);
    B(body, [0.13, 0.04, 0.03], o.shirt || '#ffffff', [0, 1.525, 0.075]);
  }
  if (o.topType === 'suit') for (const side of [1, -1]) B(body, [0.045, 0.26, 0.016], o.top, [side * 0.062, 1.39, sw * 0.5 + 0.02], [0, 0, side * 0.2]);
  if (o.tie) B(body, [0.04, 0.23, 0.02], o.tie, [0, 1.385, sw * 0.5 + 0.026]);
  C(body, [0.044, 0.052, 0.13, 14], skin, [0, 1.555, 0]);
  // ruky
  const upCol = bare ? skin : o.top;
  const foreCol = (o.sleeves === 'long' && !bikini) ? o.top : skin;
  const thick = o.topType === 'jacket' ? 1.25 : o.topType === 'coat' ? 1.06 : 1;
  for (const side of [1, -1]) {
    const sh = G(body, [side * (sw + 0.022), 1.455, 0]);
    const ur = (bare ? (fem ? 0.042 : 0.052) : 0.056) * thick;
    S(sh, ur * 1.02, upCol);
    C(sh, [ur, ur * 0.88, 0.3, 14], upCol, [0, -0.15, 0]);
    const el = G(sh, [0, -0.3, 0]);
    const fr = (foreCol === skin ? (fem ? 0.036 : 0.044) : 0.05) * thick;
    S(el, fr * 1.05, foreCol);
    C(el, [fr, fr * 0.78, 0.27, 14], foreCol, [0, -0.135, 0]);
    S(el, 0.04, o.gloves || skin, [0, -0.31, 0], [0.8, 1.3, 0.55]);
    sh.rotation.z = side * 0.07;
    parts[side > 0 ? 'armL' : 'armR'] = sh; parts[side > 0 ? 'elbowL' : 'elbowR'] = el;
  }
  // hlava
  const hd = G(body, [0, 1.72, 0]); parts.head = hd;
  S(hd, 0.112, skin, null, [0.95, 1.12, 1.03], 20);
  S(hd, 0.086, skin, [0, -0.06, 0.012], [fem ? 0.9 : 0.98, 1, 0.95], 16);
  for (const side of [1, -1]) {
    S(hd, 0.024, skin, [side * 0.104, -0.012, -0.005], [0.5, 1, 0.7]);
    S(hd, 0.018, '#ffffff', [side * 0.04, 0.01, 0.097], [1.2, 0.72, 0.5]);
    S(hd, 0.0105, W.eye, [side * 0.04, 0.01, 0.106], [1, 1, 0.5]);
    S(hd, 0.005, '#16110e', [side * 0.04, 0.01, 0.111], [1, 1, 0.5]);
    B(hd, [0.042, fem ? 0.006 : 0.009, 0.008], fem ? '#a8895a' : '#3a2516', [side * 0.041, 0.04, 0.103], [0, 0, -side * 0.12]).castShadow = false;
  }
  S(hd, 0.017, skin, [0, -0.022, 0.11], [0.85, 1.15, 1]);
  T(hd, [0.024, 0.0055, Math.PI], W.lip || '#b8746a', [0, -0.058, 0.094], [0.25, 0, Math.PI]).castShadow = false;
  // vlasy
  const hair = W.hair;
  const cap = (r, th, tilt, col = hair, sc = [1, 1.1, 1.06]) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14, 0, Math.PI * 2, 0, th), M(col));
    m.rotation.x = tilt; m.scale.set(sc[0], sc[1], sc[2]); m.position.y = 0.012; m.castShadow = true; hd.add(m); return m;
  };
  if (o.hatType !== 'helmet') {
    if (W.style === 'messy') {
      cap(0.119, 1.9, -0.52);
      const tufts = [[-0.078, 0.086, 0.064], [-0.042, 0.1, 0.086], [0, 0.104, 0.096], [0.042, 0.101, 0.088], [0.078, 0.088, 0.066], [-0.05, 0.118, 0.045], [0.0, 0.123, 0.055], [0.05, 0.119, 0.043], [-0.095, 0.06, 0.03], [0.095, 0.06, 0.03]];
      tufts.forEach((t, i) => { const m = S(hd, 0.036 + (i % 3) * 0.003, hair, t, [1.1, 0.5, 1.3]); m.rotation.set(0.5 + (i % 2) * 0.2, (i * 1.3) % 1 - 0.5, (i % 3 - 1) * 0.25); });
    } else if (W.style === 'long') {
      cap(0.121, 1.78, -0.44);
      for (let i = -3; i <= 3; i++) {
        const a = i * 0.34, x0 = Math.sin(a) * 0.1, z0 = -Math.cos(a) * 0.092;
        for (let j = 0; j < 5; j++) {
          const wv = Math.sin(j * 1.7 + i * 0.9) * 0.014;
          S(hd, 0.043 - j * 0.003, hair, [x0 * (1 + j * 0.05) + wv, -0.01 - j * 0.135, z0 - 0.012 - j * 0.006 + wv * 0.6], [1, 2.0, 0.85]);
        }
      }
      for (const side of [1, -1]) {
        for (let j = 0; j < 3; j++) S(hd, 0.034 - j * 0.003, hair, [side * (0.11 + Math.sin(j * 1.8) * 0.006), -0.04 - j * 0.1, 0.005 - j * 0.012], [0.85, 2.0, 0.85]);
        S(hd, 0.062, hair, [side * 0.062, 0.088, 0.062], [1.15, 0.5, 0.85]).rotation.z = -side * 0.55;
      }
    } else {
      cap(0.118, 1.75, -0.42);
    }
  }
  // pokrývky hlavy
  if (o.hatType === 'beanie') {
    cap(0.128, 1.42, -0.24, o.hat, [1, 1.15, 1.06]);
    T(hd, [0.119, 0.022], o.hat, [0, 0.04, -0.012], [Math.PI / 2 - 0.24, 0, 0]);
    S(hd, 0.04, o.pom || '#ffffff', [0, 0.165, -0.035]);
  } else if (o.hatType === 'bucket') {
    C(hd, [0.105, 0.128, 0.1, 22], o.hat, [0, 0.125, -0.012], [-0.1, 0, 0]);
    C(hd, [0.128, 0.215, 0.045, 24], o.hat, [0, 0.07, -0.006], [-0.1, 0, 0]);
    const cols = ['#ffffff', '#ffe36e', '#ffffff', '#ffb25c', '#ffe36e', '#ffffff', '#ffb25c', '#ffffff'];
    cols.forEach((c, i) => { const a = i / cols.length * Math.PI * 2; S(hd, 0.02, c, [Math.sin(a) * 0.122, 0.125 + Math.cos(a) * 0.012, Math.cos(a) * 0.122 - 0.012], [1, 1, 0.6]); });
  } else if (o.hatType === 'helmet') {
    S(hd, 0.15, o.hat, [0, 0.02, -0.005], [1, 1.04, 1.1], 20);
    B(hd, [0.2, 0.07, 0.04], '#222831', [0, 0.015, 0.135]);
  }
  if (o.scarf) {
    T(body, [0.078, 0.04], o.scarf, [0, 1.565, 0.005], [Math.PI / 2, 0, 0]);
    B(body, [0.07, 0.26, 0.035], o.scarf, [0.05, 1.42, sw * 0.5 + 0.05]);
  }
  root.userData.parts = parts;
  return root;
}

/** póza: armL/armR = [predozadu, dobokov], elbowL/R = ohyb, legL/R = uhol, sit = sedí */
export function pose(p, o) {
  const q = p.userData.parts;
  if (o.armL) q.armL.rotation.set(o.armL[0], 0, o.armL[1] ?? 0.07);
  if (o.armR) q.armR.rotation.set(o.armR[0], 0, o.armR[1] ?? -0.07);
  if (o.elbowL != null) q.elbowL.rotation.x = o.elbowL;
  if (o.elbowR != null) q.elbowR.rotation.x = o.elbowR;
  if (o.legL != null) q.legL.rotation.x = o.legL;
  if (o.legR != null) q.legR.rotation.x = o.legR;
  if (o.sit) {
    q.legL.rotation.x = q.legR.rotation.x = -1.5;
    q.kneeL.rotation.x = q.kneeR.rotation.x = 1.5;
    q.body.position.y = -0.43 * q.k;
  }
  if (o.head) q.head.rotation.set(o.head[0] || 0, o.head[1] || 0, o.head[2] || 0);
  return p;
}
/** jemné dýchanie / pohupovanie */
export function idle(ctx, p, phase = 0) {
  const q = p.userData.parts, y0 = q.body.position.y;
  ctx.anim(t => { q.body.position.y = y0 + Math.sin(t * 1.6 + phase) * 0.006; q.head.rotation.z = Math.sin(t * 0.7 + phase) * 0.025; });
}

// ---------- rekvizity ----------
const shade = (hex, k) => '#' + new THREE.Color(hex).multiplyScalar(k).getHexString();
export function tree(p, pos, s = 1, leaf = '#5f9d4c', trunk = '#6f4b33') {
  const g = G(p, pos); g.scale.setScalar(s);
  const sd = pos[0] * 2.3 + pos[2];
  C(g, [0.1, 0.19, 1.5, 10], trunk, [0, 0.75, 0]);
  C(g, [0.05, 0.08, 0.7, 8], trunk, [0.22, 1.5, 0.05], [0, 0, -0.7]); C(g, [0.05, 0.08, 0.7, 8], trunk, [-0.2, 1.55, -0.05], [0, 0, 0.75]);
  blob(g, 0.82, leaf, [0, 2.15, 0], [1, 0.9, 1], { seed: sd });
  blob(g, 0.58, shade(leaf, 0.9), [0.58, 1.75, 0.18], null, { seed: sd + 3 });
  blob(g, 0.55, shade(leaf, 0.94), [-0.55, 1.85, -0.2], null, { seed: sd + 7 });
  blob(g, 0.5, shade(leaf, 1.06), [0.1, 2.0, 0.55], null, { seed: sd + 11 });
  blob(g, 0.45, shade(leaf, 0.88), [-0.1, 1.9, -0.55], null, { seed: sd + 13 });
  return g;
}
export function pine(p, pos, s = 1, snow = false, col = '#2f6a45') {
  const g = G(p, pos); g.scale.setScalar(s);
  const sd = pos[0] * 1.9 + pos[2];
  C(g, [0.07, 0.13, 0.7, 10], '#5d4130', [0, 0.35, 0]);
  [[0.9, 1.15, 0.95], [0.74, 1.0, 1.55], [0.56, 0.9, 2.1], [0.36, 0.8, 2.6]].forEach(([r, h, y], i) => {
    const geo = displace(new THREE.ConeGeometry(r, h, 16, 3), 0.07, 2.2, sd + i * 5);
    fin(new THREE.Mesh(geo, M(i % 2 ? shade(col, 1.08) : col, FLAT)), g, [0, y, 0]);
    if (snow) { const sg = displace(new THREE.ConeGeometry(r * 0.78, h * 0.5, 16, 2), 0.05, 2.2, sd + i * 9); fin(new THREE.Mesh(sg, M('#f6f9ff', FLAT)), g, [0, y + h * 0.29, 0]); }
  });
  return g;
}
export function palm(p, pos, s = 1) {
  const g = G(p, pos); g.scale.setScalar(s);
  let x = 0, y = 0;
  for (let i = 0; i < 7; i++) { const a = 0.05 + i * 0.035; C(g, [0.1 - i * 0.004, 0.115 - i * 0.004, 0.5, 10], i % 2 ? '#9a7850' : '#a8845a', [x + Math.sin(a) * 0.23, y + 0.24, 0], [0, 0, -a]); x += Math.sin(a) * 0.46; y += Math.cos(a) * 0.46; }
  const top = G(g, [x, y, 0]);
  for (let i = 0; i < 9; i++) {
    const fr = G(top, null, [0, i / 9 * Math.PI * 2 + (i % 2) * 0.2, 0]);
    let px = 0, py = 0;
    for (let j = 0; j < 5; j++) { const a = 0.45 - j * 0.33; B(fr, [0.44, 0.03, 0.34 - j * 0.055], j % 2 ? '#3f8f4a' : '#4a9a52', [px + Math.cos(a) * 0.21, py + Math.sin(a) * 0.21, 0], [0, 0, a]); px += Math.cos(a) * 0.42; py += Math.sin(a) * 0.42; }
  }
  S(top, 0.13, '#6f5236', [0, -0.05, 0]); S(top, 0.08, '#7a5a34', [0.12, -0.14, 0.05]); S(top, 0.08, '#7a5a34', [-0.08, -0.15, -0.08]);
  return g;
}
export function lamp(p, pos, on = true, h = 3.2) {
  const g = G(p, pos);
  C(g, [0.05, 0.07, h, 6], '#3d3d46', [0, h / 2, 0]);
  B(g, [0.5, 0.05, 0.05], '#3d3d46', [0.22, h, 0]);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), on ? glow('#fff0b8') : M('#eeeeee'));
  bulb.position.set(0.45, h - 0.12, 0); g.add(bulb);
  if (on) { const halo = new THREE.Mesh(new THREE.SphereGeometry(0.42, 8, 6), glow('#ffe9a0', 0.22)); halo.position.copy(bulb.position); g.add(halo); }
  return g;
}
export function bench(p, pos, ry = 0, col = '#a8744a') {
  const g = G(p, pos, [0, ry, 0]);
  B(g, [1.6, 0.08, 0.45], col, [0, 0.45, 0]);
  B(g, [1.6, 0.4, 0.07], col, [0, 0.8, -0.2], [-0.15, 0, 0]);
  B(g, [0.08, 0.45, 0.4], '#444', [-0.65, 0.22, 0]); B(g, [0.08, 0.45, 0.4], '#444', [0.65, 0.22, 0]);
  return g;
}
export function table(p, pos, r = 0.45, h = 0.75, col = '#b07a4f') {
  const g = G(p, pos);
  C(g, [r, r, 0.06, 14], col, [0, h, 0]);
  C(g, [0.05, 0.05, h, 6], '#555', [0, h / 2, 0]);
  C(g, [0.22, 0.24, 0.04, 10], '#555', [0, 0.02, 0]);
  return g;
}
export function chair(p, pos, ry = 0, col = '#c98d5b') {
  const g = G(p, pos, [0, ry, 0]);
  B(g, [0.45, 0.06, 0.45], col, [0, 0.42, 0]);
  B(g, [0.45, 0.5, 0.06], col, [0, 0.72, -0.2]);
  for (const [x, z] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]) B(g, [0.05, 0.42, 0.05], col, [x, 0.21, z]);
  return g;
}
export function cloud(p, pos, s = 1, col = '#ffffff') {
  const g = G(p, pos); g.scale.setScalar(s);
  [[0, 0, 0, 1], [0.9, -0.1, 0.1, 0.75], [-0.9, -0.12, -0.1, 0.7], [0.35, 0.35, -0.1, 0.7], [-1.5, -0.25, 0, 0.45], [1.55, -0.25, 0, 0.45]].forEach(([x, y, z, r]) => {
    const b = S(g, r, col, [x, y, z], [1, 0.75, 1]); b.castShadow = false;
  });
  return g;
}
export function rock(p, pos, s = 1, col = '#a9a9b2') {
  const geo = displace(new THREE.IcosahedronGeometry(0.5, 2), 0.13, 2.4, pos[0] * 3.3 + pos[2] * 1.9);
  const m = new THREE.Mesh(geo, M(col, FLAT));
  m.position.set(pos[0], pos[1], pos[2]); m.scale.set(s, s * 0.72, s * 0.9); m.rotation.y = s * 7;
  m.castShadow = m.receiveShadow = true; p.add(m); return m;
}
export function bush(p, pos, s = 1, col = '#4f8f4a') {
  const g = G(p, pos); g.scale.setScalar(s);
  const sd = pos[0] + pos[2] * 2;
  blob(g, 0.45, col, [0, 0.3, 0], [1, 0.85, 1], { seed: sd }); blob(g, 0.32, shade(col, 0.9), [0.38, 0.22, 0.1], null, { seed: sd + 2 }); blob(g, 0.3, shade(col, 1.08), [-0.36, 0.2, -0.05], null, { seed: sd + 5 });
  return g;
}
export function flower(p, pos, col = '#ff7eb6', s = 1) {
  const g = G(p, pos); g.scale.setScalar(s);
  C(g, [0.02, 0.02, 0.35, 4], '#4fa85a', [0, 0.175, 0]);
  S(g, 0.09, col, [0, 0.38, 0], [1, 0.7, 1], 6);
  S(g, 0.04, '#ffe36e', [0, 0.42, 0], null, 5);
  return g;
}
export function tulip(p, pos, col = '#ff5d8f', s = 1) {
  const g = G(p, pos); g.scale.setScalar(s);
  C(g, [0.02, 0.02, 0.4, 4], '#4fa85a', [0, 0.2, 0]);
  C(g, [0.09, 0.05, 0.16, 6], col, [0, 0.46, 0]);
  return g;
}
export function balloon(p, pos, col = '#ff7eb6', len = 1.6) {
  const g = G(p, pos);
  S(g, 0.3, col, [0, len + 0.3, 0], [1, 1.2, 1], 10);
  K(g, [0.06, 0.08, 5], col, [0, len - 0.03, 0]);
  C(g, [0.008, 0.008, len, 3], '#ffffff', [0, len / 2, 0]);
  return g;
}
export function house(p, pos, w, h, d, col = '#ffffff', o = {}) {
  const g = G(p, pos, [0, o.ry || 0, 0]);
  B(g, [w, h, d], col, [0, h / 2, 0]);
  if (o.roof) { const r = K(g, [Math.max(w, d) * 0.78, o.roofH || 0.9, 4], o.roof, [0, h + (o.roofH || 0.9) / 2, 0], [0, Math.PI / 4, 0]); r.scale.set(1, 1, d / w); }
  const wc = o.win || '#5c7fa3';
  const n = Math.max(1, Math.floor(w / 0.9)), rows = Math.max(1, Math.floor(h / 1.1));
  for (let r = 0; r < rows; r++) for (let i = 0; i < n; i++) {
    const x = (i - (n - 1) / 2) * (w / n), y = 0.75 + r * 1.05;
    if (y > h - 0.3) continue;
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.45, 0.04), o.lit ? glow(o.lit) : M(wc));
    m.position.set(x, y, d / 2 + 0.01); g.add(m);
  }
  if (o.door) B(g, [0.45, 0.8, 0.05], o.door, [0, 0.4, d / 2 + 0.015]);
  return g;
}
export function parasol(p, pos, col = '#ff7eb6', col2 = '#ffffff') {
  const g = G(p, pos);
  C(g, [0.03, 0.03, 2.2, 5], '#eeeeee', [0, 1.1, 0]);
  K(g, [1.25, 0.45, 10], col, [0, 2.3, 0]);
  S(g, 0.06, col2, [0, 2.56, 0]);
  return g;
}
/** loď s oblým trupom. Počiatok je na hladine; userData.deckY = výška paluby */
export function boat(p, pos, o = {}) {
  const g = G(p, pos, [0, o.ry || 0, 0]);
  const L = o.len || 3.2, Wd = o.w || 1.3, fb = o.fb ?? 0.42, depth = o.depth ?? 0.62, col = o.col || '#ffffff';
  const N = 20, Q = 8;
  const hw = (t) => (Wd / 2) * (t < 0.5 ? 0.8 + 0.2 * Math.sin(t * Math.PI) : Math.pow(Math.max(0, 1 - Math.pow((t - 0.5) / 0.5, 2.4)), 0.7));
  const sheer = (t) => fb + (o.rise ?? 0.3) * t * t * t;
  const dp = (t) => depth * (1 - 0.4 * t * t);
  const v = [], idx = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, z = (t - 0.5) * L;
    for (let j = 0; j <= 2 * Q; j++) { const a = (j / (2 * Q)) * Math.PI - Math.PI / 2; v.push(hw(t) * Math.sin(a), sheer(t) - dp(t) * Math.pow(Math.cos(a), 0.75), z); }
  }
  const row = 2 * Q + 1;
  for (let i = 0; i < N; i++) for (let j = 0; j < 2 * Q; j++) { const a = i * row + j, b = a + row; idx.push(a, b, a + 1, a + 1, b, b + 1); }
  const c0 = v.length / 3; v.push(0, sheer(0) - dp(0) * 0.45, -L / 2);
  for (let j = 0; j < 2 * Q; j++) idx.push(c0, j, j + 1);
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3)); geo.setIndex(idx); geo.computeVertexNormals();
  const hull = new THREE.Mesh(geo, M(col, { side: THREE.DoubleSide, roughness: 0.5 })); hull.castShadow = hull.receiveShadow = true; g.add(hull);
  // okraj
  for (const sd of [1, -1]) {
    const pts = []; for (let i = 0; i <= N; i++) { const t = i / N; pts.push(new THREE.Vector3(sd * hw(t), sheer(t), (t - 0.5) * L)); }
    const tb = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, o.rail ?? 0.035, 8), M(o.trim || '#3aa0c8')); tb.castShadow = true; g.add(tb);
  }
  B(g, [Wd * 0.8, 0.07, 0.07], o.trim || '#3aa0c8', [0, sheer(0), -L / 2]);
  // paluba
  const deckY = fb - (o.well ?? 0.05), dv = [], di = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, c = Math.min(1, Math.pow(Math.max(0, (sheer(t) - deckY) / dp(t)), 1 / 0.75)), x = hw(t) * Math.sqrt(1 - c * c) * 0.985;
    dv.push(-x, deckY, (t - 0.5) * L, x, deckY, (t - 0.5) * L);
    if (i < N) { const a = i * 2; di.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.Float32BufferAttribute(dv, 3)); dg.setIndex(di); dg.computeVertexNormals();
  const deck = new THREE.Mesh(dg, M(o.deck || '#d9b98a', { side: THREE.DoubleSide })); deck.receiveShadow = true; g.add(deck);
  g.userData.deckY = deckY; g.userData.hw = hw; g.userData.sheer = sheer; g.userData.L = L;
  return g;
}
export function stringLights(p, a, b, n = 8, sag = 0.5, cols = ['#ffd86e', '#ff8fb8', '#9fe0ff']) {
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), glow(cols[i % cols.length]));
    m.position.set(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t - Math.sin(t * Math.PI) * sag, a[2] + (b[2] - a[2]) * t);
    p.add(m);
  }
}
export function giftBox(p, pos, col = '#ff7eb6', rib = '#ffffff', s = 1) {
  const g = G(p, pos); g.scale.setScalar(s);
  B(g, [0.4, 0.3, 0.4], col, [0, 0.15, 0]);
  B(g, [0.42, 0.31, 0.08], rib, [0, 0.15, 0]); B(g, [0.08, 0.31, 0.42], rib, [0, 0.15, 0]);
  S(g, 0.07, rib, [0.06, 0.34, 0]); S(g, 0.07, rib, [-0.06, 0.34, 0]);
  return g;
}
/** hora s nerovným povrchom a snehovou čiapkou */
export function mountain(p, pos, r, h, col = '#8e9aa8', snow = true) {
  const geo = new THREE.ConeGeometry(r, h, 30, 12); geo.translate(0, h / 2, 0);
  const sd = pos[0] * 1.3 + pos[2] * 0.7;
  displace(geo, r * 0.14, 1.5 / r * 2, sd);
  const P = geo.attributes.position, base = new THREE.Color(col), c = new THREE.Color(), cols = new Float32Array(P.count * 3);
  for (let i = 0; i < P.count; i++) {
    const x = P.getX(i), y = P.getY(i), z = P.getZ(i), t = y / h;
    if (snow && t > 0.52 + noise3(x * 1.4 + sd, y, z * 1.4) * 0.14) c.set('#f7faff').multiplyScalar(0.94 + noise3(x * 2, y * 2, z * 2) * 0.06);
    else c.copy(base).multiplyScalar(1 + noise3(x * 1.1 + sd, y * 1.6, z * 1.1) * 0.16 - (1 - t) * 0.08);
    cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  const m = new THREE.Mesh(geo, rockMat); m.position.set(pos[0], pos[1], pos[2]); m.receiveShadow = true; p.add(m);
  return m;
}
export const rnd = (seed) => { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };
