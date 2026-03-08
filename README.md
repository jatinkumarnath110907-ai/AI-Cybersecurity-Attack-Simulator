# AI Cybersecurity Attack Simulator

A production-ready full-stack platform acting as an automated ethical hacker. It helps organizations detect vulnerabilities, analyze network configurations, and simulate cyber attacks using a web-based dashboard and AI-driven classification.

## Tech Stack

- **Frontend:** React, HTML, CSS, TailwindCSS, Chart.js, Lucide-react (Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Security & APIs:** JWT Auth, bcryptjs, socket.io (for future real-time streaming), advanced REST routes.

## Core Features

- **User Authentication:** Secure JWT-based registration and login system.
- **Network Scanner Module:** Simulates automated port and service scanning.
- **Attack Simulation Engine:** Configurable payload and parameter attack vector module.
- **AI Threat Detection System:** Contextual heuristic algorithms acting as mock-AI to identify risk severity.
- **Risk Analysis System:** Generates weighted numerical system threat scales (0-100).
- **Security Report Generator:** Automated assessment recommendations mapping.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on default port `27017`, or configure external URI)

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start # (or node index.js)
   ```
   *The server runs on http://localhost:5000*

### Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   *The frontend runs on http://localhost:5173 (default Vite port)*

## Architecture

- The platform employs a modern UI featuring responsive dashboards, glassmorphism, and neon cybersecurity aesthetics.
- Charts dynamically reflect the vulnerability counts and threat events.
- Threat simulations register via secure backend REST APIs and are dynamically classified.

---
**Disclaimer**: This is a simulation application. Always prioritize authorized access logic when applying these algorithms to real-world networking topologies.
