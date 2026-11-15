import type { ReactNode } from 'react';\nimport { useCarStore } from '../store';
const colors=['#aeb9c5','#101216','#f1f0e8','#c52b31','#426b91','#6f777e'];
function Section({title,children}:{title:string;children:ReactNode}){return <section className="control-section"><h3>{title}</h3>{children}</section>}
export function UIControls(){
 const s=useCarStore();
 const set=s.set;
 return <div className="controls">
  <div className="panel-heading"><div><small>CONFIGURATOR</small><h2>Build your<br/><em>IM3.</em></h2></div><span className="index">01—04</span></div>
  <div className="mode-switch"><button className={!s.blueprint?'active':''} onClick={()=>set('blueprint',false)}>◉ Render</button><button className={s.blueprint?'active':''} onClick={()=>set('blueprint',true)}>⌗ Blueprint</button></div>
  <Section title="01 / PAINT"><div className="swatches">{colors.map(c=><button key={c} aria-label={c} className={s.paint===c?'selected':''} style={{background:c}} onClick={()=>set('paint',c)}/>)}</div><label className="range-label">Custom finish <input type="color" value={s.paint} onChange={e=>set('paint',e.target.value)}/></label></Section>
  <Section title="02 / RACE LIVERY"><label className="range-label">Stripe pigment<input type="color" value={s.stripe} onChange={e=>set('stripe',e.target.value)}/></label><label className="range-label">Brake caliper<input type="color" value={s.caliper} onChange={e=>set('caliper',e.target.value)}/></label></Section>
  <Section title="03 / CHASSIS"><label className="range-label">Wheel design<select value={s.wheel} onChange={e=>set('wheel',e.target.value as any)}><option>Aero</option><option>Split</option><option>Mesh</option></select></label><label className="range-label">Rim diameter <b>{s.wheelSize}″</b></label><input className="slider" type="range" min="19" max="23" value={s.wheelSize} onChange={e=>set('wheelSize',+e.target.value)}/><label className="range-label">Ride height <b>{Math.round(s.rideHeight*100)} mm</b></label><input className="slider" type="range" min="0" max=".35" step=".01" value={s.rideHeight} onChange={e=>set('rideHeight',+e.target.value)}/></Section>
  <Section title="04 / COMPONENTS"><div className="toggles"><label>Wide body / aero<input type="checkbox" checked={s.bodyKit} onChange={e=>set('bodyKit',e.target.checked)}/></label><label>Orthographic tags<input type="checkbox" checked={s.ortho} onChange={e=>set('ortho',e.target.checked)}/></label><label>Exploded detail<input type="checkbox" checked={s.exploded} onChange={e=>set('exploded',e.target.checked)}/></label></div></Section>
  <button className="reset" onClick={()=>s.reset()}>↺ RESET CONFIGURATION</button>
  <div className="spec"><span>POWERTRAIN</span><b>DUAL MOTOR · AWD</b><span>DESIGN TARGET</span><b>800+ HP / 2027</b></div>
 </div>;
}
