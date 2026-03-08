const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const NetworkScan = require('../models/NetworkScan');
const Vulnerability = require('../models/Vulnerability');
const { simulateNetworkScan } = require('../services/scanner');

router.post('/network', auth, async (req, res) => {
    try {
        const { targetIp } = req.body;

        // Simulate scanning network
        const scanResults = simulateNetworkScan(targetIp);

        // Create scan entry
        const scan = await NetworkScan.create({
            userId: req.user.id,
            targetIp,
            detectedPorts: scanResults,
            status: 'completed'
        });

        // Analyze results for vulnerabilities (mock simple heuristic)
        const vulnerabilities = [];
        scanResults.forEach(portInfo => {
            if (portInfo.port === 22 && portInfo.state === 'Open') {
                vulnerabilities.push({ title: 'Open SSH Port', severity: 'Medium', description: 'SSH port 22 is open, vulnerable to brute force.' });
            }
            if (portInfo.port === 80 && portInfo.state === 'Open') {
                vulnerabilities.push({ title: 'Unencrypted HTTP traffic', severity: 'Low', description: 'Port 80 is open to unencrypted traffic.' });
            }
        });

        for (let vuln of vulnerabilities) {
            await Vulnerability.create({
                userId: req.user.id,
                ...vuln
            });
        }

        res.json(scan);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during network scan' });
    }
});

router.get('/history', auth, async (req, res) => {
    try {
        const scans = await NetworkScan.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(scans);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching history' });
    }
});

module.exports = router;
