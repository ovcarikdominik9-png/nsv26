// Scény 6–10: korčule, narodeniny, Tokaj, Polignano, jaskyne
import { THREE, G, B, C, K, S, T, M, glow, glass, heart, label, sprite, base, water, person, pose, idle, tree, lamp, bench, table, bush, flower, balloon, house, giftBox, parasol, boat, stringLights, rock, cliff, blob } from '../kit.js';
import { light, D_HOME, M_HOME } from './s1.js';

const hitBall = (p, r = 0.6) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })); p.add(m); return m; };

// ---------- 6. Paťo Čonka má dnes koncert ----------
function skates(p, col) {
  const q = p.userData.parts;
  for (const kn of [q.kneeL, q.kneeR]) {
    B(kn, [0.14, 0.16, 0.3], col, [0, -0.4, 0.04]);
    for (const z of [-0.07, 0.04, 0.15]) C(kn, [0.05, 0.05, 0.05, 8], '#26262b', [0, -0.52, z], [0, 0, Math.PI / 2]);
  }
  q.body.position.y += 0.09 * q.k;
}
export const korcule = {
  env: { sky: ['#84ccff', '#ffe4ef'], fog: ['#ffeef4', 34, 95], sun: ['#fff6e0', 2.9, [6, 12, 7]], hemi: ['#ffffff', '#bfe8b0', 2.0], fx: 'petals' },
  cam: { pos: [0.4, 4.4, 13.2], target: [0.2, 1.5, 3] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.6, top: '#9bd67a' });
    C(g, [6.6, 6.6, 0.03, 44], '#c7c3cd', [0, 0.02, 0]).castShadow = false;
    C(g, [4.1, 4.1, 0.05, 40], '#a6dc86', [0, 0.03, 0]).castShadow = false;
    for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; B(g, [0.5, 0.012, 0.08], '#ffffff', [Math.cos(a) * 5.35, 0.04, Math.sin(a) * 5.35], [0, -a + Math.PI / 2, 0]).castShadow = false; }
    // rozkvitnuté stromy
    tree(g, [0, 0, -0.4], 1.5, '#ffb7d3'); tree(g, [-2.2, 0, 1.4], 0.9, '#ffc9de'); tree(g, [2.4, 0, -1.8], 1.0, '#ffd3e4');
    tree(g, [-7.3, 0, -1.6], 1, '#ffb7d3'); tree(g, [7.2, 0, 1.6], 1.1, '#ffc9de'); tree(g, [-4, 0, -6.6], 1, '#8fd27a'); tree(g, [4.6, 0, -6.2], 1.1, '#ffb7d3');
    bench(g, [1.6, 0, 1.9], -0.5); bush(g, [-1.6, 0, -2.4]); bush(g, [3.2, 0, 0.8], 0.8);
    ['#ff7eb6', '#ffe36e', '#ffffff', '#c9a0ff'].forEach((c, i) => { for (let j = 0; j < 4; j++) flower(g, [-3 + i * 0.5 + j * 0.2, 0.03, 2.4 - j * 0.45 + i * 0.1], c); });
    // plagát na lampe
    lamp(g, [3.6, 0, 3.6], false, 3.2);
    B(g, [1.3, 1.7, 0.06], '#2b1b4a', [3.6, 1.7, 3.72]);
    label(g, 'PAŤO ČONKA', 1.2, 0.34, { fg: '#ffe36e', size: 70 }, [3.6, 2.2, 3.76]);
    label(g, '🎤', 0.7, 0.7, { cw: 128, ch: 128, size: 84 }, [3.6, 1.7, 3.76]);
    label(g, 'DNES · LIVE', 1.1, 0.26, { fg: '#ff7eb6', size: 60 }, [3.6, 1.15, 3.76]);
    const poster = hitBall(g, 0.9); poster.position.set(3.6, 1.7, 3.8);
    ctx.tap(poster, ['Paťo Čonka, dnes naživo. Zdroj: my dvaja.', 'Vypredané. Lebo neexistuje. 🤫']);
    // my dvaja a chalan
    const d = person(g, 'd', { top: '#f4f4f2', sleeves: 'short', bottom: '#2a3a5c', bottomType: 'shorts', shoes: '#f4f4f4' }, [-1.7, 0, 5.1], 0.75); skates(d, '#3d3d46');
    pose(d, { armL: [-1.3, 0.5], elbowL: -0.6, legL: 0.15, legR: -0.15 }); idle(ctx, d, 0);
    ctx.tap(d, ['Paťo Čonka je raper! Dnes má vystúpenie! 🎤', 'Ty ho nepoznáš?! Legenda!'], 2.45);
    const m = person(g, 'm', M_HOME, [-0.4, 0, 5.5], 0.5); skates(m, '#ff8fb8');
    pose(m, { armR: [-0.6, -0.9], elbowR: -1.6, legL: -0.12, legR: 0.12 }); idle(ctx, m, 1.3);
    ctx.tap(m, ['Fakt! Musíš prísť! 😇', 'Lístky sú skoro preč!'], 2.2);
    const boy = person(g, 'boy', { top: '#3f9a55', bottom: '#3a4a6a', shoes: '#ffffff' }, [1.7, 0, 5.2], -0.85);
    pose(boy, { armL: [0, 0.12], armR: [-0.4, -0.2], elbowR: -1.3, head: [0, 0, 0.12] }); idle(ctx, boy, 2);
    B(boy, [0.5, 0.05, 0.14], '#26262b', [0.42, 0.1, 0.1]); C(boy, [0.02, 0.02, 0.8, 5], '#c9ccd2', [0.62, 0.5, 0.1]); B(boy, [0.05, 0.05, 0.36], '#26262b', [0.62, 0.9, 0.1]);
    ctx.tap(boy, ['Nie, ďakujem.', 'Nie. Ďakujem.', '…kto je Paťo Čonka?'], 1.85);
    // motýle
    for (let i = 0; i < 3; i++) {
      const b = G(g); const c = ['#ffe36e', '#ffffff', '#c9a0ff'][i];
      const w1 = B(b, [0.14, 0.01, 0.1], c, [0.07, 0, 0]), w2 = B(b, [0.14, 0.01, 0.1], c, [-0.07, 0, 0]);
      ctx.anim(t => { const a = t * 0.5 + i * 2.1; b.position.set(Math.cos(a) * (2 + i), 1.4 + Math.sin(t * 2 + i) * 0.4, Math.sin(a * 1.3) * (2 + i) + 1); w1.rotation.z = Math.sin(t * 18) * 0.8; w2.rotation.z = -Math.sin(t * 18) * 0.8; });
    }
    ctx.secret([0.3, 0.4, -1.4], 0.26);
  },
};

// ---------- 7. Tvoje narodeniny: minigolf a sushi ----------
function lane(g, x, z, w, len, ry = 0) {
  const l = G(g, [x, 0, z], [0, ry, 0]);
  B(l, [w, 0.08, len], '#3fae6a', [0, 0.05, 0]).castShadow = false;
  B(l, [0.1, 0.16, len + 0.2], '#fff3e0', [-w / 2 - 0.05, 0.08, 0]); B(l, [0.1, 0.16, len + 0.2], '#fff3e0', [w / 2 + 0.05, 0.08, 0]);
  B(l, [w + 0.2, 0.16, 0.1], '#fff3e0', [0, 0.08, -len / 2 - 0.05]); B(l, [w + 0.2, 0.16, 0.1], '#fff3e0', [0, 0.08, len / 2 + 0.05]);
  C(l, [0.09, 0.09, 0.01, 10], '#1c1c21', [0, 0.095, -len / 2 + 0.5]);
  C(l, [0.015, 0.015, 0.9, 4], '#ffffff', [0, 0.5, -len / 2 + 0.5]);
  B(l, [0.3, 0.2, 0.02], '#ff3f86', [0.16, 0.85, -len / 2 + 0.5]);
  return l;
}
function putter(p, side = 'R') {
  const el = p.userData.parts['elbow' + side];
  C(el, [0.015, 0.015, 0.9, 5], '#c9ccd2', [0, -0.7, 0.05], [0.1, 0, 0]); B(el, [0.14, 0.05, 0.06], '#26262b', [0.04, -1.15, 0.1]);
}
export const narodky = {
  env: { sky: ['#8fd0ff', '#fff0dc'], fog: ['#fff3e6', 34, 95], sun: ['#fff8e6', 2.9, [-6, 12, 8]], hemi: ['#ffffff', '#bfe8b0', 2.0], fx: 'petals' },
  cam: { pos: [0.6, 6.2, 13], target: [0.2, 1.2, 0.2] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.6, top: '#a6dc86' });
    // dráhy
    lane(g, -4.2, 0.4, 1.3, 5.4);
    const l2 = lane(g, -1.7, 0.2, 1.3, 5.8);
    const wm = G(l2, [0, 0, -0.4]);
    C(wm, [0.3, 0.45, 1.1, 6], '#ffe0ea', [0, 0.6, 0]); K(wm, [0.42, 0.4, 6], '#ff5d96', [0, 1.35, 0]);
    B(wm, [0.3, 0.3, 0.5], '#1c1c21', [0, 0.2, 0.2]);
    const sails = G(wm, [0, 1.05, 0.36]);
    for (let i = 0; i < 4; i++) B(sails, [0.12, 0.7, 0.03], '#ffffff', [Math.sin(i * Math.PI / 2) * 0.35, Math.cos(i * Math.PI / 2) * 0.35, 0], [0, 0, -i * Math.PI / 2]);
    ctx.anim(t => { sails.rotation.z = t * 1.4; });
    const l3 = lane(g, 0.8, -0.6, 1.3, 4.6);
    B(l3, [1.3, 0.3, 0.9], '#3fae6a', [0, 0.1, 0], [0.0, 0, 0]); K(l3, [0.2, 0.3, 6], '#ffd24a', [-0.3, 0.38, -0.2]); K(l3, [0.2, 0.3, 6], '#ffd24a', [0.3, 0.38, 0.2]);
    S(g, 0.06, '#ffffff', [-4.2, 0.15, 1.9]); S(g, 0.06, '#ff8fb8', [-1.7, 0.15, 2.2]);
    // Magda hrá, Dominik s darčekom
    const m = person(g, 'm', M_HOME, [-4.75, 0, 2.5], 1.2);
    pose(m, { armL: [-0.55, -0.25], armR: [-0.55, 0.25], elbowL: -0.25, elbowR: -0.25, head: [0.25, 0, 0] }); putter(m, 'R'); idle(ctx, m, 1);
    ctx.tap(m, ['Skoro som to trafila ⛳', 'Dnes mám narodeniny, dnes vyhrávam ja.'], 2.2);
    const d = person(g, 'd', D_HOME, [-2.9, 0, 3.4], -0.5);
    pose(d, { armR: [-1.2, -0.1], elbowR: -0.6, armL: [-1.2, 0.1], elbowL: -0.6 }); idle(ctx, d, 0);
    const gb = giftBox(d.userData.parts.body, [0, 1.12, 0.52], '#ff5d96', '#ffffff', 0.75);
    ctx.tap(d, ['Všetko najlepšie, princezná! 🎂', 'Mám pre teba niečo…'], 2.4);
    const wt = G(g, [-2.6, 2.9, 3.6]);
    T(wt, [0.2, 0.05], '#ffd24a'); C(wt, [0.17, 0.17, 0.05, 14], '#ffffff', null, [Math.PI / 2, 0, 0]); B(wt, [0.02, 0.12, 0.02], '#26262b', [0, 0.05, 0.04]); B(wt, [0.09, 0.02, 0.02], '#26262b', [0.04, 0, 0.04]);
    hitBall(wt, 0.5);
    ctx.anim(t => { wt.rotation.y = Math.sin(t) * 0.8; wt.position.y = 2.9 + Math.sin(t * 2) * 0.08; });
    ctx.tap(wt, ['Hodinky Guess ⌚', 'Darček k narodeninám.'], 0.45);
    // transparent a balóny
    for (const x of [-3.4, 3.4]) C(g, [0.06, 0.06, 3.6, 6], '#ffffff', [x, 1.8, -4.6]);
    B(g, [6.8, 0.9, 0.06], '#ff8fb8', [0, 3.3, -4.6]);
    label(g, 'Všetko najlepšie, Magduška!', 6.4, 0.8, { fg: '#ffffff', size: 80 }, [0, 3.3, -4.55]);
    ['#ff5d96', '#ffd24a', '#9fe0ff', '#ffffff', '#c9a0ff'].forEach((c, i) => { const b = balloon(g, [-3.9 + (i % 2) * 0.5, 0, -4.2 + i * 0.12], c, 2.2 + i * 0.25); ctx.anim(t => { b.rotation.z = Math.sin(t + i) * 0.06; }); });
    ['#ff8fb8', '#ffe36e', '#ff5d96'].forEach((c, i) => { const b = balloon(g, [3.9 - (i % 2) * 0.5, 0, -4.2 + i * 0.12], c, 2.4 + i * 0.3); ctx.anim(t => { b.rotation.z = Math.sin(t + i + 2) * 0.06; }); });
    sprite(g, '14. apríl', 2.2, 0.55, { bg: '#ffffffee', fg: '#e0457e', size: 70, radius: 60 }, [0, 4.3, -4.6]);
    // sushi stôl a torta
    const st = G(g, [4.4, 0, 1.6]);
    B(st, [2.4, 0.08, 1.2], '#b07a4f', [0, 0.72, 0]); for (const [x, z] of [[-1, -0.45], [1, -0.45], [-1, 0.45], [1, 0.45]]) B(st, [0.08, 0.7, 0.08], '#8a5a3a', [x, 0.35, z]);
    B(st, [1.2, 0.04, 0.5], '#3a2a20', [-0.35, 0.78, 0.1]);
    for (let i = 0; i < 6; i++) { C(st, [0.07, 0.07, 0.07, 8], '#1f2a24', [-0.8 + i * 0.18, 0.84, 0.22]); C(st, [0.055, 0.055, 0.075, 8], '#ffffff', [-0.8 + i * 0.18, 0.842, 0.22]); S(st, 0.025, i % 2 ? '#ff8a3c' : '#7fd27a', [-0.8 + i * 0.18, 0.885, 0.22], null, 5); }
    for (let i = 0; i < 4; i++) { B(st, [0.2, 0.06, 0.09], '#ffffff', [-0.72 + i * 0.26, 0.83, -0.02]); B(st, [0.22, 0.03, 0.1], i % 2 ? '#ff9a7a' : '#ff6a5c', [-0.72 + i * 0.26, 0.875, -0.02]); }
    S(st, 0.05, '#7fd27a', [0.18, 0.83, 0.2]); C(st, [0.06, 0.05, 0.04, 8], '#26262b', [0.18, 0.82, 0]);
    B(st, [0.5, 0.012, 0.012], '#e9c89a', [-0.3, 0.81, 0.42], [0, 0.1, 0]); B(st, [0.5, 0.012, 0.012], '#e9c89a', [-0.3, 0.81, 0.46], [0, 0.16, 0]);
    C(st, [0.3, 0.3, 0.24, 14], '#ffd3e3', [0.75, 0.88, -0.05]); C(st, [0.31, 0.31, 0.05, 14], '#ffffff', [0.75, 1.0, -0.05]);
    for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; C(st, [0.012, 0.012, 0.14, 4], '#ff5d96', [0.75 + Math.cos(a) * 0.18, 1.09, -0.05 + Math.sin(a) * 0.18]); const f = new THREE.Mesh(new THREE.SphereGeometry(0.025, 5, 4), glow('#ffd86e')); f.position.set(0.75 + Math.cos(a) * 0.18, 1.19, -0.05 + Math.sin(a) * 0.18); st.add(f); }
    ctx.tap(st, ['Úžasné sushi 🍣', 'A torta, samozrejme. 🎂'], 1.5);
    tree(g, [6.6, 0, -1.6], 1, '#ffb7d3'); tree(g, [-7, 0, -2], 1.1, '#ffc9de'); bush(g, [2.8, 0, 3.4]); bush(g, [-6.6, 0, 2.6], 0.9);
    ctx.secret([-1.7, 0.42, -1.25], 0.24);
  },
};

// ---------- 8. Bobová dráha a Grand Bar Tokaj ----------
function drink(p, pos, col) {
  const d = G(p, pos);
  C(d, [0.06, 0.045, 0.16, 8], glass('#ffffff', 0.45), [0, 0.08, 0]); C(d, [0.05, 0.04, 0.11, 8], col, [0, 0.065, 0]);
  C(d, [0.006, 0.006, 0.2, 3], '#ffffff', [0.02, 0.14, 0], [0, 0, -0.3]); S(d, 0.03, '#ff9a3c', [-0.05, 0.16, 0], [1, 1, 0.3], 6);
  return d;
}
export const tokaj = {
  env: { sky: ['#ff8f70', '#ffe2a6'], fog: ['#ffd9a8', 30, 90], sun: ['#ffcf96', 2.7, [-9, 6, 6]], hemi: ['#ffe9c8', '#a8c07a', 1.8], fx: 'fireflies' },
  cam: { pos: [1.8, 4.8, 13], target: [0.6, 1.5, 0.4] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.6, top: '#a9d47a' });
    // kopec s bobovou dráhou
    const hx = -3.6, hz = -2.8, HR = 4.3, HH = 3.0;
    K(g, [HR, HH, 14], '#8fc76a', [hx, HH / 2, hz]).castShadow = false;
    const pt = (u) => { const r = 0.5 + u * 3.6, a = u * Math.PI * 4.2 + 1; return [hx + Math.cos(a) * r, HH * (1 - r / HR) + 0.16, hz + Math.sin(a) * r]; };
    for (let i = 0; i <= 90; i++) { const p = pt(i / 90); C(g, [0.24, 0.24, 0.07, 6], i % 2 ? '#c9ccd2' : '#b4b8c0', p).castShadow = false; if (i % 9 === 0) C(g, [0.03, 0.03, 0.3, 4], '#8a8e98', [p[0], p[1] - 0.15, p[2]]); }
    const cart = G(g);
    B(cart, [0.4, 0.2, 0.7], '#ffd24a', [0, 0.14, 0]); S(cart, 0.13, '#f3d77c', [0, 0.42, 0.12]); S(cart, 0.14, '#5c3b22', [0, 0.46, -0.16]);
    hitBall(cart, 0.6);
    ctx.anim(t => { const u = (t * 0.09) % 1; const p = pt(u), n = pt(u + 0.01); cart.position.set(...p); cart.lookAt(n[0], n[1], n[2]); });
    ctx.tap(cart, ['Jupíííí! 🎢', 'Nebrzdi!!!', 'Brzdi!!!'], 0.9);
    label(g, 'BOBOVÁ DRÁHA', 2.6, 0.5, { bg: '#ffffff', fg: '#e0457e', size: 60, radius: 20 }, [-4.2, 1.0, 1.75], [0, 0.25, 0]);
    C(g, [0.04, 0.04, 1, 5], '#8a5a3a', [-4.2, 0.4, 1.7]);
    // vinič
    for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) {
      const x = 2.6 + i * 0.8, z = -5.6 + r * 1.0; if (Math.hypot(x, z) > 8) continue;
      C(g, [0.025, 0.025, 0.8, 4], '#8a5a3a', [x, 0.4, z]); S(g, 0.32, r % 2 ? '#7cc25c' : '#8fcf6a', [x, 0.75, z], [1, 0.8, 0.7], 6);
      if ((i + r) % 2) S(g, 0.09, '#8f55b8', [x + 0.1, 0.5, z + 0.22], [1, 1.4, 1], 5);
    }
    // terasa baru
    B(g, [5.6, 0.14, 4], '#c99a6b', [2.9, 0.07, 2.3]);
    for (const [x, z] of [[0.3, 0.5], [5.5, 0.5], [0.3, 4.1], [5.5, 4.1]]) C(g, [0.07, 0.07, 3, 6], '#7a4a2f', [x, 1.6, z]);
    B(g, [5.4, 0.12, 0.12], '#7a4a2f', [2.9, 3.1, 0.5]); B(g, [5.4, 0.12, 0.12], '#7a4a2f', [2.9, 3.1, 4.1]); B(g, [0.12, 0.12, 3.7], '#7a4a2f', [0.3, 3.1, 2.3]); B(g, [0.12, 0.12, 3.7], '#7a4a2f', [5.5, 3.1, 2.3]);
    stringLights(g, [0.3, 3.05, 4.1], [5.5, 3.05, 4.1], 12, 0.4, ['#ffd86e', '#ffe9a8']); stringLights(g, [0.3, 3.05, 0.5], [5.5, 3.05, 4.1], 12, 0.5, ['#ffd86e', '#ff9ec4']);
    B(g, [3, 0.7, 0.08], '#3a2416', [2.9, 3.6, 0.5]); label(g, 'Grand Bar Tokaj', 2.8, 0.6, { fg: '#ffd86e', size: 70 }, [2.9, 3.6, 0.56]);
    B(g, [3.4, 1.1, 0.6], '#7a4a2f', [3.4, 0.69, 0.9]); B(g, [3.6, 0.07, 0.75], '#e9c89a', [3.4, 1.27, 0.9]);
    ['#7fd27a', '#ffd24a', '#c56bff', '#ff8a3c', '#9fe0ff', '#ff5d96'].forEach((c, i) => C(g, [0.06, 0.07, 0.36 + (i % 2) * 0.1, 6], c, [2.1 + i * 0.5, 1.5, 0.82]));
    light(g, '#ffcf8a', 14, [2.9, 2.6, 2.4], 9);
    // stolík a my dvaja
    table(g, [2.2, 0.14, 2.9], 0.42, 1.05, '#e9c89a');
    drink(g, [2.05, 1.22, 2.95], '#ff7eb6'); drink(g, [2.36, 1.22, 2.85], '#ffd24a');
    const d = person(g, 'd', { top: '#ffffff', sleeves: 'short', bottom: '#d9c9a8', bottomType: 'shorts', shoes: '#ffffff' }, [1.25, 0.14, 2.9], 1.15);
    pose(d, { armL: [-0.9, 0.1], elbowL: -1.0 }); idle(ctx, d, 0); ctx.tap(d, ['Na nás! 🥂', 'Ešte jedno kolo na bobovej?'], 2.4);
    const m = person(g, 'm', { top: '#ffe08a', topType: 'dress', dressLen: 0.5, sleeves: 'none', shoes: '#ffffff', shoeType: 'sandal', bottomType: 'skirt', bottom: '#ffe08a' }, [3.15, 0.14, 2.9], -1.15);
    pose(m, { armR: [-0.9, -0.1], elbowR: -1.0 }); idle(ctx, m, 1.4); ctx.tap(m, ['Na zdravie, láska! 🍹', 'Krásny večer.'], 2.15);
    tree(g, [-6.8, 0, 2.6], 1); bush(g, [-1.2, 0, 4.6]); bush(g, [6.6, 0, -0.6], 0.9);
    const sunD = new THREE.Mesh(new THREE.SphereGeometry(2.2, 14, 10), glow('#ffd88a')); sunD.position.set(-16, 4, -22); g.add(sunD);
    ctx.secret([5.9, 0.4, -3.4], 0.26);
  },
};

// ---------- 9. Polignano a Mare ----------
const ITA_D = { top: '#1e5fd6', sleeves: 'short', bottom: '#1c1c21', bottomType: 'shorts', shoes: '#3a2f2a', shoeType: 'sandal', collar: true, shirt: '#ffffff' };
const ITA_M = { top: '#ffffff', sleeves: 'short', bottom: '#1c1c21', bottomType: 'shorts', shoes: '#f3e6cf', shoeType: 'sandal', hat: '#ff8a2a', hatType: 'bucket' };
function whiteTown(g, x0, y, z0, seed) {
  const cols = ['#ffffff', '#fbf6ec', '#fff8f0'];
  const list = [[0, 0, 1.3, 1.5, 1.2], [1.25, 0.2, 1.1, 2.1, 1.3], [-1.2, 0.4, 1.0, 1.2, 1.0], [0.3, -1.4, 1.5, 1.8, 1.2], [-1.1, -1.2, 1.1, 2.4, 1.1], [1.5, -1.5, 1.0, 1.3, 1.1], [0.2, -2.8, 1.4, 1.5, 1.2], [-1.2, -2.7, 1.0, 1.9, 1.0], [1.4, -2.9, 1.0, 1.2, 1.0]];
  list.forEach(([x, z, w, h, d], i) => {
    const hh = h + ((i * seed) % 3) * 0.25;
    const b = house(g, [x0 + x, y, z0 + z], w, hh, d, cols[i % 3], { win: i % 2 ? '#3f9a8f' : '#4a7fb5' });
    B(b, [w + 0.06, 0.07, d + 0.06], '#eadfcd', [0, hh + 0.035, 0]);
    if (i % 4 === 0) C(b, [0.06, 0.05, 0.14, 6], '#c9714a', [w / 2 - 0.15, hh + 0.14, d / 2 - 0.15]), S(b, 0.12, '#ff5d96', [w / 2 - 0.15, hh + 0.28, d / 2 - 0.15], null, 5);
  });
}
export const polignano = {
  env: { sky: ['#2f9df2', '#c8f0ff'], fog: ['#d6f4ff', 34, 100], sun: ['#fffbe8', 3.1, [5, 12, 9]], hemi: ['#ffffff', '#9fe0e0', 2.1] },
  cam: { pos: [0.3, 5.4, 14.2], target: [0, 2, -1.6] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.7, top: '#2fbfc6', side: '#2a9fb0', under: '#1f7f95' });
    const w = water(g, 8.6, '#46d6d2', 0.03, 0.75); ctx.anim(t => { w.position.y = 0.03 + Math.sin(t * 1.2) * 0.02; });
    const sh = C(g, [3.4, 3.4, 0.02, 24], M('#a4f0e6', { transparent: true, opacity: 0.8 }), [0, 0.06, 0.6]); sh.scale.z = 0.5;
    ctx.tap(w, 'Tyrkysová ako z pohľadnice 🌊');
    // útesy
    const rockC = ['#d6c4a2', '#c9b48f', '#e0d1b3'];
    for (const s of [-1, 1]) {
      const H = 3.2 + (s > 0 ? 0.4 : 0);
      cliff(g, [s * 4.95, H / 2, -2.3], [4.2, H, 6.4], rockC[0], { top: 0.06, taper: 0.05, amp: 0.3 });
      cliff(g, [s * 3.0, 1.2, -0.4], [1.5, 2.4, 2.4], rockC[1], { ry: s * 0.2, taper: 0.3 });
      cliff(g, [s * 4.2, 0.75, 1.4], [1.9, 1.5, 2], rockC[2], { ry: -s * 0.3, taper: 0.35 });
      cliff(g, [s * 2.9, 1.4, -3.4], [1.2, 2.8, 1.8], rockC[1], { ry: s * 0.1, taper: 0.2 });
      const hole = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 10), glow('#2a2622')); hole.position.set(s * 3.5, 0.3, 0.9); hole.scale.set(1, 0.9, 0.5); g.add(hole);
      rock(g, [s * 5.6, 0.2, 2.6], 1.5, rockC[1]); rock(g, [s * 2.6, 0.15, 1.6], 0.9, rockC[2]); rock(g, [s * 6.6, 0.2, 1.4], 1.2, rockC[0]);
      blob(g, 0.5, '#5f8f4a', [s * 6.4, H + 0.1, 0.4], [1.3, 0.5, 1]);
    }
    whiteTown(g, -5.2, 3.2, -0.4, 2); whiteTown(g, 5.1, 3.6, -0.4, 5);
    // terasa s výhľadom
    B(g, [2.2, 0.12, 1], '#eadfcd', [-4.2, 3.26, 0.75]);
    for (let i = 0; i < 6; i++) C(g, [0.025, 0.025, 0.5, 4], '#ffffff', [-5.2 + i * 0.4, 3.55, 1.2]); B(g, [2.2, 0.04, 0.04], '#ffffff', [-4.2, 3.8, 1.2]);
    // pláž Lama Monachile
    B(g, [5.4, 0.3, 5.4], '#f0e8d8', [0, 0.15, -3.1]);
    const be = C(g, [2.7, 2.7, 0.3, 20], '#f0e8d8', [0, 0.15, -0.5]); be.scale.z = 0.35;
    for (let i = 0; i < 40; i++) S(g, 0.07 + (i % 3) * 0.03, i % 2 ? '#ffffff' : '#ddd3c0', [-2.3 + (i * 0.618 % 1) * 4.6, 0.31, -5 + (i * 0.377 % 1) * 5], [1, 0.5, 1], 5).castShadow = false;
    // most
    B(g, [6.6, 0.5, 1.1], '#cbb995', [0, 3.0, -5.6]);
    for (const x of [-2.6, -0.9, 0.9, 2.6]) B(g, [0.55, 2.8, 1], '#c2ae88', [x, 1.4, -5.6]);
    for (const x of [-1.75, 0, 1.75]) { const a = T(g, [0.6, 0.14, Math.PI], '#c2ae88', [x, 2.2, -5.6]); a.scale.z = 3.5; }
    B(g, [6.2, 0.3, 0.08], '#d9c9a6', [0, 3.4, -5.1]); B(g, [6.2, 0.3, 0.08], '#d9c9a6', [0, 3.4, -6.1]);
    C(g, [0.02, 0.02, 1, 4], '#ffffff', [0, 3.9, -5.6]);
    ['#2e9e4f', '#ffffff', '#d6222b'].forEach((c, i) => B(g, [0.22, 0.4, 0.02], c, [0.13 + i * 0.22, 4.15, -5.6]));
    // pláž: slnečníky, osušky, ľudia
    parasol(g, [-1.7, 0.3, -2.6], '#ff7eb6'); parasol(g, [1.6, 0.3, -3.4], '#ffd24a'); parasol(g, [0.2, 0.3, -4.4], '#ff8a3c');
    B(g, [0.6, 0.02, 1.2], '#ff5d96', [-1.7, 0.31, -2.0]); B(g, [0.6, 0.02, 1.2], '#9fe0ff', [1.6, 0.31, -2.8]);
    for (const [x, z, c] of [[-1.2, 2.2, '#3a2a20'], [1.8, 3, '#f3d77c'], [0.4, 4.4, '#5c3b22']]) { const h = S(g, 0.16, '#f1c7a3', [x, 0.1, z]); S(g, 0.165, c, [x, 0.16, z - 0.03], [1, 0.8, 1]); ctx.anim(t => { h.position.y = 0.1 + Math.sin(t * 1.5 + x) * 0.03; }); }
    // my dvaja
    const d = person(g, 'd', ITA_D, [-0.38, 0.3, -0.75], 0.12); label(d.userData.parts.body, '10', 0.2, 0.2, { cw: 128, ch: 128, fg: '#ffffff', size: 84 }, [0, 1.3, 0.146]);
    pose(d, { armL: [0, 0.3] }); idle(ctx, d, 0); ctx.tap(d, ['Forza Italia! 🇮🇹', 'Tu je nádherne.'], 2.35);
    const m = person(g, 'm', ITA_M, [0.42, 0.3, -0.75], -0.12);
    pose(m, { armR: [0, -0.3], armL: [-2.6, 0.5] }); idle(ctx, m, 1.2);
    const mq = m.userData.parts; ctx.anim(t => { mq.armL.rotation.z = 0.5 + Math.sin(t * 5) * 0.25; });
    ctx.tap(m, ['Ten klobúčik bol najlepšia kúpa 🧡', 'Ciao bello! 😘'], 2.25);
    ctx.secret([0, 0.75, -6.5], 0.28);
  },
};

// ---------- 10. Loďkou do jaskýň ----------
export const jaskyne = {
  env: { sky: ['#3aa6f5', '#d2f3ff'], fog: ['#d6f4ff', 34, 100], sun: ['#fff8e0', 3.0, [-5, 12, 9]], hemi: ['#ffffff', '#8fdede', 2.0] },
  cam: { pos: [2.6, 3.6, 12.6], target: [0, 1.5, -1.2] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.7, top: '#1fa9bd', side: '#2a9fb0', under: '#1f7f95' });
    const w = water(g, 8.6, '#35c4cc', 0.03, 0.78); ctx.anim(t => { w.position.y = 0.03 + Math.sin(t * 1.2) * 0.02; });
    const rc = ['#d6c4a2', '#c9b48f', '#e0d1b3'];
    // skalná stena: tri piliere a klenby nad dvoma jaskyňami
    cliff(g, [-6.5, 2.5, -4.7], [3.4, 5, 3.6], rc[0], { top: 0.1, taper: 0.06, amp: 0.34 });
    cliff(g, [-0.1, 2.7, -4.7], [2.5, 5.4, 3.6], rc[1], { top: 0.1, taper: 0.06, amp: 0.34 });
    cliff(g, [6.3, 2.5, -4.7], [3.6, 5, 3.6], rc[2], { top: 0.1, taper: 0.06, amp: 0.34 });
    for (const [x, wd] of [[-3.3, 4.6], [3.1, 4.6]]) {
      cliff(g, [x, 3.85, -4.7], [wd, 2.7, 3.6], rc[1], { top: 0.1, taper: 0, amp: 0.3, seed: x });
      // zaoblenie otvoru do tvaru klenby
      for (const sd of [-1, 1]) { rock(g, [x + sd * 1.25, 2.25, -3.2], 1.7, rc[0]); rock(g, [x + sd * 1.55, 1.3, -3.25], 1.0, rc[2]); rock(g, [x + sd * 0.55, 2.55, -3.15], 1.2, rc[1]); }
      // tma vo vnútri a svietiaca voda
      const dark = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.7, 2.8), glow('#0c2c3a')); dark.position.set(x, 1.3, -5.0); g.add(dark);
      const inner = new THREE.Mesh(new THREE.SphereGeometry(1.2, 14, 10), glow('#124656')); inner.position.set(x, 0.9, -3.75); inner.scale.set(1.2, 0.95, 0.2); g.add(inner);
      const gl = new THREE.Mesh(new THREE.CircleGeometry(1.5, 24), glow('#6ff5ea', 0.85)); gl.rotation.x = -Math.PI / 2; gl.position.set(x, 0.07, -3.3); gl.scale.set(1, 0.75, 1); g.add(gl);
      const gl2 = new THREE.Mesh(new THREE.CircleGeometry(2.1, 24), glow('#8ffaf0', 0.35)); gl2.rotation.x = -Math.PI / 2; gl2.position.set(x, 0.065, -2.7); gl2.scale.set(1, 0.7, 1); g.add(gl2);
      ctx.anim(t => { gl.material.opacity = 0.75 + Math.sin(t * 1.5 + x) * 0.1; });
      light(g, '#5ff0e8', 26, [x, 0.8, -3.2], 7);
      // kvaple
      for (let i = 0; i < 6; i++) { const sx = x - 1.1 + i * 0.44, h = 0.35 + ((i * 0.618) % 1) * 0.5; K(g, [0.11, h, 7], rc[i % 3], [sx, 2.5 - h / 2 + Math.abs(i - 2.5) * -0.12, -3.2 - (i % 2) * 0.25], [Math.PI, 0, 0]); }
      const hb = hitBall(g, 1.2); hb.position.set(x, 1.1, -3.4); ctx.tap(hb, ['Voda tu svieti na modro ✨', 'Grotta azzurra 💙']);
    }
    // mesto nad útesom
    [[-7, 5.0, -4.9, 1.2, 1.3], [-5.5, 5.0, -5.1, 1.1, 1.7], [-3.4, 5.2, -4.7, 1.3, 1.2], [-1.6, 5.2, -5.2, 1.0, 1.5], [0, 5.4, -4.8, 1.3, 1.6], [1.8, 5.2, -5.2, 1, 1.2], [3.4, 5.2, -4.7, 1.2, 1.8], [5.4, 5.0, -4.9, 1.3, 1.3], [7, 5.0, -4.6, 1.0, 1.0]].forEach(([x, y, z, wd, h], i) => house(g, [x, y - 0.1, z], wd, h, 1.1, i % 3 ? '#ffffff' : '#fbf5ea', { win: i % 2 ? '#3f9a8f' : '#4a7fb5' }));
    blob(g, 0.5, '#5f8f4a', [-4.5, 5.1, -3.5], [1.4, 0.5, 1]); blob(g, 0.45, '#6b9a50', [2.6, 5.2, -3.4], [1.4, 0.5, 1]); blob(g, 0.4, '#5f8f4a', [6.6, 5.0, -3.4], [1.3, 0.5, 1]);
    rock(g, [-7, 0.3, -2.3], 2.2, rc[1]); rock(g, [7, 0.3, -2.2], 2.0, rc[0]); rock(g, [5.4, 0.2, 1.4], 1.1, rc[2]); rock(g, [-5.8, 0.2, 2.2], 1.2, rc[2]); rock(g, [-0.1, 0.25, -2.6], 1.5, rc[0]);
    // drevená loďka
    const bt = boat(g, [0.5, 0, 1.2], { ry: 0.6, len: 3.6, w: 1.45, fb: 0.4, depth: 0.6, well: 0.24, rise: 0.22, col: '#f7f4ec', trim: '#2f7fd0', deck: '#c79a64' });
    const dy = bt.userData.deckY;
    B(bt, [1.22, 0.05, 0.34], '#b98a58', [0, dy + 0.33, -0.25]); B(bt, [1.0, 0.05, 0.3], '#b98a58', [0, dy + 0.33, 0.95]);
    for (const x of [-0.5, 0.5]) B(bt, [0.05, 0.3, 0.3], '#b98a58', [x, dy + 0.16, -0.25]);
    B(bt, [0.24, 0.34, 0.2], '#2b2f38', [0, 0.52, -1.92]); C(bt, [0.03, 0.03, 0.6, 8], '#2b2f38', [0, 0.15, -1.98]); B(bt, [0.05, 0.05, 0.4], '#2b2f38', [0, 0.62, -1.7]);
    C(bt, [0.012, 0.012, 0.8, 6], '#ffffff', [0.45, 0.85, -1.55]); ['#2e9e4f', '#ffffff', '#d6222b'].forEach((c, i) => B(bt, [0.12, 0.22, 0.015], c, [0.52 + i * 0.12, 1.13, -1.55]));
    for (let i = 0; i < 7; i++) B(bt, [0.012, 0.004, 2.1], '#b08650', [-0.42 + i * 0.14, dy + 0.004, -0.45]).castShadow = false;
    const d = person(bt, 'd', ITA_D, [-0.3, dy, -0.25], 0.35); pose(d, { sit: true, armL: [-0.45, 0.5], elbowL: -0.5, armR: [-0.6, -0.1], elbowR: -0.7, head: [0, 0.55, 0] });
    ctx.tap(d, ['Pozri, aká je tá voda modrá.', 'Nech tá plavba trvá čo najdlhšie.'], 1.75);
    const m = person(bt, 'm', ITA_M, [0.3, dy, -0.25], -0.2); pose(m, { sit: true, armR: [-1.35, -1.2], elbowR: -0.2, armL: [-0.6, 0.1], elbowL: -0.7, head: [0, -0.8, 0] });
    ctx.tap(m, ['Aha, jaskyňa! 😍', 'Tá voda je neskutočná!'], 1.6);
    ctx.anim(t => { bt.position.y = Math.sin(t * 1.3) * 0.035; bt.rotation.z = Math.sin(t * 1.1) * 0.03; bt.rotation.x = Math.sin(t * 0.9) * 0.02; });
    // čajky
    for (let i = 0; i < 3; i++) {
      const b = G(g); const a1 = B(b, [0.4, 0.03, 0.14], '#ffffff', [0.2, 0, 0]), a2 = B(b, [0.4, 0.03, 0.14], '#ffffff', [-0.2, 0, 0]);
      ctx.anim(t => { const a = t * 0.4 + i * 2; b.position.set(Math.cos(a) * (3 + i), 6.6 + i * 0.5, Math.sin(a) * (3 + i) - 1); b.rotation.y = -a; a1.rotation.z = Math.sin(t * 6 + i) * 0.5; a2.rotation.z = -Math.sin(t * 6 + i) * 0.5; });
    }
    ctx.secret([-3.3, 0.55, -3.5], 0.26);
  },
};
