const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.set('socketio', io);

app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/scan', require('./routes/scan'));
app.use('/simulate', require('./routes/simulate'));
app.use('/vulnerabilities', require('./routes/vulnerabilities'));
app.use('/security-report', require('./routes/report'));

// Sequelize setup
const sequelize = require('./models/index');
require('./models/User');
require('./models/NetworkScan');
require('./models/AttackLog');
require('./models/Vulnerability');
require('./models/SecurityReport');

sequelize.sync({ alter: true })
    .then(() => console.log('SQLite Connected & Synced'))
    .catch(err => console.log('SQLite Connection Error:', err));

io.on('connection', (socket) => {
    console.log('Client connected via socket:', socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
