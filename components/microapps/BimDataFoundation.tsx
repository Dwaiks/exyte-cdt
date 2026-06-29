'use client';
import {useState} from "react";

export default function BimDataFoundation({config, assets}:any){
  const [selected,setSelected]=useState(assets[0]);
  const [filter,setFilter]=useState("all");
  const systems=Array.from(new Set(assets.map((a:any)=>a.system)));
  const filtered=assets.filter((a:any)=>filter==="all"||a.system===filter);

  return (
    <section>
      <div className="hero">
        <span className="tag">BIM/Data Foundation Micro-App</span>
        <h2>BIM / Data Foundation</h2>
        <p>Functional model-data demo showing asset metadata, system context, GMP criticality, and future Autodesk Viewer integration.</p>
      </div>

      <div className="grid two">
        <div className="panel">
          <h3>Federated Model Viewer Demo</h3>
          <div className="model-viewer">
            <div className="model-grid">
              {filtered.map((asset:any)=>(
                <button key={asset.id} className={`model-node ${selected.id===asset.id?"selected":""} ${asset.status==="Delayed"||asset.status==="Open Issue"?"risk-node":""}`} onClick={()=>setSelected(asset)}>
                  <span>{asset.system}</span>
                  <strong>{asset.id}</strong>
                </button>
              ))}
            </div>
          </div>
          <p className="muted">This is a functional mock viewer. Autodesk Viewer / IFC.js can replace this panel later.</p>
        </div>

        <div className="panel">
          <h3>Asset Properties</h3>
          <div className="detail">
            <b>{selected.name}</b><br/>
            ID: {selected.id}<br/>
            System: {selected.system}<br/>
            Zone: {selected.zone}<br/>
            Status: {selected.status}<br/>
            GMP Critical: {selected.gmpCritical ? "Yes" : "No"}<br/>
            Metadata Completeness: {selected.metadataCompleteness}%
          </div>

          <h3 style={{marginTop:18}}>Filter by System</h3>
          <select value={filter} onChange={e=>setFilter(e.target.value)}>
            <option value="all">All Systems</option>
            {systems.map((s:any)=><option key={s}>{s}</option>)}
          </select>

          <h3 style={{marginTop:18}}>Metadata Quality</h3>
          <div className="track"><div className={`bar ${selected.metadataCompleteness<70?"delay":""}`} style={{width:`${selected.metadataCompleteness}%`}} /></div>
        </div>
      </div>

      <div className="grid three" style={{marginTop:16}}>
        <div className="panel"><h3>Asset Metadata</h3><div className="viewer"><span>Autodesk Forma / Datum / Tandem integration path</span></div></div>
        <div className="panel"><h3>Document Linkage</h3><div className="viewer"><span>Datasheets, submittals, O&M, validation documents</span></div></div>
        <div className="panel"><h3>Exy Context</h3><div className="viewer"><span>Ask Exy about assets, systems, metadata gaps, and GMP critical items</span></div></div>
      </div>
    </section>
  )
}
