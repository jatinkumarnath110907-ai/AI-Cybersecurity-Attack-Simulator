const axios = require('axios');

async function run() {
    try {
        const loginRes = await axios.post('http://localhost:5001/auth/login', {
            email: 'admin@test.com',
            password: 'password'
        });
        const token = loginRes.data.token;

        const scanRes = await axios.post('http://localhost:5001/scan/network', { targetIp: '192.168.1.5' }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Detected Ports Type:', typeof scanRes.data.detectedPorts);
        console.log('Detected Ports IsArray:', Array.isArray(scanRes.data.detectedPorts));
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
}
run();
