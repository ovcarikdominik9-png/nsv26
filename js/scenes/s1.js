// Scény 1–5: stanica, ruže, Bombónik, Tatry, motokáry
import { THREE, G, B, C, K, S, T, M, glow, glass, heart, label, sprite, base, person, pose, idle, pine, lamp, bench, table, chair, bush, balloon, house, giftBox, mountain, stringLights, rock } from '../kit.js';

export const light = (g, color, intensity, pos, dist = 10) => { const l = new THREE.PointLight(color, intensity, dist, 2); l.position.set(...pos); g.add(l); return l; };
export const D_HOME = { top: '#8a5a3a', bottom: '#26262b', shoes: '#ffffff' };
export const M_HOME = { top: '#f7b8cf', bottom: '#9a9ca6', shoes: '#26262b', shoeType: 'heel' };

// ---------- 1. Otázka na nástupišti ----------
export const stanica = {
  env: { sky: ['#4f5f86', '#d7a9bb'], fog: ['#8f93b0', 24, 80], sun: ['#c9d4ff', 1.3, [-6, 10, 7]], hemi: ['#c8d4ff', '#6a6a80', 1.6], fx: 'rain' },
  cam: { pos: [3.6, 4.4, 12.2], target: [0.6, 1.7, -0.6] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.6, top: '#7c8089', side: '#5d6068', under: '#4a4c54' });
    // koľaje
    B(g, [14.6, 0.08, 3.1], '#6e6259', [0, 0.04, -2.6]);
    for (let i = 0; i < 18; i++) B(g, [0.22, 0.08, 2.3], '#5a4a3c', [-7 + i * 0.82, 0.1, -2.6]);
    B(g, [14.6, 0.1, 0.1], '#b9bcc4', [0, 0.17, -1.95]); B(g, [14.6, 0.1, 0.1], '#b9bcc4', [0, 0.17, -3.25]);
    // nástupište
    B(g, [15, 0.32, 3.7], '#b4b7bf', [0, 0.16, 0.95]);
    B(g, [15, 0.02, 0.16], '#ffd84a', [0, 0.33, -0.62]);
    for (const [x, z, s] of [[-1.5, 1.9, 0.8], [3.6, 0.6, 0.55], [-5.4, 0.2, 0.6]]) { const p = C(g, [s, s, 0.01, 12], M('#8fa3c8', { transparent: true, opacity: 0.55 }), [x, 0.335, z]); p.scale.z = 0.6; }
    // vlak ZSSK
    const tr = G(g, [0, 0, -2.6]);
    B(tr, [12.6, 2.4, 2.4], '#d6222b', [0, 1.95, 0]);
    B(tr, [12.62, 0.36, 2.42], '#f4f4f4', [0, 1.3, 0]);
    B(tr, [12.4, 0.5, 2.3], '#3b3f4a', [0, 0.62, 0]);
    B(tr, [12.3, 0.22, 2.0], '#c9ccd2', [0, 3.24, 0]);
    for (const x of [-4.4, -2.9, -1.4, 3.6, 5.1]) { const w = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.8, 0.06), glow('#ffe7ad')); w.position.set(x, 2.4, 1.21); tr.add(w); }
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.05, 0.06), glow('#ffdf9a')); door.position.set(1.5, 1.92, 1.21); tr.add(door);
    B(tr, [0.08, 2.1, 0.1], '#f2c230', [0.86, 1.92, 1.24]); B(tr, [0.08, 2.1, 0.1], '#f2c230', [2.14, 1.92, 1.24]);
    B(tr, [1.3, 0.12, 0.5], '#555a66', [1.5, 0.84, 1.4]);
    label(tr, 'ZSSK', 1.5, 0.46, { fg: '#ffffff', size: 100 }, [-5.45, 1.9, 1.215]);
    for (const x of [-4.8, -3.6, 3.6, 4.8]) for (const z of [-0.9, 0.9]) C(tr, [0.38, 0.38, 0.16, 12], '#2a2c33', [x, 0.42, z], [Math.PI / 2, 0, 0]);
    ctx.tap(tr, ['Odchod o tri sekundy! 🚆', 'Túúú!'], 3.9);
    light(g, '#ffd9a0', 16, [1.5, 2.2, -0.6], 9);
    // my dvaja
    const m = person(g, 'm', { top: '#1f4d3c', topType: 'coat', bottom: '#2b2b33', shoes: '#26262b', shoeType: 'heel' }, [1.5, 0.9, -1.25], -0.75);
    pose(m, { armR: [-0.5, -0.2], elbowR: -0.9 }); idle(ctx, m, 1);
    ctx.tap(m, ['Mám 💗', 'A kam pôjdeme?'], 2.1);
    const d = person(g, 'd', { top: '#1c1c21', topType: 'coat', bottom: '#1c1c21', shoes: '#1c1c21' }, [-0.2, 0.32, 0.1], 1.75);
    pose(d, { armL: [-0.9, 0.3], elbowL: -1.2 }); idle(ctx, d, 0);
    ctx.tap(d, ['Mala by si budúcu sobotu čas? 🥺', 'Prosím, povedz áno…'], 2.35);
    // stanica: tabuľa, prístrešok, lavička, lampy
    C(g, [0.06, 0.06, 2.6, 6], '#3d3d46', [5.2, 1.6, 2.2]);
    B(g, [2.4, 0.7, 0.08], '#1d4f9c', [5.2, 2.9, 2.2]);
    label(g, 'KOŠICE', 2.2, 0.6, { fg: '#ffffff', size: 110 }, [5.2, 2.9, 2.25]);
    for (const x of [-6.2, -2.6]) C(g, [0.08, 0.08, 3, 6], '#4b4f5c', [x, 1.8, 2.3]);
    B(g, [4.6, 0.14, 2.6], '#4b4f5c', [-4.4, 3.35, 1.4], [0.08, 0, 0]);
    bench(g, [-4.4, 0.32, 2.0], Math.PI);
    B(g, [0.5, 0.7, 0.3], '#8a5a3a', [2.5, 0.67, -0.2]); B(g, [0.1, 0.25, 0.04], '#333', [2.5, 1.12, -0.2]);
    lamp(g, [3.4, 0.32, 2.4], true, 3.4); light(g, '#ffe9b0', 12, [3.8, 3.2, 2.4], 8);
    lamp(g, [-7, 0.32, 0.4], true, 3.4);
    const clk = G(g, [-2.6, 3.0, 2.36]); C(clk, [0.32, 0.32, 0.1, 14], '#ffffff', null, [Math.PI / 2, 0, 0]); B(clk, [0.03, 0.2, 0.02], '#222', [0, 0.08, 0.06]); B(clk, [0.14, 0.03, 0.02], '#222', [0.06, 0, 0.06]);
    ctx.secret([-4.4, 0.62, 2.0], 0.26);
  },
};

// ---------- 2. Sedem červených ruží ----------
export const ruze = {
  env: { sky: ['#a9c8ee', '#ffe1ea'], fog: ['#f1e6ef', 30, 90], sun: ['#fff1dc', 2.5, [6, 11, 8]], hemi: ['#ffffff', '#d8d4e4', 1.9], fx: 'snow' },
  cam: { pos: [0.5, 4.2, 12.6], target: [0, 1.7, 0] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.4, top: '#e9e6ee', side: '#bfc3cf', under: '#9a9eab' });
    C(g, [5.2, 5.2, 0.03, 30], '#d3cfd6', [0, 0.02, 1.4]).scale.z = 0.62;
    // staničná budova
    const st = G(g, [0, 0, -4.3]);
    B(st, [11.6, 3.6, 2.6], '#ebe6dc', [0, 1.8, 0]);
    B(st, [12, 0.28, 3], '#8e96a6', [0, 3.74, 0]);
    B(st, [6.2, 4.6, 2.8], '#f4efe6', [0, 2.3, 0.1]);
    B(st, [6.6, 0.3, 3.2], '#8e96a6', [0, 4.75, 0.1]);
    const fac = new THREE.Mesh(new THREE.BoxGeometry(5.4, 3.3, 0.08), glass('#8ec9ff', 0.7)); fac.position.set(0, 2.55, 1.52); st.add(fac);
    for (let i = -2; i <= 2; i++) B(st, [0.08, 3.3, 0.1], '#ffffff', [i * 1.08, 2.55, 1.56]);
    for (const y of [1.6, 2.7]) B(st, [5.4, 0.08, 0.1], '#ffffff', [0, y, 1.56]);
    const vit = new THREE.Mesh(new THREE.CircleGeometry(0.75, 16), glow('#ffcf5c')); vit.position.set(0, 3.25, 1.6); st.add(vit);
    heart(st, 0.5, '#e33b5c', [0, 3.22, 1.66]);
    B(st, [2.2, 0.85, 0.12], '#5b6b86', [0, 0.45, 1.56]);
    label(st, 'KOŠICE', 4.2, 0.8, { fg: '#5b6b86', size: 110 }, [0, 5.35, 1.0]);
    for (const x of [-4.4, -3.2, 3.2, 4.4]) { const w = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.3, 0.05), M('#7fa8d6')); w.position.set(x, 2.1, 1.31); st.add(w); }
    B(g, [7, 0.14, 1], '#cfcbd2', [0, 0.07, -2.4]);
    // my dvaja
    const d = person(g, 'd', { top: '#1c1c21', topType: 'coat', bottom: '#1c1c21', shoes: '#1c1c21' }, [-1.5, 0, 2.3], 1.05);
    pose(d, { armL: [-1.15, 0.1], elbowL: -0.7 }); idle(ctx, d, 0);
    const bq = G(d.userData.parts.elbowL, [0, -0.3, 0.02], [2.2, 0, 0]);
    K(bq, [0.17, 0.5, 8], '#fff7ee', [0, 0.05, 0], [Math.PI, 0, 0]);
    [[0, 0.38, 0], [0.11, 0.33, 0.04], [-0.11, 0.33, 0.04], [0.06, 0.34, -0.1], [-0.06, 0.34, -0.1], [0.05, 0.42, 0.09], [-0.06, 0.43, 0.08]].forEach(p => S(bq, 0.075, '#e0183c', p, null, 6));
    S(bq, 0.12, '#3f9a55', [0, 0.27, 0], [1.3, 0.5, 1.3], 6);
    ctx.tap(d, ['Sedem ruží. Počítal som ich trikrát. 🌹', 'Srdce mám až v krku.'], 2.35);
    const m = person(g, 'm', { top: '#f3e6cf', topType: 'coat', bottom: '#2b2b33', shoes: '#26262b', shoeType: 'heel' }, [1.5, 0, 2.0], -1.05);
    pose(m, { legL: -0.3, legR: 0.3, armL: [0.3, 0.1], armR: [-0.3, -0.1] }); idle(ctx, m, 2);
    ctx.tap(m, ['Tie sú pre mňa? 🥹', 'Ahoj 💗'], 2.1);
    const fh = heart(g, 0.32, '#ff5d96', [0, 3.1, 2.1]); fh.castShadow = false;
    ctx.anim(t => { fh.position.y = 3.1 + Math.sin(t * 2) * 0.12; fh.scale.setScalar(0.32 + Math.sin(t * 4) * 0.03); });
    // okolie
    pine(g, [-6, 0, 0.6], 1.1, true); pine(g, [6.2, 0, 0.4], 1.2, true); pine(g, [-6.6, 0, -2], 0.9, true);
    lamp(g, [-4.2, 0, 3.6], false); lamp(g, [4.4, 0, 3.4], false).rotation.y = Math.PI;
    bench(g, [4.6, 0, 1.6], -1.2); S(g, 0.5, '#ffffff', [-3.6, 0.1, 4.6], [1.4, 0.5, 1]); S(g, 0.6, '#ffffff', [5.6, 0.1, 3.2], [1.3, 0.45, 1]);
    ctx.secret([6.2, 0.4, -0.5], 0.28);
  },
};

// ---------- 3. Palacinky v Bomboniku ----------
export const bombonik = {
  env: { sky: ['#f3b999', '#ffe6da'], sun: ['#ffe6c8', 1.7, [5, 10, 9]], hemi: ['#fff1e0', '#d6a37c', 2.2], fx: 'hearts' },
  cam: { pos: [3.2, 4.6, 10.6], target: [0, 1.4, -0.6] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 7.2, top: '#d9a877', side: '#a8744a', under: '#7a5236' });
    for (let i = -3; i <= 3; i++) for (let j = -3; j <= 2; j++) if ((i + j) % 2 === 0) B(g, [1.3, 0.02, 1.3], '#e8c39a', [i * 1.3, 0.01, j * 1.3 - 0.2]).castShadow = false;
    // steny
    B(g, [10.3, 4.6, 0.3], '#ffeedd', [0, 2.3, -3.6]); B(g, [0.3, 4.6, 6], '#ffe6d2', [-5, 2.3, -0.75]);
    B(g, [10.3, 1.1, 0.34], '#7a4a2f', [0, 0.55, -3.6]); B(g, [0.34, 1.1, 6], '#7a4a2f', [-5, 0.55, -0.75]);
    B(g, [3.9, 1, 0.1], '#6a3d24', [0, 3.6, -3.42]);
    label(g, 'Bombónik', 3.6, 0.85, { fg: '#ffe9d0', size: 100 }, [0, 3.6, -3.36]);
    heart(g, 0.22, '#ff7eb6', [2.2, 3.6, -3.38]); heart(g, 0.22, '#ff7eb6', [-2.2, 3.6, -3.38]);
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.7, 2.2), glow('#bfe3ff')); win.position.set(-4.84, 2.5, -0.2); g.add(win);
    B(g, [0.1, 1.8, 0.08], '#ffffff', [-4.8, 2.5, -0.2]); B(g, [0.1, 0.08, 2.3], '#ffffff', [-4.8, 2.5, -0.2]);
    // polica s pohármi
    B(g, [2.8, 0.08, 0.4], '#a8744a', [-2.9, 2.1, -3.3]);
    ['#ff8fb8', '#ffd86e', '#9fe0ff', '#c9a0ff', '#ff9a5c'].forEach((c, i) => { C(g, [0.14, 0.14, 0.34, 8], glass('#ffffff', 0.5), [-4 + i * 0.55, 2.32, -3.3]); S(g, 0.1, c, [-4 + i * 0.55, 2.28, -3.3]); });
    // pult s bonbónmi
    B(g, [3.3, 1.05, 0.9], '#7a4a2f', [2.9, 0.52, -2.7]); B(g, [3.4, 0.08, 1], '#f6e2cc', [2.9, 1.08, -2.7]);
    const gl = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 0.7), glass('#ffffff', 0.3)); gl.position.set(2.6, 1.37, -2.7); g.add(gl);
    const bc = ['#6a3d24', '#ffffff', '#ff8fb8', '#3b2416', '#f0b46a'];
    for (let i = 0; i < 8; i++) for (let j = 0; j < 2; j++) S(g, 0.07, bc[(i + j * 2) % 5], [1.75 + i * 0.25, 1.2, -2.85 + j * 0.3], null, 6);
    C(g, [0.26, 0.2, 0.05, 10], '#ffffff', [4.1, 1.3, -2.7]); C(g, [0.22, 0.22, 0.2, 10], '#f7b8cf', [4.1, 1.43, -2.7]); S(g, 0.06, '#e0183c', [4.1, 1.57, -2.7]);
    ctx.tap(gl, ['Bonbóniky 🍫', 'Ktorý si dáme?']);
    // lampy
    for (const x of [-2, 0, 2]) { C(g, [0.01, 0.01, 1.2, 3], '#555', [x, 4.0, 0.2]); K(g, [0.3, 0.3, 10], '#ff8fb8', [x, 3.3, 0.2]); const b = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 5), glow('#fff0b8')); b.position.set(x, 3.2, 0.2); g.add(b); }
    light(g, '#ffd9a0', 18, [0, 3, 0.4], 9);
    // stôl s palacinkami
    table(g, [0, 0, 0.5], 0.62, 0.74);
    for (const x of [-0.28, 0.28]) {
      C(g, [0.2, 0.17, 0.025, 12], '#ffffff', [x, 0.79, 0.5]);
      for (const dz of [-0.06, 0.06]) C(g, [0.045, 0.045, 0.3, 6], '#e9b866', [x, 0.84, 0.5 + dz], [0, 0, Math.PI / 2]);
      B(g, [0.26, 0.012, 0.03], '#5a2f1a', [x, 0.886, 0.5], [0, 0.6, 0]); S(g, 0.04, '#e0183c', [x + 0.05, 0.9, 0.48], null, 6);
    }
    C(g, [0.055, 0.045, 0.1, 8], '#ffffff', [-0.05, 0.83, 0.82]); C(g, [0.055, 0.045, 0.1, 8], '#ffffff', [0.1, 0.83, 0.2]);
    const cnd = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 5), glow('#ffd86e')); cnd.position.set(0, 0.93, 0.5); g.add(cnd); C(g, [0.03, 0.03, 0.1, 6], '#fff', [0, 0.83, 0.5]);
    chair(g, [-1.05, 0, 0.5], Math.PI / 2); chair(g, [1.05, 0, 0.5], -Math.PI / 2);
    const d = person(g, 'd', D_HOME, [-1.02, 0, 0.5], Math.PI / 2);
    pose(d, { sit: true, armL: [-0.75, 0.05], armR: [-0.75, -0.05], elbowL: -0.8, elbowR: -0.8, head: [0, -0.45, 0] }); idle(ctx, d, 0);
    ctx.tap(d, ['Vôbec nie som nervózny. Vôbec.', 'Dáš si ešte jednu? 🥞'], 1.95);
    const m = person(g, 'm', M_HOME, [1.02, 0, 0.5], -Math.PI / 2);
    pose(m, { sit: true, armL: [-0.75, 0.05], armR: [-0.75, -0.05], elbowL: -0.8, elbowR: -0.8, head: [0, 0.45, 0] }); idle(ctx, m, 1.5);
    ctx.tap(m, ['Tie palacinky sú super 😊', 'Mňam.'], 1.8);
    // vešiak s kabátmi, kvet
    C(g, [0.04, 0.04, 1.9, 6], '#5a3a22', [-4.2, 0.95, 1.6]); C(g, [0.25, 0.28, 0.05, 8], '#5a3a22', [-4.2, 0.03, 1.6]);
    B(g, [0.5, 1.0, 0.16], '#1c1c21', [-4.2, 1.3, 1.78]); B(g, [0.42, 0.9, 0.16], '#f3e6cf', [-4.02, 1.3, 1.5], [0, 0.9, 0]);
    C(g, [0.25, 0.18, 0.4, 8], '#f7b8cf', [4.3, 0.2, 1.4]); bush(g, [4.3, 0.4, 1.4], 0.9);
    ctx.secret([-2.9, 2.6, -3.3], 0.22);
  },
};

// ---------- 4. Sigma z Popradského plesa ----------
export const tatry = {
  env: { sky: ['#7dbaf0', '#e9f5ff'], fog: ['#e9f5ff', 32, 95], sun: ['#ffffff', 2.9, [8, 12, 7]], hemi: ['#eef6ff', '#b4c6e0', 2.0], fx: 'snow' },
  cam: { pos: [1.4, 4.4, 12.4], target: [0.4, 1.7, 0.4] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.6, top: '#f8fbff', side: '#cfd9e6', under: '#9aa7b8' });
    mountain(g, [-3.8, 0, -4.2], 2.8, 6.4, '#8795a8'); mountain(g, [0.4, 0, -5.2], 3, 8, '#7c8a9e'); mountain(g, [4.2, 0, -4], 2.5, 5.4, '#909db0');
    const lake = C(g, [3.3, 3.3, 0.03, 26], '#bfe5f8', [-2.2, 0.02, -0.4]); lake.scale.z = 0.62; lake.castShadow = false;
    S(g, 0.7, '#ffffff', [-3.4, 0, 0.2], [1.5, 0.12, 1]); S(g, 0.6, '#ffffff', [-1, 0, -1.3], [1.5, 0.1, 1]);
    // chata
    const ch = house(g, [4.6, 0, -0.9], 2.8, 1.9, 2.1, '#8a5a3a', { roof: '#ffffff', roofH: 1.1, lit: '#ffd98a', door: '#5a3a22', ry: -0.5 });
    C(ch, [0.16, 0.16, 0.7, 6], '#7a4a2f', [0.7, 2.7, 0]);
    ctx.tap(ch, 'Horský hotel Popradské pleso. Čaj s rumom? ☕');
    [[-6.2, 1.4, 1.2], [-5, -2.6, 1], [6.4, 1.8, 1.1], [2.6, -2.6, 0.9], [-6.6, -0.6, 0.8], [5.8, 3.6, 0.8], [-4.2, 4.6, 0.9]].forEach(([x, z, s]) => pine(g, [x, 0, z], s, true));
    rock(g, [-5.4, 0.2, 3], 1.2, '#b6bfcc'); rock(g, [3, 0.15, 4.2], 0.8, '#b6bfcc');
    // smerovník
    C(g, [0.05, 0.05, 2, 6], '#7a5236', [-2.6, 1, 3]);
    B(g, [1.9, 0.4, 0.06], '#ffe36e', [-2.6, 1.75, 3.04]); label(g, 'Popradské pleso', 1.8, 0.36, { fg: '#5a3a22', size: 62 }, [-2.6, 1.75, 3.08]);
    B(g, [1.2, 0.3, 0.06], '#ffffff', [-2.6, 1.35, 3.04]); label(g, '1 494 m', 1.1, 0.28, { fg: '#d6222b', size: 70 }, [-2.6, 1.35, 3.08]);
    // snehuliak Sigma
    const sg = G(g, [0.5, 0, 2]);
    S(sg, 0.62, '#ffffff', [0, 0.52, 0], [1, 0.9, 1], 10); S(sg, 0.46, '#ffffff', [0, 1.3, 0], null, 10); S(sg, 0.33, '#ffffff', [0, 1.95, 0], null, 10);
    B(sg, [0.62, 0.26, 0.46], '#ffffff', [0, 1.78, 0.12]); B(sg, [0.5, 0.16, 0.34], '#f2f6fb', [0, 1.62, 0.2]);
    B(sg, [0.14, 0.035, 0.03], '#26262b', [-0.12, 2.07, 0.3], [0, 0, -0.35]); B(sg, [0.14, 0.035, 0.03], '#26262b', [0.12, 2.07, 0.3], [0, 0, 0.35]);
    S(sg, 0.035, '#26262b', [-0.11, 2.0, 0.305]); S(sg, 0.035, '#26262b', [0.11, 2.0, 0.305]);
    K(sg, [0.05, 0.28, 6], '#ff8a3c', [0, 1.92, 0.44], [Math.PI / 2, 0, 0]);
    B(sg, [0.22, 0.02, 0.02], '#26262b', [0, 1.8, 0.36]);
    B(sg, [0.7, 0.04, 0.04], '#7a5236', [-0.7, 1.4, 0], [0, 0, 0.5]); B(sg, [0.7, 0.04, 0.04], '#7a5236', [0.7, 1.4, 0], [0, 0, -0.5]);
    for (const y of [1.15, 1.35]) S(sg, 0.04, '#26262b', [0, y, 0.45]);
    ctx.tap(sg, ['Sigma. 🗿', '…', 'Tá čeľusť sa nerobí sama.'], 2.6);
    ctx.anim(t => { sg.rotation.y = Math.sin(t * 0.7) * 0.08; });
    // my dvaja
    const d = person(g, 'd', { top: '#1c1c21', topType: 'jacket', bottom: '#2a2d36', shoes: '#3a2f2a', gloves: '#1c1c21' }, [-1.1, 0, 2.2], 0.45);
    B(d.userData.parts.body, [0.34, 0.42, 0.18], '#3f6fb3', [0, 1.28, -0.24]);
    pose(d, { armL: [-1.2, 0.5], elbowL: -0.5 }); idle(ctx, d, 0);
    ctx.tap(d, ['Pozri na tú čeľusť. Umenie.', 'Volá sa Sigma. Bez diskusie.'], 2.35);
    const m = person(g, 'm', { top: '#a9aeb8', topType: 'jacket', bottom: '#2f3a55', shoes: '#3a2f2a', hat: '#d6222b', hatType: 'beanie', gloves: '#d6222b' }, [2.1, 0, 2.2], -0.5);
    B(m.userData.parts.body, [0.3, 0.38, 0.16], '#ff7eb6', [0, 1.28, -0.22]);
    pose(m, { armL: [-2.7, 0.35], armR: [-2.7, -0.35] });
    const mq = m.userData.parts;
    ctx.anim(t => { mq.body.position.y = Math.abs(Math.sin(t * 3)) * 0.1; mq.armL.rotation.z = 0.35 + Math.sin(t * 6) * 0.15; mq.armR.rotation.z = -0.35 - Math.sin(t * 6) * 0.15; });
    ctx.tap(m, ['Je krásny! ⛄', 'Je mi zima, ale stojí to za to!'], 2.2);
    ctx.secret([6.9, 0.45, 0.3], 0.28);
  },
};

// ---------- 5. Valentín na motokárach ----------
function kart(g, col) {
  const k = G(g);
  B(k, [0.8, 0.14, 1.5], col, [0, 0.2, 0]); B(k, [0.5, 0.16, 0.5], col, [0, 0.26, 0.85]);
  B(k, [0.6, 0.5, 0.1], '#26262b', [0, 0.5, -0.45], [-0.2, 0, 0]);
  B(k, [1.0, 0.08, 0.16], '#26262b', [0, 0.22, 1.05]); B(k, [0.9, 0.3, 0.1], col, [0, 0.4, -0.75]);
  for (const [x, z] of [[-0.5, 0.6], [0.5, 0.6], [-0.52, -0.55], [0.52, -0.55]]) C(k, [0.2, 0.2, 0.2, 10], '#1c1c21', [x, 0.2, z], [0, 0, Math.PI / 2]);
  C(k, [0.02, 0.02, 0.4, 5], '#555', [0, 0.5, 0.42], [-0.9, 0, 0]); T(k, [0.13, 0.025], '#26262b', [0, 0.66, 0.3], [-0.9, 0, 0]);
  return k;
}
export const motokary = {
  env: { sky: ['#463f6e', '#c78fb4'], sun: ['#ffffff', 2.3, [5, 13, 7]], hemi: ['#f0e8ff', '#5a5566', 2.0], fx: 'sparkle' },
  cam: { pos: [0, 8.4, 13.6], target: [0, 0.6, 0.2] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.6, top: '#8b8e99', side: '#5d6068', under: '#44464e' });
    C(g, [7.1, 7.1, 0.03, 44], '#4b4e58', [0, 0.02, 0]).castShadow = false;
    C(g, [3.5, 3.5, 0.08, 36], '#ffd3e3', [0, 0.05, 0]).castShadow = false;
    for (let i = 0; i < 40; i++) {
      const a = i / 40 * Math.PI * 2, c = i % 2 ? '#ffffff' : '#e0183c';
      B(g, [0.56, 0.08, 0.26], c, [Math.cos(a) * 3.62, 0.07, Math.sin(a) * 3.62], [0, -a + Math.PI / 2, 0]).castShadow = false;
    }
    for (let i = 0; i < 26; i++) {
      const a = i / 26 * Math.PI * 2; if (Math.abs(a - Math.PI / 2) < 0.5) continue;
      const c = ['#e0183c', '#ffffff', '#26262b'][i % 3];
      for (const y of [0.14, 0.38]) T(g, [0.24, 0.11], c, [Math.cos(a) * 7.5, y, Math.sin(a) * 7.5], [Math.PI / 2, 0, 0]);
    }
    for (let i = 0; i < 7; i++) B(g, [0.5, 0.012, 0.5], i % 2 ? '#ffffff' : '#26262b', [3.75 + i * 0.5, 0.045, 0]).castShadow = false;
    for (const x of [3.45, 7.2]) C(g, [0.07, 0.07, 3.2, 6], '#e0183c', [x, 1.6, 0]);
    B(g, [4, 0.6, 0.12], '#26262b', [5.32, 3.1, 0]); label(g, 'ŠTART', 3.6, 0.5, { fg: '#ffffff', size: 100 }, [5.32, 3.1, 0.07]);
    // motokáry
    const km = kart(g, '#ff5d96'), kd = kart(g, '#3f6fb3');
    const m = person(km, 'm', { top: '#f3e6cf', topType: 'coat', bottom: '#2b2b33', shoes: '#26262b', hat: '#ff8fb8', hatType: 'helmet' }, [0, 0, -0.3]);
    const d = person(kd, 'd', { top: '#f3e6cf', topType: 'coat', bottom: '#1c1c21', shoes: '#1c1c21', hat: '#26262b', hatType: 'helmet' }, [0, 0, -0.3]);
    for (const p of [m, d]) { pose(p, { sit: true, armL: [-1.1, 0.1], armR: [-1.1, -0.1], elbowL: -0.5, elbowR: -0.5 }); const q = p.userData.parts; q.kneeL.rotation.x = q.kneeR.rotation.x = 0.5; q.body.position.y = -0.6 * q.k; }
    ctx.tap(km, ['Dobiehaj ma! 😜', 'Kto je tu pomalý?'], 1.9); ctx.tap(kd, ['Počkaj, ešte ťa dobehnem!', 'To bola taktika!'], 2);
    ctx.anim(t => {
      const a = -t * 0.75;
      for (const [k, off, r] of [[km, 0, 5.1], [kd, 0.62, 5.7]]) {
        const b = a + off; k.position.set(Math.cos(b) * r, 0, Math.sin(b) * r); k.rotation.y = -b + Math.PI;
      }
    });
    // ostrovček s darčekom
    table(g, [0, 0.09, 0], 0.5, 0.8, '#ffffff');
    giftBox(g, [0, 0.92, 0], '#ff5d96', '#ffffff', 0.9);
    const br = G(g, [0, 2.0, 0]);
    T(br, [0.3, 0.025], '#ffd24a', null, [Math.PI / 2, 0, 0]);
    heart(br, 0.16, '#ff3f86', [0.08, -0.02, 0.3]); heart(br, 0.16, '#ff3f86', [-0.08, -0.02, 0.3]);
    for (const x of [0.08, -0.08]) { const dm = new THREE.Mesh(new THREE.OctahedronGeometry(0.04), glow('#ffffff')); dm.position.set(x, 0.0, 0.36); br.add(dm); }
    const bh = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 6), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })); br.add(bh);
    ctx.tap(br, ['Náramok s dvoma srdiečkami 💎', 'Jedno tvoje, jedno moje.'], 0.5);
    ctx.anim(t => { br.rotation.y = t * 0.9; br.position.y = 2.0 + Math.sin(t * 2) * 0.1; });
    balloon(g, [-1.6, 0.09, -0.8], '#ff5d96', 1.8); balloon(g, [-1.9, 0.09, -0.3], '#ffffff', 1.5); balloon(g, [1.7, 0.09, -0.9], '#e0183c', 1.9); balloon(g, [2, 0.09, -0.2], '#ffb7d3', 1.5);
    for (const x of [-2.4, 2.4]) C(g, [0.05, 0.05, 2.6, 6], '#ffffff', [x, 1.4, 1.6]);
    stringLights(g, [-2.4, 2.7, 1.6], [2.4, 2.7, 1.6], 10, 0.45, ['#ff8fb8', '#ffffff', '#ff3f86']);
    sprite(g, '14. február', 2.6, 0.6, { bg: '#ffffffee', fg: '#e0457e', size: 70, radius: 60 }, [0, 3.2, 1.6]);
    ctx.secret([0.2, 0.42, -2.6], 0.26);
    B(g, [1.2, 0.5, 0.5], '#e0183c', [0.2, 0.34, -2.2]);
  },
};
