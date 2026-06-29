'use client';
import {useState} from "react"; 
import KpiCard from "../KpiCard";

export default function CommandCenter({config,kpis,risks,schedule,progress,onNavigate}:any){
  const [detail,setDetail]=useState("Select a KPI to see the project impact and recommended action."); 
  const [severity,setSeverity]=useState("all"); 
  const [zone,setZone]=useState("all"); 
  const [search,setSearch]=useState(""); 

  const zones=Array.from(new Set(risks.map((r:any)=>r.zone))); 
  const highRisks=risks.filter((r:any)=>r.severity==="High").length;
  const delayed=progress.filter((p:any)=>p.actual<p.planned).length;
  const gmp = kpis.find((k:any)=>k.label==="GMP Readiness");
  const scheduleKpi = kpis.find((k:any)=>k.label==="Schedule Progress");

  const filtered=risks.filter((r:any)=>
    (severity==="all"||r.severity===severity) &&
    (zone==="all"||r.zone===zone) &&
    (!search||`${r.title} ${r.zone} ${r.owner} ${r.id}`.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section>
      <div className="ops-hero">
        <div>
          <span className="tag">Command Center</span>
          <h2>{config.projectTitle}</h2>
          <p>Project intelligence view for health, progress, risk, GMP readiness and live decision support.</p>
        </div>
        <div className="ops-health">
          <span>Project Health</span>
          <strong>82</strong>
          <small>Watch</small>
        </div>
      </div>

      <div className="ops-grid">
        <div className="ops-main panel">
          <div className="panel-title-row">
            <h3>Executive KPIs</h3>
            <span className="badge danger">{highRisks} high risks</span>
          </div>
          <div className="grid kpis compact-kpis">
            {kpis.map((k:any)=><KpiCard key={k.label} kpi={k} onClick={()=>setDetail(`${k.label}: ${k.detail}`)}/>)}
          </div>
        </div>

        <div className="panel">
          <h3>AI Insight</h3>
          <div className="insight-card">
            <b>Focus required</b>
            <p>{delayed} delayed zones are impacting schedule confidence. GMP readiness is currently {gmp?.value}. Prioritize Utilities, Cleanroom closeout and CQV packages.</p>
          </div>
          <button className="action-panel mini-action" onClick={()=>onNavigate("progress")}>
            <strong>Open Progress</strong>
            <span>{scheduleKpi?.value} complete</span>
          </button>
          <button className="action-panel mini-action" onClick={()=>onNavigate("site")}>
            <strong>Open Cameras</strong>
            <span>Evercam live view</span>
          </button>
        </div>
      </div>

      <div className="grid two">
        <div className="panel">
          <div className="panel-title-row"><h3>Risk & Issue Register</h3><span className="badge danger">{highRisks} high</span></div>
          <div className="toolbar">
            <select value={severity} onChange={e=>setSeverity(e.target.value)}><option value="all">All Severities</option><option>High</option><option>Medium</option><option>Low</option></select>
            <select value={zone} onChange={e=>setZone(e.target.value)}><option value="all">All Zones</option>{zones.map((z:any)=><option key={z}>{z}</option>)}</select>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search issues..."/>
          </div>
          <table><thead><tr><th>ID</th><th>Severity</th><th>Zone</th><th>Title</th><th>Owner</th><th>Due</th></tr></thead>
          <tbody>{filtered.map((r:any)=><tr key={r.id}><td>{r.id}</td><td className={r.severity.toLowerCase()}>{r.severity}</td><td>{r.zone}</td><td>{r.title}</td><td>{r.owner}</td><td>{r.due}</td></tr>)}</tbody></table>
        </div>

        <div className="panel">
          <h3>KPI Drill-down</h3>
          <div className="detail">{detail}</div>
          <h3 style={{marginTop:18}}>Schedule vs Actual</h3>
          {schedule.map((i:any)=><div className="zone-row" key={i.zone}><strong>{i.zone}</strong><div className="track"><div className={`bar ${i.actual<i.planned?"delay":""}`} style={{width:`${i.actual}%`}}/></div><span>{i.actual}%</span></div>)}
          <div className="detail focus-note" style={{marginTop:14}}>Critical focus: {highRisks} high risks and {delayed} delayed zones.</div>
        </div>
      </div>
    </section>
  )
}
