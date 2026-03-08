const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const AttackLog = require('../models/AttackLog');
const { classifyThreat } = require('../services/ai');

router.post('/attack', auth, async (req, res) => {
    try {
        const { attackType, target } = req.body;

        // Simulate Attack result
        let result = '';
        const successProb = Math.random();
        if (successProb > 0.7) result = 'Success';
        else if (successProb > 0.3) result = 'Blocked by Firewall';
        else result = 'Failed';

        // AI Classification of Threat
        const riskLevel = classifyThreat(attackType, result);

        const log = await AttackLog.create({
            userId: req.user.id,
            attackType,
            target,
            result,
            riskLevel,
            details: { simulationProbability: successProb }
        });

        // Emit via socket if integrated
        const io = req.app.get('socketio');
        if (io) {
            io.emit('attack_simulated', log);
        }

        res.json(log);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during attack simulation' });
    }
});

router.get('/logs', auth, async (req, res) => {
    try {
        const logs = await AttackLog.findAll({
            where: { userId: req.user.id },
            order: [['timestamp', 'DESC']]
        });
        res.json(logs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching logs' });
    }
});

module.exports = router;
