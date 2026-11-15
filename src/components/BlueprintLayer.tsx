import { useMemo } from 'react';import * as THREE from 'three';import { useThree } from '@react-three/fiber';
function paperTexture(){
 return useMemo(()=>{const c=document.createElement('canvas');c.width=1024;c.height=1024;const ctx=c.getContext('2d')!;ctx.fillStyle='#e8f1f5';ctx.fillRect(0,0,1024,1024);
 ctx.strokeStyle='rgba(65,119,150,.09)';ctx.lineWidth=1;for(let i=0;i<=1024;i+=24){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,1024);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i);ctx.lineTo(1024,i);ctx.stroke();}
 ctx.strokeStyle='rgba(65,119,150,.16)';for(let i=0;i<=1024;i+=120){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,1024);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i);ctx.lineTo(1024,i);ctx.stroke();}
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;},[]);
}
export function BlueprintLayer(){
 const texture=paperTexture();const {scene}=useThree();
 const lines=useMemo(()=>{const group=new THREE.Group();scene.traverse(o=>{if((o as THREE.Mesh).isMesh&&o.name!=='blueprint'){const edges=new THREE.EdgesGeometry((o as THREE.Mesh).geometry,18);const line=new THREE.LineSegments(edges,new THREE.LineBasicMaterial({color:'#286b8d',transparent:true,opacity:.7}));line.position.copy(o.position);line.rotation.copy(o.rotation);line.scale.copy(o.scale);group.add(line);}});return group;},[scene]);
 return <group><mesh position={[0,-1.04,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[200,200]}/><meshBasicMaterial map={texture} /></mesh><primitive object={lines}/></group>;
}
