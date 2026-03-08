import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { FileText, Download, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SecurityReportsPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await api.get('/security-report/history');
            if (res.data.length === 0) {
                // Automatically generate an initial report for demo
                await api.get('/security-report');
                const res2 = await api.get('/security-report/history');
                setReports(res2.data);
            } else {
                setReports(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getLatestReport = () => {
        if (reports.length === 0) return null;
        return reports[0];
    };

    const latest = getLatestReport();

    const handleDownload = () => {
        alert("In a real application, this would prompt a PDF download of the report.");
    };

    const getDoughnutData = () => {
        // Just mock distribution based on riskScore
        const risk = latest ? latest.riskScore : 100;
        const safe = risk;
        const risky = 100 - risk;

        return {
            labels: ['Secure Elements', 'Vulnerabilities'],
            datasets: [
                {
                    data: [safe, risky],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)', // emerald
                        'rgba(239, 68, 68, 0.8)', // red
                    ],
                    borderColor: [
                        'rgb(16, 185, 129)',
                        'rgb(239, 68, 68)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Security Analytics</h1>
                    <p className="text-slate-400">Extensive vulnerability reporting and risk mitigation analysis.</p>
                </div>
                <button onClick={handleDownload} className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-lg transition-colors shadow shadow-slate-900">
                    <Download className="w-4 h-4 mr-2" />
                    Export as PDF
                </button>
            </div>

            {!loading && !latest && (
                <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl text-center shadow-lg">
                    <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">No Reports Generated</h2>
                    <p className="text-slate-400">Perform network scans to build system history.</p>
                </div>
            )}

            {latest && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg lg:col-span-1">
                        <h2 className="text-lg font-bold text-white mb-6 border-b border-slate-700 pb-2">Analysis Index</h2>

                        <div className="relative h-64 w-full flex justify-center">
                            <Doughnut
                                data={getDoughnutData()}
                                options={{
                                    maintainAspectRatio: false,
                                    cutout: '70%',
                                    plugins: {
                                        legend: { position: 'bottom', labels: { color: '#cbd5e1' } }
                                    }
                                }}
                            />
                            <div className="absolute top-[40%] flex flex-col items-center">
                                <span className="text-3xl font-bold text-white">{latest.riskScore}</span>
                                <span className="text-xs text-slate-400 uppercase">Risk Score</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg lg:col-span-2">
                        <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Recommended Actions
                        </h2>

                        <ul className="space-y-4">
                            {latest.recommendations && latest.recommendations.map((rec, i) => (
                                <li key={i} className="flex gap-4 items-start bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                                    <div className="bg-blue-500/20 text-blue-400 p-2 rounded-full mt-1">
                                        <AlertTriangle className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{rec}</p>
                                        <p className="text-sm text-slate-400 mt-1">Automated mitigation recommendation generated by Risk Analysis Engine.</p>
                                    </div>
                                </li>
                            ))}
                            {(!latest.recommendations || latest.recommendations.length === 0) && (
                                <li className="text-slate-500 p-4 text-center">System topology optimally secure. No actions required.</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" /> Historical Reports
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="p-3 text-sm font-semibold text-slate-400">Report ID</th>
                                <th className="p-3 text-sm font-semibold text-slate-400">Date Generated</th>
                                <th className="p-3 text-sm font-semibold text-slate-400">System Score</th>
                                <th className="p-3 text-sm font-semibold text-slate-400">Vulnerabilities Detected</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} className="border-b border-slate-800 hover:bg-slate-700/30 transition-colors cursor-pointer">
                                    <td className="p-3 text-sm font-mono text-slate-400">RPT-{String(report.id).padStart(4, '0')}</td>
                                    <td className="p-3 text-sm text-slate-300">{new Date(report.generatedAt).toLocaleString()}</td>
                                    <td className="p-3 text-sm font-bold">
                                        <span className={report.riskScore > 70 ? 'text-emerald-400' : report.riskScore > 40 ? 'text-amber-400' : 'text-red-400'}>
                                            {report.riskScore}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm text-blue-400 font-medium">
                                        {report.vulnerabilities.length} Found
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
