import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Crosshair, AlertOctagon, Terminal, Activity } from 'lucide-react';

export default function AttackSimulatorPage() {
    const [attackType, setAttackType] = useState('Brute force login attempts');
    const [target, setTarget] = useState('192.168.1.100:22');
    const [isSimulating, setIsSimulating] = useState(false);
    const [logs, setLogs] = useState([]);

    const attackTypes = [
        'Brute force login attempts',
        'SQL injection testing',
        'Cross-site scripting simulation',
        'Phishing simulation',
        'DDoS traffic simulation'
    ];

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const res = await api.get('/simulate/logs');
            setLogs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const simulateAttack = async () => {
        setIsSimulating(true);
        try {
            const res = await api.post('/simulate/attack', { attackType, target });
            setLogs([res.data, ...logs]); // Optimistic update
        } catch (err) {
            console.error(err);
        } finally {
            setIsSimulating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Simulated Attacks</h1>
                    <p className="text-slate-400">Safely perform ethical cyber attacks against network targets.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 border border-slate-700 bg-slate-800 rounded-xl p-6 shadow-lg h-fit">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Crosshair className="w-5 h-5 text-red-500" /> Attack Vector
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-slate-400 mb-1 text-sm font-medium">Attack Signature</label>
                            <select
                                value={attackType}
                                onChange={(e) => setAttackType(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                            >
                                {attackTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-slate-400 mb-1 text-sm font-medium">Target Asset</label>
                            <input
                                type="text"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                placeholder="IP or URL..."
                            />
                        </div>

                        <button
                            onClick={simulateAttack}
                            disabled={isSimulating}
                            className={`w-full font-bold py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isSimulating ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white'
                                }`}
                        >
                            {isSimulating ? (
                                <><Activity className="w-5 h-5 animate-pulse" /> Exploiting Vector...</>
                            ) : (
                                <><AlertOctagon className="w-5 h-5" /> Launch Operation</>
                            )}
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-2 border border-slate-700 bg-slate-900 rounded-xl p-0 shadow-lg overflow-hidden flex flex-col">
                    <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-slate-400" />
                        <h2 className="text-lg font-bold text-slate-200">Terminal Log</h2>
                    </div>

                    <div className="p-4 font-mono text-sm overflow-y-auto h-96 flex-1 bg-black/50">
                        {logs.length === 0 ? (
                            <div className="text-slate-600">No active operations. Awaiting commands...</div>
                        ) : (
                            <div className="space-y-2">
                                {logs.map((log) => (
                                    <div key={log.id} className="border-l-2 pl-3 py-1 border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                                        <p className="text-slate-500 text-xs mb-1">[{new Date(log.timestamp).toISOString()}]</p>
                                        <p className="text-slate-300">
                                            <span className="text-purple-400">ATTACK_REQ:</span> {log.attackType} <span className="text-blue-400">TARGET:</span> {log.target}
                                        </p>
                                        <p>
                                            <span className="text-slate-400">RESULT: </span>
                                            <span className={log.result === 'Success' ? 'text-red-500 font-bold' : log.result === 'Failed' ? 'text-emerald-500' : 'text-amber-500'}>
                                                {log.result}
                                            </span>
                                        </p>
                                        <p>
                                            <span className="text-slate-400">AI_THREAT_CLASSIFICATION: </span>
                                            <span className={`font-bold ${log.riskLevel === 'Critical' ? 'text-red-600 animate-pulse' :
                                                log.riskLevel === 'High' ? 'text-red-400' :
                                                    log.riskLevel === 'Medium' ? 'text-amber-400' : 'text-yellow-200'
                                                }`}>
                                                [{log.riskLevel.toUpperCase()}_RISK]
                                            </span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
