import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const LAYERS = [4, 6, 6, 3]
const nodes = []
LAYERS.forEach((n, li) => {
  for (let i = 0; i < n; i++) {
    nodes.push({ li, p: [(li - (LAYERS.length - 1) / 2) * 1.7, (i - (n - 1) / 2) * 0.62, ((i + li) % 3 - 1) * 0.35] })
  }
})
const edges = []
nodes.forEach((a) => nodes.forEach((b) => { if (b.li === a.li + 1) edges.push([a.p, b.p]) }))
const COLORS = ['#2ee6d6', '#4f6bff', '#9b6bff', '#ff4fd8']

function Nodes() {
  const refs = useRef([])
  useFrame(({ clock }) => {
    refs.current.forEach((m, i) => {
      if (m) m.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2 + i) * 0.2)
    })
  })
  return nodes.map((n, i) => (
    <mesh key={i} position={n.p} ref={(el) => (refs.current[i] = el)}>
      <sphereGeometry args={[0.13, 24, 24]} />
      <meshStandardMaterial color={COLORS[n.li]} emissive={COLORS[n.li]} emissiveIntensity={1.2} />
    </mesh>
  ))
}

function Lines() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(edges.flat(2), 3))
    return g
  }, [])
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#6f86ff" transparent opacity={0.28} />
    </lineSegments>
  )
}

function Pulses() {
  const ref = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const N = 36
  const seeds = useMemo(() => Array.from({ length: N }, () => ({ e: Math.floor(Math.random() * edges.length), o: Math.random(), s: 0.25 + Math.random() * 0.5 })), [])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    seeds.forEach((sd, i) => {
      const p = (t * sd.s + sd.o) % 1
      const [a, b] = edges[sd.e]
      dummy.position.set(a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p, a[2] + (b[2] - a[2]) * p)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[null, null, N]}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshBasicMaterial color="#ffffff" />
    </instancedMesh>
  )
}

export default function NeuralNet() {
  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 4]} intensity={30} />
      <group>
        <Lines />
        <Nodes />
        <Pulses />
      </group>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
    </Canvas>
  )
}
