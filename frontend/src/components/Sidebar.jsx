import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, RadioTower, Crosshair, FileText, Shield } from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Network Scanner', path: '/scanner', icon: RadioTower },
        { name: 'Attack Simulator', path: '/simulator', icon: Crosshair },
        { name: 'Security Reports', path: '/reports', icon: FileText }
    ];

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden lg:flex h-screen sticky top-0">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-500" />
                <span className="text-xl font-bold text-slate-100 tracking-tight">Simulator</span>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                }`}
                        >
                            <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mb-2"></div>
                    <span className="text-xs text-slate-400 font-medium">System Online</span>
                </div>
            </div>
        </aside>
    );
}
