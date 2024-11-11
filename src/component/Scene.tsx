import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Mesh } from 'three';
import { EffectComposer, N8AO, SMAA, Bloom } from "@react-three/postprocessing"
import { Physics, useSphere } from '@react-three/cannon';


function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [ref, api] = useSphere<Mesh>(() => ({ type: 'Kinematic', args: [3], position: [0, 0, 0] }));
  useFrame((state) =>
    api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0)
  );
  return (
    <mesh ref={ref} scale={0.2}>
      <sphereGeometry />
      <meshBasicMaterial color={[4, 4, 4]} toneMapped={false} />
      <pointLight intensity={8} distance={10} />
    </mesh>
  );
}

const Scene: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={10} />
        <Physics>
          <Pointer />
        </Physics>
        <EffectComposer multisampling={0}>
          <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={6} denoiseSamples={4} />
          <Bloom mipmapBlur levels={7} intensity={1} />
          <SMAA />
        </EffectComposer>
        <color attach="background" args={['black']} />
      </Canvas>
    </div>
  );
};

export default Scene;
