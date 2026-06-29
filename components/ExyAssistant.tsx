'use client';
import {useState} from "react";

export default function ExyAssistant({config,kpis,risks,schedule,progress,assets}:any){
  const [open,setOpen]=useState(false);
  const [input,setInput]=useState("");
  const [messages,setMessages]=useState([{role:"bot",text:`Hello, I am ${config.assistantName}. Ask me about risks, GMP readiness, progress, assets, metadata, or project status.`}]);

  function answer(qs:string){
    const q=qs.toLowerCase();
    if(q.includes("high risk")) return risks.filter((r:any)=>r.severity==="High").map((r:any)=>`${r.id}: ${r.title} (${r.zone})`).join(" | ");
    if(q.includes("risk")) return `There are ${risks.length} active risks: ${risks.filter((r:any)=>r.severity==="High").length} high, ${risks.filter((r:any)=>r.severity==="Medium").length} medium, and ${risks.filter((r:any)=>r.severity==="Low").length} low.`;
    if(q.includes("gmp")) return kpis.find((k:any)=>k.label==="GMP Readiness")?.detail + " GMP-critical assets include: " + assets.filter((a:any)=>a.gmpCritical).map((a:any)=>a.id).join(", ") + ".";
    if(q.includes("asset")||q.includes("metadata")) return `The BIM/Data Foundation contains ${assets.length} demo assets. Metadata gaps are highest for ${assets.sort((a:any,b:any)=>a.metadataCompleteness-b.metadataCompleteness)[0].id}.`;
    if(q.includes("delay")||q.includes("delayed")) return "Delayed zones: "+progress.filter((z:any)=>z.actual<z.planned).map((z:any)=>`${z.zone} (${z.actual}% actual vs ${z.planned}% planned)`).join(", ")+".";
    if(q.includes("progress")) return "Progress summary: Cleanroom and Utilities are behind plan. Warehouse is slightly ahead. Main drivers are equipment delivery and cleanroom envelope completion.";
    if(q.includes("camera")||q.includes("evercam")) return "Site Supervision uses Evercam as the live camera provider. Open the Site Supervision micro-app to view the camera wall.";
    if(q.includes("summary")||q.includes("status")) return "Project status: overall health is 82/100. Schedule, GMP readiness, and metadata completeness require attention.";
    return "I can answer demo questions about KPIs, risks, GMP readiness, progress, assets, metadata, delayed zones, and project summary.";
  }

  function send(text?:string){
    const v=(text||input).trim(); if(!v)return;
    setMessages((p:any)=>[...p,{role:"user",text:v},{role:"bot",text:answer(v)}]);
    setInput("");
  }

  return <>
    <button className="chatbot-fab" onClick={()=>setOpen(!open)}>💬</button>
    <div className={`chatbot ${open?"open":""}`}>
      <div className="chat-head"><div><strong>{config.assistantName}</strong><br/><span>Construction Digital Twin Assistant</span></div><button onClick={()=>setOpen(false)}>×</button></div>
      <div className="messages">{messages.map((m:any,i:number)=><div key={i} className={`msg ${m.role}`}>{m.text}</div>)}</div>
      <div className="chips">{["Project summary","Show high risks","GMP readiness","Asset metadata","Delayed zones"].map(c=><span key={c} className="chip" onClick={()=>send(c)}>{c}</span>)}</div>
      <div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={`Ask ${config.assistantName}...`}/><button onClick={()=>send()}>Send</button></div>
    </div>
  </>
}
