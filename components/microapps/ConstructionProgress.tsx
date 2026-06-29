'use client';
import {useState} from "react";

export default function ConstructionProgress({config, progress, risks}:any){
  const [selected,setSelected]=useState(progress[0]);
  const delayed=progress.filter((p:any)=>p.actual<p.planned);
  const relatedRisks=risks.filter((r:any)=>r.zone===selected.zone);

  return (
    <section>
      <div className="hero">
        <span className="tag">Construction Progress Micro-App</span>
        <h2>Construction Progress (4D)</h2>
        <p>Interactive progress view connecting planned progress, actual progress, delay drivers, and risk context by construction zone.</p>
      </div>

      <div className="grid two">
        <div className="panel">
          <h3>Progress by Zone</h3>
          {progress.map((item:any)=>(
            <button key={item.zone} className={`zone-card ${selected.zone===item.zone?"selected":""}`} onClick={()=>setSelected(item)}>
              <div>
                <strong>{item.zone}</strong>
                <span>{item.driver}</span>
              </div>
              <b>{item.actual}%</b>
            </button>
          ))}
        </div>

        <div className="panel">
          <h3>{selected.zone} Drill-down</h3>
          <div className="detail">
            Planned: {selected.planned}% · Actual: {selected.actual}% · Status: {selected.status}<br/>
            Main driver: {selected.driver}
          </div>

          <h3 style={{marginTop:18}}>Planned vs Actual</h3>
          <div className="progress-compare">
            <span>Planned</span><div className="track"><div className="bar" style={{width:`${selected.planned}%`}}/></div><b>{selected.planned}%</b>
            <span>Actual</span><div className="track"><div className={`bar ${selected.actual<selected.planned?"delay":""}`} style={{width:`${selected.actual}%`}}/></div><b>{selected.actual}%</b>
          </div>

          <h3 style={{marginTop:18}}>Related Risks</h3>
          {relatedRisks.length ? relatedRisks.map((r:any)=>(
            <div className="risk-chip" key={r.id}>{r.severity}: {r.title}</div>
          )) : <p className="muted">No related risks for this zone.</p>}
        </div>
      </div>

      <div className="grid three" style={{marginTop:16}}>
        <div className="panel"><h3>AI Progress Reporting</h3><div className="viewer"><span>Buildots / Doxel placeholder<br/>AI measured progress</span></div></div>
        <div className="panel"><h3>Reality Capture</h3><div className="viewer"><span>Cupix / OpenSpace placeholder<br/>360° progress context</span></div></div>
        <div className="panel"><h3>Power BI</h3><div className="viewer"><span>Embedded Power BI report placeholder<br/>Schedule and progress analytics</span></div></div>
      </div>
    </section>
  )
}
