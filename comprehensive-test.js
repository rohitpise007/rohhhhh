// Comprehensive test for all frontend-backend connections
const axios = require('axios');

const BASE_URL = 'https://hospital-management-system-backend-dxt6.onrender.com';

async function testAllEndpoints() {
  console.log('🧪 Starting comprehensive API testing...\n');

  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };

  const testEndpoint = async (name, method, url, data = null, expectAuth = false) => {
    try {
      const config = {
        method,
        url,
        ...(data && { data }),
        ...(expectAuth && { withCredentials: true }),
        headers: { "Content-Type": "application/json" }
      };

      const response = await axios(config);
      console.log(`✅ ${name}: ${response.status}`);
      results.tests.push({ name, status: 'PASS', code: response.status });
      results.passed++;
      return response.data;
    } catch (error) {
      console.log(`❌ ${name}: ${error.response?.status || 'ERROR'} - ${error.response?.data?.message || error.message}`);
      results.tests.push({
        name,
        status: 'FAIL',
        code: error.response?.status,
        error: error.response?.data?.message || error.message
      });
      results.failed++;
      return null;
    }
  };

  // Test basic connectivity
  await testEndpoint('Root Endpoint', 'GET', `${BASE_URL}/`);

  // Test patient registration
  const patientEmail = `testpatient${Date.now()}@example.com`;
  const patientData = {
    name: 'Test Patient',
    email: patientEmail,
    phone: '1234567890',
    password: 'password123'
  };
  await testEndpoint('Patient Registration', 'POST', `${BASE_URL}/Pregister`, patientData);

  // Test patient login
  await testEndpoint('Patient Login', 'POST', `${BASE_URL}/Plogin`, {
    email: patientEmail,
    password: 'password123'
  }, true);

  // Test doctor registration
  const doctorEmail = `testdoctor${Date.now()}@example.com`;
  const doctorData = {
    name: 'Test Doctor',
    email: doctorEmail,
    phone: '1234567890',
    password: 'password123',
    specialty: 'Cardiology',
    experience: 5
  };
  await testEndpoint('Doctor Registration', 'POST', `${BASE_URL}/Dregister`, doctorData);

  // Test doctor login
  await testEndpoint('Doctor Login', 'POST', `${BASE_URL}/Dlogin`, {
    email: doctorEmail,
    password: 'password123'
  }, true);

  // Test admin login (using default credentials if they exist)
  await testEndpoint('Admin Login', 'POST', `${BASE_URL}/Alogin`, {
    email: 'Admin123@gmail.com',
    password: 'Admin123'
  }, true);

  // Test public endpoints
  await testEndpoint('View Doctors', 'GET', `${BASE_URL}/viewAll-doctors`);
  await testEndpoint('Insurance Companies', 'GET', `${BASE_URL}/insurance-companies`);
  await testEndpoint('Website Stats', 'GET', `${BASE_URL}/website-stats`);

  // Test protected endpoints (these will likely fail without proper auth)
  console.log('\n🔒 Testing protected endpoints (may fail without auth):');
  await testEndpoint('Patient Appointments', 'GET', `${BASE_URL}/patient-appointments`, null, true);
  await testEndpoint('Doctor Appointments', 'GET', `${BASE_URL}/Viewall-appointment`, null, true);
  await testEndpoint('Admin Dashboard', 'GET', `${BASE_URL}/admin-dashboard`, null, true);

  // Summary
  console.log('\n📊 Test Summary:');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);

  if (results.failed > 0) {
    console.log('\n❌ Failed Tests:');
    results.tests.filter(t => t.status === 'FAIL').forEach(test => {
      console.log(`  - ${test.name}: ${test.code} - ${test.error}`);
    });
  }

  return results;
}

testAllEndpoints().then(() => {
  console.log('\n🏁 Comprehensive testing completed!');
}).catch(console.error);


