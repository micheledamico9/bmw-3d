import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useCarStore } from '../store';

const WHEEL_POS:[[number,number,number],[number,number,number],[number,number,number],[number,number,number]]=[[-1.18,-.35,.82],[1.18,-.35,.82],[-1.18,-.35,-.82],[1.18,-.35,-.82]];
function Wheel({position}:{position:[number,number,number]}){
 const group=useRef<THREE.Group>(null);const size=useCarStore(s=>s.wheelSize);const style=useCarStore(s=>s.wheel);const caliper=useCarStore(s=>s.caliper);
 const spokes=style==='Mesh'?12:style==='Aero'?5:7;
 const tire=useMemo(()=>new THREE.MeshStandardMaterial({color:'#111214',roughness:.88}),[]);
 const metal=useMemo(()=>new THREE.MeshStandardMaterial({color:'#aeb5bd',metalness:.88,roughness:.24}),[]);
 return <group ref={group} position={position} rotation={[0,0,Math.PI/2]} scale={size/20.5}>
  <mesh material={tire}><cylinderGeometry args={[.43,.43,.25,48]}/></mesh>
  <mesh position={[0,0,.14]} material={metal}><cylinderGeometry args={[.34,.34,.025,48]}/></mesh>
  <mesh position={[0,0,.157]}><cylinderGeometry args={[.105,.105,.04,24]}/><meshStandardMaterial color="#15191e" metalness={.7}/></mesh>
  {Array.from({length:spokes},(_,i)=><mesh key={i} position={[Math.cos(i*Math.PI*2/spokes)*.2,Math.sin(i*Math.PI*2/spokes)*.2,.16]} rotation={[0,0,i*Math.PI*2/spokes]} material={metal}><boxGeometry args={[.055,.34,.025]}/></mesh>)}
  <mesh position={[0,0,-.02]}><boxGeometry args={[.04,.25,.05]}/><meshStandardMaterial color={caliper}/></mesh>
 </group>;
}
function ProceduralCar(){
 const paint=useCarStore(s=>s.paint),stripe=useCarStore(s=>s.stripe),kit=useCarStore(s=>s.bodyKit),height=useCarStore(s=>s.rideHeight);
 const bodyMat=useMemo(()=>new THREE.MeshPhysicalMaterial({color:paint,metalness:.72,roughness:.22,clearcoat:1,clearcoatRoughness:.12}),[paint]);
 const stripeMat=useMemo(()=>new THREE.MeshStandardMaterial({color:stripe,metalness:.25,roughness:.3}),[stripe]);
 return <group position={[0,height,0]}>
  {/* Main silhouette: intentionally modular placeholder, replace with production GLTF */}
  <mesh castShadow receiveShadow position={[0,.18,0]} material={bodyMat}><boxGeometry args={[2.15,.48,4.25,8,2,12]}/></mesh>
  <mesh castShadow position={[0,.49,-.15]} material={bodyMat}><boxGeometry args={[1.72,.52,2.1,6,3,8]}/></mesh>
  <mesh position={[0,.53,-.15]}><boxGeometry args={[1.55,.35,1.92]}/><meshPhysicalMaterial color="#18232d" metalness:.35 roughness:.13 transparent opacity={.9}/></mesh>
  {/* Hood stripe pair */}
  {[-.32,.32].map(x=><mesh key={x} position={[x,.43,1.36]} material={stripeMat}><boxGeometry args={[.13,.012,1.15]}/></mesh>)}
  {/* Front/rear light signatures */}
  <mesh position={[0,.27,2.14]}><boxGeometry args={[1.5,.055,.035]}/><meshStandardMaterial color="#dcecff" emissive="#91cfff" emissiveIntensity={2}/></mesh>
  <mesh position={[0,.27,-2.14]}><boxGeometry args={[1.55,.055,.035]}/><meshStandardMaterial color="#ff242e" emissive="#ff1424" emissiveIntensity={2}/></mesh>
  {kit&&<>
   <mesh position={[0,-.08,2.18]} castShadow><boxGeometry args={[2.28,.12,.32]}/><meshStandardMaterial color="#101317" metalness:.5 roughness:.3/></mesh>
   <mesh position={[0,-.05,-2.18]} castShadow><boxGeometry args={[2.2,.16,.3]}/><meshStandardMaterial color="#101317" metalness:.5/></mesh>
   {[-1,1].map(side=><mesh key={side} position={[side*1.1,-.13,0]} castShadow><boxGeometry args={[.16,.12,3.4]}/><meshStandardMaterial color="#171b20" metalness:.35/></mesh>)}
   <mesh position={[0,.79,-1.78]}><boxGeometry args={[1.35,.055,.12]}/><meshStandardMaterial color="#171b20" metalness:.7/></mesh>
  </>}
  {WHEEL_POS.map((p,i)=><Wheel key={i} position={[p[0],p[1]-.05,p[2]]}/>)}
 </group>;
}
function GLTFCar(){
 const gltf=useGLTF('/models/bmw_im3.glb');
 const height=useCarStore(s=>s.rideHeight);
 return <primitive object={gltf.scene} position={[0,height,0]} scale={1} />;
}
export function CarModel(){
 // Swap to GLTFCar once a licensed/local asset is present; fallback is always available.
 return <ProceduralCar/>;
}
