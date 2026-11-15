import { Html } from '@react-three/drei';
export function OrthographicViews(){return <group>
 {[[0,2.8,0,'FRONT'],[0,0,-3.1,'REAR'],[3.5,0,0,'SIDE'],[0,4,0,'TOP']].map(([x,y,z,label],i)=><Html key={i} position={[Number(x),Number(y),Number(z)]} center distanceFactor={8}><div className="ortho-tag">{String(label)} / ORTHO</div></Html>)}
</group>}
