import { Html } from '@react-three/drei';
export function ExplodedDetails(){return <group>
 <mesh position={[1.8,.1,.9]}><cylinderGeometry args={[.36,.36,.08,32]}/><meshBasicMaterial color="#d34b40" wireframe/></mesh>
 <mesh position={[2.25,.1,.9]}><cylinderGeometry args={[.18,.18,.1,20]}/><meshBasicMaterial color="#d34b40" wireframe/></mesh>
 <mesh position={[1.8,-.35,.9]}><boxGeometry args={[.28,.5,.18]}/><meshBasicMaterial color="#d34b40" wireframe/></mesh>
 <Html position={[2.6,.4,.9]}><div className="callout">01 / WHEEL + HUB<br/>02 / BRAKE ASSEMBLY</div></Html>
 </group>}
