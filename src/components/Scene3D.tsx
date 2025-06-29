
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text3D, Center, Html } from '@react-three/drei';
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
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.opacity = THREE.MathUtils.lerp(0, 0.8, progress);
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

// Animated floating text elements
const FloatingText = ({ scrollProgress }) => {
  const textRefs = useRef<THREE.Mesh[]>([]);
  
  const textElements = [
    { text: "INNOVATION", position: [5, 8, -3] as [number, number, number], phase: 0.1 },
    { text: "CREATIVITY", position: [-7, 6, 2] as [number, number, number], phase: 0.3 },
    { text: "TECHNOLOGY", position: [3, -4, -8] as [number, number, number], phase: 0.5 },
    { text: "FUTURE", position: [-5, -2, 5] as [number, number, number], phase: 0.7 }
  ];

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    textRefs.current.forEach((mesh, index) => {
      if (mesh) {
        const element = textElements[index];
        const visibility = scrollProgress > element.phase ? 1 : 0;
        
        mesh.rotation.y = time * 0.5 + index;
        mesh.rotation.x = Math.sin(time + index) * 0.3;
        mesh.scale.setScalar(THREE.MathUtils.lerp(0, 1.5, visibility));
        
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.opacity = visibility * 0.8;
      }
    });
  });

  return (
    <>
      {textElements.map((element, index) => (
        <Float key={index} speed={2} rotationIntensity={0.3} floatIntensity={1}>
          <Center position={element.position}>
            <Text3D
              ref={(el) => { if (el) textRefs.current[index] = el; }}
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.8}
              height={0.1}
            >
              {element.text}
              <meshStandardMaterial
                color="#ffffff"
                emissive="#4488ff"
                emissiveIntensity={0.3}
                transparent
                opacity={0}
              />
            </Text3D>
          </Center>
        </Float>
      ))}
    </>
  );
};

// Energy orbs that pulse and connect
const EnergyOrbs = ({ scrollProgress }) => {
  const orbRefs = useRef<THREE.Mesh[]>([]);

  const orbPositions: [number, number, number][] = [
    [4, 3, -2],
    [-6, -1, 4],
    [2, -5, -6],
    [-3, 7, 1],
    [8, -3, -4]
  ];

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    orbRefs.current.forEach((orb, index) => {
      if (orb) {
        const pulseFactor = Math.sin(time * 2 + index) * 0.3 + 1;
        orb.scale.setScalar(pulseFactor * (0.5 + scrollProgress * 0.5));
        
        const material = orb.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.5 + Math.sin(time * 3 + index) * 0.3;
      }
    });
  });

  return (
    <group>
      {orbPositions.map((position, index) => (
        <Float key={index} speed={1.5} rotationIntensity={0} floatIntensity={2}>
          <mesh
            ref={(el) => { if (el) orbRefs.current[index] = el; }}
            position={position}
          >
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color={new THREE.Color().setHSL(index * 0.2, 0.8, 0.6)}
              emissive={new THREE.Color().setHSL(index * 0.2, 0.5, 0.3)}
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Enhanced particle field with trails
const DynamicParticleField = ({ scrollProgress }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleData = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);
    
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150;
      
      const hue = Math.random();
      colors[i * 3] = hue;
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
      colors[i * 3 + 2] = 1;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      pointsRef.current.rotation.x = time * 0.01;
      pointsRef.current.rotation.y = time * 0.02;
      
      // Dynamic color transitions based on scroll
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.size = 0.03 + scrollProgress * 0.12;
      material.opacity = 0.3 + scrollProgress * 0.7;
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
        size={0.03}
        vertexColors
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Enhanced camera controller with smoother movements
const CameraController = ({ scrollProgress }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    const progress = scrollProgress;
    
    if (progress <= 0.2) {
      // Opening cinematic sweep
      const localProgress = progress / 0.2;
      camera.position.z = THREE.MathUtils.lerp(15, 8, localProgress);
      camera.position.y = THREE.MathUtils.lerp(5, 3, localProgress);
      camera.position.x = THREE.MathUtils.lerp(-3, -2, localProgress);
    } else if (progress <= 0.4) {
      // Dynamic building view with rotation
      const localProgress = (progress - 0.2) / 0.2;
      camera.position.x = THREE.MathUtils.lerp(-2, 6, localProgress);
      camera.position.y = THREE.MathUtils.lerp(3, 1, localProgress);
      camera.position.z = THREE.MathUtils.lerp(8, 12, localProgress);
    } else if (progress <= 0.6) {
      // Spiral close-up with dramatic angle
      const localProgress = (progress - 0.4) / 0.2;
      camera.position.x = THREE.MathUtils.lerp(6, 14, localProgress);
      camera.position.y = THREE.MathUtils.lerp(1, 4, localProgress);
      camera.position.z = THREE.MathUtils.lerp(12, -3, localProgress);
    } else if (progress <= 0.8) {
      // Network exploration
      const localProgress = (progress - 0.6) / 0.2;
      camera.position.x = THREE.MathUtils.lerp(14, -15, localProgress);
      camera.position.y = THREE.MathUtils.lerp(4, 7, localProgress);
      camera.position.z = THREE.MathUtils.lerp(-3, 10, localProgress);
    } else {
      // Epic finale overview
      const localProgress = (progress - 0.8) / 0.2;
      camera.position.x = THREE.MathUtils.lerp(-15, 0, localProgress);
      camera.position.y = THREE.MathUtils.lerp(7, 20, localProgress);
      camera.position.z = THREE.MathUtils.lerp(10, 25, localProgress);
    }
    
    // Smooth look-at with slight offset for dynamic feel
    const lookAtOffset = new THREE.Vector3(
      Math.sin(scrollProgress * Math.PI) * 2,
      Math.cos(scrollProgress * Math.PI * 2) * 1,
      0
    );
    camera.lookAt(lookAtOffset);
  });

  return null;
};

// Main 3D Scene with enhanced effects
const Scene3D = ({ scrollProgress }) => {
  return (
    <Canvas 
      camera={{ position: [0, 5, 15], fov: 75 }}
      style={{ 
        background: `linear-gradient(${180 + scrollProgress * 360}deg, #0a0a0a, #1a1a2e, #16213e, #0f3460)` 
      }}
    >
      {/* Dynamic lighting system */}
      <ambientLight intensity={0.3} />
      <pointLight position={[15, 15, 15]} color="#00ffff" intensity={2} />
      <pointLight position={[-15, -15, -15]} color="#ff00ff" intensity={1.2} />
      <pointLight position={[0, 25, 0]} color="#ffff00" intensity={1.5} />
      <spotLight 
        position={[20, 30, 10]} 
        color="#ffffff" 
        intensity={2}
        angle={Math.PI / 3}
        penumbra={0.5}
        castShadow
      />
      <directionalLight
        position={[30, 30, 10]}
        color="#4488ff"
        intensity={0.8}
      />

      {/* Enhanced background */}
      <Stars radius={200} depth={100} count={12000} factor={8} saturation={0} fade />
      
      {/* All 3D elements */}
      <DynamicParticleField scrollProgress={scrollProgress} />
      <BuildingStructure scrollProgress={scrollProgress} />
      <DNASpiral scrollProgress={scrollProgress} />
      <GeometricNetwork scrollProgress={scrollProgress} />
      <FloatingText scrollProgress={scrollProgress} />
      <EnergyOrbs scrollProgress={scrollProgress} />

      {/* Enhanced central focal element */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[0, 0, 0]} scale={1.5 + scrollProgress * 0.8}>
          <dodecahedronGeometry args={[2, 3]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive={new THREE.Color().setHSL(scrollProgress * 0.5, 0.8, 0.3)}
            emissiveIntensity={0.4 + scrollProgress * 0.6}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.95}
          />
        </mesh>
      </Float>

      {/* Camera controller */}
      <CameraController scrollProgress={scrollProgress} />
    </Canvas>
  );
};

export default Scene3D;
