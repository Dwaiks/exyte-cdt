'use client';
import {useState} from "react";

const workflows=[
  {type:"RFI",open:18,overdue:4,avg:"6.2 days"},
  {type:"Submittal",open:24,overdue:7,avg:"8.5 days"},
  {type:"Change Order",open:6,overdue:2,avg:"12.1 days"},
  {type:"Defect / Punch",open:112,overdue:19,avg:"4.4 days"},
  {type:"NCR",open:9,overdue:3,avg:"10.7 days"}
];

export default function ServicesDuringConstruction({risks}:any){
  const [selected,setSelected]=useState(workflows[0]);
  return (
    <section>
      <div className="hero">
        <span className="tag">SDC Micro-App</span>
        <h2>Services During Construction</h2>
        <p>Functional workflow cockpit for RFIs, submittals, change orders, defects, punch items, NCRs, and approval delays.</p>
      </div>

      <div className="grid kpis">
        {workflows.map(w=>(
          <div key={w.type} className="card kpi" onClick={()=>setSelected(w)}>
            <div className="klabel">{w.type}</div>
            <div className="value">{w.open}</div>
            <span className={`status ${w.overdue>5?"risk":"watch"}`}>{w.overdue} overdue</span>
          </div>
        ))}
      </div>

      <div className="grid two">
        <div className="panel">
          <h3>{selected.type} Drill-down</h3>
          <div className="detail">
            Open: {selected.open}<br/>
            Overdue: {selected.overdue}<br/>
            Average response time: {selected.avg}<br/>
            Recommended action: prioritize overdue items linked to delayed zones and GMP-critical systems.
          </div>
        </div>
        <div className="panel">
          <h3>Workflow Risk Linkage</h3>
          <table><thead><tr><th>ID</th><th>Zone</th><th>Risk</th></tr></thead>
          <tbody>{risks.slice(0,5).map((r:any)=><tr key={r.id}><td>{r.id}</td><td>{r.zone}</td><td>{r.title}</td></tr>)}</tbody></table>
        </div>
      </div>
    </section>
  )
}
