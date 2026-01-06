// Debug script to test authentication endpoints
const axios = require('axios');

const BASE_URL = 'https://hospital-management-system-backend-dxt6.onrender.com';

async function debugAuth() {
  console.log('🔍 Debugging authentication endpoints...\n');

  try {
    // Test backend connectivity
    console.log('1. Testing backend connectivity...');
    const root = await axios.get(BASE_URL);
    console.log('✅ Backend is responding:', root.data.message);

    // Test patient registration
    console.log('\n2. Testing patient registration...');
    const patientEmail = `debug${Date.now()}@test.com`;
    const registerData = {
      name: 'Debug User',
      email: patientEmail,
      phone: '1234567890',
      password: 'password123'
    };

    console.log('Sending registration data:', registerData);

    const register = await axios.post(`${BASE_URL}/Pregister`, registerData, {
      headers: { "Content-Type": "application/json" }
    });

    console.log('✅ Registration successful!');
    console.log('Response:', register.data);

    // Test patient login
    console.log('\n3. Testing patient login...');
    const loginData = {
      email: patientEmail,
      password: 'password123'
    };

    console.log('Sending login data:', loginData);

    const login = await axios.post(`${BASE_URL}/Plogin`, loginData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });

    console.log('✅ Login successful!');
    console.log('Response:', login.data);

    // Test doctor registration
    console.log('\n4. Testing doctor registration...');
    const doctorEmail = `debugdoctor${Date.now()}@test.com`;
    const doctorData = {
      name: 'Debug Doctor',
      email: doctorEmail,
      phone: '1234567890',
      password: 'password123',
      specialty: 'Cardiology',
      experience: 5
    };

    console.log('Sending doctor registration data:', doctorData);

    const doctorRegister = await axios.post(`${BASE_URL}/Dregister`, doctorData, {
      headers: { "Content-Type": "application/json" }
    });

    console.log('✅ Doctor registration successful!');
    console.log('Response:', doctorRegister.data);

    // Test doctor login
    console.log('\n5. Testing doctor login...');
    const doctorLoginData = {
      email: doctorEmail,
      password: 'password123'
    };

    console.log('Sending doctor login data:', doctorLoginData);

    const doctorLogin = await axios.post(`${BASE_URL}/Dlogin`, doctorLoginData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });

    console.log('✅ Doctor login successful!');
    console.log('Response:', doctorLogin.data);

    console.log('\n🎉 All authentication tests passed!');

  } catch (error) {
    console.log('\n❌ Error occurred:');
    console.log('Status:', error.response?.status);
    console.log('Message:', error.response?.data?.message);
    console.log('Full error:', error.response?.data);
    console.log('Error details:', error.message);
  }
}

debugAuth();
