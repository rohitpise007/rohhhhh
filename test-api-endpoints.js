// Quick test to verify API endpoints are working
const axios = require('axios');

const BASE_URL = 'https://hospital-management-system-backend-dxt6.onrender.com';

async function testAPI() {
  console.log('Testing API endpoints...\n');

  try {
    // Test root endpoint
    console.log('Testing root endpoint...');
    const root = await axios.get(BASE_URL);
    console.log('✅ Root:', root.data);

    // Test patient registration
    console.log('\nTesting patient registration...');
    const testEmail = `test${Date.now()}@example.com`;
    const register = await axios.post(`${BASE_URL}/Pregister`, {
      name: 'Test User',
      email: testEmail,
      phone: '1234567890',
      password: 'password123'
    });
    console.log('✅ Registration successful');

    // Test login with the newly registered user
    console.log('\nTesting login...');
    const login = await axios.post(`${BASE_URL}/Plogin`, {
      email: testEmail,
      password: 'password123'
    });
    console.log('✅ Login successful:', login.data.message);

    // Test doctors endpoint
    console.log('\nTesting doctors endpoint...');
    const doctors = await axios.get(`${BASE_URL}/viewAll-doctors`);
    console.log('✅ Doctors endpoint:', doctors.data.doctor?.length || 0, 'doctors found');

    console.log('\n🎉 All API endpoints are working correctly!');

  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    }
  }
}

testAPI();
