export default function Sidebar({config,modules,activeModule,onSelect}:any){
  return (
    <aside className="sidebar">
      <div className="platform">{config.platformName} {config.version}</div>
      <div className="logo">{config.clientShortName}</div>
      <div className="brand">
        <h1>Construction Digital Twin</h1>
        <p>{config.projectSubtitle}</p>
      </div>

      <div className="sidebar-section-title">Command Center</div>

      <div className="label">Micro-Applications</div>
      {modules.map((m:any)=>(
        <button key={m.id} className={`nav-item ${activeModule===m.id?"active":""}`} onClick={()=>onSelect(m.id)}>
          <span>{m.icon}</span>
          <span>{m.label}</span>
        </button>
      ))}
    </aside>
  )
}
