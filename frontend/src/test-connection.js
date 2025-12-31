// Simple test to verify frontend can connect to backend
import axios from 'axios';

export const testConnection = async () => {
  try {
    console.log('Testing backend connection...');

    // Test root endpoint
    const rootResponse = await axios.get('https://hospital-management-system-backend-dxt6.onrender.com/');
    console.log('✅ Root endpoint works:', rootResponse.data);

    // Test registration
    const testEmail = `test${Date.now()}@example.com`;
    const registerResponse = await axios.post('https://hospital-management-system-backend-dxt6.onrender.com/Pregister', {
      name: 'Test User',
      email: testEmail,
      phone: '1234567890',
      password: 'password123'
    }, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    console.log('✅ Registration works:', registerResponse.data.message);

    // Test login
    const loginResponse = await axios.post('https://hospital-management-system-backend-dxt6.onrender.com/Plogin', {
      email: testEmail,
      password: 'password123'
    }, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    console.log('✅ Login works:', loginResponse.data.message);

    return { success: true, message: 'All connections working!' };

  } catch (error) {
    console.error('❌ Connection test failed:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};


