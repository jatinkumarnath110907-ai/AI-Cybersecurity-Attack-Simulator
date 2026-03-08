const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Vulnerability = require('../models/Vulnerability');

router.get('/', auth, async (req, res) => {
    try {
        const vulnerabilities = await Vulnerability.findAll({
            where: { userId: req.user.id },
            order: [['detectedAt', 'DESC']]
        });
        res.json(vulnerabilities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching vulnerabilities' });
    }
});

module.exports = router;
