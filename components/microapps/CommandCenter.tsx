'use client';
import {useState} from "react"; 
import KpiCard from "../KpiCard";

export default function CommandCenter({config,kpis,risks,schedule,progress,onNavigate}:any){
  const [detail,setDetail]=useState("Click any KPI card to see the explanation and recommended action."); 
  const [severity,setSeverity]=useState("all"); 
  const [zone,setZone]=useState("all"); 
  const [search,setSearch]=useState(""); 
  const zones=Array.from(new Set(risks.map((r:any)=>r.zone))); 
  const filtered=risks.filter((r:any)=>(severity==="all"||r.severity===severity)&&(zone==="all"||r.zone===zone)&&(!search||`${r.title} ${r.zone} ${r.owner} ${r.id}`.toLowerCase().includes(search.toLowerCase())));
  const highRisks=risks.filter((r:any)=>r.severity==="High").length;
  const delayed=progress.filter((p:any)=>p.actual<p.planned).length;

  return (
    <section>
      <div className="hero">
        <span className="tag">Functional Digital Twin Demo</span>
        <h2>{config.projectTitle}</h2>
        <p>Executive command center connecting KPIs, progress, risks, GMP readiness, cameras, and Exy assistant.</p>
      </div>

      <div className="grid three" style={{marginBottom:16}}>
        <div className="panel hero-score"><h3>Project Health</h3><div className="score">82</div><p className="muted">Watch status due to schedule and GMP readiness.</p></div>
        <button className="action-panel" onClick={()=>onNavigate("progress")}><strong>Open Progress Micro-App</strong><span>{delayed} delayed zones detected</span></button>
        <button className="action-panel" onClick={()=>onNavigate("site")}><strong>Open Site Supervision</strong><span>Evercam live camera wall</span></button>
      </div>

      <div className="grid kpis">
        {kpis.map((k:any)=><KpiCard key={k.label} kpi={k} onClick={()=>setDetail(`${k.label}: ${k.detail}`)}/>)}
      </div>

      <div className="grid two">
        <div className="panel">
          <h3>Risk & Issue Register</h3>
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
          <div className="detail" style={{marginTop:14}}>Critical focus: {highRisks} high risks and {delayed} delayed zones.</div>
        </div>
      </div>
    </section>
  )
}
