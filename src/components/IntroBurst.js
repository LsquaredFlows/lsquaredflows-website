import React, { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

/* ─── Particle that explodes outward ─── */
function BurstParticle({ delay, direction, speed, size, color }) {
  const ref = useRef();
  const startTime = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    if (startTime.current === null) startTime.current = state.clock.elapsedTime + delay;
    
    const elapsed = state.clock.elapsedTime - startTime.current;
    if (elapsed < 0) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;

    const t = elapsed * speed;
    ref.current.position.x = direction[0] * t;
    ref.current.position.y = direction[1] * t - 0.5 * t * t * 0.3; // slight gravity
    ref.current.position.z = direction[2] * t;

    // Fade and shrink
    const fade = Math.max(0, 1 - elapsed * 0.6);
    ref.current.scale.setScalar(fade * size);
    if (ref.current.material) {
      ref.current.material.opacity = fade;
    }
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={1}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

/* ─── Main sphere that grows then explodes ─── */
function CoreSphere({ onBurst }) {
  const ref = useRef();
  const [phase, setPhase] = useState('growing'); // growing -> burst -> done
  const startTime = useRef(null);
  const burstTriggered = useRef(false);

  useFrame((state) => {
    if (!ref.current) return;
    if (startTime.current === null) startTime.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startTime.current;

    if (phase === 'growing') {
      // 0-1.2s: sphere appears and grows with distortion
      const growProgress = Math.min(1, elapsed / 1.2);
      const eased = 1 - Math.pow(1 - growProgress, 3); // ease out cubic
      const scale = eased * 2.5;
      ref.current.scale.setScalar(scale);
      ref.current.rotation.y = elapsed * 1.5;
      ref.current.rotation.x = elapsed * 0.8;

      // Pulse effect near the end
      if (growProgress > 0.7) {
        const pulse = 1 + Math.sin(elapsed * 15) * 0.08 * (growProgress - 0.7) / 0.3;
        ref.current.scale.multiplyScalar(pulse);
      }

      if (elapsed > 1.4 && !burstTriggered.current) {
        burstTriggered.current = true;
        setPhase('burst');
        if (onBurst) onBurst();
      }
    } else if (phase === 'burst') {
      // Rapid shrink
      const burstElapsed = elapsed - 1.4;
      const shrink = Math.max(0, 1 - burstElapsed * 4);
      ref.current.scale.setScalar(2.5 * shrink);
      if (ref.current.material) {
        ref.current.material.opacity = shrink;
      }
      if (shrink <= 0) setPhase('done');
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 128, 128]} scale={0}>
      <MeshDistortMaterial
        color="#d4a855"
        roughness={0.1}
        metalness={0.95}
        distort={0.4}
        speed={3}
        transparent
        opacity={1}
      />
    </Sphere>
  );
}

/* ─── Shockwave ring ─── */
function ShockwaveRing({ delay = 1.4 }) {
  const ref = useRef();
  const startTime = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    if (startTime.current === null) startTime.current = state.clock.elapsedTime + delay;
    const elapsed = state.clock.elapsedTime - startTime.current;
    if (elapsed < 0) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    const t = elapsed * 3;
    ref.current.scale.setScalar(t);
    if (ref.current.material) {
      ref.current.material.opacity = Math.max(0, 1 - elapsed * 1.5);
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} visible={false}>
      <torusGeometry args={[2, 0.04, 16, 100]} />
      <meshStandardMaterial
        color="#c9a96e"
        transparent
        opacity={1}
        emissive="#d4a855"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

/* ─── Second shockwave ─── */
function ShockwaveRing2({ delay = 1.55 }) {
  const ref = useRef();
  const startTime = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    if (startTime.current === null) startTime.current = state.clock.elapsedTime + delay;
    const elapsed = state.clock.elapsedTime - startTime.current;
    if (elapsed < 0) { ref.current.visible = false; return; }
    ref.current.visible = true;
    const t = elapsed * 2.5;
    ref.current.scale.setScalar(t);
    if (ref.current.material) {
      ref.current.material.opacity = Math.max(0, 0.8 - elapsed * 1.2);
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2.5, 0.3, 0]} visible={false}>
      <torusGeometry args={[2, 0.025, 16, 100]} />
      <meshStandardMaterial color="#e8d5b0" transparent opacity={0.8} emissive="#c9a96e" emissiveIntensity={0.3} />
    </mesh>
  );
}

/* ─── Flash overlay ─── */
function FlashPlane({ delay = 1.4 }) {
  const ref = useRef();
  const startTime = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    if (startTime.current === null) startTime.current = state.clock.elapsedTime + delay;
    const elapsed = state.clock.elapsedTime - startTime.current;
    if (elapsed < 0) { ref.current.visible = false; return; }
    ref.current.visible = true;
    if (ref.current.material) {
      ref.current.material.opacity = Math.max(0, 0.7 - elapsed * 2);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 3]} visible={false}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial color="#fff5e6" transparent opacity={0} />
    </mesh>
  );
}

/* ─── The full intro scene ─── */
export default function IntroBurst({ onComplete }) {
  const PARTICLE_COUNT = 80;

  const particles = useMemo(() => {
    const colors = ['#d4a855', '#c9a96e', '#b8956a', '#e8d5b0', '#ffffff', '#f0e3c4'];
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 1.5 + Math.random() * 3;
      return {
        direction: [
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
          Math.cos(phi) * speed,
        ],
        speed: 0.8 + Math.random() * 0.8,
        size: 0.05 + Math.random() * 0.15,
        delay: 1.4 + Math.random() * 0.15, // stagger slightly after burst
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
  }, []);

  const handleBurst = useCallback(() => {
    // After burst animation finishes, notify parent
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 1200);
  }, [onComplete]);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', background: '#0a0806' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#d4a855" />
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#fff5e6" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#c9a96e" />

      <CoreSphere onBurst={handleBurst} />

      {/* Burst particles */}
      {particles.map((p, i) => (
        <BurstParticle
          key={i}
          delay={p.delay}
          direction={p.direction}
          speed={p.speed}
          size={p.size}
          color={p.color}
        />
      ))}

      {/* Shockwave rings */}
      <ShockwaveRing delay={1.4} />
      <ShockwaveRing2 delay={1.55} />

      {/* Flash */}
      <FlashPlane delay={1.38} />
    </Canvas>
  );
}
