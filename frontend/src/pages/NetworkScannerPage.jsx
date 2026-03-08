import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Search, Server, Cpu, Clock, RefreshCw, Crosshair } from 'lucide-react';

export default function NetworkScannerPage() {
    const [targetIp, setTargetIp] = useState('192.168.1.100');
    const [isScanning, setIsScanning] = useState(false);
    const [scanResults, setScanResults] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await api.get('/scan/history');
            setHistory(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const startScan = async () => {
        setIsScanning(true);
        setScanResults(null);
        try {
            const res = await api.post('/scan/network', { targetIp });
            setScanResults(res.data);
            fetchHistory();
        } catch (err) {
            console.error(err);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Network Scanner</h1>
                    <p className="text-slate-400">Scan targets for open ports and active services.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 border border-slate-700 bg-slate-800 rounded-xl p-6 shadow-lg h-fit">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Search className="w-5 h-5 text-blue-400" /> Scanner Config
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-slate-400 mb-1 text-sm font-medium">Target IP Address</label>
                            <input
                                type="text"
                                value={targetIp}
                                onChange={(e) => setTargetIp(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="e.g., 10.0.0.1"
                            />
                        </div>

                        <button
                            onClick={startScan}
                            disabled={isScanning}
                            className={`w-full font-bold py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isScanning ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'
                                }`}
                        >
                            {isScanning ? (
                                <><RefreshCw className="w-5 h-5 animate-spin" /> Scanning Network...</>
                            ) : (
                                <><Crosshair className="w-5 h-5" /> Initiate Scan</>
                            )}
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-2 border border-slate-700 bg-slate-800 rounded-xl p-6 shadow-lg">
                    <h2 className="text-lg font-bold text-white mb-4">Live Scan Results</h2>

                    {!scanResults && !isScanning && (
                        <div className="h-64 flex flex-col items-center justify-center text-slate-500">
                            <Server className="w-16 h-16 mb-4 opacity-20" />
                            <p>Awaiting target specification. Initialize a scan to begin data collection.</p>
                        </div>
                    )}

                    {isScanning && (
                        <div className="h-64 flex flex-col items-center justify-center text-blue-400">
                            <Cpu className="w-16 h-16 mb-4 animate-pulse" />
                            <p className="animate-pulse">Analyzing target topography...</p>
                        </div>
                    )}

                    {scanResults && (
                        <div className="space-y-4">
                            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                                <p className="text-sm text-slate-400">Target IP: <span className="text-white font-mono">{scanResults.targetIp}</span></p>
                                <p className="text-sm text-slate-400">Status: <span className="text-emerald-400 font-bold capitalize">{scanResults.status}</span></p>
                            </div>

                            <h3 className="font-semibold text-slate-300 mt-4 border-b border-slate-700 pb-2">Detected Ports</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {scanResults.detectedPorts.map((portInfo, idx) => (
                                    <div key={idx} className="bg-slate-900/50 p-4 rounded-lg flex items-center justify-between border border-slate-800">
                                        <div>
                                            <p className="font-bold text-white text-lg">Port {portInfo.port}</p>
                                            <p className="text-xs text-slate-400 uppercase">{portInfo.service}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${portInfo.state === 'Open' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                            {portInfo.state}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="border border-slate-700 bg-slate-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-400" /> Scan History
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="p-3 text-sm font-semibold text-slate-400">Target IP</th>
                                <th className="p-3 text-sm font-semibold text-slate-400">Date/Time</th>
                                <th className="p-3 text-sm font-semibold text-slate-400">Detected Ports</th>
                                <th className="p-3 text-sm font-semibold text-slate-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((h) => (
                                <tr key={h.id} className="border-b border-slate-800 hover:bg-slate-700/30 transition-colors">
                                    <td className="p-3 text-sm font-mono text-slate-300">{h.targetIp}</td>
                                    <td className="p-3 text-sm text-slate-400">{new Date(h.createdAt).toLocaleString()}</td>
                                    <td className="p-3 text-sm text-blue-400 font-bold">{h.detectedPorts.length}</td>
                                    <td className="p-3 text-sm">
                                        <span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded text-xs font-semibold capitalize">{h.status}</span>
                                    </td>
                                </tr>
                            ))}
                            {history.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center p-6 text-slate-500">No scan history available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

