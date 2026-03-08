const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SecurityReport = require('../models/SecurityReport');
const Vulnerability = require('../models/Vulnerability');

router.get('/', auth, async (req, res) => {
    try {
        const vulnerabilities = await Vulnerability.findAll({ where: { userId: req.user.id } });

        // Scoring model
        let riskScore = 0;
        const weights = {
            'Low': 5,
            'Medium': 15,
            'High': 30,
            'Critical': 50
        };

        vulnerabilities.forEach(vuln => {
            riskScore += weights[vuln.severity] || 0;
        });

        riskScore = Math.min(Math.max(100 - riskScore, 0), 100);

        // Build recommendations
        const recommendations = ['Update all software packages', 'Ensure firewall is active', 'Regular password rotation'];
        if (vulnerabilities.some(v => v.severity === 'Critical' || v.severity === 'High')) {
            recommendations.push('Immediate remediation of Critical/High vulnerabilities is required.');
        }

        const report = await SecurityReport.create({
            userId: req.user.id,
            riskScore,
            vulnerabilities: vulnerabilities.map(v => v.id),
            recommendations
        });

        res.json({ report, riskScore, recommendations });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error generating report' });
    }
});

router.get('/history', auth, async (req, res) => {
    try {
        const reports = await SecurityReport.findAll({
            where: { userId: req.user.id },
            order: [['generatedAt', 'DESC']]
        });
        res.json(reports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching reports' });
    }
});

module.exports = router;
