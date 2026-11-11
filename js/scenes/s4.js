// Scény 15–18: Praha, Holandsko, Alghero, loď
import { THREE, G, B, C, K, S, T, M, glow, glass, heart, label, sprite, base, water, person, pose, idle, tree, palm, lamp, bench, bush, tulip, flower, house, parasol, boat, rock, cliff, blob, WHO } from '../kit.js';

const hitBall = (p, r = 0.6) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 6), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })); p.add(m); return m; };
const gl = (p, geo, col, pos, op = 1) => { const m = new THREE.Mesh(geo, glow(col, op)); if (pos) m.position.set(...pos); p.add(m); return m; };

// ---------- 15. Praha ----------
export const praha = {
  env: { sky: ['#66bbff', '#fff0d8'], fog: ['#fff3e0', 34, 100], sun: ['#fff6dc', 3.0, [6, 12, 9]], hemi: ['#ffffff', '#b0d8a0', 2.0] },
  cam: { pos: [3.6, 5.6, 13.6], target: [0, 1.8, -0.4] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.7, top: '#b9d99a' });
    // Vltava
    const rv = B(g, [17.2, 0.06, 3.4], M('#5aa9e6', { transparent: true, opacity: 0.9 }), [0, 0.04, -0.9]); rv.scale.x = 0.97;
    B(g, [15.4, 0.3, 0.3], '#b9b0a2', [0, 0.15, 0.95]); B(g, [15.6, 0.3, 0.3], '#b9b0a2', [0, 0.15, -2.75]);
    C(g, [6, 6, 0.04, 30], '#d9d2c4', [1.6, 0.03, 3.6]).scale.z = 0.5;
    // Karlov most
    const bx = -2.2;
    B(g, [1.5, 0.3, 5.2], '#c9b79c', [bx, 1.25, -0.9]);
    for (const z of [-2.3, -0.9, 0.5]) { B(g, [1.3, 1.2, 0.5], '#b9a78c', [bx, 0.6, z]); K(g, [0.4, 0.5, 4], '#b9a78c', [bx - 0.85, 0.3, z], [0, Math.PI / 4, 0]); }
    for (const x of [bx - 0.72, bx + 0.72]) B(g, [0.08, 0.25, 5.2], '#b9a78c', [x, 1.5, -0.9]);
    for (let i = 0; i < 5; i++) for (const s of [-1, 1]) { B(g, [0.16, 0.2, 0.16], '#8f8577', [bx + s * 0.72, 1.7, -2.9 + i * 1.0]); B(g, [0.1, 0.34, 0.1], '#4b4f5c', [bx + s * 0.72, 1.95, -2.9 + i * 1.0]); S(g, 0.07, '#4b4f5c', [bx + s * 0.72, 2.18, -2.9 + i * 1.0], null, 5); }
    for (const [z, h] of [[2.0, 3.4], [-3.7, 2.6]]) {
      B(g, [1.7, h, 1.2], '#8f8577', [bx, h / 2, z]); B(g, [0.8, 1.2, 1.24], '#3a3540', [bx, 1.85, z]);
      K(g, [1.15, 1.6, 4], '#3f4652', [bx, h + 0.8, z], [0, Math.PI / 4, 0]).scale.z = 0.75;
      for (const sx of [-0.7, 0.7]) for (const sz of [-0.45, 0.45]) K(g, [0.12, 0.6, 4], '#3f4652', [bx + sx, h + 0.3, z + sz]);
    }
    const br = hitBall(g, 1.2); br.position.set(bx, 1.8, -0.9); ctx.tap(br, ['Karlov most 🌉', 'Tu sme sa fotili asi stokrát.']);
    for (const [x, z] of [[1.6, -1.2], [3.4, -0.4]]) { const sw = G(g, [x, 0.1, z]); S(sw, 0.2, '#ffffff', null, [1.3, 0.7, 0.9]); C(sw, [0.04, 0.05, 0.3, 5], '#ffffff', [0.18, 0.2, 0], [0, 0, -0.3]); S(sw, 0.06, '#ffffff', [0.24, 0.36, 0]); K(sw, [0.025, 0.08, 4], '#ff8a3c', [0.31, 0.35, 0], [0, 0, -Math.PI / 2]); ctx.anim(t => { sw.position.x = x + Math.sin(t * 0.3 + z) * 0.8; }); }
    // Hradčany
    const hill = C(g, [3.9, 4.8, 1.5, 28], '#7fae62', [1.8, 0.75, -5.4]); hill.scale.z = 0.55; hill.castShadow = false;
    blob(g, 0.6, '#5f8f4a', [-1.6, 0.9, -4.6], [1.3, 0.8, 1]); blob(g, 0.55, '#6b9a50', [5.2, 0.9, -4.7], [1.3, 0.8, 1]); blob(g, 0.5, '#5f8f4a', [3.4, 1.0, -3.6], [1.3, 0.7, 1]);
    const hr = G(g, [1.6, 1.5, -5.4]);
    B(hr, [6.4, 1.1, 1.1], '#f1e6cf', [0, 0.55, 0]); B(hr, [6.5, 0.3, 1.2], '#c0644e', [0, 1.25, 0]);
    for (let i = 0; i < 12; i++) B(hr, [0.18, 0.3, 0.03], '#7a8aa6', [-2.9 + i * 0.52, 0.6, 0.56]);
    B(hr, [1.1, 2.0, 2.0], '#6b7482', [0.2, 1.6, -0.6]); K(hr, [0.75, 1.0, 4], '#3f4652', [0.2, 3.1, -0.6], [0, Math.PI / 4, 0]).scale.z = 1.8;
    for (const x of [-0.25, 0.65]) { B(hr, [0.42, 2.9, 0.42], '#6b7482', [x, 2.0, 0.35]); K(hr, [0.3, 1.2, 4], '#3f4652', [x, 4.05, 0.35], [0, Math.PI / 4, 0]); }
    B(hr, [0.5, 3.6, 0.5], '#6b7482', [0.2, 2.4, -1.2]); K(hr, [0.36, 1.5, 6], '#4f8f7a', [0.2, 4.95, -1.2]);
    hitBall(hr, 1.8).position.set(0.2, 2.6, 0); ctx.tap(hr, ['Pražský hrad 🏰', 'Výhľad za všetky tie schody.'], 5.8);
    // ZOO: žirafa
    const zo = G(g, [5.6, 0, 1.6], [0, -0.6, 0]);
    const gy = '#f2c14e', gb = '#a8642f';
    B(zo, [0.5, 0.6, 1.1], gy, [0, 1.5, 0]); for (const [x, z] of [[-0.18, 0.4], [0.18, 0.4], [-0.18, -0.4], [0.18, -0.4]]) B(zo, [0.12, 1.25, 0.12], gy, [x, 0.62, z]);
    const nk = G(zo, [0, 1.75, 0.5]); B(nk, [0.24, 1.7, 0.24], gy, [0, 0.8, 0.12], [0.2, 0, 0]); B(nk, [0.28, 0.3, 0.55], gy, [0, 1.75, 0.5]); for (const x of [-0.08, 0.08]) C(nk, [0.02, 0.02, 0.18, 4], gb, [x, 1.98, 0.36]);
    [[0, 1.6, 0.56, 0.3], [0, 1.4, -0.56, 0.2], [0.26, 1.6, 0.1, 0.2], [-0.26, 1.45, -0.2, 0.2], [0, 1.81, 0.2, 0.2]].forEach(([x, y, z, s]) => B(zo, [s * (x ? 0.1 : 1), s, s * (x ? 1 : 0.1)], gb, [x, y, z]));
    ctx.anim(t => { nk.rotation.x = Math.sin(t * 0.8) * 0.12; });
    for (let i = 0; i < 6; i++) B(zo, [0.06, 0.6, 0.06], '#8a5a3a', [-1.2 + i * 0.48, 0.3, 1.1]); B(zo, [2.5, 0.06, 0.06], '#8a5a3a', [0, 0.5, 1.1]);
    label(zo, 'ZOO', 0.9, 0.36, { bg: '#3f9a55', fg: '#ffffff', size: 70, radius: 16 }, [-0.9, 0.95, 1.14]);
    ctx.tap(zo, ['ZOO Praha 🦒', 'Žirafa má lepší výhľad ako my.'], 3.9);
    // Sapa: stánok
    const sp = G(g, [-5.6, 0, 3.4], [0, 0.6, 0]);
    B(sp, [2.2, 0.9, 1], '#c9614f', [0, 0.45, 0]); for (const x of [-1.05, 1.05]) C(sp, [0.04, 0.04, 2.3, 5], '#8a5a3a', [x, 1.15, 0.45]);
    for (let i = 0; i < 6; i++) B(sp, [0.38, 0.06, 1.3], i % 2 ? '#ffd24a' : '#e0183c', [-0.95 + i * 0.38, 2.3, 0.1], [0.25, 0, 0]);
    label(sp, 'SAPA', 1.3, 0.4, { bg: '#ffd24a', fg: '#c0392b', size: 76, radius: 12 }, [0, 1.95, 0.72]);
    for (const x of [-0.8, 0.8]) gl(sp, new THREE.SphereGeometry(0.14, 8, 6), '#ff5a3c', [x, 1.75, 0.6]);
    ['#7fd27a', '#ff8a3c', '#ffe36e'].forEach((c, i) => S(sp, 0.12, c, [-0.7 + i * 0.3, 0.98, 0.2], null, 6));
    const pl = G(sp, [0.6, 0.9, 0.1]); C(pl, [0.13, 0.13, 0.55, 8], '#1c1c21', [0, 0.38, 0]); S(pl, 0.15, '#1c1c21', [0, 0.68, 0]); S(pl, 0.13, '#1c1c21', [-0.13, 0.1, 0]); S(pl, 0.13, '#1c1c21', [0.13, 0.1, 0]);
    for (const x of [-0.05, 0.05]) S(pl, 0.022, '#ffffff', [x, 0.5, 0.125]); T(pl, [0.04, 0.01, Math.PI], '#ff8fb8', [0, 0.43, 0.13], [0, 0, Math.PI]);
    hitBall(pl, 0.5).position.y = 0.4;
    ctx.tap(pl, ['Tohto sme si domov nekúpili. 🙈', 'Ale fotka s ním existuje.'], 1);
    ctx.tap(sp, ['Sapa, malý Vietnam v Prahe 🍜'], 2.7);
    // minigolf
    const mg = G(g, [4.4, 0, 4.6], [0, 0.5, 0]);
    B(mg, [0.9, 0.08, 2.2], '#3fae6a', [0, 0.05, 0]); B(mg, [1.1, 0.14, 0.1], '#fff3e0', [0, 0.07, -1.15]); B(mg, [0.1, 0.14, 2.3], '#fff3e0', [-0.5, 0.07, 0]); B(mg, [0.1, 0.14, 2.3], '#fff3e0', [0.5, 0.07, 0]);
    C(mg, [0.012, 0.012, 0.7, 4], '#fff', [0, 0.4, -0.8]); B(mg, [0.26, 0.16, 0.02], '#ff3f86', [0.14, 0.66, -0.8]); S(mg, 0.05, '#ffffff', [0.1, 0.13, 0.5]);
    ctx.tap(mg, ['Minigolf: odveta za narodeniny ⛳'], 1.2);
    // my dvaja
    const d = person(g, 'd', { top: '#1c1c21', sleeves: 'short', collar: true, shirt: '#1c1c21', bottom: '#ffffff', bottomType: 'shorts', shoes: '#ffffff' }, [0.5, 0, 3.4], 0.15);
    pose(d, { armL: [0, 0.3] }); idle(ctx, d, 0); ctx.tap(d, ['Kam ideme najprv?', 'Poďme na Karlov most.'], 2.35);
    const m = person(g, 'm', { top: '#1c1c21', sleeves: 'none', bottom: '#1c1c21', bottomType: 'skirt', shoes: '#e9c89a', shoeType: 'sandal' }, [1.32, 0, 3.4], -0.15);
    pose(m, { armR: [0, -0.3], armL: [-1.5, 0.7], elbowL: -0.4 }); idle(ctx, m, 1.2); ctx.tap(m, ['Poďme ešte na trdelník! 🥰', 'Odfoť ma na moste!'], 2.15);
    tree(g, [7, 0, -1.2], 1); tree(g, [-6.8, 0, -4.2], 1.1); lamp(g, [3, 0, 2], false); bench(g, [-1.6, 0, 4.6], 0.3); bush(g, [6.8, 0, 3.6], 0.8);
    ctx.secret([-2.2, 0.45, -1.6], 0.26);
  },
};

// ---------- 16. Leto medzi kvetmi (Holandsko) ----------
function bike(g, col, road) {
  const b = G(g);
  for (const z of [-0.52, 0.52]) { T(b, [0.33, 0.03], '#1c1c21', [0, 0.36, z], [0, Math.PI / 2, 0]); C(b, [0.03, 0.03, 0.06, 6], '#c9ccd2', [0, 0.36, z], [0, 0, Math.PI / 2]); }
  B(b, [0.05, 0.05, 0.75], col, [0, 0.72, -0.02], [road ? -0.12 : 0, 0, 0]); B(b, [0.05, 0.62, 0.05], col, [0, 0.62, -0.25], [0.3, 0, 0]); B(b, [0.05, 0.6, 0.05], col, [0, 0.58, 0.14], [-0.75, 0, 0]);
  B(b, [0.05, 0.55, 0.05], col, [0, 0.62, 0.45], [0.3, 0, 0]); B(b, [0.05, 0.05, 0.5], col, [0, 0.36, -0.3]);
  B(b, [0.16, 0.05, 0.26], '#26262b', [0, 0.95, -0.32]); B(b, [0.5, 0.04, 0.04], '#26262b', [0, road ? 0.95 : 1.14, road ? 0.36 : 0.24]); C(b, [0.02, 0.02, road ? 0.2 : 0.36, 6], '#c9ccd2', [0, road ? 0.88 : 0.98, road ? 0.36 : 0.3], [road ? 0 : -0.35, 0, 0]);
  b.userData.bar = road ? [0.36, 0.95] : [0.24, 1.14];
  if (!road) { B(b, [0.34, 0.22, 0.26], '#c99a6b', [0, 0.98, 0.6]); for (const c of ['#ff5d8f', '#ffd24a', '#ffffff']) S(b, 0.07, c, [(c.charCodeAt(2) % 3 - 1) * 0.09, 1.13, 0.6], null, 5); }
  return b;
}
function rider(b, who, fit, lean) {
  const p = person(b, who, fit, [0, 0, -0.32]);
  const q = p.userData.parts, k = q.k;
  // bedrá ostanú na sedle, trup sa nakloní dopredu okolo nich
  q.body.rotation.x = lean;
  q.body.position.set(0, 1.04 - 0.9 * k * Math.cos(lean), -0.9 * k * Math.sin(lean));
  // ruky mieria na riadidlá
  const [bz, by] = b.userData.bar, sy = 1.04 + 0.555 * k * Math.cos(lean), sz = -0.32 + 0.555 * k * Math.sin(lean);
  const reach = Math.atan2(bz - sz, sy - by), a = -reach - lean;
  pose(p, { armL: [a, 0.1], armR: [a, -0.1], elbowL: -0.12, elbowR: -0.12, head: [-lean * 0.75, 0, 0] });
  // šliapanie: hore dopredu, dole dozadu
  return (t) => {
    const s = Math.sin(t * 5), c = Math.cos(t * 5);
    q.legL.rotation.x = -0.8 - lean + s * 0.42; q.kneeL.rotation.x = 1.05 - c * 0.45;
    q.legR.rotation.x = -0.8 - lean - s * 0.42; q.kneeR.rotation.x = 1.05 + c * 0.45;
  };
}
export const holandsko = {
  env: { sky: ['#86ccff', '#fff2c4'], fog: ['#fff3d6', 34, 100], sun: ['#fff0c8', 2.9, [-7, 9, 7]], hemi: ['#ffffff', '#b8e0a0', 2.0], fx: 'petals' },
  cam: { pos: [0.4, 6.6, 14.2], target: [0, 1.1, 0] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.8, top: '#9fdc82' });
    C(g, [7.1, 7.1, 0.03, 48], '#c9614f', [0, 0.02, 0]).castShadow = false;
    C(g, [5.7, 5.7, 0.045, 48], '#a6e08a', [0, 0.03, 0]).castShadow = false;
    for (let i = 0; i < 30; i++) { const a = i / 30 * Math.PI * 2; B(g, [0.5, 0.012, 0.07], '#ffffff', [Math.cos(a) * 6.4, 0.045, Math.sin(a) * 6.4], [0, -a + Math.PI / 2, 0]).castShadow = false; }
    // skleník
    const gh = G(g, [-1.9, 0.05, -2.2]);
    const W = 5.2, D = 3.2, H = 1.9, fr = '#ffffff';
    B(gh, [W, 0.1, D], '#d9d2c4', [0, 0.05, 0]);
    for (const x of [-W / 2, -W / 6, W / 6, W / 2]) for (const z of [-D / 2, D / 2]) B(gh, [0.07, H, 0.07], fr, [x, H / 2, z]);
    for (const z of [-D / 2, D / 2]) { B(gh, [W, 0.07, 0.07], fr, [0, H, z]); const w = new THREE.Mesh(new THREE.BoxGeometry(W, H, 0.03), glass('#c9f0ff', 0.28)); w.position.set(0, H / 2, z); gh.add(w); }
    for (const x of [-W / 2, W / 2]) { B(gh, [0.07, 0.07, D], fr, [x, H, 0]); const w = new THREE.Mesh(new THREE.BoxGeometry(0.03, H, D), glass('#c9f0ff', 0.28)); w.position.set(x, H / 2, 0); gh.add(w); }
    B(gh, [W, 0.08, 0.08], fr, [0, H + 0.85, 0]);
    for (const s of [-1, 1]) { const r = new THREE.Mesh(new THREE.BoxGeometry(W, 0.03, 1.82), glass('#c9f0ff', 0.3)); r.position.set(0, H + 0.42, s * D / 4); r.rotation.x = s * 0.49; gh.add(r); for (const x of [-W / 2, -W / 6, W / 6, W / 2]) B(gh, [0.06, 0.06, 1.82], fr, [x, H + 0.42, s * D / 4], [s * 0.49, 0, 0]); }
    const fc = ['#ff5d8f', '#ffd24a', '#ff8a3c', '#c56bff', '#ffffff', '#ff3f86'];
    for (let r = 0; r < 3; r++) { B(gh, [W - 0.8, 0.5, 0.6], '#b9b0a2', [0, 0.35, -1 + r]); for (let i = 0; i < 12; i++) { C(gh, [0.012, 0.012, 0.26, 3], '#4fa85a', [-2 + i * 0.365, 0.73, -1 + r]); S(gh, 0.09, fc[(i + r * 2) % 6], [-2 + i * 0.365, 0.9, -1 + r], [1, 0.8, 1], 6); } }
    hitBall(gh, 1.6).position.y = 1.2; ctx.tap(gh, ['Náš skleník 🌸', 'Tu sme strávili celé leto.'], 3.2);
    // veterný mlyn
    const wm = G(g, [3.6, 0, -2.6]);
    C(wm, [0.7, 1.2, 3.2, 8], '#f3ead9', [0, 1.6, 0]); K(wm, [0.9, 0.9, 8], '#a0523d', [0, 3.65, 0]); B(wm, [0.4, 0.7, 0.06], '#7a4a2f', [0, 0.36, 1.13]);
    const sl = G(wm, [0, 3.2, 0.85]); C(sl, [0.08, 0.08, 0.3, 6], '#7a4a2f', null, [Math.PI / 2, 0, 0]);
    for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; B(sl, [0.08, 2.4, 0.05], '#7a4a2f', [Math.sin(a) * 1.2, Math.cos(a) * 1.2, 0], [0, 0, -a]); B(sl, [0.5, 1.8, 0.03], '#ffffff', [Math.sin(a) * 1.4 + Math.cos(a) * 0.22, Math.cos(a) * 1.4 - Math.sin(a) * 0.22, 0], [0, 0, -a]); }
    ctx.anim(t => { sl.rotation.z = -t * 0.5; }); ctx.tap(wm, ['Typické Holandsko 🇳🇱'], 4.4);
    // tulipánové pole a kanál
    fc.slice(0, 5).forEach((c, r) => { B(g, [4.4, 0.05, 0.36], '#7a5a3a', [1.6, 0.06, 1.4 + r * 0.55]).castShadow = false; for (let i = 0; i < 11; i++) tulip(g, [-0.4 + i * 0.4, 0.06, 1.4 + r * 0.55], c, 1.1); });
    B(g, [3.2, 0.03, 1.0], '#6ab8ec', [-3, 0.06, 2.4], [0, 0.35, 0]).castShadow = false;
    for (const [x, z] of [[-3.4, 2.5], [-2.5, 2.2]]) { const dk = G(g, [x, 0.12, z]); S(dk, 0.12, '#ffe36e', null, [1.3, 0.8, 0.9], 6); S(dk, 0.07, '#ffe36e', [0.12, 0.1, 0], null, 6); K(dk, [0.02, 0.06, 4], '#ff8a3c', [0.2, 0.1, 0], [0, 0, -Math.PI / 2]); ctx.anim(t => { dk.position.y = 0.12 + Math.sin(t * 2 + x) * 0.015; }); }
    // krava
    const cw = G(g, [-4.4, 0, 0.2], [0, 1.1, 0]);
    B(cw, [0.6, 0.6, 1.2], '#ffffff', [0, 0.85, 0]); B(cw, [0.4, 0.4, 0.5], '#ffffff', [0, 1.05, 0.8]); B(cw, [0.3, 0.2, 0.2], '#ffb7c8', [0, 0.95, 1.08]);
    for (const [x, z] of [[-0.2, 0.45], [0.2, 0.45], [-0.2, -0.45], [0.2, -0.45]]) B(cw, [0.14, 0.6, 0.14], '#ffffff', [x, 0.3, z]);
    B(cw, [0.62, 0.3, 0.4], '#26262b', [0, 0.95, -0.2]); B(cw, [0.3, 0.25, 0.62], '#26262b', [0.16, 0.8, 0.3]); B(cw, [0.42, 0.14, 0.2], '#26262b', [0, 1.2, 0.7]);
    ctx.tap(cw, ['Múúú 🐄', 'Goedemorgen!'], 1.8);
    // smerovník
    C(g, [0.05, 0.05, 2.4, 6], '#ffffff', [0.2, 1.2, 4.9]);
    B(g, [1.6, 0.34, 0.05], '#ffffff', [0.85, 2.15, 4.9]); label(g, 'Arnhem →', 1.5, 0.3, { fg: '#d6222b', size: 70 }, [0.85, 2.15, 4.94]);
    B(g, [1.7, 0.34, 0.05], '#ffffff', [-0.5, 1.72, 4.9]); label(g, '← Nijmegen', 1.6, 0.3, { fg: '#d6222b', size: 70 }, [-0.5, 1.72, 4.94]);
    // bicykle
    const bm = bike(g, '#1c1c21', true), bd = bike(g, '#8d919b', false);
    const am = rider(bm, 'm', { top: '#ffffff', sleeves: 'short', bottom: '#2f3a55', bottomType: 'shorts', shoes: '#ffffff' }, 0.8);
    const ad = rider(bd, 'd', { top: '#3f9a55', sleeves: 'short', bottom: '#26262b', bottomType: 'shorts', shoes: '#ffffff' }, 0.32);
    ctx.tap(bm, ['Kto bude prvý v skleníku? 🚴‍♀️', 'Šliapni do toho!'], 2.1); ctx.tap(bd, ['Počkaj ma!', 'Dobré ráno, Holandsko.'], 2.3);
    ctx.anim(t => {
      const a = -t * 0.42;
      for (const [b, off] of [[bm, 0], [bd, 0.5]]) { const c = a + off; b.position.set(Math.cos(c) * 6.4, 0.03, Math.sin(c) * 6.4); b.rotation.y = -c + Math.PI; }
      am(t); ad(t * 0.92);
    });
    tree(g, [-7.7, 0, -3], 1); tree(g, [7.9, 0, 1], 0.9); bush(g, [3.4, 0, 3.9], 0.8);
    // Molly: malý biely psík so sánkou dopredu
    const mo = G(g); const mb = G(mo, [0, 0, 0]); mb.scale.setScalar(0.8);
    blob(mb, 0.2, '#fbfaf6', [0, 0.3, 0], [0.85, 0.8, 1.45], { amp: 0.1, seed: 4 });
    blob(mb, 0.15, '#fbfaf6', [0, 0.46, 0.3], [1, 0.95, 1], { amp: 0.1, seed: 9 });
    S(mb, 0.055, '#f4f1ea', [0, 0.44, 0.43], [1, 0.7, 1]);          // horná čeľusť
    S(mb, 0.06, '#f4f1ea', [0, 0.395, 0.455], [1.05, 0.6, 1.05]);   // spodná čeľusť trčí viac dopredu
    S(mb, 0.024, '#1c1c1c', [0, 0.465, 0.475]);
    for (const x of [-0.022, 0.022]) B(mb, [0.012, 0.02, 0.01], '#ffffff', [x, 0.425, 0.505]);
    for (const x of [-0.055, 0.055]) { S(mb, 0.02, '#1c1c1c', [x, 0.5, 0.405]); S(mb, 0.06, '#f1ede3', [x * 2.3, 0.47, 0.26], [0.5, 1.2, 0.8]); }
    const legs = [[-0.09, 0.18], [0.09, 0.18], [-0.09, -0.18], [0.09, -0.18]].map(([x, z]) => { const l = G(mb, [x, 0.2, z]); C(l, [0.04, 0.035, 0.2, 10], '#fbfaf6', [0, -0.1, 0]); return l; });
    const tail = G(mb, [0, 0.42, -0.26]); blob(tail, 0.07, '#fbfaf6', [0, 0.08, -0.03], [0.8, 1.6, 0.8], { amp: 0.12 });
    T(mb, [0.105, 0.014], '#ff5d96', [0, 0.4, 0.2], [1.2, 0, 0]);
    hitBall(mo, 0.5).position.y = 0.3;
    ctx.tap(mo, ['Molly 🐾', 'Haf!', 'Aj ja idem do roboty.'], 0.9);
    ctx.anim(t => {
      const c = -t * 0.42 + 0.92; mo.position.set(Math.cos(c) * 6.75, 0.03, Math.sin(c) * 6.75); mo.rotation.y = -c + Math.PI;
      legs.forEach((l, i) => { l.rotation.x = Math.sin(t * 14 + (i % 3 ? Math.PI : 0)) * 0.7; });
      tail.rotation.z = Math.sin(t * 12) * 0.5; mb.position.y = Math.abs(Math.sin(t * 14)) * 0.03;
    });
    ctx.secret([4.5, 0.45, -3.9], 0.26);
  },
};

// ---------- 17. Plážový tenis v Alghere ----------
const SWIM_D = { top: WHO.d.skin, sleeves: 'none', bottom: '#2f5f9a', bottomType: 'shorts', shoeType: 'bare' };
const SWIM_M = { top: '#17171a', topType: 'bikini', bottom: '#17171a', bottomType: 'bikini', shoeType: 'bare' };
function racket(p, side, col) { const el = p.userData.parts['elbow' + side]; C(el, [0.02, 0.02, 0.16, 5], '#8a5a3a', [0, -0.4, 0]); C(el, [0.15, 0.15, 0.03, 12], col, [0, -0.6, 0], [0, 0, Math.PI / 2]); }
export const alghero = {
  env: { sky: ['#2a9af0', '#c2efff'], fog: ['#d6f4ff', 34, 100], sun: ['#fffbe8', 3.1, [4, 12, 9]], hemi: ['#ffffff', '#ffe9b0', 2.1] },
  cam: { pos: [0.4, 5, 13.6], target: [0, 1.4, 0] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.7, top: '#f6e3b4', side: '#d9c08a', under: '#b89a6a' });
    const half = (r, col, y, op) => { const m = new THREE.Mesh(new THREE.CircleGeometry(r, 40, Math.PI, Math.PI), M(col, { transparent: true, opacity: op })); m.rotation.x = -Math.PI / 2; m.position.set(0, y, 0.6); g.add(m); return m; };
    const w1 = half(8.55, '#7ff0e4', 0.05, 0.7); const w2 = half(8.55, '#1fb8d6', 0.07, 0.6); w2.position.z = 3; w2.scale.set(1, 0.7, 1);
    const foam = B(g, [16.2, 0.02, 0.14], '#ffffff', [0, 0.065, 0.62]); foam.castShadow = false;
    ctx.anim(t => { w1.position.y = 0.05 + Math.sin(t * 1.3) * 0.015; foam.position.z = 0.62 + Math.sin(t * 1.3) * 0.08; });
    ctx.tap(w1, 'Najmodrejšie more, aké sme videli 🌊');
    // bastión a staré mesto
    B(g, [12.6, 1.9, 1.3], '#d9b98a', [0, 0.95, -5.3]);
    for (let i = 0; i < 16; i++) B(g, [0.4, 0.3, 1.3], '#d9b98a', [-6 + i * 0.8, 2.05, -5.3]);
    for (const x of [-5.6, 5.6]) { C(g, [1.1, 1.2, 2.6, 12], '#cfae7e', [x, 1.3, -4.6]); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; B(g, [0.36, 0.3, 0.3], '#cfae7e', [x + Math.cos(a) * 0.95, 2.75, -4.6 + Math.sin(a) * 0.95], [0, -a, 0]); } }
    ['#ffd9b8', '#fff0c8', '#ffc9c0', '#fbe6d0', '#ffe0a8'].forEach((c, i) => house(g, [-3.6 + i * 1.8, 1.9, -6.3], 1.5, 1.2 + (i % 2) * 0.6, 1, c, { roof: '#c9714a', roofH: 0.5, win: '#4a7fb5' }));
    C(g, [0.5, 0.5, 1.6, 10], '#fbe6d0', [0.9, 3.9, -6.6]);
    const dm = new THREE.Mesh(new THREE.SphereGeometry(0.6, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), M('#ffd24a')); dm.position.set(0.9, 4.7, -6.6); g.add(dm);
    ['#3f9a55', '#e0183c', '#3f6fb3', '#ffffff'].forEach((c, i) => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.61 + i * 0.002, 12, 6, i * Math.PI / 2, 0.5, 0, Math.PI / 2), M(c)); s.position.copy(dm.position); g.add(s); });
    K(g, [0.06, 0.5, 5], '#ffd24a', [0.9, 5.5, -6.6]);
    // pláž
    palm(g, [-6.4, 0, -2.6], 1.1); palm(g, [6.2, 0, -2.2], 1.2); palm(g, [-3.4, 0, -3.6], 0.9);
    parasol(g, [4.4, 0, -2.4], '#ff7eb6'); parasol(g, [-4.6, 0, -1.4], '#ffd24a');
    for (const [x, z, c] of [[4.4, -1.6, '#ff8fb8'], [5.2, -1.7, '#ffffff'], [-4.6, -0.6, '#9fe0ff']]) { B(g, [0.6, 0.1, 1.5], c, [x, 0.25, z]); B(g, [0.6, 0.1, 0.6], c, [x, 0.42, z - 0.9], [0.6, 0, 0]); for (const dz of [-0.5, 0.5]) B(g, [0.5, 0.2, 0.06], '#e9c89a', [x, 0.1, z + dz]); }
    S(g, 0.3, '#ff5d96', [2.6, 0.3, -2.8]); T(g, [0.3, 0.02], '#ffffff', [2.6, 0.3, -2.8], [Math.PI / 2, 0, 0]);
    const cs = G(g, [-1.6, 0, -2.6]); for (const [x, z, h] of [[0, 0, 0.5], [0.45, 0.1, 0.35], [-0.4, 0.15, 0.3]]) { C(cs, [0.2, 0.26, h, 8], '#ecd29c', [x, h / 2, z]); K(cs, [0.2, 0.25, 8], '#ecd29c', [x, h + 0.12, z]); }
    ctx.tap(cs, ['Hrad z piesku 🏰'], 1);
    // my dvaja hráme
    const d = person(g, 'd', SWIM_D, [-2.6, 0, -0.4], 1.25); racket(d, 'R', '#ff8a3c');
    const m = person(g, 'm', SWIM_M, [2.6, -0.42, 1.9], -1.3); racket(m, 'L', '#ffd24a');
    ctx.tap(d, ['Podávam! 🏓', 'To bolo v aute… teda v mori!'], 2.35); ctx.tap(m, ['To bola moja! 😂', 'Skóre? Vyhrávam ja. Vždy.'], 2.5);
    const ball = S(g, 0.08, '#ffe36e', [0, 2, 0.7], null, 8); ball.castShadow = true; hitBall(ball, 0.45);
    ctx.tap(ball, ['Skóre nikto nepočíta.']);
    const dq = d.userData.parts, mq = m.userData.parts;
    ctx.anim(t => {
      const ph = (t * 0.55) % 2, u = ph < 1 ? ph : 2 - ph, e = u * u * (3 - 2 * u);
      ball.position.set(-2.2 + e * 4.4, 1.25 + Math.sin(u * Math.PI) * 1.7, -0.2 + e * 1.9);
      dq.armR.rotation.set(-1.0 - Math.max(0, 1 - u * 5) * 0.9, 0, -0.5); dq.elbowR.rotation.x = -0.6;
      mq.armL.rotation.set(-1.0 - Math.max(0, 1 - (1 - u) * 5) * 0.9, 0, 0.5); mq.elbowL.rotation.x = -0.6;
      dq.body.position.y = Math.abs(Math.sin(t * 3)) * 0.04; mq.body.position.y = Math.abs(Math.sin(t * 3 + 1)) * 0.04;
    });
    ctx.secret([-5.6, 0.45, -3.1], 0.26);
  },
};

// ---------- 18. Loď iba pre nás ----------
export const lod = {
  env: { sky: ['#ff7a6a', '#ffdca4'], fog: ['#ffc9a0', 34, 110], sun: ['#ffb884', 2.7, [-8, 6, 6]], hemi: ['#ffe6d0', '#3a8fb8', 2.0] },
  cam: { pos: [-2.2, 4.2, 12.8], target: [0, 1.3, 0] },
  build(ctx) {
    const g = ctx.g;
    base(g, { r: 8.7, top: '#1f9fc0', side: '#2188a8', under: '#17708c' });
    const w = water(g, 8.6, '#2fb0c8', 0.03, 0.8); ctx.anim(t => { w.position.y = 0.03 + Math.sin(t * 1.1) * 0.02; });
    // slnko a jeho odraz
    gl(g, new THREE.SphereGeometry(3, 24, 16), '#ffe08a', [-14, 3.2, -26]); gl(g, new THREE.SphereGeometry(4.2, 24, 16), '#ffb070', [-14, 3.2, -26.5], 0.35);
    // útesy Capo Caccia s majákom
    const rc = ['#e2d5bc', '#d2c2a4', '#ebe0cb'];
    cliff(g, [5.4, 3, -4.5], [4.8, 6, 3.8], rc[0], { taper: 0.22, amp: 0.4, top: 0.15 });
    cliff(g, [2.7, 2, -5.3], [3.2, 4, 3], rc[1], { taper: 0.25, amp: 0.36 });
    cliff(g, [7.0, 1.4, -2.1], [2.6, 2.8, 2.6], rc[2], { taper: 0.3, amp: 0.34 });
    cliff(g, [0.9, 0.8, -6.0], [2, 1.6, 2], rc[1], { taper: 0.35, amp: 0.3 });
    blob(g, 0.7, '#6f9a58', [5, 6.0, -4.3], [1.6, 0.35, 1.3]); blob(g, 0.55, '#5f8f4a', [6.3, 5.95, -5.2], [1.4, 0.35, 1.2]); blob(g, 0.6, '#6f9a58', [2.8, 4.0, -5.2], [1.5, 0.35, 1.2]); blob(g, 0.45, '#5f8f4a', [7, 2.8, -2.1], [1.4, 0.35, 1.2]);
    C(g, [0.26, 0.34, 1.5, 18], '#ffffff', [5.9, 6.75, -4.0]); C(g, [0.33, 0.33, 0.1, 18], '#c9302b', [5.9, 7.5, -4.0]); const lh = gl(g, new THREE.SphereGeometry(0.2, 12, 8), '#fff6c8', [5.9, 7.7, -4.0]); K(g, [0.26, 0.3, 18], '#c9302b', [5.9, 8.0, -4.0]);
    ctx.anim(t => { lh.scale.setScalar(1 + Math.max(0, Math.sin(t * 2)) * 0.8); });
    const cave = new THREE.Mesh(new THREE.SphereGeometry(0.8, 14, 10), glow('#1d4458')); cave.position.set(3.5, 0.35, -3.72); cave.scale.set(1, 1.1, 0.25); g.add(cave);
    rock(g, [7.4, 0.3, 0.6], 1.6, rc[1]); rock(g, [-6.6, 0.25, -3.4], 1.7, rc[0]); rock(g, [2.0, 0.2, -3.9], 1.0, rc[2]); rock(g, [-7.2, 0.2, -2.4], 0.9, rc[2]);
    // jachta
    const bt = boat(g, [-0.4, 0, 0.8], { ry: 0.95, len: 5.8, w: 2.15, fb: 0.62, depth: 0.9, rise: 0.36, well: 0.06, col: '#ffffff', trim: '#1f2a44', deck: '#c9a070', rail: 0.04 });
    const dy = bt.userData.deckY, hw = bt.userData.hw, sheer = bt.userData.sheer, L = bt.userData.L;
    for (let i = 0; i < 9; i++) B(bt, [0.012, 0.004, 3.5], '#a8804e', [-0.8 + i * 0.2, dy + 0.004, -1.0]).castShadow = false;
    // kabína so zaoblenou prednou časťou
    B(bt, [1.5, 0.6, 1.5], '#ffffff', [0, dy + 0.3, -1.25]);
    const nose = C(bt, [0.75, 0.75, 0.6, 28], '#ffffff', [0, dy + 0.3, -0.5]); nose.scale.z = 0.55;
    const roof = C(bt, [0.78, 0.78, 0.07, 28], '#f2f2f2', [0, dy + 0.63, -0.5]); roof.scale.z = 0.58; B(bt, [1.56, 0.07, 1.5], '#f2f2f2', [0, dy + 0.63, -1.25]);
    const wsh = new THREE.Mesh(new THREE.CylinderGeometry(0.77, 0.79, 0.24, 28, 1, true, -1.1, 2.2), M('#27384f', { roughness: 0.2, side: THREE.DoubleSide })); wsh.position.set(0, dy + 0.42, -0.5); wsh.scale.z = 0.56; bt.add(wsh);
    for (const sd of [-1, 1]) B(bt, [0.02, 0.2, 1.1], '#27384f', [sd * 0.76, dy + 0.42, -1.25]);
    // strieška, kormidlo, zadná plošina
    for (const [x, z] of [[-0.7, -1.9], [0.7, -1.9], [-0.7, -0.75], [0.7, -0.75]]) C(bt, [0.02, 0.02, 0.75, 8], '#c9ccd2', [x, dy + 1.03, z]);
    B(bt, [1.6, 0.05, 1.4], '#1f2a44', [0, dy + 1.42, -1.32]);
    T(bt, [0.13, 0.016], '#3a2a20', [0.3, dy + 0.86, -1.15], [-0.5, 0, 0]);
    B(bt, [1.5, 0.06, 0.5], '#c9a070', [0, 0.22, -L / 2 - 0.2]);
    for (const y of [0.0, 0.14]) B(bt, [0.4, 0.03, 0.05], '#c9ccd2', [0.45, y, -L / 2 - 0.47]); for (const x of [0.25, 0.65]) B(bt, [0.03, 0.32, 0.03], '#c9ccd2', [x, 0.07, -L / 2 - 0.47]);
    C(bt, [0.012, 0.012, 0.8, 6], '#c9ccd2', [-0.7, dy + 0.4, -L / 2 + 0.25]); ['#2e9e4f', '#ffffff', '#d6222b'].forEach((c, i) => B(bt, [0.14, 0.26, 0.015], c, [-0.62 + i * 0.14, dy + 0.66, -L / 2 + 0.25]));
    // zábradlie na prove
    for (const sd of [-1, 1]) {
      const pts = []; for (let i = 10; i <= 20; i++) { const t = i / 20; pts.push(new THREE.Vector3(sd * hw(t) * 0.96, sheer(t) + 0.3, (t - 0.5) * L)); if (i % 2 === 0 && i < 20) C(bt, [0.012, 0.012, 0.3, 6], '#c9ccd2', [sd * hw(t) * 0.96, sheer(t) + 0.15, (t - 0.5) * L]); }
      const tb = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.014, 6), M('#c9ccd2', { roughness: 0.3, metalness: 0.6 })); bt.add(tb);
    }
    label(bt, 'Magduška', 1.3, 0.3, { fg: '#1f2a44', size: 70 }, [1.085, 0.4, -1.3], [0, Math.PI / 2, 0]); label(bt, 'Magduška', 1.3, 0.3, { fg: '#1f2a44', size: 70 }, [-1.085, 0.4, -1.3], [0, -Math.PI / 2, 0]);
    // ležadlo na prove a my dvaja
    B(bt, [1.25, 0.07, 1.95], '#f6f1e8', [0, dy + 0.04, 1.05]); for (const x of [-0.31, 0.31]) B(bt, [0.56, 0.03, 0.3], '#e6dccb', [x, dy + 0.09, 0.3]);
    const ld = G(bt, [-0.31, dy + 0.19, 2.05], [-Math.PI / 2, 0, 0]); const d = person(ld, 'd', SWIM_D);
    pose(d, { armL: [0, 0.5], armR: [-2.9, -0.5], elbowR: -1.9, legR: -0.25 }); d.userData.parts.kneeR.rotation.x = 0.5;
    const lm = G(bt, [0.31, dy + 0.18, 1.95], [-Math.PI / 2, 0, 0]); const m = person(lm, 'm', SWIM_M);
    pose(m, { armR: [0, -0.5], armL: [0, 0.3], legL: -0.2 }); m.userData.parts.kneeL.rotation.x = 0.4;
    B(m.userData.parts.head, [0.19, 0.04, 0.02], '#17171a', [0, 0.012, 0.108]);
    ctx.tap(d, ['Toto je život.', 'Kotva dole, starosti tiež.'], 0.9); ctx.tap(m, ['Nechcem ísť domov.', 'Natrieš ma? ☀️'], 0.9);
    ctx.anim(t => { bt.position.y = Math.sin(t * 1.2) * 0.04; bt.rotation.z = Math.sin(t * 1.0) * 0.025; bt.rotation.x = Math.sin(t * 0.8) * 0.015; });
    // plameniak
    const fg = G(g, [3.4, 0.08, 3]); T(fg, [0.42, 0.17], '#ff8fb8', null, [Math.PI / 2, 0, 0]); C(fg, [0.07, 0.09, 0.7, 12], '#ff8fb8', [0, 0.4, -0.42], [0.25, 0, 0]); S(fg, 0.13, '#ff8fb8', [0, 0.78, -0.3]); K(fg, [0.05, 0.2, 10], '#26262b', [0, 0.72, -0.14], [1.9, 0, 0]);
    hitBall(fg, 0.7); ctx.tap(fg, ['Nafukovací plameniak 🦩']);
    ctx.anim(t => { fg.position.y = 0.08 + Math.sin(t * 1.5) * 0.03; fg.rotation.y = t * 0.15; });
    // delfíny
    for (let i = 0; i < 2; i++) {
      const df = G(g); S(df, 0.24, '#6f8ca6', null, [1, 0.8, 2.6], 16); K(df, [0.1, 0.28, 10], '#6f8ca6', [0, 0.24, -0.1]); K(df, [0.14, 0.3, 10], '#6f8ca6', [0, 0, -0.75], [Math.PI / 2, 0, 0]); S(df, 0.1, '#6f8ca6', [0, -0.02, 0.6], [0.8, 0.7, 1.6]);
      hitBall(df, 0.7); ctx.tap(df, ['Delfíny! 🐬']);
      ctx.anim(t => { const u = ((t * 0.35 + i * 0.45) % 1.6); const k = Math.min(1, u); df.visible = u < 1; df.position.set(-5.5 + k * 2.6 + i * 0.6, Math.sin(k * Math.PI) * 1.3 - 0.25, -3.6 - i * 0.8 + k * 0.6); df.rotation.set(-Math.cos(k * Math.PI) * 0.9, 1.3, 0); });
    }
    ctx.secret([-6.6, 0.5, -4.5], 0.26);
  },
};
