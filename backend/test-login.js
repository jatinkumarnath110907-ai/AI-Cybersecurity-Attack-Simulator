const axios = require('axios');

async function run() {
    try {
        const res = await axios.post('http://localhost:5001/auth/login', {
            email: 'admin@test.com',
            password: 'password'
        });
        console.log('Success:', res.data);
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
}
run();
