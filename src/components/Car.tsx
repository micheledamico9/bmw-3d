import{useStore}from'../store';
function Wheel({x,z}:{x:number;z:number}){return <group position={[x,.42,z]} rotation={[0,0,Math.PI/2]}><mesh><cylinderGeometry args={[.38,.38,.23,40]}/><meshStandardMaterial color="#101216" roughness={.8}/></mesh><mesh position={[0,0,.125]}><cylinderGeometry args={[.27,.27,.02,40]}/><meshStandardMaterial color="#737e8b" metalness={.85} roughness={.22}/></mesh><mesh position={[0,0,.14]}><cylinderGeometry args={[.13,.13,.025,12]}/><meshStandardMaterial color="#c4ccd5" metalness={.9}/></mesh>{Array.from({length:10},(_,i)=><mesh key={i} position={[Math.cos(i*Math.PI/5)*.19,Math.sin(i*Math.PI/5)*.19,.15]}><boxGeometry args={[.025,.23,.018]}/><meshStandardMaterial color="#9da8b4" metalness={.8}/></mesh>)}</group>}
export default function Car(){const paint=useStore(s=>s.paint);return <group>
<mesh position={[0,.7,0]} castShadow receiveShadow><boxGeometry args={[1.92,.46,4.45]}/><meshPhysicalMaterial color={paint} metalness={.72} roughness={.2} clearcoat={1}/></mesh>
<mesh position={[0,1.04,-.38]} castShadow><boxGeometry args={[1.62,.38,2.05]}/><meshPhysicalMaterial color={paint} metalness={.72} roughness={.2} clearcoat={1}/></mesh>
<mesh position={[0,1.34,.35]} rotation={[-.12,0,0]}><boxGeometry args={[1.43,.48,1.48]}/><meshPhysicalMaterial color="#101b28" metalness={.35} roughness={.12} transparent opacity={.94}/></mesh>
<mesh position={[0,1.59,-.22]}><boxGeometry args={[1.38,.1,.78]}/><meshPhysicalMaterial color={paint} metalness={.7} roughness={.2}/></mesh>
<mesh position={[0,1.32,1.12]} rotation={[-.5,0,0]}><planeGeometry args={[1.3,.5]}/><meshPhysicalMaterial color="#0b1722" metalness={.3} roughness={.08}/></mesh>
<mesh position={[0,1.3,-1.35]} rotation={[.45,Math.PI,0]}><planeGeometry args={[1.25,.42]}/><meshPhysicalMaterial color="#0b1722" metalness={.3} roughness={.08}/></mesh>
<mesh position={[0,.72,2.25]}><boxGeometry args={[.64,.24,.035]}/><meshStandardMaterial color="#080a0d" metalness={.7}/></mesh>
{Array.from({length:8},(_,i)=><mesh key={i} position={[-.27+i*.077,.72,2.28]}><boxGeometry args={[.018,.2,.012]}/><meshStandardMaterial color="#65717d" metalness={.8}/></mesh>)}
{[-1,1].map(x=><group key={x}><mesh position={[x*.65,.88,2.27]}><boxGeometry args={[.4,.045,.035]}/><meshBasicMaterial color="#d8f6ff"/></mesh><mesh position={[x*.65,.82,2.27]}><boxGeometry args={[.28,.018,.035]}/><meshBasicMaterial color="#68baff"/></mesh></group>)}
<mesh position={[0,.87,-2.24]}><boxGeometry args={[1.42,.05,.03]}/><meshBasicMaterial color="#ff304e"/></mesh>
{[-.78,.78].flatMap(x=>[-1.45,1.45].map(z=><Wheel key={x+z} x={x} z={z}/>))}
</group>}
