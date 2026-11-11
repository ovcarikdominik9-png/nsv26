// Scény 11–14: stužková, Gelnica, Budapešť, jazz club
import { THREE, G, B, C, K, S, T, M, glow, glass, heart, label, sprite, base, person, pose, idle, pine, lamp, bench, table, chair, balloon, house, mountain, stringLights } from '../kit.js';
import { light } from './s1.js';

const hitBall = (p, r = 0.6) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })); p.add(m); return m; };
const gl = (p, geo, col, pos, op = 1) => { const m = new THREE.Mesh(geo, glow(col, op)); if (pos) m.position.set(...pos); p.add(m); return m; };

// ---------- 11. Stužková ----------
export const stuzkova = {
  env: { sky: ['#2a2350', '#8a5fa0'], sun: ['#ffe9d0', 1.5, [4, 12, 9]], hemi: ['#ffeedd', '#6a4a7a', 1.7], fx: 'sparkle' },
  cam: { pos: [0.4, 4.8, 13], target: [0, 1.7, -0.4] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.2, top: '#c99a6b', side: '#8a5a3a', under: '#5a3a22' });
    C(g, [3.6, 3.6, 0.03, 36], '#b98a58', [0, 0.02, 0.5]).castShadow = false;
    C(g, [3.3, 3.3, 0.035, 36], '#d6a877', [0, 0.02, 0.5]).castShadow = false;
    // sála
    B(g, [12.4, 5.6, 0.3], '#f3e8d8', [0, 2.8, -4.3]); B(g, [0.3, 5.6, 5.6], '#efe2d0', [-6.05, 2.8, -1.6]);
    B(g, [12.4, 0.5, 0.4], '#ffffff', [0, 5.5, -4.25]); B(g, [12.4, 0.9, 0.36], '#e6d6c0', [0, 0.45, -4.28]);
    for (const x of [-5, -2.5, 2.5, 5]) { C(g, [0.24, 0.28, 5, 10], '#ffffff', [x, 2.5, -3.9]); B(g, [0.7, 0.2, 0.7], '#ffffff', [x, 5.1, -3.9]); }
    for (const x of [-3.75, 3.75]) { B(g, [1.7, 4.2, 0.12], '#a8324a', [x, 2.9, -4.08]); for (let i = 0; i < 4; i++) B(g, [0.12, 4.2, 0.16], '#8f2a40', [x - 0.6 + i * 0.4, 2.9, -4.04]); }
    B(g, [4.4, 1.1, 0.1], '#2e7d4f', [0, 3.5, -4.1]); label(g, 'STUŽKOVÁ', 4, 0.9, { fg: '#ffe9a8', size: 100 }, [0, 3.5, -4.04]);
    stringLights(g, [-6, 5, -1], [-6, 5, -4.1], 6, 0.3, ['#ffe9a8']); stringLights(g, [-5.9, 5.15, -4.05], [5.9, 5.15, -4.05], 26, 0.45, ['#ffe9a8', '#ffffff']);
    // pódium
    B(g, [4.6, 0.35, 1.5], '#5a3a22', [0, 0.17, -3.3]);
    for (const x of [-1.9, 1.9]) { B(g, [0.6, 1.1, 0.5], '#26262b', [x, 0.9, -3.4]); C(g, [0.18, 0.18, 0.05, 10], '#555', [x, 1.1, -3.13], [Math.PI / 2, 0, 0]); C(g, [0.11, 0.11, 0.05, 10], '#555', [x, 0.65, -3.13], [Math.PI / 2, 0, 0]); }
    ctx.tap(B(g, [1.2, 0.5, 0.6], '#3d3d46', [0, 0.6, -3.4]), ['DJ púšťa našu pesničku 🎶', 'Ešte jeden tanec!']);
    // luster
    const lu = G(g, [0, 4.6, 0.5]);
    C(lu, [0.02, 0.02, 1.6, 4], '#d9b76a', [0, 0.9, 0]); T(lu, [0.9, 0.04], '#d9b76a', null, [Math.PI / 2, 0, 0]); T(lu, [0.5, 0.04], '#d9b76a', [0, -0.3, 0], [Math.PI / 2, 0, 0]);
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; gl(lu, new THREE.SphereGeometry(0.09, 6, 5), '#fff3c8', [Math.cos(a) * 0.9, -0.08, Math.sin(a) * 0.9]); if (i % 2) gl(lu, new THREE.OctahedronGeometry(0.08), '#ffffff', [Math.cos(a) * 0.5, -0.45, Math.sin(a) * 0.5]); }
    gl(lu, new THREE.OctahedronGeometry(0.16), '#ffffff', [0, -0.7, 0]);
    hitBall(lu, 1); ctx.tap(lu, ['Luster v Dome umenia ✨'], -0.6);
    ctx.anim(t => { lu.rotation.y = t * 0.15; });
    light(g, '#ffe2b0', 40, [0, 3.8, 0.5], 14);
    // stoly
    for (const [x, z] of [[-4.4, 1.2], [4.6, 0.6], [4.4, -2.2]]) {
      C(g, [0.9, 1.0, 0.76, 16], '#ffffff', [x, 0.38, z]); C(g, [0.92, 0.92, 0.03, 16], '#fff7ee', [x, 0.77, z]);
      C(g, [0.05, 0.08, 0.26, 6], '#2e7d4f', [x, 0.92, z]); for (let i = 0; i < 3; i++) S(g, 0.07, ['#ff8fb8', '#ffffff', '#ffd3e3'][i], [x + Math.cos(i * 2.1) * 0.08, 1.1, z + Math.sin(i * 2.1) * 0.08], null, 5);
      for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.5; C(g, [0.04, 0.02, 0.14, 6], glass('#ffffff', 0.5), [x + Math.cos(a) * 0.55, 0.86, z + Math.sin(a) * 0.55]); }
    }
    ['#2e9e4f', '#ffffff', '#ffd24a', '#2e9e4f'].forEach((c, i) => balloon(g, [-5.3 + (i % 2) * 0.45, 0, -2.6 + i * 0.5], c, 2.3 + i * 0.25));
    // my dvaja tancujeme
    const pair = G(g, [0, 0, 0.6]);
    const d = person(pair, 'd', { top: '#8d919b', topType: 'suit', bottom: '#8d919b', shoes: '#1c1c21', tie: '#3d3d46' }, [-0.27, 0, 0], Math.PI / 2);
    B(d.userData.parts.body, [0.05, 0.16, 0.02], '#2e9e4f', [0.1, 1.42, 0.15], [0, 0, 0.2]);
    pose(d, { armL: [-1.1, 0.35], armR: [-1.0, 0.1], elbowR: -0.5 });
    const m = person(pair, 'm', { top: M('#cfd3de', { emissive: '#5a5f6e' }), topType: 'dress', dressLen: 0.86, sleeves: 'none', shoes: '#c9ccd6', shoeType: 'heel' }, [0.27, 0, 0], -Math.PI / 2);
    B(m.userData.parts.body, [0.05, 0.16, 0.02], '#2e9e4f', [-0.1, 1.42, 0.14], [0, 0, -0.2]);
    for (let i = 0; i < 14; i++) { const a = i * 2.4, y = 0.25 + (i * 0.37 % 1) * 1.1, r = 0.2 + (1.0 - Math.min(1, y)) * 0.34; gl(m.userData.parts.body, new THREE.OctahedronGeometry(0.018), '#ffffff', [Math.cos(a) * r, y, Math.sin(a) * r * 0.85]); }
    pose(m, { armR: [-1.1, -0.35], armL: [-1.45, -0.1], elbowL: -0.3 });
    ctx.tap(d, ['Smiem prosiť? 🕺', 'Nestúpam ti na nohy, však?'], 2.35); ctx.tap(m, ['Dnes večer tancujem iba s tebou 💃', 'Toč ma!'], 2.15);
    ctx.anim(t => { pair.rotation.y = t * 0.55; pair.position.x = Math.sin(t * 0.4) * 0.9; pair.position.z = 0.6 + Math.cos(t * 0.4) * 0.6; d.userData.parts.body.position.y = Math.abs(Math.sin(t * 2.3)) * 0.03; m.userData.parts.body.position.y = Math.abs(Math.sin(t * 2.3)) * 0.03; });
    // ďalšie páry
    [[-2.9, -1.2, '#26262b', '#c0392b', '#3a2a20', '#7a4a2f'], [3.0, -1.4, '#2f3a55', '#3f6fb3', '#2b2b2b', '#c98a4a']].forEach(([x, z, c1, c2, h1, h2], i) => {
      const pg = G(g, [x, 0, z]);
      pose(person(pg, { hair: h1, h: 1.82 }, { top: c1, topType: 'suit', bottom: c1, shoes: '#1c1c21', tie: '#8f2a40' }, [-0.27, 0, 0], Math.PI / 2), { armL: [-1.1, 0.35], armR: [-1.0, 0.1] });
      pose(person(pg, { hair: h2, h: 1.66, style: 'long', w: 0.9 }, { top: c2, topType: 'dress', dressLen: 0.8, sleeves: 'none', shoes: c2 }, [0.27, 0, 0], -Math.PI / 2), { armR: [-1.1, -0.35], armL: [-1.4, -0.1] });
      ctx.anim(t => { pg.rotation.y = -t * 0.45 + i * 2; });
    });
    ctx.secret([-5.2, 0.45, -3.4], 0.26);
  },
};

// ---------- 12. Korčuľovanie v Gelnici ----------
function blades(p) {
  const q = p.userData.parts;
  for (const kn of [q.kneeL, q.kneeR]) B(kn, [0.025, 0.07, 0.34], '#dfe6ee', [0, -0.5, 0.05]);
  q.body.position.y += 0.07 * q.k;
}
export const gelnica = {
  env: { sky: ['#182250', '#6f86c2'], fog: ['#3d4f8a', 30, 95], sun: ['#cfdcff', 1.6, [-5, 12, 7]], hemi: ['#c0ceff', '#445068', 1.6], fx: 'snow', stars: true },
  cam: { pos: [0.4, 6.4, 13.2], target: [0, 1, 0] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.6, top: '#f4f8ff', side: '#cfd9e6', under: '#9aa7b8' });
    // ľad a mantinely
    B(g, [10.4, 0.06, 6], '#d8f0ff', [0, 0.04, 0.4]).castShadow = false;
    C(g, [0.9, 0.9, 0.01, 24], '#ff8fa8', [0, 0.075, 0.4]).castShadow = false; C(g, [0.82, 0.82, 0.012, 24], '#d8f0ff', [0, 0.076, 0.4]).castShadow = false;
    B(g, [0.08, 0.01, 6], '#ff6a7f', [0, 0.078, 0.4]); for (const x of [-2.6, 2.6]) B(g, [0.08, 0.01, 6], '#6a9aff', [x, 0.078, 0.4]);
    for (const [x, z, w, d] of [[0, -2.65, 10.6, 0.12], [0, 3.45, 10.6, 0.12], [-5.25, 0.4, 0.12, 6.2], [5.25, 0.4, 0.12, 6.2]]) { B(g, [w, 0.55, d], '#ffffff', [x, 0.3, z]); B(g, [w + 0.01, 0.1, d + 0.01], '#e0183c', [x, 0.12, z]); B(g, [w + 0.01, 0.06, d + 0.01], '#3f6fb3', [x, 0.56, z]); }
    // tribúna a nápis
    B(g, [7, 0.5, 1.2], '#8d919b', [0, 0.25, -3.7]); B(g, [7, 0.5, 0.7], '#7c8089', [0, 0.75, -3.95]);
    for (const x of [-3.4, 3.4]) C(g, [0.07, 0.07, 3.4, 6], '#4b4f5c', [x, 1.7, -4.3]);
    B(g, [7.4, 0.14, 1.9], '#4b4f5c', [0, 3.45, -3.7], [0.12, 0, 0]); B(g, [7.3, 0.1, 1.8], '#ffffff', [0, 3.55, -3.7], [0.12, 0, 0]);
    B(g, [5.4, 0.6, 0.08], '#1d4f9c', [0, 2.3, -4.3]); label(g, 'Zimný štadión Gelnica', 5.2, 0.52, { fg: '#ffffff', size: 60 }, [0, 2.3, -4.24]);
    // reflektory
    for (const [x, z] of [[-6, -2.6], [6, -2.6], [-6, 3.4], [6, 3.4]]) {
      C(g, [0.06, 0.09, 5, 6], '#4b4f5c', [x, 2.5, z]); B(g, [0.7, 0.4, 0.2], '#4b4f5c', [x * 0.97, 5.1, z * 0.97]);
      gl(g, new THREE.BoxGeometry(0.6, 0.3, 0.06), '#fffbe0', [x * 0.955, 5.08, z * 0.955]).lookAt(0, 0, 0.4);
      gl(g, new THREE.SphereGeometry(0.55, 8, 6), '#fff6c8', [x * 0.95, 5.05, z * 0.95], 0.18);
    }
    light(g, '#fff3d0', 60, [-4.5, 4.6, 2.6], 16); light(g, '#fff3d0', 60, [4.5, 4.6, -1.6], 16);
    // búdka s čajom
    const bd = house(g, [6.6, 0, 0.4], 1.6, 1.5, 1.4, '#a8744a', { roof: '#ffffff', roofH: 0.6, lit: '#ffd98a', ry: -Math.PI / 2 });
    label(bd, 'Čaj a punč', 1.3, 0.3, { bg: '#ffffff', fg: '#a8324a', size: 60, radius: 14 }, [0, 1.3, 0.72]);
    ctx.tap(bd, ['Horúci čaj ☕', 'Dva punče, prosím!'], 2.3);
    mountain(g, [-5.5, 0, -6], 2.6, 3.4, '#52688a', true, 7); mountain(g, [5, 0, -6.2], 3, 4.2, '#4a6082', true, 7);
    [[-7.4, 0.6, 1], [-7, -2.2, 0.9], [7.3, -2.2, 1], [-6.6, 4.6, 0.8], [3.6, 5.6, 0.7], [-2.4, 6.4, 0.8]].forEach(([x, z, s]) => pine(g, [x, 0, z], s, true));
    // my dvaja korčuľujeme
    const pair = G(g);
    const d = person(pair, 'd', { top: '#1c1c21', topType: 'coat', bottom: '#26262b', shoes: '#26262b' }, [-0.33, 0.07, 0], 0); blades(d);
    const m = person(pair, 'm', { top: '#3f8f5a', topType: 'jacket', bottom: '#2b2b33', shoes: '#ffffff', hat: '#ffffff', hatType: 'beanie', pom: '#ffffff', scarf: '#a9aeb8' }, [0.33, 0.07, 0], 0); blades(m);
    pose(d, { armL: [0, 0.32], armR: [0.3, -0.2] }); pose(m, { armR: [0, -0.32], armL: [-0.3, 0.5] });
    ctx.tap(d, ['Držím ťa. Oficiálne, aby si nespadla.', 'Neoficiálne ťa už nepustím.'], 2.4); ctx.tap(m, ['Nepúšťaj ma!', 'Ešte jedno kolečko! ⛸️'], 2.2);
    const dq = d.userData.parts, mq = m.userData.parts;
    ctx.anim(t => {
      const a = -t * 0.5; const x = Math.cos(a) * 3.7, z = 0.4 + Math.sin(a) * 1.9;
      pair.position.set(x, 0, z); pair.rotation.y = Math.atan2(Math.sin(a) * 3.7, -Math.cos(a) * 1.9);
      const s = Math.sin(t * 2.4) * 0.35;
      dq.legL.rotation.x = s; dq.legR.rotation.x = -s; mq.legL.rotation.x = -s; mq.legR.rotation.x = s;
      pair.rotation.z = 0;
    });
    // ďalší korčuliar
    const n = person(g, { hair: '#c0392b', h: 1.6 }, { top: '#ffd24a', topType: 'jacket', bottom: '#3a4a6a', shoes: '#fff', hat: '#3f6fb3', hatType: 'beanie' }, [0, 0.07, 0]); blades(n);
    ctx.anim(t => { const a = t * 0.7 + 2; n.position.set(Math.cos(a) * 2.2, 0.07, 0.4 + Math.sin(a) * 1.1); n.rotation.y = Math.atan2(-Math.sin(a) * 2.2, Math.cos(a) * 1.1); });
    ctx.tap(n, ['Pozor, idem! ⛸️'], 2);
    ctx.secret([7.4, 0.4, 1.6], 0.26);
  },
};

// ---------- 13. Valentín v Budapešti ----------
export const budapest = {
  env: { sky: ['#343a78', '#ff9cab'], fog: ['#9a7aa8', 32, 100], sun: ['#ffc4a0', 1.9, [-8, 5, 7]], hemi: ['#cfc4ff', '#665a7a', 1.7], fx: 'sparkle', stars: true },
  cam: { pos: [0.3, 3.8, 13.2], target: [0, 2.2, -1.6] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.7, top: '#a9a3ad', side: '#77727d', under: '#56525c' });
    // Dunaj
    B(g, [17, 0.06, 3.6], '#3a5aa6', [0, 0.04, -2.3]).castShadow = false;
    for (let i = 0; i < 16; i++) gl(g, new THREE.BoxGeometry(0.5 + (i % 3) * 0.3, 0.01, 0.06), i % 2 ? '#ffd98a' : '#ff9cab', [-6 + (i * 0.83 % 1) * 12, 0.08, -3.6 + (i * 0.37 % 1) * 2.2], 0.6);
    const ship = G(g, [0, 0.08, -2.2]);
    B(ship, [1.8, 0.25, 0.5], '#ffffff', [0, 0.12, 0]); B(ship, [1.1, 0.25, 0.4], '#ffffff', [-0.1, 0.36, 0]);
    for (let i = 0; i < 5; i++) gl(ship, new THREE.BoxGeometry(0.12, 0.1, 0.42), '#ffd98a', [-0.5 + i * 0.2, 0.36, 0]);
    ctx.anim(t => { ship.position.x = ((t * 0.35 + 7) % 15) - 7.5; });
    ctx.tap(ship, 'Výletná loď po Dunaji 🚢', 1);
    // druhý breh a parlament
    B(g, [15.4, 0.5, 3.4], '#8f8a94', [0, 0.25, -5.9]);
    const P = G(g, [0, 0.5, -5.6]);
    const st = '#efe2cc', rf = '#8f4a44';
    B(P, [11.4, 1.7, 1.5], st, [0, 0.85, 0]); B(P, [11.5, 0.5, 1.6], rf, [0, 1.95, 0]);
    B(P, [3.2, 2.4, 1.9], st, [0, 1.2, 0.15]); B(P, [3.3, 0.4, 2], rf, [0, 2.6, 0.15]);
    C(P, [0.95, 1.0, 1.0, 12], st, [0, 3.2, 0.1]);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(1.0, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), M(rf)); dome.position.set(0, 3.7, 0.1); dome.scale.y = 1.55; dome.castShadow = true; P.add(dome);
    C(P, [0.12, 0.2, 0.5, 6], st, [0, 5.4, 0.1]); K(P, [0.1, 1.3, 6], rf, [0, 6.3, 0.1]);
    for (const x of [-1.35, 1.35]) { B(P, [0.5, 3.6, 0.5], st, [x, 1.8, 0.75]); K(P, [0.34, 1.5, 4], rf, [x, 4.35, 0.75], [0, Math.PI / 4, 0]); }
    for (const x of [-5.5, -4, -2.6, 2.6, 4, 5.5]) { B(P, [0.36, 2.5, 0.36], st, [x, 1.25, 0.72]); K(P, [0.26, 1.1, 4], rf, [x, 3.05, 0.72], [0, Math.PI / 4, 0]); }
    for (const x of [-5.7, 5.7]) { B(P, [1.2, 2.2, 1.9], st, [x, 1.1, 0]); K(P, [0.9, 0.9, 4], rf, [x, 2.65, 0], [0, Math.PI / 4, 0]); }
    for (let r = 0; r < 2; r++) for (let i = 0; i < 26; i++) { const x = -5.2 + i * 0.416; if (Math.abs(x) < 1.7) continue; gl(P, new THREE.BoxGeometry(0.16, 0.34, 0.03), '#ffd98a', [x, 0.5 + r * 0.7, 0.76]); }
    for (let i = 0; i < 5; i++) gl(P, new THREE.BoxGeometry(0.22, 0.7, 0.03), '#ffd98a', [-1 + i * 0.5, 1.3, 1.11]);
    hitBall(P, 2.2).position.set(0, 3, 0.5); ctx.tap(P, ['Országház 🏛️', 'Svieti ako z rozprávky.'], 7.2);
    light(g, '#ffd09a', 30, [0, 2, -3.6], 10);
    // promenáda
    B(g, [15.6, 0.3, 0.3], '#8a8590', [0, 0.15, -0.35]);
    for (let i = 0; i < 16; i++) C(g, [0.035, 0.035, 0.9, 5], '#3d3d46', [-7.2 + i * 0.96, 0.75, -0.35]);
    B(g, [15, 0.06, 0.08], '#3d3d46', [0, 1.2, -0.35]); B(g, [15, 0.04, 0.05], '#3d3d46', [0, 0.8, -0.35]);
    const lock = G(g, [1.9, 0.98, -0.3]); B(lock, [0.12, 0.1, 0.04], '#ffd24a'); T(lock, [0.04, 0.012, Math.PI], '#c9ccd2', [0, 0.05, 0]); heart(lock, 0.05, '#e0183c', [0, 0, 0.03]); hitBall(lock, 0.3);
    ctx.tap(lock, ['Zámok lásky 🔒 D + M', 'Kľúč je v Dunaji.']);
    for (const x of [-4.6, 4.6]) { const l = lamp(g, [x, 0, 0.3], true, 3.3); if (x > 0) l.rotation.y = Math.PI; }
    light(g, '#ffe2a8', 16, [-3.6, 3, 0.6], 9); light(g, '#ffe2a8', 16, [3.6, 3, 0.6], 9);
    bench(g, [-4.4, 0, 2.6], 0.5); pine(g, [6.6, 0, 3], 0.9, true); pine(g, [-7, 0, 3.2], 0.8, true);
    S(g, 0.6, '#ffffff', [5, 0.05, 4.6], [1.4, 0.3, 1]); S(g, 0.5, '#ffffff', [-2.6, 0.05, 5.4], [1.4, 0.3, 1]);
    // my dvaja
    const d = person(g, 'd', { top: '#f3e6cf', topType: 'coat', bottom: '#1c1c21', shoes: '#1c1c21' }, [-0.4, 0, 1.6], 0.15);
    pose(d, { armL: [0, 0.3] }); idle(ctx, d, 0); ctx.tap(d, ['Poď, odfotíme sa.', 'Šťastného Valentína, cukrík 💗'], 2.35);
    const m = person(g, 'm', { top: '#1f4d3c', topType: 'coat', bottom: '#1c1c21', shoes: '#1c1c21', shoeType: 'heel' }, [0.42, 0, 1.6], -0.15);
    pose(m, { armR: [0, -0.3], armL: [-0.75, 0.45], elbowL: -0.9 }); idle(ctx, m, 1.3); ctx.tap(m, ['Je tu nádherne 💗', 'Poď ma objať, je zima!'], 2.15);
    const hb = G(g, [1.0, 1.32, 2.12]); C(hb, [0.008, 0.008, 1.3, 3], '#ffffff', [0, 0.65, 0]); heart(hb, 0.5, '#e0183c', [0, 1.6, 0]);
    ctx.anim(t => { hb.rotation.z = Math.sin(t * 1.2) * 0.08; hb.rotation.x = Math.cos(t) * 0.05; });
    ctx.secret([-4.4, 0.36, 2.9], 0.24);
  },
};

// ---------- 14. Jazz a prsteň ----------
export const jazz = {
  env: { sky: ['#160d2a', '#4c2a60'], sun: ['#d9b8ff', 1.4, [3, 10, 9]], hemi: ['#c8a8ff', '#5a3560', 2.0], fx: 'sparkle' },
  cam: { pos: [2, 4.2, 11.4], target: [0.3, 1.5, -0.5] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 7.6, top: '#3a2430', side: '#2a1820', under: '#1c1016' });
    B(g, [10.8, 4.8, 0.3], '#5a2f3a', [0, 2.4, -3.8]); B(g, [0.3, 4.8, 6], '#4d2834', [-5.3, 2.4, -0.9]);
    for (let r = 0; r < 9; r++) for (let i = 0; i < 9; i++) if ((i * 7 + r * 3) % 4 === 0) B(g, [1.1, 0.4, 0.02], '#663644', [-4.6 + i * 1.17 + (r % 2) * 0.5, 0.4 + r * 0.5, -3.64]).castShadow = false;
    label(g, 'JAZZ', 2.6, 1, { fg: '#ff7eb6', size: 130 }, [2.7, 3.7, -3.62]); label(g, '🎷', 0.9, 0.9, { cw: 128, ch: 128, size: 90 }, [4.4, 3.7, -3.62]);
    gl(g, new THREE.BoxGeometry(3.6, 0.05, 0.03), '#ff7eb6', [3.1, 3.1, -3.62]);
    // pódium a kapela
    B(g, [5, 0.3, 2.4], '#24161d', [-2.4, 0.15, -2.4]);
    const mk = (hair, pos, ry) => person(g, { hair, h: 1.78 }, { top: '#1c1c21', topType: 'suit', bottom: '#1c1c21', shoes: '#1c1c21', tie: '#a8324a' }, pos, ry);
    const sx = mk('#2b2b2b', [-1.6, 0.3, -1.9], 0.4); pose(sx, { armL: [-1.0, -0.2], armR: [-0.7, 0.2], elbowL: -1.0, elbowR: -1.2 });
    const sax = G(sx.userData.parts.body, [0, 1.15, 0.26], [0.3, 0, 0.15]);
    C(sax, [0.03, 0.05, 0.55, 6], '#ffd24a', [0, 0, 0]); K(sax, [0.13, 0.26, 8], '#ffd24a', [0, -0.3, 0.08], [2.3, 0, 0]); C(sax, [0.015, 0.02, 0.18, 5], '#ffd24a', [0, 0.34, -0.04], [-0.5, 0, 0]);
    ctx.anim(t => { sx.rotation.z = Math.sin(t * 2.2) * 0.06; sx.userData.parts.body.rotation.x = Math.sin(t * 1.1) * 0.08; });
    ctx.tap(sx, ['🎷 🎶', 'Táto je pre zaľúbených.'], 2.2);
    const bs = mk('#7a4a2f', [-3.5, 0.3, -2.5], 0.5); pose(bs, { armL: [-1.3, -0.3], armR: [-0.8, 0.3], elbowL: -1.2, elbowR: -0.8 });
    const bass = G(g, [-3.2, 0.3, -2.05], [0.12, 0.5, 0]);
    S(bass, 0.42, '#a8642f', [0, 0.6, 0], [1, 1.25, 0.45], 10); S(bass, 0.3, '#a8642f', [0, 1.15, 0], [1, 1, 0.45], 10); B(bass, [0.08, 1.1, 0.06], '#3a2416', [0, 1.75, 0.05]); S(bass, 0.07, '#3a2416', [0, 2.32, 0.05]);
    ctx.anim(t => { bass.rotation.z = Math.sin(t * 2.2 + 1) * 0.04; });
    ctx.tap(bass, ['🎻 🎶']);
    B(g, [1.5, 1.15, 0.6], '#1c1c21', [-3.9, 0.87, -3.2]); B(g, [1.3, 0.06, 0.25], '#ffffff', [-3.9, 1.02, -2.84]); B(g, [1.5, 0.06, 0.3], '#1c1c21', [-3.9, 0.98, -2.82]);
    const pn = mk('#c9ccd2', [-3.9, 0.3, -2.25], Math.PI); pose(pn, { sit: true, armL: [-1.0, 0.1], armR: [-1.0, -0.1], elbowL: -0.5, elbowR: -0.5 }); B(g, [0.5, 0.45, 0.4], '#3a2416', [-3.9, 0.52, -2.2]);
    for (const [x, c] of [[-1.6, '#ff7eb6'], [-3.6, '#9f8fff']]) { const k = new THREE.Mesh(new THREE.ConeGeometry(1.2, 4.2, 12, 1, true), glow(c, 0.1)); k.position.set(x, 2.6, -2.2); k.material.side = THREE.DoubleSide; k.material.depthWrite = false; g.add(k); }
    light(g, '#ffb0d0', 26, [-2.4, 3.4, -1.6], 9);
    // bar
    B(g, [2.6, 1.1, 0.7], '#2a1820', [3.6, 0.55, -3.0]); B(g, [2.8, 0.07, 0.85], '#a8744a', [3.6, 1.13, -3.0]);
    ['#ffd24a', '#7fd27a', '#ff8a3c', '#c56bff', '#9fe0ff'].forEach((c, i) => gl(g, new THREE.CylinderGeometry(0.05, 0.06, 0.34, 6), c, [2.7 + i * 0.45, 1.6 + (i % 2) * 0.5, -3.55], 0.9));
    B(g, [2.6, 0.05, 0.25], '#a8744a', [3.6, 1.42, -3.55]); B(g, [2.6, 0.05, 0.25], '#a8744a', [3.6, 1.92, -3.55]);
    // náš stôl
    C(g, [0.62, 0.7, 0.74, 16], '#ffffff', [1.2, 0.37, 1.2]); C(g, [0.64, 0.64, 0.03, 16], '#fff7ee', [1.2, 0.75, 1.2]);
    C(g, [0.035, 0.035, 0.16, 6], '#ffffff', [1.2, 0.85, 1.05]); const fl = gl(g, new THREE.SphereGeometry(0.045, 6, 5), '#ffd86e', [1.2, 0.97, 1.05]);
    ctx.anim(t => { fl.scale.setScalar(1 + Math.sin(t * 9) * 0.15); });
    const cl = light(g, '#ffc98a', 9, [1.2, 1.3, 1.2], 6);
    for (const x of [0.95, 1.5]) { C(g, [0.012, 0.012, 0.14, 4], '#ffffff', [x, 0.84, 1.42]); C(g, [0.06, 0.03, 0.1, 8], glass('#ffb0c8', 0.6), [x, 0.95, 1.42]); }
    chair(g, [0.2, 0, 1.2], Math.PI / 2, '#5a2f3a'); chair(g, [2.2, 0, 1.2], -Math.PI / 2, '#5a2f3a');
    const d = person(g, 'd', { top: '#1c1c21', bottom: '#1c1c21', shoes: '#1c1c21', collar: true, tie: '#ff7eb6' }, [0.22, 0, 1.2], Math.PI / 2);
    pose(d, { sit: true, armL: [-1.25, 0.05], elbowL: -0.25, armR: [-0.7, -0.05], elbowR: -0.8, head: [0, -0.35, 0] }); idle(ctx, d, 0);
    ctx.tap(d, ['Toto je pre teba 💍', 'Šťastného Valentína, princezná.'], 1.95);
    const m = person(g, 'm', { top: '#1c1c21', topType: 'dress', dressLen: 0.5, sleeves: 'none', shoes: '#1c1c21', shoeType: 'heel' }, [2.18, 0, 1.2], -Math.PI / 2);
    pose(m, { sit: true, armL: [-1.9, 0.3], elbowL: -1.5, armR: [-1.9, -0.3], elbowR: -1.5, head: [0, 0.35, 0] }); idle(ctx, m, 1.5);
    ctx.tap(m, ['Je nádherný… 🥹', 'Ďakujem, ľúbim ťa.'], 1.8);
    // prsteň
    B(g, [0.16, 0.08, 0.16], '#a8324a', [1.2, 0.8, 1.2]);
    const ring = G(g, [1.2, 1.75, 1.2]);
    T(ring, [0.16, 0.022], '#ffe08a', null, [0, 0, 0]);
    heart(ring, 0.085, M('#ff9cc4', { emissive: '#ff5d96', emissiveIntensity: 0.8 }), [-0.055, 0.2, 0]); heart(ring, 0.085, M('#ff9cc4', { emissive: '#ff5d96', emissiveIntensity: 0.8 }), [0.055, 0.2, 0]);
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; gl(ring, new THREE.OctahedronGeometry(0.022), '#ffffff', [Math.cos(a) * 0.36, 0.08 + Math.sin(a) * 0.3, 0]); }
    hitBall(ring, 0.5); ctx.tap(ring, ['Prsteň s dvoma srdiečkami 💍', 'Dve srdiečka, ako my dvaja.'], 0.5);
    ctx.anim(t => { ring.rotation.y = t * 1.1; ring.position.y = 1.75 + Math.sin(t * 2) * 0.06; cl.intensity = 9 + Math.sin(t * 9) * 1.5; });
    // ďalšie stolíky
    for (const [x, z] of [[-2.6, 2.2], [3.8, -0.6]]) { C(g, [0.5, 0.56, 0.74, 14], '#ffffff', [x, 0.37, z]); gl(g, new THREE.SphereGeometry(0.04, 6, 5), '#ffd86e', [x, 0.88, z]); C(g, [0.03, 0.03, 0.12, 6], '#fff', [x, 0.8, z]); chair(g, [x - 0.85, 0, z], Math.PI / 2, '#5a2f3a'); }
    ctx.secret([-4.75, 0.5, -3.25], 0.24);
  },
};
