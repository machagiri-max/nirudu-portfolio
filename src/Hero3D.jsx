import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

function Knot() {
  const ref = useRef()
  useFrame((s, d) => {
    const m = ref.current
    m.rotation.x += d * 0.15
    m.rotation.y += d * 0.22
    m.position.x += (s.pointer.x * 0.7 - m.position.x) * 0.05
    m.position.y += (s.pointer.y * 0.5 - m.position.y) * 0.05
  })
  return (
    <Float speed={2} floatIntensity={1.1} rotationIntensity={0.4}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <MeshDistortMaterial color="#4f6bff" distort={0.28} speed={2} roughness={0.12} metalness={0.85} />
      </mesh>
    </Float>
  )
}

function Orbiter({ radius, speed, size, color, tilt = 0, offset = 0 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius * Math.sin(tilt), Math.sin(t) * radius * Math.cos(tilt))
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
    </mesh>
  )
}

function Ring({ radius, tilt, color }) {
  return (
    <mesh rotation={[tilt, 0.4, 0]}>
      <torusGeometry args={[radius, 0.006, 8, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  )
}

function Particles({ count = 450 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      a[i * 3] = r * Math.sin(ph) * Math.cos(th)
      a[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      a[i * 3 + 2] = r * Math.cos(ph)
    }
    return a
  }, [count])
  useFrame((_, d) => { ref.current.rotation.y += d * 0.03 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#9fb2ff" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 50 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={60} color="#2ee6d6" />
      <pointLight position={[-4, -2, 3]} intensity={50} color="#ff4fd8" />
      <directionalLight position={[0, 4, 2]} intensity={1.2} />
      <Knot />
      <Ring radius={2.1} tilt={1.2} color="#2ee6d6" />
      <Ring radius={2.6} tilt={0.5} color="#ff4fd8" />
      <Orbiter radius={2.1} speed={0.7} size={0.11} color="#2ee6d6" tilt={0.9} />
      <Orbiter radius={2.6} speed={-0.5} size={0.09} color="#ff4fd8" tilt={0.4} offset={2} />
      <Orbiter radius={2.3} speed={0.4} size={0.07} color="#ffffff" tilt={1.4} offset={4} />
      <Particles />
    </Canvas>
  )
}
