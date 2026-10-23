import { useEffect, useRef, useState } from 'react';
import {
  AdditiveBlending,
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Fog,
  Group,
  HemisphereLight,
  InstancedMesh,
  Line,
  LineBasicMaterial,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  PointLight,
  Quaternion,
  RingGeometry,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';

/* ------------------------------------------------------------------ */
/* Deterministic helpers                                               */
/* ------------------------------------------------------------------ */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const FIRE = { x: 20, z: -6 };
const FIRE_BASE_Y = 1.2;

function rawHeight(x: number, z: number) {
  return (
    3.4 * Math.sin(x * 0.075) * Math.cos(z * 0.065) +
    1.9 * Math.sin(x * 0.16 + 1.3) * Math.sin(z * 0.14) +
    0.7 * Math.sin(x * 0.31) * Math.cos(z * 0.27)
  );
}

// terrain is flattened around the fire so ground effects sit cleanly on it
function heightAt(x: number, z: number) {
  const d = Math.hypot(x - FIRE.x, z - FIRE.z);
  return rawHeight(x, z) * (1 - 0.85 * (1 - smoothstep(10, 26, d))) + FIRE_BASE_Y * (1 - smoothstep(10, 26, d)) * 0.85;
}

function glowTexture(inner: string, outer: string) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, inner);
  grad.addColorStop(1, outer);
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

/* ------------------------------------------------------------------ */
/* Drone definitions                                                   */
/* ------------------------------------------------------------------ */

interface DroneDef {
  id: string;
  altitude: number;
  speed: number; // loops per second
  offset: number;
  path: (u: number) => [number, number];
}

const TAU = Math.PI * 2;

const DRONES: DroneDef[] = [
  {
    // circles the fire perimeter, scanning the active front
    id: 'ARES-01',
    altitude: 10,
    speed: 1 / 34,
    offset: 0,
    path: (u) => [FIRE.x + Math.cos(u * TAU) * 17, FIRE.z + Math.sin(u * TAU) * 14],
  },
  {
    // wide sweep over the western forest
    id: 'ARES-02',
    altitude: 12,
    speed: 1 / 46,
    offset: 0.3,
    path: (u) => [-26 + Math.cos(u * TAU) * 22, -18 + Math.sin(u * TAU * 2) * 12],
  },
  {
    // lawn-mower style rounded sweep across the southern slope
    id: 'ARES-03',
    altitude: 11,
    speed: 1 / 40,
    offset: 0.6,
    path: (u) => {
      const s = Math.sin(u * TAU * 3);
      return [-4 + Math.cos(u * TAU) * 30, 22 + s * 6];
    },
  },
  {
    // outer arc keeping watch on the flank ahead of the fire
    id: 'ARES-04',
    altitude: 13,
    speed: 1 / 52,
    offset: 0.85,
    path: (u) => [FIRE.x - 8 + Math.cos(u * TAU) * 30, FIRE.z + 6 + Math.sin(u * TAU) * 22],
  },
];

function buildDrone() {
  const g = new Group();
  const bodyMat = new MeshLambertMaterial({ color: 0x2a2c31 });
  const accentMat = new MeshLambertMaterial({ color: 0x0c0d0f });
  const led = new MeshBasicMaterial({ color: 0xff2c30 });

  const body = new Mesh(new BoxGeometry(1.3, 0.36, 1.3), bodyMat);
  g.add(body);
  const top = new Mesh(new BoxGeometry(0.8, 0.18, 0.8), accentMat);
  top.position.y = 0.26;
  g.add(top);
  const gimbal = new Mesh(new SphereGeometry(0.26, 10, 8), accentMat);
  gimbal.position.set(0, -0.3, 0.3);
  g.add(gimbal);
  const nose = new Mesh(new SphereGeometry(0.12, 8, 6), led);
  nose.position.set(0, 0.05, 0.68);
  g.add(nose);

  const rotors: Object3D[] = [];
  const armGeo = new BoxGeometry(2.7, 0.1, 0.17);
  const discGeo = new CylinderGeometry(0.95, 0.95, 0.02, 20);
  const discMat = new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.13, depthWrite: false });
  const bladeGeo = new BoxGeometry(1.8, 0.02, 0.09);
  const bladeMat = new MeshBasicMaterial({ color: 0x9a9ca3 });

  [Math.PI / 4, -Math.PI / 4].forEach((rot) => {
    const arm = new Mesh(armGeo, bodyMat);
    arm.rotation.y = rot;
    g.add(arm);
  });
  const ends: [number, number][] = [
    [0.95, 0.95],
    [-0.95, 0.95],
    [0.95, -0.95],
    [-0.95, -0.95],
  ];
  ends.forEach(([x, z]) => {
    const r = new Group();
    r.position.set(x, 0.22, z);
    const blade = new Mesh(bladeGeo, bladeMat);
    r.add(blade);
    const disc = new Mesh(discGeo, discMat);
    r.add(disc);
    g.add(r);
    rotors.push(blade);
  });

  g.scale.setScalar(2.1);
  return { group: g, rotors };
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

interface Props {
  reduceMotion: boolean;
  className?: string;
}

export default function DroneScene({ reduceMotion, className = '' }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fireLabelRef = useRef<HTMLDivElement>(null);
  const [failed] = useState(() => !webglAvailable());

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (failed) return;
    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    const isSmall = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mount.appendChild(renderer.domElement);

    const scene = new Scene();
    scene.fog = new Fog(0x060607, 80, 175);

    const camera = new PerspectiveCamera(42, 1, 0.5, 400);

    /* ---------- lighting ---------- */
    scene.add(new AmbientLight(0x6a7088, 0.9));
    scene.add(new HemisphereLight(0x5c6b8c, 0x1a120e, 0.9));
    const moon = new DirectionalLight(0xa9b8e0, 1.1);
    moon.position.set(-40, 60, 30);
    scene.add(moon);
    const fireLight = new PointLight(0xff6a1f, 900, 70, 2);
    fireLight.position.set(FIRE.x, 6, FIRE.z);
    scene.add(fireLight);

    /* ---------- terrain ---------- */
    const SIZE = 170;
    const SEG = 110;
    const tGeo = new PlaneGeometry(SIZE, SIZE, SEG, SEG);
    tGeo.rotateX(-Math.PI / 2);
    const pos = tGeo.attributes.position as BufferAttribute;
    const cols = new Float32Array(pos.count * 3);
    const cLow = new Color(0x0e1510);
    const cHigh = new Color(0x1d2a1d);
    const cBurn = new Color(0x120b08);
    const cGlow = new Color(0x7a2a0c);
    const tmp = new Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h = heightAt(x, z);
      pos.setY(i, h);
      const k = Math.min(1, Math.max(0, (h + 4) / 9));
      tmp.copy(cLow).lerp(cHigh, k);
      const d = Math.hypot(x - FIRE.x, z - FIRE.z);
      tmp.lerp(cBurn, 1 - smoothstep(4, 15, d));
      tmp.lerp(cGlow, (1 - smoothstep(0, 22, d)) * 0.55);
      cols[i * 3] = tmp.r;
      cols[i * 3 + 1] = tmp.g;
      cols[i * 3 + 2] = tmp.b;
    }
    tGeo.setAttribute('color', new BufferAttribute(cols, 3));
    tGeo.computeVertexNormals();
    const terrain = new Mesh(tGeo, new MeshLambertMaterial({ vertexColors: true, flatShading: true }));
    scene.add(terrain);

    // thin technical grid laid over the land
    const gridGeo = new PlaneGeometry(SIZE, SIZE, 34, 34);
    gridGeo.rotateX(-Math.PI / 2);
    const gp = gridGeo.attributes.position as BufferAttribute;
    for (let i = 0; i < gp.count; i++) gp.setY(i, heightAt(gp.getX(i), gp.getZ(i)) + 0.12);
    const grid = new Mesh(
      gridGeo,
      new MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.045, depthWrite: false }),
    );
    scene.add(grid);

    /* ---------- forest (instanced) ---------- */
    const rand = mulberry32(7);
    const TREES = isSmall ? 260 : 420;
    const coneGeo = new ConeGeometry(1, 1, 7);
    const treeMesh = new InstancedMesh(coneGeo, new MeshLambertMaterial({ flatShading: true }), TREES * 2);
    const m4 = new Matrix4();
    const q = new Quaternion();
    const sc = new Vector3();
    const p = new Vector3();
    const greens = [0x1a3320, 0x214029, 0x2a4f31, 0x183021].map((c) => new Color(c));
    const burnt = [0x1c120d, 0x140d0a].map((c) => new Color(c));
    let n = 0;
    for (let i = 0; i < TREES; i++) {
      const x = (rand() - 0.5) * (SIZE - 24);
      const z = (rand() - 0.5) * (SIZE - 24);
      const d = Math.hypot(x - FIRE.x, z - FIRE.z);
      if (d < 3) continue;
      const isBurnt = d < 11 + rand() * 4;
      const s = 0.8 + rand() * 0.9;
      const w = 1.1 * s;
      const hgt = (isBurnt ? 2.0 : 3.4) * s;
      const y = heightAt(x, z);
      // lower canopy tier
      p.set(x, y + hgt * 0.5, z);
      sc.set(w, hgt, w);
      m4.compose(p, q, sc);
      treeMesh.setMatrixAt(n, m4);
      treeMesh.setColorAt(n, isBurnt ? burnt[n % 2] : greens[n % greens.length]);
      n++;
      if (!isBurnt) {
        // upper tier for a layered conifer silhouette
        p.set(x, y + hgt * 0.95, z);
        sc.set(w * 0.7, hgt * 0.7, w * 0.7);
        m4.compose(p, q, sc);
        treeMesh.setMatrixAt(n, m4);
        treeMesh.setColorAt(n, greens[(n + 1) % greens.length]);
        n++;
      }
    }
    treeMesh.count = n;
    treeMesh.instanceMatrix.needsUpdate = true;
    if (treeMesh.instanceColor) treeMesh.instanceColor.needsUpdate = true;
    scene.add(treeMesh);

    /* ---------- fire: ground glow, perimeter ring, flame + smoke particles ---------- */
    const glowTex = glowTexture('rgba(255,140,50,0.9)', 'rgba(255,80,20,0)');
    const groundGlow = new Mesh(
      new PlaneGeometry(46, 46),
      new MeshBasicMaterial({ map: glowTex, transparent: true, opacity: 0.55, blending: AdditiveBlending, depthWrite: false }),
    );
    groundGlow.rotation.x = -Math.PI / 2;
    groundGlow.position.set(FIRE.x, FIRE_BASE_Y + 0.35, FIRE.z);
    scene.add(groundGlow);

    const ringMat = new MeshBasicMaterial({ color: 0xff3a1a, transparent: true, opacity: 0.7, side: DoubleSide, depthWrite: false });
    const ring = new Mesh(new RingGeometry(12.6, 13.0, 64), ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(FIRE.x, FIRE_BASE_Y + 0.5, FIRE.z);
    scene.add(ring);
    const ringPulse = new Mesh(new RingGeometry(12.6, 13.0, 64), ringMat.clone());
    ringPulse.rotation.x = -Math.PI / 2;
    ringPulse.position.copy(ring.position);
    scene.add(ringPulse);

    const flameTex = glowTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0)');
    const FLAMES = isSmall ? 160 : 280;
    const fPos = new Float32Array(FLAMES * 3);
    const fCol = new Float32Array(FLAMES * 3);
    const fLife = new Float32Array(FLAMES);
    const fMax = new Float32Array(FLAMES);
    const fVel = new Float32Array(FLAMES * 3);
    const frand = mulberry32(21);
    const spawnFlame = (i: number) => {
      const a = frand() * TAU;
      const r = Math.sqrt(frand()) * 9;
      fPos[i * 3] = FIRE.x + Math.cos(a) * r;
      fPos[i * 3 + 1] = FIRE_BASE_Y + 0.3;
      fPos[i * 3 + 2] = FIRE.z + Math.sin(a) * r;
      fVel[i * 3] = (frand() - 0.5) * 0.9;
      fVel[i * 3 + 1] = 2.2 + frand() * 3.2;
      fVel[i * 3 + 2] = (frand() - 0.5) * 0.9;
      fMax[i] = 0.9 + frand() * 1.1;
      fLife[i] = frand() * fMax[i];
    };
    for (let i = 0; i < FLAMES; i++) spawnFlame(i);
    const fGeo = new BufferGeometry();
    fGeo.setAttribute('position', new BufferAttribute(fPos, 3));
    fGeo.setAttribute('color', new BufferAttribute(fCol, 3));
    const flames = new Points(
      fGeo,
      new PointsMaterial({
        size: 4.2,
        map: flameTex,
        vertexColors: true,
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    );
    flames.frustumCulled = false;
    scene.add(flames);

    const SMOKE = isSmall ? 40 : 70;
    const sPos = new Float32Array(SMOKE * 3);
    const sLife = new Float32Array(SMOKE);
    const sMax = new Float32Array(SMOKE);
    const spawnSmoke = (i: number) => {
      const a = frand() * TAU;
      const r = Math.sqrt(frand()) * 8;
      sPos[i * 3] = FIRE.x + Math.cos(a) * r;
      sPos[i * 3 + 1] = FIRE_BASE_Y + 3;
      sPos[i * 3 + 2] = FIRE.z + Math.sin(a) * r;
      sMax[i] = 4 + frand() * 3;
      sLife[i] = frand() * sMax[i];
    };
    for (let i = 0; i < SMOKE; i++) spawnSmoke(i);
    const sGeo = new BufferGeometry();
    sGeo.setAttribute('position', new BufferAttribute(sPos, 3));
    const smoke = new Points(
      sGeo,
      new PointsMaterial({
        size: 11,
        map: glowTexture('rgba(90,90,96,0.5)', 'rgba(90,90,96,0)'),
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        sizeAttenuation: true,
        color: 0x777a82,
      }),
    );
    smoke.frustumCulled = false;
    scene.add(smoke);

    /* ---------- drones ---------- */
    const droneObjs = DRONES.map((def, idx) => {
      const pts: Vector3[] = [];
      const N = 90;
      for (let i = 0; i < N; i++) {
        const [x, z] = def.path(i / N);
        pts.push(new Vector3(x, heightAt(x, z) + def.altitude, z));
      }
      const curve = new CatmullRomCurve3(pts, true, 'catmullrom', 0.5);

      const { group, rotors } = buildDrone();
      scene.add(group);

      // scan beam: apex at the drone, base on the ground
      const beamGeo = new ConeGeometry(1, 1, 28, 1, true);
      const beam = new Mesh(
        beamGeo,
        new MeshBasicMaterial({
          color: idx === 0 ? 0xff5a2a : 0xff2c30,
          transparent: true,
          opacity: idx === 0 ? 0.16 : 0.1,
          blending: AdditiveBlending,
          depthWrite: false,
          side: DoubleSide,
        }),
      );
      scene.add(beam);
      const footprint = new Mesh(
        new RingGeometry(0.92, 1, 40),
        new MeshBasicMaterial({ color: 0xff3a2a, transparent: true, opacity: 0.65, side: DoubleSide, depthWrite: false }),
      );
      footprint.rotation.x = -Math.PI / 2;
      scene.add(footprint);

      // ground trail (area already covered)
      const TRAIL = 140;
      const tPos = new Float32Array(TRAIL * 3);
      const trailGeo = new BufferGeometry();
      trailGeo.setAttribute('position', new BufferAttribute(tPos, 3));
      trailGeo.setDrawRange(0, 0);
      const trail = new Line(trailGeo, new LineBasicMaterial({ color: 0xff2c30, transparent: true, opacity: 0.45 }));
      trail.frustumCulled = false;
      scene.add(trail);

      return { def, curve, group, rotors, beam, footprint, trail, tPos, trailGeo, trailCount: 0, lastTrail: -1, yaw: 0, roll: 0 };
    });

    // comm links between drones
    const linkPairs: [number, number][] = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [2, 3],
    ];
    const links = linkPairs.map(() => {
      const g = new BufferGeometry();
      g.setAttribute('position', new BufferAttribute(new Float32Array(6), 3));
      const l = new Line(g, new LineBasicMaterial({ color: 0xff2c30, transparent: true, opacity: 0.28 }));
      l.frustumCulled = false;
      scene.add(l);
      return l;
    });

    /* ---------- sizing ---------- */
    const resize = () => {
      const w = mount.clientWidth || 640;
      const h = mount.clientHeight || 420;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w < 520 ? 58 : 42;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    /* ---------- frame ---------- */
    const proj = new Vector3();
    const tan = new Vector3();
    const target = new Vector3(6, 1, -2);
    const tmpPos = new Vector3();
    const labelPos = new Vector3();
    const firePos = new Vector3(FIRE.x, FIRE_BASE_Y + 11, FIRE.z);

    const placeLabel = (el: HTMLDivElement | null, wp: Vector3, w: number, h: number) => {
      if (!el) return;
      proj.copy(wp).project(camera);
      const visible = proj.z < 1 && Math.abs(proj.x) < 1.05 && Math.abs(proj.y) < 1.05;
      el.style.opacity = visible ? '1' : '0';
      el.style.transform = `translate(${((proj.x + 1) / 2) * w}px, ${((1 - proj.y) / 2) * h}px)`;
    };

    const render = (t: number, dt: number) => {
      const w = mount.clientWidth || 640;
      const h = mount.clientHeight || 420;

      // slow orbiting camera, eased back and forth so labels stay readable
      const ang = -0.35 + Math.sin(t * 0.07) * 0.55;
      const radius = w < 520 ? 100 : 82;
      camera.position.set(
        target.x + Math.sin(ang) * radius,
        w < 520 ? 56 : 52 + Math.sin(t * 0.11) * 4,
        target.z + Math.cos(ang) * radius,
      );
      camera.lookAt(target);

      // fire flicker
      fireLight.intensity = 800 + Math.sin(t * 13) * 120 + Math.sin(t * 7.3) * 90;
      (groundGlow.material as MeshBasicMaterial).opacity = 0.5 + Math.sin(t * 5) * 0.06;
      const pulse = (t * 0.5) % 1;
      ringPulse.scale.setScalar(1 + pulse * 0.35);
      (ringPulse.material as MeshBasicMaterial).opacity = 0.5 * (1 - pulse);

      // flames
      for (let i = 0; i < FLAMES; i++) {
        fLife[i] += dt;
        if (fLife[i] > fMax[i]) {
          spawnFlame(i);
          fLife[i] = 0;
        }
        const k = fLife[i] / fMax[i];
        fPos[i * 3] += fVel[i * 3] * dt;
        fPos[i * 3 + 1] += fVel[i * 3 + 1] * dt * (1 - k * 0.4);
        fPos[i * 3 + 2] += fVel[i * 3 + 2] * dt;
        // yellow -> orange -> deep red, fading out (additive)
        const fade = Math.sin(Math.min(1, k) * Math.PI);
        fCol[i * 3] = fade * 1.0;
        fCol[i * 3 + 1] = fade * (0.75 - k * 0.65);
        fCol[i * 3 + 2] = fade * Math.max(0, 0.25 - k * 0.5);
      }
      fGeo.attributes.position.needsUpdate = true;
      fGeo.attributes.color.needsUpdate = true;
      for (let i = 0; i < SMOKE; i++) {
        sLife[i] += dt;
        if (sLife[i] > sMax[i]) {
          spawnSmoke(i);
          sLife[i] = 0;
        }
        sPos[i * 3 + 1] += dt * 2.4;
        sPos[i * 3] += dt * 0.9;
      }
      sGeo.attributes.position.needsUpdate = true;

      // drones
      droneObjs.forEach((d, i) => {
        const u = (((t * d.def.speed + d.def.offset) % 1) + 1) % 1;
        d.curve.getPointAt(u, tmpPos);
        d.curve.getTangentAt(u, tan);
        const bob = Math.sin(t * 1.6 + i) * 0.25;
        d.group.position.set(tmpPos.x, tmpPos.y + bob, tmpPos.z);

        const targetYaw = Math.atan2(tan.x, tan.z);
        let dy = targetYaw - d.yaw;
        dy = Math.atan2(Math.sin(dy), Math.cos(dy));
        d.yaw += dy * Math.min(1, dt * 3);
        d.roll += (-dy * 1.6 - d.roll) * Math.min(1, dt * 2.5);
        d.group.rotation.set(0.08, d.yaw, Math.max(-0.35, Math.min(0.35, d.roll)), 'YXZ');
        d.rotors.forEach((r, ri) => (r.rotation.y += dt * (ri % 2 ? 60 : -60)));

        const gy = heightAt(tmpPos.x, tmpPos.z);
        const hh = Math.max(2, d.group.position.y - gy);
        const footR = 3.2 + hh * 0.28;
        d.beam.scale.set(footR, hh, footR);
        d.beam.position.set(tmpPos.x, gy + hh / 2, tmpPos.z);
        d.footprint.position.set(tmpPos.x, gy + 0.25, tmpPos.z);
        d.footprint.scale.setScalar(footR);

        // record trail every so often
        const step = Math.floor(t * 8);
        if (step !== d.lastTrail) {
          d.lastTrail = step;
          if (d.trailCount < 140) d.trailCount++;
          else d.tPos.copyWithin(0, 3);
          const idx = (d.trailCount - 1) * 3;
          d.tPos[idx] = tmpPos.x;
          d.tPos[idx + 1] = gy + 0.3;
          d.tPos[idx + 2] = tmpPos.z;
          d.trailGeo.setDrawRange(0, d.trailCount);
          d.trailGeo.attributes.position.needsUpdate = true;
        }

        placeLabel(labelRefs.current[i], labelPos.set(d.group.position.x, d.group.position.y + 3.2, d.group.position.z), w, h);
      });

      links.forEach((l, i) => {
        const [a, b] = linkPairs[i];
        const pa = droneObjs[a].group.position;
        const pb = droneObjs[b].group.position;
        const arr = l.geometry.attributes.position as BufferAttribute;
        arr.setXYZ(0, pa.x, pa.y, pa.z);
        arr.setXYZ(1, pb.x, pb.y, pb.z);
        arr.needsUpdate = true;
        (l.material as LineBasicMaterial).opacity = 0.16 + (Math.sin(t * 2 + i) * 0.5 + 0.5) * 0.2;
      });

      placeLabel(fireLabelRef.current, firePos, w, h);
      renderer.render(scene, camera);
    };

    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();
    let elapsed = reduceMotion ? 14 : 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      elapsed += dt;
      render(elapsed, dt);
    };
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduceMotion) {
      // single still frame, with a little simulated time so the fire has shape
      for (let s = 0; s < 40; s++) render(14 + s * 0.05, 0.05);
    } else {
      start();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(mount);
    const onVis = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      scene.traverse((o) => {
        const obj = o as Mesh;
        obj.geometry?.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : [];
        mats.forEach((m) => {
          (m as MeshBasicMaterial).map?.dispose();
          m.dispose();
        });
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reduceMotion, failed]);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-surface ${className}`}>
        <p className="px-6 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
          3D mission view requires WebGL
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {DRONES.map((d, i) => (
          <div
            key={d.id}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 opacity-0 transition-opacity duration-200"
          >
            <span className="-translate-x-1/2 -translate-y-full whitespace-nowrap border border-signal/50 bg-void/70 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-bone inline-block">
              {d.id}
            </span>
          </div>
        ))}
        <div ref={fireLabelRef} className="absolute left-0 top-0 opacity-0 transition-opacity duration-200">
          <span className="-translate-x-1/2 -translate-y-full inline-block whitespace-nowrap border border-[#ff6a1f]/60 bg-void/70 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-[#ff8a4a]">
            FIRE FRONT
          </span>
        </div>
      </div>
    </div>
  );
}
