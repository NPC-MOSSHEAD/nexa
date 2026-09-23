"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSignal } from "./SignalContext";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMode;
  uniform float uVelocity;
  uniform vec2 uPointer;

  attribute vec3 aGrid;
  attribute vec3 aLab;
  attribute vec3 aOpen;
  attribute float aProgress;
  attribute float aSeed;

  varying float vEnergy;
  varying float vProgress;

  vec3 morphTargets(float mode) {
    vec3 base = position;
    if (mode < 1.0) return mix(base, aGrid, smoothstep(0.0, 1.0, mode));
    if (mode < 2.0) return mix(aGrid, aLab, smoothstep(1.0, 2.0, mode));
    return mix(aLab, aOpen, smoothstep(2.0, 3.0, mode));
  }

  void main() {
    vec3 p = morphTargets(uMode);

    float ambient = sin(aProgress * 20.0 + uTime * 0.72 + aSeed * 9.0) * 0.045;
    p.z += ambient;
    p.y += sin(aProgress * 10.0 + uTime * 0.28 + aSeed) * 0.018;

    vec2 pointerWorld = uPointer * vec2(2.8, 1.7);
    vec2 delta = p.xy - pointerWorld;
    float dist = max(length(delta), 0.001);
    float pull = exp(-dist * 1.5) * 0.42;
    p.xy += normalize(delta) * pull * 0.11;
    p.z += pull * 0.65;

    float stress = min(abs(uVelocity) * 0.018, 1.0);
    p.x += sin(aProgress * 34.0 + aSeed * 4.0) * stress * 0.22;
    p.z += cos(aProgress * 22.0 + aSeed) * stress * 0.35;

    vEnergy = clamp(pull + stress * 0.8 + abs(ambient) * 2.5, 0.0, 1.0);
    vProgress = aProgress;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying float vEnergy;
  varying float vProgress;

  void main() {
    vec3 warm = vec3(0.91, 0.90, 0.86);
    vec3 mineral = vec3(0.64, 0.53, 1.0);
    float active = smoothstep(0.24, 0.95, vEnergy);
    vec3 color = mix(warm, mineral, active * 0.72);
    float edge = 0.58 + 0.42 * sin(vProgress * 18.0);
    gl_FragColor = vec4(color, uOpacity * (0.34 + active * 0.48) * edge);
  }
`;

type GeometryData = {
  geometry: THREE.BufferGeometry;
};

function makePoint(strand: number, step: number, strands: number, segments: number) {
  const s = strand / Math.max(strands - 1, 1);
  const t = step / Math.max(segments - 1, 1);
  const phase = s * Math.PI * 5.2;

  const theta = t * Math.PI * 2.8 + phase;
  const radius = 0.58 + 0.2 * Math.sin(t * Math.PI * 5 + phase * 0.7);
  const base = new THREE.Vector3(
    (t - 0.5) * 4.4 + Math.cos(theta) * radius,
    Math.sin(theta) * 1.2 + (s - 0.5) * 0.78,
    Math.cos(theta * 0.82) * 1.05 + Math.sin(phase) * 0.24,
  );

  const grid = new THREE.Vector3(
    (t - 0.5) * 5.2,
    (s - 0.5) * 3.2 + Math.sin(t * 16 + phase) * 0.045,
    Math.sin(t * Math.PI * 4 + phase) * 0.08,
  );

  const phi = t * Math.PI * 3.5 + phase;
  const lat = (s - 0.5) * Math.PI * 0.92;
  const labRadius = 1.85 + 0.18 * Math.sin(t * 13 + strand);
  const lab = new THREE.Vector3(
    Math.cos(lat) * Math.cos(phi) * labRadius,
    Math.sin(lat) * labRadius,
    Math.cos(lat) * Math.sin(phi) * labRadius,
  );

  const ring = t * Math.PI * 2 + phase * 0.035;
  const ringRadius = 2.15 + 0.13 * Math.sin(strand * 0.7 + t * 12);
  const open = new THREE.Vector3(
    Math.cos(ring) * ringRadius,
    Math.sin(ring) * ringRadius * 0.72,
    (s - 0.5) * 1.45 + Math.sin(t * 8 + phase) * 0.12,
  );

  return { base, grid, lab, open, t, seed: s };
}

function buildGeometry(quality: number): GeometryData {
  const strands = Math.round(54 * quality);
  const segments = Math.round(92 * quality);
  const position: number[] = [];
  const grid: number[] = [];
  const lab: number[] = [];
  const open: number[] = [];
  const progress: number[] = [];
  const seed: number[] = [];

  for (let strand = 0; strand < strands; strand += 1) {
    for (let i = 0; i < segments - 1; i += 1) {
      for (const step of [i, i + 1]) {
        const p = makePoint(strand, step, strands, segments);
        position.push(p.base.x, p.base.y, p.base.z);
        grid.push(p.grid.x, p.grid.y, p.grid.z);
        lab.push(p.lab.x, p.lab.y, p.lab.z);
        open.push(p.open.x, p.open.y, p.open.z);
        progress.push(p.t);
        seed.push(p.seed);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(position, 3));
  geometry.setAttribute("aGrid", new THREE.Float32BufferAttribute(grid, 3));
  geometry.setAttribute("aLab", new THREE.Float32BufferAttribute(lab, 3));
  geometry.setAttribute("aOpen", new THREE.Float32BufferAttribute(open, 3));
  geometry.setAttribute("aProgress", new THREE.Float32BufferAttribute(progress, 1));
  geometry.setAttribute("aSeed", new THREE.Float32BufferAttribute(seed, 1));
  geometry.computeBoundingSphere();
  return { geometry };
}

export function SignalField({ reduced = false }: { reduced?: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const { mode } = useSignal();
  const lastScroll = useRef(0);
  const velocity = useRef(0);
  const modeValue = useRef(0);

  const [quality, setQuality] = useState(1);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 8;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (cores <= 4 || coarse) setQuality(0.62);
  }, []);

  const data = useMemo(() => buildGeometry(quality), [quality]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMode: { value: 0 },
      uVelocity: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uOpacity: { value: 0.76 },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (!material.current) return;

    const scrollY = typeof window === "undefined" ? 0 : window.scrollY;
    const rawVelocity = (scrollY - lastScroll.current) / Math.max(delta * 1000, 1);
    lastScroll.current = scrollY;
    velocity.current = THREE.MathUtils.lerp(velocity.current, rawVelocity, 0.08);
    modeValue.current = THREE.MathUtils.damp(modeValue.current, mode, 3.4, delta);

    material.current.uniforms.uTime.value = reduced ? 0 : state.clock.elapsedTime;
    material.current.uniforms.uMode.value = modeValue.current;
    material.current.uniforms.uVelocity.value = reduced ? 0 : velocity.current;
    material.current.uniforms.uPointer.value.lerp(state.pointer, 0.08);

    if (group.current && !reduced) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.11) * 0.08;
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.08) * 0.035;
    }
  });

  return (
    <group ref={group} position={[0.65, 0.05, 0]} scale={quality < 1 ? 0.9 : 1}>
      <lineSegments geometry={data.geometry}>
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </lineSegments>
    </group>
  );
}
