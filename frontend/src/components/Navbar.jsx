import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-30">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    AI CyberSec Platform
                </h2>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center text-slate-300">
                        <User className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">{user?.email}</span>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors text-sm"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
