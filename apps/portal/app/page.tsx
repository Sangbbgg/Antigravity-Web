import {
  Zap,
  Shield,
  Cpu,
  Globe,
  ArrowUpRight,
  Activity,
  Box
} from "lucide-react";

const stats = [
  { label: "Active Sub-Apps", value: "12", icon: Zap, color: "text-cyber-cyan" },
  { label: "System Health", value: "99.9%", icon: Shield, color: "text-green-400" },
  { label: "CPU Usage", value: "14%", icon: Cpu, color: "text-neon-purple" },
  { label: "Network Latency", value: "12ms", icon: Globe, color: "text-blue-400" },
];

const subApps = [
  { name: "Sales Dashboard", status: "Running", uptime: "14d 2h", route: "/sales" },
  { name: "Inventory Ops", status: "Active", uptime: "2d 5h", route: "/inventory" },
  { name: "User Registry", status: "Standby", uptime: "6h 12m", route: "/users" },
  { name: "Asset Manager", status: "Running", uptime: "8d 14h", route: "/assets" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <section className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Mothership <span className="neon-text-cyan underline decoration-cyber-cyan/30 underline-offset-8">Command Center</span>
          </h1>
          <p className="text-muted-text max-w-2xl">
            Integrated portal for monitoring and managing all sub-applications within the Antigravity ecosystem.
            All modules are currently synchronized with the master node.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-cyber-cyan bg-cyber-cyan/10 px-3 py-1.5 rounded-full neon-border-cyan">
          <Activity className="w-3 h-3 animate-pulse" />
          <span>LIVE TELEMETRY</span>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-stats gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass p-6 rounded-3xl group hover:neon-border-cyan transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 border border-glass-border group-hover:bg-cyber-cyan/10 transition-colors`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-text translate-y-1 -translate-x-1" />
            </div>
            <p className="text-muted-text text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed / Chart Placeholder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-[2rem] h-[400px] flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 via-transparent to-neon-purple/5 opacity-50"></div>
            <div className="relative flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-glass-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-700">
                <Box className="w-10 h-10 text-muted-text/50" />
              </div>
              <h4 className="text-lg font-bold mb-2 uppercase tracking-widest text-muted-text/70">Telemetry Feed Unavailable</h4>
              <p className="text-sm text-muted-text text-center max-w-sm">
                Connect external data sources or link sub-app metrics to activate real-time dashboard visualization.
              </p>
            </div>
          </div>
        </div>

        {/* Sub-Apps Status List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight">Active Nodes</h3>
            <button className="text-xs font-bold text-cyber-cyan hover:underline">VIEW ALL</button>
          </div>
          <div className="space-y-4">
            {subApps.map((app, idx) => (
              <div key={idx} className="glass p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-background border border-glass-border flex items-center justify-center group-hover:neon-border-cyan transition-all">
                    <span className="text-[10px] font-bold text-muted-text">{app.name.substring(0, 2)}</span>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold leading-none mb-1">{app.name}</h5>
                    <p className="text-[10px] text-muted-text uppercase tracking-tighter">Uptime: {app.uptime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${app.status === "Running" ? "border-green-500/50 text-green-400 bg-green-500/5" : "border-muted/50 text-muted bg-white/5"
                    }`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
