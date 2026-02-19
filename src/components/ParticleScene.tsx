"use client"

import { Canvas } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"

function Particles() {
    const particles = new Float32Array(3000 * 3)

    for (let i = 0; i < 3000; i++) {
        particles[i * 3] = (Math.random() - 0.5) * 20
        particles[i * 3 + 1] = (Math.random() - 0.5) * 20
        particles[i * 3 + 2] = (Math.random() - 0.5) * 20
    }

    return (
        <Points positions={particles} stride={3}>
            <PointMaterial
                transparent
                color="#00ffaa"
                size={0.05}
                depthWrite={false}
            />
        </Points>
    )
}

export default function ParticleScene() {
    return (
        <Canvas className="fixed inset-0 -z-10">
            <ambientLight intensity={0.5} />
            <Particles />
        </Canvas>
    )
}
