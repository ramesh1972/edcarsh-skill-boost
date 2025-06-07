import * as THREE from 'three';
import React from 'react';
import Courses from '../../pages/Courses'

export default function BasicFour() {
    // Create a ref for the container div
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        // Set up renderer, scene, camera
        const renderer = new THREE.WebGLRenderer();
        // Set renderer size to container or window
        renderer.setSize(300, 300);
        const scene = new THREE.Scene();
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1); // white light, full intensity
        scene.add(ambientLight);
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        // Add point light
        const pointLight = new THREE.PointLight(0xffaa00, 0.7, 100);
        pointLight.position.set(-5, -5, 5);
        scene.add(pointLight);
        // Enable shadows
        renderer.shadowMap.enabled = true;
        directionalLight.castShadow = true;
        pointLight.castShadow = true;
        const camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 3;

        // Add cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: 0xFFff00 });
        const material = new THREE.MeshStandardMaterial({ color: 0xFFff00 });
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;
        scene.add(cube);
        cube.position.z = 1; // Move cube closer to camera

        // Animation loop
        let scaleDirection = 1;
        function animate() {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            // Add a pulsing scale effect
            cube.scale.x += 0.005 * scaleDirection;
            cube.scale.y += 0.005 * scaleDirection;
            cube.scale.z += 0.005 * scaleDirection;
            if (cube.scale.x > 1.2 || cube.scale.x < 0.8) scaleDirection *= -1;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();

        // Append renderer's canvas to the container
        if (containerRef.current) {
            containerRef.current.appendChild(renderer.domElement);
        }

        // Cleanup on unmount
        return () => {
            if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <>
            <Courses className="absolute top-4 left-4 w-6 h-6 text-gray-500 animate-spin" />
            <div ref={containerRef} className="absolute stick w-100 h-100" style={{ top: 100, left: 100, zIndex: 10 }}>
                {/* Three.js canvas will be above Courses */}
                
            </div>
        </>
    );
}
