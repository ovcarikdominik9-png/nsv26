// Mapa: ostrovy nad ružovým morom, na každom špendlíky so spomienkami.
import { THREE, G, B, C, K, S, M, glow, heart, sprite, cloud, pine, palm, tree, mountain, tulip, house } from './kit.js';
import { MOMENTS } from './moments.js';

export const MAP_ENV = {
  sky: ['#ffb7d5', '#ffe8f1'], fog: ['#ffd0e2', 110, 300],
  sun: ['#fff4e0', 2.6, [30, 50, 20]], hemi: ['#ffffff', '#ffb7d0', 2.1], shadows: false,
};
export const MAP_CAM = { pos: [4, 58, 62], target: [2, 0, 4] };

const ISLANDS = {
  holandsko: { name: 'Holandsko', pos: [-34, -22], r: 6, top: '#a9e28c' },
  praha: { name: 'Praha', pos: [-15, -13], r: 5.5, top: '#b5e39a' },
  tatry: { name: 'Vysoké Tatry', pos: [8, -18], r: 6.2, top: '#f4f8ff' },
  gelnica: { name: 'Gelnica', pos: [21, -9], r: 4.2, top: '#e6f3ff' },
  kosice: { name: 'Košice', pos: [31, 5], r: 9, top: '#b9e79c' },
  tokaj: { name: 'Tokaj', pos: [18, 19], r: 4.6, top: '#cfe58a' },
  budapest: { name: 'Budapešť', pos: [3, 8], r: 5.6, top: '#bfe6a0' },
  polignano: { name: 'Polignano a Mare', pos: [-4, 31], r: 5.6, top: '#f1e6cf' },
  sardinia: { name: 'Sardínia', pos: [-28, 22], r: 6.2, top: '#f6e3b4' },
};

function landmark(id, g) {
  switch (id) {
    case 'kosice': { // dóm sv. Alžbety + domčeky
      B(g, [1.6, 1.6, 3.2], '#e9dcc3', [0, 1.3, -1]);
      K(g, [1.25, 1.2, 4], '#8a6a9a', [0, 2.6, -1], [0, Math.PI / 4, 0]).scale.z = 2;
      B(g, [0.9, 3.2, 0.9], '#e9dcc3', [0, 2.1, 0.9]); K(g, [0.7, 1.8, 4], '#6f8f7a', [0, 4.6, 0.9], [0, Math.PI / 4, 0]);
      [['#ffd1dc', -3.2, -2.5], ['#fff1b8', -4.4, 0.5], ['#cfe8ff', 3.4, -2.6], ['#ffe0c2', 4.6, 0.4], ['#e3d4ff', -2.2, 3.6], ['#d6f5d6', 2.6, 3.8]].forEach(([c, x, z]) =>
        house(g, [x, 0.5, z], 1.3, 1.1, 1.2, c, { roof: '#d9715b', roofH: 0.7 }));
      tree(g, [-5.6, 0.5, -2.6], 0.8); tree(g, [5.8, 0.5, -2.4], 0.8); tree(g, [0, 0.5, -5.5], 0.9);
      break;
    }
    case 'tatry':
      mountain(g, [-1.2, 0.5, -1.6], 2.6, 5.2); mountain(g, [1.8, 0.5, -1.2], 2.2, 4.2); mountain(g, [0.4, 0.5, -3.4], 2.4, 4.6);
      pine(g, [-3.6, 0.5, 1.4], 0.75, true); pine(g, [3.8, 0.5, 1.6], 0.7, true); pine(g, [-2.4, 0.5, 2.8], 0.6, true);
      C(g, [1.3, 1.3, 0.06, 12], '#bfe6ff', [1.2, 0.53, 2.2]).scale.z = 0.7;
      break;
    case 'gelnica':
      mountain(g, [-1.6, 0.5, -1.6], 1.8, 2.2, '#7fb58c', false, 7); mountain(g, [1.4, 0.5, -1.8], 1.6, 1.8, '#8fc39a', false, 7);
      C(g, [1.5, 1.5, 0.08, 14], '#d6f1ff', [0, 0.54, 1.2]).scale.z = 0.65;
      pine(g, [2.6, 0.5, 0.6], 0.6, true); pine(g, [-2.8, 0.5, 0.8], 0.55, true);
      break;
    case 'tokaj':
      for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) S(g, 0.26, r % 2 ? '#8fcf6a' : '#7cc25c', [-2.2 + i * 0.85, 0.7, -2.4 + r * 0.9], null, 6);
      C(g, [0.5, 0.5, 0.9, 10], '#a8744a', [1.4, 1.0, 2], [0, 0, Math.PI / 2]);
      S(g, 0.2, '#9b5fc0', [-1.4, 0.9, 2.2]); S(g, 0.2, '#9b5fc0', [-1.1, 0.75, 2.4]); S(g, 0.2, '#9b5fc0', [-1.65, 0.75, 2.5]);
      break;
    case 'budapest': { // parlament
      B(g, [5.4, 1.1, 1.3], '#f1e7d6', [0, 1.05, -1.6]);
      B(g, [5.5, 0.25, 1.4], '#b0564e', [0, 1.7, -1.6]);
      C(g, [0.7, 0.7, 0.9, 10], '#f1e7d6', [0, 2.1, -1.6]);
      const d = new THREE.Mesh(new THREE.SphereGeometry(0.75, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), M('#b0564e')); d.position.set(0, 2.55, -1.6); d.scale.y = 1.3; g.add(d);
      K(g, [0.08, 0.9, 5], '#b0564e', [0, 3.9, -1.6]);
      [-2.5, -1.4, 1.4, 2.5].forEach(x => K(g, [0.2, 1.2, 4], '#b0564e', [x, 2.4, -1.6]));
      B(g, [9, 0.06, 1.6], '#8fd4ee', [0, 0.53, 0.6]);
      break;
    }
    case 'praha': { // Karlov most + hrad
      B(g, [8, 0.06, 1.8], '#8fd4ee', [0, 0.53, 1]);
      B(g, [0.9, 0.3, 4.6], '#c9b79c', [0, 1.2, 1]);
      [-1.2, 0, 1.2].forEach(z => B(g, [0.7, 0.8, 0.5], '#b9a78c', [0, 0.8, 1 + z]));
      for (const z of [-1.4, 3.4]) { B(g, [1, 2.2, 0.9], '#8f8577', [0, 1.6, z]); K(g, [0.8, 1.3, 4], '#4b4f5c', [0, 3.3, z], [0, Math.PI / 4, 0]); }
      B(g, [3.2, 1, 1], '#efe3cc', [-2.6, 1.6, -2.8]); B(g, [3.6, 1.2, 1.6], '#9bc48a', [-2.6, 0.9, -2.8]);
      K(g, [0.3, 1.8, 4], '#3f4652', [-2.2, 3, -2.8]); K(g, [0.25, 1.4, 4], '#3f4652', [-3, 2.8, -2.8]);
      break;
    }
    case 'holandsko': { // veterný mlyn + tulipány
      C(g, [0.6, 1, 2.6, 8], '#f3ead9', [-1.6, 1.8, -1.6]); K(g, [0.75, 0.8, 8], '#a0523d', [-1.6, 3.5, -1.6]);
      const w = G(g, [-1.6, 3.1, -0.95]); w.userData.spin = 0.6;
      for (let i = 0; i < 4; i++) B(w, [0.28, 2.1, 0.05], '#ffffff', [Math.sin(i * Math.PI / 2) * 1.05, Math.cos(i * Math.PI / 2) * 1.05, 0], [0, 0, -i * Math.PI / 2]);
      ['#ff5d8f', '#ffd24a', '#ff8a3c', '#c56bff', '#ffffff'].forEach((c, r) => { for (let i = 0; i < 9; i++) tulip(g, [0.2 + i * 0.5, 0.5, -1.5 + r * 0.8], c, 1.2); });
      break;
    }
    case 'polignano': { // útesy s bielymi domami
      B(g, [3, 2.2, 2.6], '#d9c3a0', [-2.2, 1.6, -1.4]); B(g, [3, 2.6, 2.6], '#cdb48e', [2.4, 1.8, -1.4]);
      B(g, [1.7, 0.5, 0.6], '#cdb48e', [0.1, 1.7, -2.2]);
      [[-3, 2.7, -1.8, 0.9], [-1.9, 2.7, -1.2, 1.2], [1.6, 3.1, -1.6, 1.1], [2.8, 3.1, -1.1, 0.8], [2.2, 3.1, -2.3, 1.0]].forEach(([x, y, z, h]) => B(g, [0.9, h, 0.9], '#ffffff', [x, y + h / 2, z]));
      C(g, [1.6, 1.6, 0.06, 12], '#49d6d0', [0.1, 0.54, 1.2]);
      break;
    }
    case 'sardinia':
      palm(g, [-2.2, 0.5, -1.4], 0.8); palm(g, [2.4, 0.5, -2], 0.9); palm(g, [0.4, 0.5, -3], 0.7);
      B(g, [3.4, 1.2, 1.2], '#e8c79a', [-0.4, 1.1, -3.6]);
      K(g, [1.25, 0.45, 10], '#ff7eb6', [2, 2, 1.6]); C(g, [0.03, 0.03, 1.6, 4], '#fff', [2, 1.2, 1.6]);
      break;
  }
}

export function buildMap(api) {
  const g = new THREE.Group();
  const updates = [];
  // more
  const sea = new THREE.Mesh(new THREE.CircleGeometry(260, 48), M('#ffb3d1'));
  sea.rotation.x = -Math.PI / 2; g.add(sea);
  // ostrovy
  const pins = {};
  for (const [id, I] of Object.entries(ISLANDS)) {
    const ig = G(g, [I.pos[0], 0, I.pos[1]]);
    C(ig, [I.r * 1.1, I.r * 1.16, 0.24, 18], '#ffeecb', [0, 0.1, 0]);
    C(ig, [I.r * 1.22, I.r * 1.22, 0.06, 18], M('#ffe3ee', { transparent: true, opacity: 0.75 }), [0, 0.04, 0]);
    C(ig, [I.r, I.r * 1.04, 0.5, 18], I.top, [0, 0.25, 0]);
    landmark(id, ig);
    sprite(ig, I.name, 7, 1.55, { bg: '#ffffffee', fg: '#e0568e', size: 60, radius: 56 }, [0, 1.1, I.r + 1.6]);
    const ms = MOMENTS.filter(m => m.island === id);
    ms.forEach((m, i) => {
      const a = ms.length === 1 ? 0 : (i / ms.length) * Math.PI * 2 + 0.4;
      const rr = ms.length === 1 ? I.r * 0.45 : I.r * 0.72;
      const p = G(ig, [Math.sin(a) * rr, 0.5, Math.cos(a) * rr * (ms.length === 1 ? 1 : 0.95)]); p.scale.setScalar(1.25);
      K(p, [0.22, 1.3, 6], '#ffffff', [0, 0.65, 0], [Math.PI, 0, 0]);
      const top = G(p, [0, 2.4, 0]);
      const h = heart(top, 1.25, '#ff4f8b', [0, 0, 0]);
      const em = sprite(top, m.emoji, 1.5, 1.5, { cw: 128, ch: 128, size: 78, bg: '#ffffff', radius: 64 }, [0, 1.75, 0]);
      const hit = new THREE.Mesh(new THREE.SphereGeometry(1.9, 8, 6), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
      hit.position.y = 2.6; p.add(hit);
      p.userData.moment = m.id;
      pins[m.id] = { heart: h, em };
      const ph = i * 1.7 + I.pos[0];
      updates.push(t => { top.position.y = 2.4 + Math.sin(t * 2 + ph) * 0.18; h.rotation.y = Math.sin(t * 1.2 + ph) * 0.5; });
    });
  }
  // obláčik s tajným listom
  const env = G(g, [-13, 3.2, 6]);
  cloud(env, [0, 0, 0], 1.9);
  const letter = G(env, [0, 1.7, 0]);
  B(letter, [2.2, 1.4, 0.16], '#fff7fb', [0, 0, 0]);
  B(letter, [1.56, 0.06, 0.2], '#ffb3cf', [-0.55, 0.3, 0], [0, 0, -0.55]); B(letter, [1.56, 0.06, 0.2], '#ffb3cf', [0.55, 0.3, 0], [0, 0, 0.55]);
  heart(letter, 0.5, '#ff4f8b', [0, -0.05, 0.14]);
  const lhit = new THREE.Mesh(new THREE.SphereGeometry(2.6, 8, 6), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
  lhit.position.y = 1; env.add(lhit);
  env.userData.tap = () => api.onLetter();
  env.userData.tapH = 3.4;
  updates.push(t => { env.position.y = 3.2 + Math.sin(t * 0.8) * 0.35; letter.rotation.y = Math.sin(t * 0.6) * 0.35; });
  // oblaky, balón
  const clouds = [];
  [[-48, 9, -6, 2.2], [-22, 11, 40, 1.8], [44, 10, 26, 2.4], [16, 12, -34, 2], [-6, 13, -30, 1.6], [48, 9, -18, 1.9], [-46, 10, 34, 1.7], [10, 14, 44, 1.5]].forEach(([x, y, z, s], i) => {
    const c = cloud(g, [x, y, z], s); clouds.push(c);
    updates.push(t => { c.position.x = x + Math.sin(t * 0.05 + i) * 6; });
  });
  const bal = G(g, [0, 12, 0]);
  S(bal, 1.5, '#ff7eb6', [0, 2, 0], [1, 1.15, 1], 10); S(bal, 1.52, '#ffffff', [0, 2, 0], [1.01, 0.3, 1.01], 10);
  B(bal, [0.7, 0.5, 0.7], '#b98a5e', [0, -0.2, 0]);
  for (const [x, z] of [[0.3, 0.3], [-0.3, 0.3], [0.3, -0.3], [-0.3, -0.3]]) C(bal, [0.015, 0.015, 1.3, 3], '#ffffff', [x, 0.6, z]);
  heart(bal, 0.7, '#ffffff', [0, 2.1, 1.5]);
  updates.push(t => { const a = t * 0.07; bal.position.set(Math.cos(a) * 30 - 4, 13 + Math.sin(t * 0.5) * 0.6, Math.sin(a) * 24 + 6); });
  // otáčanie mlyna
  g.traverse(o => { if (o.userData.spin) updates.push((t) => { o.rotation.z = t * o.userData.spin; }); });

  return {
    group: g,
    update: (t) => updates.forEach(f => f(t)),
    mark(id, visited, found) {
      const p = pins[id]; if (!p) return;
      p.heart.material = found ? M('#ffc94a') : visited ? M('#ff9cc0') : M('#ff4f8b');
    },
  };
}
