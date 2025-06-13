import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import CenterModal from './CenterModal';

const BOXES = [
    { color: '#e57373' },
    { color: '#64b5f6' },
    { color: '#81c784' },
    { color: '#ffd54f' },
    { color: '#ba68c8' },
    { color: '#ffb74d' },
];

const getBoxPosition = (index, expanded) => {
    // 2 columns, 3 rows
    const col = index % 2;
    const row = Math.floor(index / 2);
    // When expanded, move left column to -2.5, right to 2.5
    if (expanded !== null) {
        if (col === 0) return [-2.5, 2 - row * 2, 0];
        return [2.5, 2 - row * 2, 0];
    }
    // Default grid: columns -1.2, 1.2; rows 2, 0, -2
    return [col === 0 ? -1.2 : 1.2, 2 - row * 2, 0];
};

const Box = ({ color, position, onClick, shrink }) => {
    // Use a spring for scale, but interpolate to a Vector3 array for r3f compatibility
    const { scale, position: springPosition } = useSpring({
        scale: shrink ? 0.3 : 1,
        position: position,
        config: { tension: 300, friction: 30 },
    });

    return (
        <animated.group position={springPosition.to((x, y, z) => [x, y, z])} scale={scale.to(s => [s, 1, 1])} onClick={onClick}>
            <mesh castShadow>
                <boxGeometry args={[2, 1, 0.3]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </animated.group>
    );
};

export const IndexTwo = () => {
    const [selected, setSelected] = useState(null);
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#222' }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} shadows>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 10, 7]} intensity={1} castShadow />
                <Box
                    key={0}
                    color={'#81c784'}
                    position={getBoxPosition(0, 0)}
                    onClick={() => setSelected(null)}
                    shrink={selected !== null}
                />
            </Canvas>
        </div >
    );
}

// create array  of components in components folder
import CourseCalendarSection from '../CourseCalendarSection';
import HeroSection from '../HeroSection';

const IndexThree = () => {
    const [selected, setSelected] = useState(null);

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#222' }}>
            
            {selected !== null && (
                <CenterModal onClose={() => setSelected(null)}>
                    <HeroSection />
                </CenterModal>
            )}
        </div>
    );
};

export default IndexThree;
