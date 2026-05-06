"use client";

import { Suspense, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useFBX } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  scrollProgress: number;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

// Crayon: root scale=100, world z=13.983 (long axis), world y=0.794 (cross-section)
// Mine:   root scale=100, world y=1.708 (already vertical!), world x/z=0.584
// Same physical scale: mine_scene = 1.5 × (1.708 / 13.983) ≈ 0.183 Three.js units
//
// Pencil spans y ∈ [-0.75, +0.75]. Mine half-height ≈ 0.0915.
// MINE_ASSEMBLED_Y = -0.69 → mine top at -0.60 (inside barrel), graphite tip at -0.78.

const PENCIL_SCENE_HEIGHT = 1.5;
const MINE_SCENE_HEIGHT = PENCIL_SCENE_HEIGHT * (1.708 / 13.983); // ≈ 0.183

// Mine final resting position — static throughout the whole animation.
// Adjust if threading doesn't align with pencil hole.
const MINE_ASSEMBLED_Y = -0.69;
const MINE_X_OFFSET = 0;
const MINE_Z_OFFSET = 0;

// Pencil approach + screw parameters
const PENCIL_START_Y = 0.60;      // pencil starts here (mine clearly visible below)
const PENCIL_PRE_SCREW_Y = 0.14;  // pencil stops here before screwing (tip just above mine)
const PENCIL_END_Y = 0.085;        // pencil final position after screwing (higher = stops earlier)
const PENCIL_SPINS = 5;           // full Y rotations during screwing phase
const P1 = 0.35;                  // end of approach phase
const P2 = 0.42;                  // end of screwing phase
const P3 = 0.70;                  // end of 360° Z rotation phase

function normalizeToScene(obj: THREE.Object3D, targetHeight: number) {
  obj.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  const worldMax = Math.max(size.x, size.y, size.z);
  const currentScale = obj.scale.x;
  // Preserve existing root scale in the formula
  obj.scale.setScalar((targetHeight / worldMax) * currentScale);
  obj.updateMatrixWorld(true);
  const center = new THREE.Box3().setFromObject(obj).getCenter(new THREE.Vector3());
  obj.position.sub(center);
  // Force XZ residual to 0 — FBX cross-section asymmetry can leave a small offset
  obj.updateMatrixWorld(true);
  const residual = new THREE.Box3().setFromObject(obj).getCenter(new THREE.Vector3());
  obj.position.x -= residual.x;
  obj.position.z -= residual.z;
}

const aluMat = new THREE.MeshStandardMaterial({ color: "#C9CBCD", metalness: 0.96, roughness: 0.07 });
const aluDarkMat = new THREE.MeshStandardMaterial({ color: "#9FA1A3", metalness: 0.98, roughness: 0.05 });
const ceramicMat = new THREE.MeshStandardMaterial({ color: "#1a1a1a", metalness: 0.1, roughness: 0.9 });

// ─── Corps hexagonal ──────────────────────────────────────────────────────────
// Long axis = Z. rotation.x = +PI/2 maps Z → -Y (z=0 end goes to bottom = tip side).
function PencilBody() {
  const raw = useFBX("/models/Crayon.fbx");
  const model = useMemo(() => {
    const clone = raw.clone(true);
    clone.rotation.x = Math.PI / 2;
    normalizeToScene(clone, PENCIL_SCENE_HEIGHT); // before scene graph — parent-independent
    return clone;
  }, [raw]);

  useEffect(() => {
    let idx = 0;
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).castShadow = true;
        child.receiveShadow = true;
        (child as THREE.Mesh).material = idx === 1 ? aluDarkMat : aluMat;
        idx++;
      }
    });
  }, [model]);

  return <primitive object={model} />;
}

// ─── Mine infinie ─────────────────────────────────────────────────────────────
// Long axis = Y (1.708 world units) — already vertical, NO rotation needed.
function Mine() {
  const raw = useFBX("/models/mine.fbx");
  const model = useMemo(() => {
    const clone = raw.clone(true);
    normalizeToScene(clone, MINE_SCENE_HEIGHT); // before scene graph — parent-independent
    return clone;
  }, [raw]);

  useEffect(() => {
    const meshes: THREE.Mesh[] = [];
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) meshes.push(child as THREE.Mesh);
    });
    meshes.forEach((mesh, i) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.material = i === meshes.length - 1 ? ceramicMat : aluMat;
    });
  }, [model]);

  return <primitive object={model} />;
}

// ─── Assemblage + animation ───────────────────────────────────────────────────
// Mine: stationary at MINE_ASSEMBLED_Y throughout — never moves.
// Phase 1 (0 → P1): Pencil descends from PENCIL_START_Y to PENCIL_PRE_SCREW_Y (approach, no spin).
// Phase 2 (P1 → P2): Pencil screws down — rotates PENCIL_SPINS turns while descending to y=0.
// Phase 3 (P2 → P3): 360° Z rotation ("dans le plan du regard", vers le haut).
// Phase 4 (P3+):     Assembled. Whole piece idles (float + slow Y rotation). Camera pulls back.
function PencilAssembly({ scrollProgress }: Props) {
  const assemblyRef = useRef<THREE.Group>(null);
  const pencilBodyRef = useRef<THREE.Group>(null);
  const smoothP = useRef(0);
  const idleTime = useRef(0);
  const screwRotY = useRef(0); // preserved across phase boundary to avoid snap
  const spinRotZ = useRef(0);  // preserved across phase boundary to avoid snap

  useFrame((_, delta) => {
    if (!assemblyRef.current || !pencilBodyRef.current) return;

    smoothP.current = THREE.MathUtils.lerp(smoothP.current, scrollProgress, 0.07);
    const p = smoothP.current;

    if (p <= P1) {
      // Approach: pencil descends toward mine, no rotation yet
      const t = easeInOut(p / P1);
      pencilBodyRef.current.position.y = THREE.MathUtils.lerp(PENCIL_START_Y, PENCIL_PRE_SCREW_Y, t);
      pencilBodyRef.current.rotation.y = 0;
      screwRotY.current = 0;
      assemblyRef.current.rotation.z = 0;
      assemblyRef.current.rotation.y = 0;
      assemblyRef.current.position.y = 0;
      idleTime.current = 0;
    } else if (p <= P2) {
      // Screw: pencil rotates + descends the remaining distance onto the mine
      const t = easeInOut((p - P1) / (P2 - P1));
      pencilBodyRef.current.position.y = THREE.MathUtils.lerp(PENCIL_PRE_SCREW_Y, PENCIL_END_Y, t);
      screwRotY.current = t * Math.PI * 2 * PENCIL_SPINS;
      pencilBodyRef.current.rotation.y = screwRotY.current;
      assemblyRef.current.rotation.z = 0;
      assemblyRef.current.rotation.y = 0;
      assemblyRef.current.position.y = 0;
      idleTime.current = 0;
    } else if (p <= P3) {
      // 360° Z rotation: whole assembly spins in the plane of the viewer, going upward
      pencilBodyRef.current.position.y = PENCIL_END_Y;
      pencilBodyRef.current.rotation.y = screwRotY.current;
      const t = easeInOut((p - P2) / (P3 - P2));
      spinRotZ.current = -t * Math.PI * 2; // negative = top swings upward first
      assemblyRef.current.rotation.z = spinRotZ.current;
      assemblyRef.current.rotation.y = 0;
      assemblyRef.current.position.y = 0;
      idleTime.current = 0;
    } else {
      // Idle: assembled piece floats and slowly rotates
      pencilBodyRef.current.position.y = PENCIL_END_Y;
      pencilBodyRef.current.rotation.y = screwRotY.current;
      assemblyRef.current.rotation.z = spinRotZ.current; // no snap (= -2π = 0 visually)
      idleTime.current += delta;
      assemblyRef.current.rotation.y = idleTime.current * 0.18;
      assemblyRef.current.position.y = Math.sin(idleTime.current * 0.55) * 0.07;
    }
  });

  return (
    <group ref={assemblyRef}>
      {/* Pencil body: descends + screws during animation */}
      <group ref={pencilBodyRef} position={[0, PENCIL_START_Y, 0]}>
        <PencilBody />
      </group>
      {/* Mine: static at final assembled position, never moves */}
      <group position={[MINE_X_OFFSET, MINE_ASSEMBLED_Y, MINE_Z_OFFSET]}>
        <Mine />
      </group>
    </group>
  );
}

// ─── Recul caméra ─────────────────────────────────────────────────────────────
function CameraRig({ scrollProgress }: Props) {
  const smoothP = useRef(0);

  useFrame((state) => {
    smoothP.current = THREE.MathUtils.lerp(smoothP.current, scrollProgress, 0.06);
    const p = smoothP.current;
    if (p > P3) {
      const t = easeOut((p - P3) / (1 - P3));
      state.camera.position.z = THREE.MathUtils.lerp(4.5, 9.5, t);
      state.camera.position.y = THREE.MathUtils.lerp(0.2, 0.5, t);
    } else {
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 4.5, 0.08);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.2, 0.08);
    }
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Canvas principal ─────────────────────────────────────────────────────────
export default function PencilScene({ scrollProgress }: Props) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0.2, 4.5], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 5, 3]} intensity={3.8} castShadow
          shadow-mapSize={[2048, 2048]} shadow-camera-far={20} />
        <directionalLight position={[-5, 2, 2]} intensity={0.7} color="#cce0ff" />
        <directionalLight position={[1, -4, -3]} intensity={1.0} color="#ffe8dd" />
        <pointLight position={[0, 3, 4]} intensity={1.2} color="#fff5e8" />

        <Suspense fallback={null}>
          <PencilAssembly scrollProgress={scrollProgress} />
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.18}
            scale={4}
            blur={3}
            far={2}
          />
          <Environment preset="studio" />
        </Suspense>

        <CameraRig scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
