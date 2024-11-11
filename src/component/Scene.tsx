// Scene.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const Cube: React.FC = () => {
  const cubeRef = useRef<any>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Actualizar la posición del ratón
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Actualizar la posición del cubo en cada frame
  useFrame(() => {
    if (cubeRef.current) {
      setTimeout(() => {
        cubeRef.current.position.x = mousePosition.x * 5; 
        cubeRef.current.position.y = mousePosition.y * 5; 
      }, 50);
    }
  });

  return (
    <mesh ref={cubeRef} position={new Vector3()}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const Scene: React.FC = () => {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Cube />
        </Canvas>
      </div>
    );
  };
export default Scene;
