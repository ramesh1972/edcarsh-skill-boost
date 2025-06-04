
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, Environment, useScroll, ScrollControls, Scroll } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Calendar, Star, ArrowRight, Target } from 'lucide-react';
import * as THREE from 'three';
import { courses } from '@/data/courses';
import { homeTestimonials } from '@/data/testimonials';
import { usps } from '@/data/usps';

// Floating geometric shapes component
const FloatingShapes = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, -5]}>
      {/* Floating cubes */}
      <mesh position={[-3, 2, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.7} />
      </mesh>
      
      <mesh position={[3, -1, 0]}>
        <octahedronGeometry args={[0.6]} />
        <meshStandardMaterial color="#34d399" transparent opacity={0.8} />
      </mesh>
      
      <mesh position={[-2, -2, 1]}>
        <icosahedronGeometry args={[0.5]} />
        <meshStandardMaterial color="#f59e0b" transparent opacity={0.6} />
      </mesh>
      
      <mesh position={[2, 2, -1]}>
        <dodecahedronGeometry args={[0.7]} />
        <meshStandardMaterial color="#ec4899" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

// Interactive course cards in 3D space
const CourseCard3D = ({ course, position }: { course: any; position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2, 1.5, 0.1]} />
      <meshStandardMaterial color={hovered ? "#3b82f6" : "#1e40af"} />
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="center"
        maxWidth={1.8}
      >
        {course.title}
      </Text>
    </mesh>
  );
};

// Animated particles background
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesCount = 1000;
  
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#60a5fa" transparent opacity={0.6} />
    </points>
  );
};

// Scrollable sections
const Scene = () => {
  const scroll = useScroll();
  const { viewport } = useThree();
  
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <ParticleField />
      
      {/* Hero section */}
      <group position={[0, 0, 0]}>
        <FloatingShapes />
        <Text
          position={[0, 2, 0]}
          fontSize={viewport.width > 10 ? 1.5 : 1}
          color="#ffffff"
          anchorX="center"
          anchorY="center"
          maxWidth={10}
        >
          Master Skills Fast with Crash Courses
        </Text>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.4}
          color="#fbbf24"
          anchorX="center"
          anchorY="center"
          maxWidth={8}
        >
          Learn new skills with short, practical crash courses
        </Text>
      </group>

      {/* Courses section - positioned further down */}
      <group position={[0, -8, 0]}>
        <Text
          position={[0, 3, 0]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="center"
        >
          Featured Courses
        </Text>
        {courses.slice(0, 6).map((course, index) => (
          <CourseCard3D
            key={course.id}
            course={course}
            position={[
              (index % 3 - 1) * 3,
              Math.floor(index / 3) * -2,
              0
            ]}
          />
        ))}
      </group>

      {/* Stats section */}
      <group position={[0, -16, 0]}>
        <Text
          position={[0, 2, 0]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="center"
        >
          Our Impact
        </Text>
        
        <Text position={[-3, 0, 0]} fontSize={0.6} color="#60a5fa" anchorX="center">50K+</Text>
        <Text position={[-3, -0.8, 0]} fontSize={0.3} color="#ffffff" anchorX="center">Students</Text>
        
        <Text position={[-1, 0, 0]} fontSize={0.6} color="#34d399" anchorX="center">500+</Text>
        <Text position={[-1, -0.8, 0]} fontSize={0.3} color="#ffffff" anchorX="center">Courses</Text>
        
        <Text position={[1, 0, 0]} fontSize={0.6} color="#f59e0b" anchorX="center">95%</Text>
        <Text position={[1, -0.8, 0]} fontSize={0.3} color="#ffffff" anchorX="center">Success Rate</Text>
        
        <Text position={[3, 0, 0]} fontSize={0.6} color="#ec4899" anchorX="center">24/7</Text>
        <Text position={[3, -0.8, 0]} fontSize={0.3} color="#ffffff" anchorX="center">Support</Text>
      </group>

      <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
    </>
  );
};

const Index = () => {
  return (
    <div className="h-full w-full relative bg-black">
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ScrollControls pages={4} damping={0.1}>
          <Scene />
          <Scroll html>
            {/* Overlay HTML content */}
            <div className="w-full">
              {/* Hero overlay */}
              <div className="h-screen flex flex-col justify-center items-center text-center px-4 relative z-10">
                <Badge className="mb-4 bg-blue-600/20 text-blue-200 border-blue-400/30" variant="secondary">
                  🚀 Launch Your Skills in Hours, Not Months
                </Badge>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                  <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Play className="w-5 h-5" />
                    Start Learning Now
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <Calendar className="w-5 h-5" />
                    View Sessions
                  </Button>
                </div>
              </div>

              {/* USPs section */}
              <div className="h-screen flex items-center justify-center px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
                  {usps.slice(0, 3).map((usp, index) => (
                    <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                      <CardHeader>
                        <CardTitle className="text-xl">{usp.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-300">
                          {usp.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Testimonials section */}
              <div className="h-screen flex items-center justify-center px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
                  {homeTestimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                      <CardHeader>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription className="text-gray-300">{testimonial.role}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">"{testimonial.content}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* CTA section */}
              <div className="h-screen flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Ready to Crash Your Way to Success?
                </h2>
                <p className="text-xl mb-8 text-gray-300 max-w-3xl">
                  Join thousands of professionals who've accelerated their careers with EdCrash
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="gap-2">
                    <Target className="w-5 h-5" />
                    Express Your Learning Intent
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 border-white hover:bg-white hover:text-black">
                    <Calendar className="w-5 h-5" />
                    View Course Calendar
                  </Button>
                </div>
              </div>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default Index;
