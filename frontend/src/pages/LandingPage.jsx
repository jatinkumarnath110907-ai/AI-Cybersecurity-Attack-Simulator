import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
            <div className="absolute top-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl mix-blend-screen opacity-30 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl mix-blend-screen opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <MotionDiv animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                <Shield className="w-24 h-24 text-blue-500 mb-8" />
            </MotionDiv>

            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6 drop-shadow-lg">
                AI Cybersecurity Attack Simulator
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12">
                An automated ethical hacker platform. Identify security weaknesses before real attackers exploit them using AI-driven network scanning and attack simulations.
            </p>

            <Link to="/login" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-300">
                Enter Simulator
            </Link>
        </div>
    );
}
