import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ShieldCheck, Target, AlertTriangle, Activity } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [stats, setStats] = useState({ riskScore: 0, vulnCount: 0, attackCount: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const reportRes = await api.get('/security-report');
                const vulnRes = await api.get('/vulnerabilities');
                const attackRes = await api.get('/simulate/logs');

                setStats({
                    riskScore: reportRes.data.riskScore || 100,
                    vulnCount: vulnRes.data.length || 0,
                    attackCount: attackRes.data.length || 0
                });
            } catch (err) {
                console.error("Failed to load generic stats", err);
            }
        };
        fetchStats();
    }, []);

    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Detected Vulnerabilities',
                data: [12, 19, 3, 5, 2, stats.vulnCount],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.3
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: '#94a3b8' } },
            title: { display: false }
        },
        scales: {
            x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
            y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Executive Dashboard</h1>
                    <p className="text-slate-400">Overview of your current security posture</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl flex items-center justify-between shadow-lg">
                    <div>
                        <p className="text-sm font-medium text-slate-400 mb-1">Security Score</p>
                        <h3 className="text-3xl font-bold text-emerald-400">{stats.riskScore}/100</h3>
                    </div>
                    <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                </div>

                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl flex items-center justify-between shadow-lg">
                    <div>
                        <p className="text-sm font-medium text-slate-400 mb-1">Active Vulnerabilities</p>
                        <h3 className="text-3xl font-bold text-amber-400">{stats.vulnCount}</h3>
                    </div>
                    <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                        <AlertTriangle className="w-8 h-8 text-amber-400" />
                    </div>
                </div>

                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl flex items-center justify-between shadow-lg">
                    <div>
                        <p className="text-sm font-medium text-slate-400 mb-1">Simulated Attacks</p>
                        <h3 className="text-3xl font-bold text-blue-400">{stats.attackCount}</h3>
                    </div>
                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                        <Target className="w-8 h-8 text-blue-400" />
                    </div>
                </div>

                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl flex items-center justify-between shadow-lg">
                    <div>
                        <p className="text-sm font-medium text-slate-400 mb-1">Network Status</p>
                        <h3 className="text-3xl font-bold text-slate-200">Monitoring</h3>
                    </div>
                    <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                        <Activity className="w-8 h-8 text-purple-400 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-bold text-white mb-4">Threat Detection Trend</h3>
                    <Line options={chartOptions} data={lineChartData} />
                </div>
            </div>
        </div>
    );
}
