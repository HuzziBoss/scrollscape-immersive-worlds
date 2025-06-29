
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text3D, Center } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Dynamic building structure that constructs itself
const BuildingStructure = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      
      // Animate individual building blocks based on scroll
      meshRefs.current.forEach((mesh, index) => {
        if (mesh) {
          const progress = Math.max(0, scrollProgress * 4 - index * 0.1);
          mesh.scale.y = THREE.MathUtils.lerp(0, 1, progress);
          mesh.position.y = THREE.MathUtils.lerp(-5, index * 0.5, progress);
          mesh.material.opacity = THREE.MathUtils.lerp(0, 0.8, progress);
        }
      });
    }
  });

  const blocks = useMemo(() => {
    const blockArray = [];
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 8;
      const height = Math.random() * 3 + 1;
      blockArray.push({ x, z, height, index: i });
    }
    return blockArray;
  }, []);

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {blocks.map((block, index) => (
        <mesh
          key={index}
          ref={(el) => { if (el) meshRefs.current[index] = el; }}
          position={[block.x, 0, block.z]}
        >
          <boxGeometry args={[0.5, block.height, 0.5]} />
          <meshStandardMaterial 
            color={new THREE.Color().setHSL(0.6 + index * 0.02, 0.8, 0.6)}
            transparent
            emissive={new THREE.Color().setHSL(0.6 + index * 0.02, 0.5, 0.1)}
          />
        </mesh>
      ))}
    </group>
  );
};

// DNA-like spiral that unravels with scroll
const DNASpiral = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const spiralData = useMemo(() => {
    const points = [];
    const colors = [];
    for (let i = 0; i < 200; i++) {
      const angle = (i / 200) * Math.PI * 8;
      const radius = 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (i / 200) * 10 - 5;
      
      points.push(x, y, z);
      colors.push(
        Math.sin(i * 0.1) * 0.5 + 0.5,
        Math.cos(i * 0.1) * 0.5 + 0.5,
        1
      );
    }
    return { points: new Float32Array(points), colors: new Float32Array(colors) };
  }, []);

  useFrame((state) => {
    if (groupRef.current && particlesRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.2;
      
      // Animate spiral expansion based on scroll
      const scale = 1 + scrollProgress * 2;
      groupRef.current.scale.set(scale, 1, scale);
      
      // Update particle material
      const material = particlesRef.current.material as THREE.PointsMaterial;
      material.size = 0.1 + scrollProgress * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[8, 0, -5]}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={spiralData.points.length / 3}
            array={spiralData.points}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={spiralData.colors.length / 3}
            array={spiralData.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.1}
          vertexColors
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
};

// Morphing geometric network
const GeometricNetwork = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  
  const networkData = useMemo(() => {
    const vertices = [];
    const indices = [];
    const nodeCount = 30;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      vertices.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 10
      );
    }
    
    // Create connections
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() < 0.1) {
          indices.push(i, j);
        }
      }
    }
    
    return { vertices: new Float32Array(vertices), indices };
  }, []);

  useFrame((state) => {
    if (groupRef.current && lineRef.current) {
      const time = state.clock.elapsedTime;
      
      // Rotate the network
      groupRef.current.rotation.x = time * 0.1;
      groupRef.current.rotation.y = time * 0.15;
      
      // Animate opacity and scale based on scroll
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + scrollProgress * 0.7;
      
      const scale = 0.5 + scrollProgress * 1.5;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={[-8, 2, 0]}>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={networkData.vertices.length / 3}
            array={networkData.vertices}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={new Uint16Array(networkData.indices)}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#00ffaa"
          transparent
          opacity={0.3}
        />
      </lineSegments>
    </group>
  );
};

// Particle field that responds to scroll
const DynamicParticleField = ({ scrollProgress }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleData = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    const colors = new Float32Array(3000 * 3);
    
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
      colors[i * 3 + 2] = 1;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      pointsRef.current.rotation.x = time * 0.02;
      pointsRef.current.rotation.y = time * 0.03;
      
      // Update material based on scroll
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.size = 0.05 + scrollProgress * 0.15;
      material.opacity = 0.4 + scrollProgress * 0.6;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleData.positions.length / 3}
          array={particleData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleData.colors.length / 3}
          array={particleData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Camera controller with smoother movements
const CameraController = ({ scrollProgress }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    const progress = scrollProgress;
    
    if (progress <= 0.2) {
      // Opening view
      const localProgress = progress / 0.2;
      camera.position.z = THREE.MathUtils.lerp(12, 8, localProgress);
      camera.position.y = THREE.MathUtils.lerp(0, 3, localProgress);
      camera.position.x = THREE.MathUtils.lerp(0, -2, localProgress);
    } else if (progress <= 0.4) {
      // Building construction view
      const localProgress = (progress - 0.2) / 0.2;
      camera.position.x = THREE.MathUtils.lerp(-2, 5, localProgress);
      camera.position.y = THREE.MathUtils.lerp(3, 1, localProgress);
      camera.position.z = THREE.MathUtils.lerp(8, 10, localProgress);
    } else if (progress <= 0.6) {
      // DNA spiral view
      const localProgress = (progress - 0.4) / 0.2;
      camera.position.x = THREE.MathUtils.lerp(5, 12, localProgress);
      camera.position.y = THREE.MathUtils.lerp(1, 2, localProgress);
      camera.position.z = THREE.MathUtils.lerp(10, -2, localProgress);
    } else if (progress <= 0.8) {
      // Network view
      const localProgress = (progress - 0.6) / 0.2;
      camera.position.x = THREE.MathUtils.lerp(12, -12, localProgress);
      camera.position.y = THREE.MathUtils.lerp(2, 5, localProgress);
      camera.position.z = THREE.MathUtils.lerp(-2, 8, localProgress);
    } else {
      // Final overview
      const localProgress = (progress - 0.8) / 0.2;
      camera.position.x = THREE.MathUtils.lerp(-12, 0, localProgress);
      camera.position.y = THREE.MathUtils.lerp(5, 15, localProgress);
      camera.position.z = THREE.MathUtils.lerp(8, 15, localProgress);
    }
    
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Main 3D Scene
const Scene3D = ({ scrollProgress }) => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 12], fov: 75 }}
      style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e, #16213e)' }}
    >
      {/* Enhanced lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#00ffff" intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={0.8} />
      <spotLight 
        position={[0, 25, 0]} 
        color="#ffffff" 
        intensity={1.2}
        angle={Math.PI / 4}
        penumbra={0.3}
      />
      <directionalLight
        position={[20, 20, 5]}
        color="#4488ff"
        intensity={0.5}
      />

      {/* Background stars */}
      <Stars radius={150} depth={80} count={8000} factor={6} saturation={0} fade />
      
      {/* Dynamic particle field */}
      <DynamicParticleField scrollProgress={scrollProgress} />

      {/* Professional 3D objects that build and move */}
      <BuildingStructure scrollProgress={scrollProgress} />
      <DNASpiral scrollProgress={scrollProgress} />
      <GeometricNetwork scrollProgress={scrollProgress} />

      {/* Central focal element that scales with scroll */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[0, 0, 0]} scale={1 + scrollProgress}>
          <dodecahedronGeometry args={[1.5, 2]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#2200ff"
            emissiveIntensity={0.2 + scrollProgress * 0.3}
            metalness={0.8}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* Camera controller */}
      <CameraController scrollProgress={scrollProgress} />
    </Canvas>
  );
};

export default Scene3D;
