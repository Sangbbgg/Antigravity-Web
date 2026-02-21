"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Box,
    Settings,
    ChevronRight,
    Terminal,
    Activity,
    Layers
} from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Sub Apps", href: "/sub-apps", icon: Layers },
    { name: "System Status", href: "/status", icon: Activity },
    { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-glass-border flex flex-col z-50 backdrop-blur-xl">
            <div className="p-6 flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-cyber-cyan/20 border border-cyber-cyan/50 flex items-center justify-center neon-border-cyan">
                    <Box className="w-6 h-6 text-cyber-cyan" />
                </div>
                <span className="text-xl font-bold tracking-tighter neon-text-cyan">
                    ANTIGRAVITY
                </span>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <div className="text-[10px] font-bold text-muted-text uppercase tracking-widest mb-4 px-2">
                    Administration
                </div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${isActive
                                    ? "bg-cyber-cyan/10 text-cyber-cyan"
                                    : "text-muted-text hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-cyber-cyan" : "group-hover:text-cyber-cyan/80"}`} />
                            <span className="font-medium text-sm flex-1">{item.name}</span>
                            {isActive && <ChevronRight className="w-4 h-4" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4">
                <div className="glass p-4 rounded-2xl space-y-3">
                    <div className="flex items-center space-x-2">
                        <Terminal className="w-4 h-4 text-neon-purple" />
                        <span className="text-xs font-semibold uppercase tracking-tighter">System Log</span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] text-muted-text">Mothership Active</p>
                        <p className="text-[10px] text-muted-text text-green-400">All modules synced</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
