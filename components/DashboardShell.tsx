'use client';
import {useState} from "react";
import Sidebar from "./Sidebar"; 
import Topbar from "./Topbar"; 
import ExyAssistant from "./ExyAssistant";
import CommandCenter from "./microapps/CommandCenter"; 
import ConstructionProgress from "./microapps/ConstructionProgress";
import BimDataFoundation from "./microapps/BimDataFoundation";
import ServicesDuringConstruction from "./microapps/ServicesDuringConstruction";
import SiteSupervision from "./microapps/SiteSupervision"; 
import PlaceholderMicroApp from "./microapps/PlaceholderMicroApp";

const modules=[
{id:"command",label:"Command Center",icon:"🏠"},
{id:"progress",label:"Construction Progress (4D)",icon:"📈"},
{id:"bim",label:"BIM / Data Foundation",icon:"🧊"},
{id:"sdc",label:"Services During Construction",icon:"🧾"},
{id:"quality",label:"Quality & GMP Readiness",icon:"✅"},
{id:"lean",label:"Lean Construction",icon:"🏗️"},
{id:"site",label:"Site Supervision",icon:"📹"},
{id:"safety",label:"Safety",icon:"🛡️"},
{id:"resources",label:"Resources",icon:"👷"},
{id:"logistics",label:"Logistics & Impact",icon:"🚚"},
{id:"sustainability",label:"Sustainability",icon:"🌿"},
{id:"environment",label:"Weather & Environment",icon:"☁️"},
{id:"ai",label:"AI & Predictive Risk",icon:"🧠"},
{id:"supply",label:"Supply Chain Twin",icon:"🔗"},
{id:"handover",label:"Commissioning & Handover",icon:"🚀"}];

export default function DashboardShell({clientConfig,kpis,risks,schedule,progress,assets}:any){
  const [active,setActive]=useState("command"); 
  return (
    <div className="app" style={{"--brand":clientConfig.theme.primary,"--brand-2":clientConfig.theme.secondary} as any}>
      <Sidebar config={clientConfig} modules={modules} activeModule={active} onSelect={setActive}/>
      <main className="main">
        <Topbar config={clientConfig}/>
        <div className="content">
          {active==="command"&&<CommandCenter config={clientConfig} kpis={kpis} risks={risks} schedule={schedule} progress={progress} onNavigate={setActive}/>}
          {active==="progress"&&<ConstructionProgress config={clientConfig} progress={progress} risks={risks}/>}
          {active==="bim"&&<BimDataFoundation config={clientConfig} assets={assets}/>}
          {active==="sdc"&&<ServicesDuringConstruction risks={risks}/>}
          {active==="site"&&<SiteSupervision config={clientConfig}/>}
          {!["command","progress","bim","sdc","site"].includes(active)&&<PlaceholderMicroApp module={modules.find(m=>m.id===active)} />}
        </div>
      </main>
      <ExyAssistant config={clientConfig} kpis={kpis} risks={risks} schedule={schedule} progress={progress} assets={assets}/>
    </div>
  )
}
