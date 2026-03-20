import React, { useRef, useMemo, forwardRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Mobile detection helper ─── */
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

/* ─── Floating particles ─── */
function Particles({ count = 120 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#c9a96e" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ─── Central morphing sphere ─── */
function MorphingSphere() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={ref} args={[1.8, 128, 128]} position={[2.5, 0, 0]}>
        <MeshDistortMaterial
          color="#d4a855"
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={1.5}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

/* ─── Orbiting ring ─── */
function OrbitRing() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      ref.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Torus ref={ref} args={[2.8, 0.02, 16, 100]} position={[2.5, 0, 0]}>
      <meshStandardMaterial color="#c9a96e" transparent opacity={0.4} />
    </Torus>
  );
}

/* ─── Small floating cubes ─── */
function FloatingCube({ position, size = 0.15, speed = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Box ref={ref} args={[size, size, size]} position={position}>
      <meshStandardMaterial color="#e8d5b0" transparent opacity={0.5} metalness={0.6} roughness={0.3} />
    </Box>
  );
}

/* ─── Main Hero 3D Scene ─── */
export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fff5e6" />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#c9a96e" />
      
      <MorphingSphere />
      <OrbitRing />
      <Particles count={isMobile ? 60 : 150} />
      
      {!isMobile && <>
        <FloatingCube position={[4.5, 2, -1]} size={0.2} speed={0.8} />
        <FloatingCube position={[0.5, -2, -2]} size={0.12} speed={1.2} />
      </>}
      <FloatingCube position={[5, -1.5, 1]} size={0.18} speed={0.6} />
      <FloatingCube position={[-1, 2.5, -1]} size={0.1} speed={1.5} />
      {!isMobile && <FloatingCube position={[3, 3, -3]} size={0.14} speed={0.9} />}
    </Canvas>
  );
}

/* ─── Services: Scroll-driven orbital scene ─── */

const SERVICE_NODES = [
  { label: 'Software\nDevelopment', color: '#d4a855', icon: '💻' },
  { label: 'AI\nAgents', color: '#c9a96e', icon: '🤖' },
  { label: 'Website &\nApp Design', color: '#b8956a', icon: '🎨' },
  { label: 'Native\nApplications', color: '#e8d5b0', icon: '📱' },
  { label: 'AI Enterprise\nWorkflows', color: '#a6845f', icon: '⚙️' },
  { label: 'AI Chatbots\n& Concierge', color: '#d4a855', icon: '💬' },
];

/* Central morphing core for the services scene */
function ServicesCore() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  return (
    <group>
      <Sphere ref={ref} args={[1.2, 128, 128]}>
        <MeshDistortMaterial
          color="#d4a855"
          roughness={0.15}
          metalness={0.9}
          distort={0.25}
          speed={1.2}
          transparent
          opacity={0.9}
        />
      </Sphere>
      {/* Outer ring */}
      <Torus args={[2.0, 0.015, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#c9a96e" transparent opacity={0.25} />
      </Torus>
      <Torus args={[2.6, 0.01, 16, 100]} rotation={[Math.PI / 2.5, 0.3, 0]}>
        <meshStandardMaterial color="#b8956a" transparent opacity={0.15} />
      </Torus>
    </group>
  );
}

/* Orbiting service node (sphere + label) */
function ServiceNode({ angle, color, label, activeProgress, index, total }) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const radius = 3.2;

  useFrame((state) => {
    if (!groupRef.current) return;
    const theta = angle + state.clock.elapsedTime * 0.05;
    groupRef.current.position.x = Math.cos(theta) * radius;
    groupRef.current.position.z = Math.sin(theta) * radius;
    groupRef.current.position.y = Math.sin(theta * 0.5 + index) * 0.4;

    // Pulse when active
    const nodeStart = index / total;
    const nodeEnd = (index + 1) / total;
    const isActive = activeProgress >= nodeStart && activeProgress < nodeEnd;
    const scale = isActive ? 1.4 + Math.sin(state.clock.elapsedTime * 3) * 0.1 : 0.9;
    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(THREE.MathUtils.lerp(sphereRef.current.scale.x, scale, 0.08));
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere ref={sphereRef} args={[0.22, 32, 32]}>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} emissive={color} emissiveIntensity={0.15} />
      </Sphere>
      {/* Connection line to center */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0, 0, -Math.cos(angle) * radius, 0, -Math.sin(angle) * radius]), 3]}
            count={2}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.1} />
      </line>
    </group>
  );
}

/* Camera controller driven by scrollProgress prop */
function ScrollCamera({ scrollProgress }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 2, 7));

  useFrame(() => {
    const angle = scrollProgress * Math.PI * 2;
    const radius = 6.5;
    const height = 2.5 - scrollProgress * 3;
    
    targetPos.current.set(
      Math.sin(angle) * radius,
      height + Math.sin(scrollProgress * Math.PI) * 1.5,
      Math.cos(angle) * radius
    );

    camera.position.lerp(targetPos.current, 0.06);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* Exported scene — receives scrollProgress from parent */
export const ServicesOrbitScene = forwardRef(function ServicesOrbitScene({ scrollProgress = 0 }, ref) {
  return (
    <Canvas
      camera={{ position: [0, 2, 7], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#fff5e6" />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#c9a96e" />
      {!isMobile && <pointLight position={[3, -2, -3]} intensity={0.3} color="#d4a855" />}

      <ScrollCamera scrollProgress={scrollProgress} />
      <ServicesCore />

      {SERVICE_NODES.map((node, i) => (
        <ServiceNode
          key={i}
          index={i}
          total={SERVICE_NODES.length}
          angle={(i / SERVICE_NODES.length) * Math.PI * 2}
          color={node.color}
          label={node.label}
          activeProgress={scrollProgress}
        />
      ))}

      <Particles count={isMobile ? 40 : 100} />
    </Canvas>
  );
});

/* ═══════════════════════════════════════════════════════════
   Development Lifecycle — Scroll-driven 3D Animation
   Pentagon cycle with energy flow, orbiting camera
   ═══════════════════════════════════════════════════════════ */

const DEV_PHASES = [
  { color: '#d4a855', emissive: '#d4a855' },
  { color: '#c9a96e', emissive: '#c9a96e' },
  { color: '#e8d5b0', emissive: '#e8d5b0' },
  { color: '#b8956a', emissive: '#b8956a' },
  { color: '#a6845f', emissive: '#a6845f' },
];

/* Pentagon positions */
function getPentagonPos(index, radius = 2.8) {
  const angle = (index / 5) * Math.PI * 2 - Math.PI / 2;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0];
}

/* Phase node — pulsing sphere with glow ring */
function PhaseNode({ index, activeIndex, scrollProgress }) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const ringRef = useRef();
  const pos = getPentagonPos(index);
  const phase = DEV_PHASES[index];

  useFrame((state) => {
    if (!groupRef.current || !sphereRef.current || !ringRef.current) return;
    const t = state.clock.elapsedTime;

    // Float
    groupRef.current.position.y = pos[1] + Math.sin(t * 0.6 + index * 1.2) * 0.12;

    // Active state
    const isActive = index === activeIndex;
    const isPast = index < activeIndex;
    const targetScale = isActive ? 1.6 : isPast ? 1.1 : 0.7;
    const currentScale = sphereRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
    sphereRef.current.scale.setScalar(newScale);

    // Active pulse
    if (isActive) {
      const pulse = 1 + Math.sin(t * 4) * 0.06;
      sphereRef.current.scale.multiplyScalar(pulse);
    }

    // Glow ring
    const ringScale = isActive ? 1.8 + Math.sin(t * 3) * 0.2 : 0;
    const curRingScale = ringRef.current.scale.x;
    ringRef.current.scale.setScalar(THREE.MathUtils.lerp(curRingScale, ringScale, 0.06));
    ringRef.current.material.opacity = isActive ? 0.3 + Math.sin(t * 3) * 0.1 : 0;

    // Emissive intensity
    if (sphereRef.current.material) {
      sphereRef.current.material.emissiveIntensity = isActive ? 0.6 + Math.sin(t * 4) * 0.2 : isPast ? 0.2 : 0.05;
      sphereRef.current.material.opacity = isPast || isActive ? 1 : 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[pos[0], pos[1], pos[2]]}>
      <Sphere ref={sphereRef} args={[0.3, 48, 48]} scale={0.7}>
        <meshStandardMaterial
          color={phase.color}
          metalness={0.8}
          roughness={0.15}
          emissive={phase.emissive}
          emissiveIntensity={0.05}
          transparent
          opacity={0.4}
        />
      </Sphere>
      {/* Glow ring */}
      <mesh ref={ringRef} rotation={[0, 0, 0]} scale={0}>
        <torusGeometry args={[0.5, 0.015, 16, 64]} />
        <meshBasicMaterial color={phase.color} transparent opacity={0} />
      </mesh>
    </group>
  );
}

/* Curved connector between phases with animated energy pulse */
function PhaseConnector({ fromIndex, toIndex, activeIndex, scrollProgress }) {
  const lineRef = useRef();
  const pulseRef = useRef();
  const from = getPentagonPos(fromIndex);
  const to = getPentagonPos(toIndex);

  const curve = useMemo(() => {
    const mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, 0.8];
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...from),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...to)
    );
  }, [from, to]);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  // Is this connection active (energy flowing through it)?
  const isFlowing = fromIndex < activeIndex || (fromIndex === activeIndex && scrollProgress > (fromIndex + 0.5) / 5);

  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      lineRef.current.material.opacity = isFlowing ? 0.5 : 0.1;
    }
    if (pulseRef.current) {
      if (isFlowing) {
        const t = (state.clock.elapsedTime * 0.4 + fromIndex * 0.3) % 1;
        const pos = curve.getPoint(t);
        pulseRef.current.position.copy(pos);
        pulseRef.current.visible = true;
        pulseRef.current.scale.setScalar(0.06 + Math.sin(state.clock.elapsedTime * 6) * 0.02);
      } else {
        pulseRef.current.visible = false;
      }
    }
  });

  return (
    <group>
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial color="#c9a96e" transparent opacity={0.1} />
      </line>
      {/* Energy pulse traveling along the connection */}
      <mesh ref={pulseRef} visible={false}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#d4a855" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

/* Central hub — rotating wireframe */
function CentralHub() {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.15;
      outerRef.current.rotation.y = t * 0.2;
      outerRef.current.rotation.z = t * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.25;
      innerRef.current.rotation.y = -t * 0.3;
    }
  });

  return (
    <group>
      {/* Outer icosahedron wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#d4a855"
          wireframe
          transparent
          opacity={0.15}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Inner solid sphere */}
      <Sphere ref={innerRef} args={[0.5, 64, 64]}>
        <MeshDistortMaterial
          color="#c9a96e"
          distort={0.2}
          speed={1.5}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
          emissive="#d4a855"
          emissiveIntensity={0.15}
        />
      </Sphere>
    </group>
  );
}

/* Orbiting energy particles around the cycle */
function EnergyParticles({ count = 60, scrollProgress }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 2.4 + Math.random() * 1.2;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = Math.sin(angle) * r;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.03 + scrollProgress * Math.PI;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#e8d5b0" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* Scroll camera for process section */
function ProcessScrollCamera({ scrollProgress }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    // Camera orbits around the cycle, getting closer to the active phase
    const angle = scrollProgress * Math.PI * 0.6 - Math.PI * 0.3;
    const radius = 7.5 - scrollProgress * 1.5;
    const height = 1.5 * Math.sin(scrollProgress * Math.PI);

    target.current.set(
      Math.sin(angle) * radius,
      height,
      Math.cos(angle) * radius
    );

    camera.position.lerp(target.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* Exported scroll-driven dev cycle scene */
export function DevCycleScene({ scrollProgress = 0, activePhase = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#fff5e6" />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#c9a96e" />
      {!isMobile && <pointLight position={[3, -2, -3]} intensity={0.4} color="#d4a855" />}

      <ProcessScrollCamera scrollProgress={scrollProgress} />
      <CentralHub />

      {DEV_PHASES.map((_, i) => (
        <PhaseNode key={i} index={i} activeIndex={activePhase} scrollProgress={scrollProgress} />
      ))}

      {DEV_PHASES.map((_, i) => (
        <PhaseConnector
          key={`conn-${i}`}
          fromIndex={i}
          toIndex={(i + 1) % 5}
          activeIndex={activePhase}
          scrollProgress={scrollProgress}
        />
      ))}

      <EnergyParticles count={isMobile ? 30 : 80} scrollProgress={scrollProgress} />
      <Particles count={isMobile ? 20 : 50} />
    </Canvas>
  );
}

/* ─── Projects Background Scene ─── */
function ProjectSphere({ position, color, speed }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
    }
  });
  return (
    <Sphere ref={ref} args={[0.4, 32, 32]} position={position}>
      <MeshDistortMaterial color={color} distort={0.2} speed={1} roughness={0.4} metalness={0.5} transparent opacity={0.6} />
    </Sphere>
  );
}

export function ProjectsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: !isMobile, alpha: true }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 3, 5]} intensity={0.5} color="#c9a96e" />
      <ProjectSphere position={[-4, 2, -2]} color="#d4a855" speed={0.6} />
      <ProjectSphere position={[4, -1, -3]} color="#c9a96e" speed={0.8} />
      {!isMobile && <>
        <ProjectSphere position={[-3, -2, -1]} color="#b8956a" speed={1} />
        <ProjectSphere position={[3, 3, -4]} color="#e8d5b0" speed={0.5} />
      </>}
      <Particles count={isMobile ? 30 : 80} />
    </Canvas>
  );
}
