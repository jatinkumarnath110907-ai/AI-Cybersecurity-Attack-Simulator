import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export default function LoginPage() {
    const { login, register } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(false); // Default to registration so new users don't fail login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        try {
            if (isLogin) {
                await login(email, password);
                navigate('/dashboard');
            } else {
                await register(email, password);
                setSuccessMsg('Account created successfully! Initializing session...');
                setTimeout(() => navigate('/dashboard'), 1000);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Connection Failed: Check credentials or network');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
            {/* Decorative background effects */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl"></div>

            <div className="bg-slate-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 z-10">
                <div className="flex flex-col items-center mb-6">
                    <ShieldAlert className="w-12 h-12 text-blue-500 mb-2" />
                    <h2 className="text-2xl font-bold text-white">{isLogin ? 'System Login' : 'Register Operator'}</h2>
                    <p className="text-slate-400 text-sm mt-1">{isLogin ? 'Enter your credentials to access the simulator' : 'Create a new account to begin'}</p>
                </div>

                {error && <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm text-center">{error}</div>}
                {successMsg && <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 p-3 rounded mb-4 text-sm text-center">{successMsg}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 mb-1 text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 transform active:scale-[0.98]">
                        {isLogin ? 'Initialize Session (Login)' : 'Create Account (Register)'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-400 hover:text-blue-300 font-semibold underline decoration-transparent hover:decoration-blue-400 transition-all">
                        {isLogin ? 'Register Here' : 'Login Here'}
                    </button>
                </p>
            </div>
        </div>
    );
}
