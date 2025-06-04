import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Environment } from '@react-three/drei';
import React, { useRef } from 'react';

import * as THREE from 'three';
import { blob } from 'stream/consumers';

function AnimatedBlob(props: JSX.IntrinsicElements['mesh']) {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => (mesh.current.rotation.x += 0.01))



    return (
        <mesh
            {...props}
            ref={mesh}
            scale={1}>
            <boxGeometry args={[1, 1, 1]} />
        </mesh >
    );
}

const blobs: { color: string; position: [number, number, number]; speed: number }[] = [
    { color: '#2f74c0', position: [-2, 1, 0], speed: 1.5 },
    { color: '#81c784', position: [2, 1, 0], speed: 1.2 },
    { color: '#ffd54f', position: [0, -1, 0], speed: 1.8 },
];

export default function CoursesCalendarBackground() {
    return (
        <Canvas
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
            }}
            camera={{ position: [0, 0, 8] as [number, number, number], fov: 50 }}
        >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 7]} intensity={1} />
      <AnimatedBlob position={[-1.2, 0, 0]} />
      <AnimatedBlob position={[1.2, 0, 0]} />            
      <Environment preset="sunset" />
        </Canvas>
    );
}
