import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Leva } from "leva";
import { DEFAULT_CAMERA_POSITION } from "./components/CameraManager";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import {useConfiguratorStore} from "./store.js";
import {NameInput} from "./components/NameInput.jsx";

function App() {
    const initialDataLoaded = useConfiguratorStore(state => state.initialDataLoaded);
    const character = useConfiguratorStore(state => state.character);
    if (!initialDataLoaded) {
        return <h1>Loading</h1>
    }

    if (!character.name) {
        return <NameInput />
    }

  return (
    <>
      <Leva hidden />
      <UI />
      <Canvas
        camera={{
          position: DEFAULT_CAMERA_POSITION,
          fov: 45,
        }}
        gl={{
          preserveDrawingBuffer: true,
        }}
        shadows
      >
        <color attach="background" args={["#130f30"]} />
        <fog attach="fog" args={["#130f30", 10, 40]} />
        <group position-y={-1}>
          <Experience />
        </group>
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1.2} intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default App;
