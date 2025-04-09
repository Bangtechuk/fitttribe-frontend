import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

// 3D Model component
const FitnessModel = ({ position, scale, rotation }) => {
  const modelRef = useRef();
  
  // Animation for the model
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={modelRef} position={position} scale={scale} rotation={rotation}>
      {/* This would be replaced with actual 3D model */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#8d7055" roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  );
};

// Interactive elements
const InteractiveDumbbell = ({ position, onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = hovered ? Math.sin(Date.now() * 0.001) * 0.2 : 0;
      ref.current.position.y = position[1] + (hovered ? Math.sin(Date.now() * 0.002) * 0.1 : 0);
    }
  });

  return (
    <group 
      ref={ref}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
        <meshStandardMaterial color={hovered ? "#d85a46" : "#a68c75"} />
      </mesh>
      <mesh position={[-0.5, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={hovered ? "#d85a46" : "#a68c75"} />
      </mesh>
      <mesh position={[0.5, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={hovered ? "#d85a46" : "#a68c75"} />
      </mesh>
    </group>
  );
};

// Main 3D Scene component
const FitnessScene = () => {
  const [message, setMessage] = React.useState('');

  const handleClick = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-medium">
      {message && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-primary-800 text-white px-4 py-2 rounded-lg">
          {message}
        </div>
      )}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FitnessModel position={[0, 0, 0]} scale={[1, 1, 1]} rotation={[0, 0, 0]} />
        <InteractiveDumbbell position={[-2, 0, 0]} onClick={() => handleClick('Build strength with personal trainers!')} />
        <InteractiveDumbbell position={[2, 0, 0]} onClick={() => handleClick('Book your fitness session today!')} />
        <Environment preset="sunset" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default FitnessScene;
