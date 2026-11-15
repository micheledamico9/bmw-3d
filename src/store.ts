import { create } from 'zustand';
export type WheelStyle='Aero'|'Split'|'Mesh';
type State={
 paint:string; stripe:string; caliper:string; wheel:WheelStyle; wheelSize:number;
 rideHeight:number; bodyKit:boolean; blueprint:boolean; ortho:boolean; exploded:boolean;
 set<K extends keyof State>(key:K,value:State[K]):void; reset():void;
};
const initial={paint:'#aeb9c5',stripe:'#e63732',caliper:'#e63732',wheel:'Split' as WheelStyle,wheelSize:21,rideHeight:0.18,bodyKit:true,blueprint:false,ortho:false,exploded:false};
export const useCarStore=create<State>((set)=>({...initial,set:(key,value)=>set({[key]:value} as Partial<State>),reset:()=>set(initial)}));
