
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text3D, Center, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Floating geometric shapes component
const FloatingShape = ({ position, geometry, color, scale = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

// Particle system component
const ParticleField = ({ count = 1000 }) => {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        color="#00ffff" 
        transparent 
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Camera controller based on scroll
const CameraController = ({ scrollProgress }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    // Move camera through different positions based on scroll
    const progress = scrollProgress;
    
    if (progress <= 0.25) {
      // Section 1: Close view
      const localProgress = progress / 0.25;
      camera.position.z = THREE.MathUtils.lerp(8, 5, localProgress);
      camera.position.y = THREE.MathUtils.lerp(0, 2, localProgress);
    } else if (progress <= 0.5) {
      // Section 2: Side view
      const localProgress = (progress - 0.25) / 0.25;
      camera.position.x = THREE.MathUtils.lerp(0, 10, localProgress);
      camera.position.z = THREE.MathUtils.lerp(5, 0, localProgress);
      camera.position.y = THREE.MathUtils.lerp(2, 0, localProgress);
    } else if (progress <= 0.75) {
      // Section 3: Top-down view
      const localProgress = (progress - 0.5) / 0.25;
      camera.position.x = THREE.MathUtils.lerp(10, 0, localProgress);
      camera.position.y = THREE.MathUtils.lerp(0, 15, localProgress);
      camera.position.z = THREE.MathUtils.lerp(0, 5, localProgress);
    } else {
      // Section 4: Final view
      const localProgress = (progress - 0.75) / 0.25;
      camera.position.x = THREE.MathUtils.lerp(0, -8, localProgress);
      camera.position.y = THREE.MathUtils.lerp(15, 3, localProgress);
      camera.position.z = THREE.MathUtils.lerp(5, 8, localProgress);
    }
    
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Main 3D Scene
const Scene3D = ({ scrollProgress }) => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e)' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#00ffff" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={0.5} />
      <spotLight 
        position={[0, 20, 0]} 
        color="#ffffff" 
        intensity={0.8}
        angle={Math.PI / 6}
        penumbra={0.5}
      />

      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      
      {/* Particle field */}
      <ParticleField count={2000} />

      {/* Floating geometric shapes */}
      <FloatingShape 
        position={[3, 2, -2]} 
        geometry={<boxGeometry args={[1, 1, 1]} />} 
        color="#00ffff"
        scale={1.2}
      />
      <FloatingShape 
        position={[-4, -1, 3]} 
        geometry={<sphereGeometry args={[0.8, 32, 32]} />} 
        color="#ff00ff"
        scale={1.5}
      />
      <FloatingShape 
        position={[2, -3, 1]} 
        geometry={<torusGeometry args={[1, 0.4, 16, 100]} />} 
        color="#ffff00"
      />
      <FloatingShape 
        position={[-3, 3, -4]} 
        geometry={<octahedronGeometry args={[1]} />} 
        color="#00ff00"
      />
      <FloatingShape 
        position={[5, 0, 2]} 
        geometry={<tetrahedronGeometry args={[1]} />} 
        color="#ff6600"
        scale={1.3}
      />

      {/* Central focal point */}
      <Float speed={1} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#4400ff"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Camera controller */}
      <CameraController scrollProgress={scrollProgress} />
    </Canvas>
  );
};

export default Scene3D;
