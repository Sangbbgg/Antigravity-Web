"use client";

import { Bell, Search, Hexagon } from "lucide-react";

export default function Navbar() {
    return (
        <header className="fixed top-0 left-64 right-0 h-16 border-b border-glass-border bg-background/50 backdrop-blur-md z-40 flex items-center justify-between px-8">
            <div className="flex items-center flex-1 max-w-xl">
                <div className="relative w-full group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text group-hover:text-cyber-cyan transition-colors" />
                    <input
                        type="text"
                        placeholder="Search command center..."
                        className="w-full bg-white/5 border border-glass-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan/50 focus:bg-white/10 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg hover:bg-white/5 text-muted-text hover:text-white transition-all relative group">
                    <Bell className="w-5 h-5 group-hover:neon-text-cyan" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-neon-purple rounded-full border-2 border-background shadow-[0_0_8px_rgba(188,19,254,0.6)]"></span>
                </button>
                <div className="h-8 w-[1px] bg-glass-border mx-2"></div>
                <div className="flex items-center space-x-3 cursor-pointer group">
                    <div className="text-right">
                        <p className="text-xs font-bold leading-none">AGENT_MNGR</p>
                        <p className="text-[10px] text-green-400 flex items-center justify-end">
                            <span className="w-1 h-1 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                            MASTER AUTH
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyber-cyan to-neon-purple p-[1px]">
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                            <Hexagon className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-500" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
