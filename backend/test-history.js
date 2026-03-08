const axios = require('axios');

async function run() {
    try {
        const loginRes = await axios.post('http://localhost:5001/auth/login', {
            email: 'admin@test.com',
            password: 'password'
        });
        const token = loginRes.data.token;

        const historyRes = await axios.get('http://localhost:5001/scan/history', {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('History data isArray:', Array.isArray(historyRes.data));
        if (historyRes.data.length > 0) {
            console.log('History[0] detectedPorts type:', typeof historyRes.data[0].detectedPorts);
            console.log('History[0] detectedPorts isArray:', Array.isArray(historyRes.data[0].detectedPorts));
            if (typeof historyRes.data[0].detectedPorts === 'string') {
                console.log('It is string:', historyRes.data[0].detectedPorts.substring(0, 50));
            }
        }
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
}
run();
