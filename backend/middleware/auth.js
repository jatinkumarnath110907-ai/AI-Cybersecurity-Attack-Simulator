const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const splitToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
        const decoded = jwt.verify(splitToken, process.env.JWT_SECRET || 'supersecret');
        req.user = decoded; // { id: 1 } instead of { _id: 1 }
        next();
    } catch (ex) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};
