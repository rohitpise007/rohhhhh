// Simple test to isolate registration/login issues
const axios = require('axios');

const BASE_URL = 'https://hospital-management-system-backend-dxt6.onrender.com';

async function simpleTest() {
  console.log('🔍 Testing basic connectivity...\n');

  try {
    // Test 1: Basic connectivity
    console.log('1. Testing root endpoint...');
    const root = await axios.get(BASE_URL);
    console.log('✅ Root works:', root.data);

    // Test 2: Patient registration
    console.log('\n2. Testing patient registration...');
    const patientEmail = `test${Date.now()}@example.com`;
    const registerResponse = await axios.post(`${BASE_URL}/Pregister`, {
      name: 'Test User',
      email: patientEmail,
      phone: '1234567890',
      password: 'password123'
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('✅ Registration successful:', registerResponse.data);

    // Test 3: Patient login
    console.log('\n3. Testing patient login...');
    const loginResponse = await axios.post(`${BASE_URL}/Plogin`, {
      email: patientEmail,
      password: 'password123'
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    console.log('✅ Login successful:', loginResponse.data);

    // Test 4: Check if cookies work
    console.log('\n4. Testing authenticated request...');
    const authResponse = await axios.get(`${BASE_URL}/Plogin`, {
      withCredentials: true
    });
    console.log('✅ Auth check successful:', authResponse.data);

  } catch (error) {
    console.log('\n❌ Error occurred:');
    console.log('Status:', error.response?.status);
    console.log('Data:', error.response?.data);
    console.log('Headers:', error.response?.headers);
    console.log('Full error:', error.message);

    if (error.code === 'ENOTFOUND') {
      console.log('🚨 DNS/Network issue - cannot reach backend');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('🚨 Connection refused - backend not running');
    }
  }
}

simpleTest();
