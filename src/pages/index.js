
import React, {useRef} from 'react';
import { Suspense, useState } from 'react'
import { Canvas, useFrame} from '@react-three/fiber'
import { Bounds, useBounds, OrbitControls, ContactShadows, useGLTF, useCursor, Html, useAnimations } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { useLoader } from '@react-three/fiber'
import { proxy, useSnapshot } from 'valtio'
import ProjectContent from './project_content';
import TitleContent from './title_content';

const visibility=1
const visibility_research=1

const state = proxy({ current: null, mode: 0 })
const state_click = proxy({ current: null, mode: 0 })


const Home = () => {
  

  return (
    <Canvas camera={{ position: [20, -20, 580], fov: 20 }} dpr={[1, 2]}>
      
      <spotLight position={[-100, -100, -100]} intensity={0.2} angle={0.3} penumbra={1} />
      <hemisphereLight color="white" groundColor="#000000" position={[-7, 25, 13]} intensity={1} />
      {/* <fog attach="fog" args={['white', 20, 750]} /> */}
      <Suspense fallback={null}>


        <Bounds fit clip observe margin={0.7}>
          <SelectToZoom>
            <Model name="Curly" position={[1, -11, -20]} rotation={[2, 0, -0]} visibility={visibility}/>
            <Model name="3" position={[20, 0, -17]} rotation={[1, 1, -2]} visibility={visibility}/>
            <Model name="Headphones" position={[20, 2, 4]} rotation={[1, 0, -1]} visibility={visibility}/>
            <Model name="Headphones001" position={[20, 2, 4]} rotation={[1, 0, -1]} visibility={visibility}/>
            <Model name="Notebook" position={[-21, -15, -13]} rotation={[2, 0, 1]} visibility={visibility}/>
            <Model name="Rocket003" position={[18, 15, -25]} rotation={[1, 1, 0]} visibility={visibility}/>
            <Model name="Roundcube001" position={[-25, -4, 5]} rotation={[1, 0, 0]} scale={0.5} visibility={visibility}/>
            <Model name="Table" position={[1, -4, -28]} rotation={[1, 0, -1]} scale={0.5} visibility={visibility}/>
            <Model name="VR_Headset" position={[7, -15, 28]} rotation={[1, 0, -1]} scale={5} visibility={visibility}/>
            <Model name="Zeppelin" position={[-20, 10, 10]} rotation={[3, -1, 3]} scale={0.005} visibility={visibility_research}/>
          </SelectToZoom>
        </Bounds>
        <ContactShadows rotation-x={Math.PI / 2} position={[0, -35, 0]} opacity={0.2} width={200} height={200} blur={1} far={50} />
      </Suspense>
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
    </Canvas>
  );
};


function Model({ name, ...props }) {
  // if (visibility==false) {
  // return ""}
  const snap = useSnapshot(state)
  const snap_click = useSnapshot(state_click)
  const { nodes } = useGLTF('/compressed4.glb')
  const gltf_model = useGLTF('/compressed3color.glb')
 
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  console.log(nodes)
  const ref = useRef()
  console.log(ref)
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.001))




  useCursor(hovered)
  return (
  
  // <primitive object={gltf_model.scene} visible={true}/>,

  props.visibility ? <mesh ref={ref} visible={snap_click.current != name} geometry={nodes[name].geometry} material={nodes[name].material} material-emissive="gray" material-roughness={1} {...props} dispose={null}
          onPointerOver={(e) => (e.stopPropagation(), setHovered(true), (state.current = name))}
          onPointerOut={(e) => setHovered(false)} 
          onClick={(e) => (setClicked(true), (state_click.current = name))}
          // onPointerMissed={(e) => (state.current = null)} 
          material-color={snap.current === name ? '#636363' : 'white'}
          >


      <Html distanceFactor={100}>
          <ProjectContent switch={snap_click.current == name} switch_verify = {snap.current == name}/>
          <TitleContent switch={snap.current == name}/>
      </Html>

          </mesh> :null


  
  );
};



function SelectToZoom({ children }) {
  const api = useBounds()
  return (
    <group onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())} onPointerMissed={(e) => (e.button === 0 && api.refresh().fit())}>
      {children}
    </group>
  )
}
  
export default Home;



// https://codesandbox.io/s/r3f-suspense-zu2wo

// https://stackoverflow.com/questions/61030786/animated-textures-with-react-three-fibre