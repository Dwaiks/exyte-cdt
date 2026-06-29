import DashboardShell from "@/components/DashboardShell";
import config from "@/client-configs/johnson-and-johnson.json";
import kpis from "@/data/kpis.json";
import risks from "@/data/risks.json";
import schedule from "@/data/schedule.json";
import progress from "@/data/progress.json";
import assets from "@/data/assets.json";

export default function Home(){
  return <DashboardShell clientConfig={config} kpis={kpis} risks={risks} schedule={schedule} progress={progress} assets={assets}/>
}
