import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../main";
// Using direct backend URL instead of API_BASE_URL
import {
  FaUser,
  FaCalendarAlt,
  FaPlus,
  FaHistory,
  FaStethoscope,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUserMd,
  FaFilePdf,
  FaShieldAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaDownload,
  FaEye,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGraduationCap,
  FaAward,
  FaHeartbeat,
  FaFlask,
  FaMicroscope,
  FaPills,
  FaAmbulance,
  FaHospital,
  FaUpload,
  FaFileAlt
} from "react-icons/fa";

const PatientDashboard = () => {
  const { user, isAuthenticated } = useContext(Context);

  console.log("🏥 PatientDashboard rendering - isAuthenticated:", isAuthenticated, "user:", user);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [reports, setReports] = useState([]);
  const [insuranceCompanies, setInsuranceCompanies] = useState([]);
  const [insuranceApplications, setInsuranceApplications] = useState([]);
  const [bills, setBills] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    cancelled: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedInsurance, setSelectedInsurance] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    console.log("🏥 PatientDashboard useEffect triggered, user:", user);
    const fetchDashboardData = async () => {
      console.log("📊 Fetching dashboard data...");
      try {
        // Fetch appointments
        const appointmentsRes = await axios.get(`https://hospital-management-system-backend-dxt6.onrender.com/patient-appointments`, {
          withCredentials: true,
        });

        const userAppointments = appointmentsRes.data.appointments || [];
        setAppointments(userAppointments);

        // Calculate stats
        const total = userAppointments.length;
        const pending = userAppointments.filter(apt => apt.status === 'pending').length;
        const completed = userAppointments.filter(apt => apt.status === 'completed').length;
        const cancelled = userAppointments.filter(apt => apt.status === 'cancelled').length;

        setStats({ total, pending, completed, cancelled });

        // Fetch doctors
        console.log("🏥 Fetching doctors...");
        try {
          const doctorsRes = await axios.get(`https://hospital-management-system-backend-dxt6.onrender.com/viewAll-doctors`);
          console.log("👨‍⚕️ Doctors response:", doctorsRes.data);
          const doctorsData = doctorsRes.data.doctor || [];
          console.log("👨‍⚕️ Setting doctors:", doctorsData.length, "doctors");
          setDoctors(doctorsData);
        } catch (doctorsError) {
          console.error("❌ Failed to fetch doctors:", doctorsError);
          console.error("Doctors error response:", doctorsError.response?.data);
          // Set empty array as fallback
          setDoctors([]);
        }

        // Fetch reports
        const reportsRes = await axios.get(`https://hospital-management-system-backend-dxt6.onrender.com/patient-reports`, {
          withCredentials: true,
        });
        setReports(reportsRes.data.reports || []);

        // Fetch insurance companies
        const insuranceRes = await axios.get(`https://hospital-management-system-backend-dxt6.onrender.com/insurance-companies`, {
          withCredentials: true,
        });
        setInsuranceCompanies(insuranceRes.data.companies || []);

        // Fetch insurance applications
        const insuranceAppsRes = await axios.get(`https://hospital-management-system-backend-dxt6.onrender.com/patient-insurance-applications`, {
          withCredentials: true,
        });
        setInsuranceApplications(insuranceAppsRes.data.applications || []);

        // Fetch bills
        const billsRes = await axios.get(`https://hospital-management-system-backend-dxt6.onrender.com/patient-bills`, {
          withCredentials: true,
        });
        setBills(billsRes.data.bills || []);

      } catch (err) {
        console.error("❌ Failed to load dashboard data:", err);
        console.error("Error response:", err.response);
        console.error("Error status:", err.response?.status);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const recentAppointments = appointments.slice(0, 3);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="status-icon completed" />;
      case 'cancelled':
        return <FaTimesCircle className="status-icon cancelled" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'completed';
      case 'cancelled':
        return 'cancelled';
      default:
        return 'pending';
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('report', selectedFile);
    formData.append('reportType', 'medical_report');
    if (selectedDoctor) {
      formData.append('doctorId', selectedDoctor);
    }

    try {
      const response = await axios.post(`https://hospital-management-system-backend-dxt6.onrender.com/upload-report`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      setReports([...reports, response.data.report]);
      setSelectedFile(null);
      setSelectedDoctor('');
      setUploadProgress(0);
      alert('Report uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload report');
    }
  };

  const handleInsuranceApplication = async (companyId) => {
    try {
      await axios.post(`https://hospital-management-system-backend-dxt6.onrender.com/apply-insurance`, {
        insuranceCompanyId: companyId,
        patientId: user.id
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      alert('Insurance application submitted successfully!');
    } catch (error) {
      console.error('Insurance application failed:', error);
      alert('Failed to apply for insurance');
    }
  };

  const handleBillPayment = async (billId) => {
    try {
      const response = await axios.post(`https://hospital-management-system-backend-dxt6.onrender.com/pay-bill`, {
        billId: billId
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      // Update bill status
      setBills(bills.map(bill =>
        bill._id === billId ? { ...bill, status: 'paid' } : bill
      ));

      alert('Payment successful!');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* Navigation Tabs */}
      <div className="dashboard-nav">
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaUser /> Overview
          </button>
          <button
            className={`nav-tab ${activeTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            <FaUserMd /> Doctors
          </button>
          <button
            className={`nav-tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FaFilePdf /> Reports
          </button>
          <button
            className={`nav-tab ${activeTab === 'insurance' ? 'active' : ''}`}
            onClick={() => setActiveTab('insurance')}
          >
            <FaShieldAlt /> Insurance
          </button>
          <button
            className={`nav-tab ${activeTab === 'billing' ? 'active' : ''}`}
            onClick={() => setActiveTab('billing')}
          >
            <FaCreditCard /> Billing
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-text">
            <h1>Welcome back, {user?.name || 'Patient'}!</h1>
            <p>Manage your healthcare appointments and stay healthy</p>
          </div>
          <div className="welcome-avatar">
            <FaUser size={60} />
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/appointment" className="action-card primary" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                <div className="action-icon">
                  <FaPlus size={24} />
                </div>
                <div className="action-content">
                  <h3>Book Appointment</h3>
                  <p>Schedule a new appointment with our doctors</p>
                </div>
              </Link>

              <div className="action-card secondary" onClick={() => setActiveTab('doctors')}>
                <div className="action-icon">
                  <FaUserMd size={24} />
                </div>
                <div className="action-content">
                  <h3>Find Doctors</h3>
                  <p>Browse available doctors and specialties</p>
                </div>
              </div>

              <div className="action-card secondary" onClick={() => setActiveTab('reports')}>
                <div className="action-icon">
                  <FaFilePdf size={24} />
                </div>
                <div className="action-content">
                  <h3>Upload Reports</h3>
                  <p>Upload and manage your medical reports</p>
                </div>
              </div>

              <div className="action-card secondary" onClick={() => setActiveTab('insurance')}>
                <div className="action-icon">
                  <FaShieldAlt size={24} />
                </div>
                <div className="action-content">
                  <h3>Insurance Status</h3>
                  <p>Check your insurance application status</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Appointments */}
          <div className="recent-appointments">
            <div className="section-header">
              <h2>Recent Appointments</h2>
              <Link to="/appointment-history" className="view-all">View All</Link>
            </div>

            {recentAppointments.length === 0 ? (
              <div className="empty-state">
                <FaCalendarAlt size={48} />
                <h3>No appointments yet</h3>
                <p>Book your first appointment to get started</p>
                <Link to="/appointment" className="btn primary-btn">
                  Book Appointment
                </Link>
              </div>
            ) : (
              <div className="appointments-list">
                {recentAppointments.map((appointment) => (
                  <div key={appointment._id} className="appointment-item">
                    <div className="appointment-header">
                      <div className="appointment-info">
                        <h4>{appointment.disease || 'General Checkup'}</h4>
                        <p className="doctor-info">
                          <FaUserMd /> Dr. {appointment.doctor?.name || 'Assigned Doctor'}
                        </p>
                      </div>
                      <div className={`appointment-status ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span>{appointment.status}</span>
                      </div>
                    </div>

                    <div className="appointment-details">
                      <div className="detail-item">
                        <FaCalendarAlt />
                        <span>{appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : 'Date not set'}</span>
                      </div>
                      <div className="detail-item">
                        <FaClock />
                        <span>{appointment.appointmentTime || 'Time not set'}</span>
                      </div>
                    </div>

                    {appointment.about && (
                      <p className="appointment-description">{appointment.about}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'doctors' && (
        <div className="doctors-section">
          <h2>Available Doctors ({doctors.length})</h2>
          {doctors.length === 0 ? (
            <div className="no-doctors">
              <p>No doctors available at the moment.</p>
            </div>
          ) : (
            <div className="doctors-grid">
              {doctors.map((doctor) => (
                <div key={doctor._id} className="doctor-card">
                  <div className="doctor-avatar">
                    <FaUserMd size={40} />
                  </div>
                  <div className="doctor-info">
                    <h3>Dr. {doctor.name}</h3>
                    <p className="specialty">{doctor.specialty}</p>
                    <p className="experience">{doctor.experience} years experience</p>
                    <p className="contact">📧 {doctor.email}</p>
                    {doctor.phone && <p className="contact">📞 {doctor.phone}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="reports-section">
          <div className="section-header">
            <h2>Medical Reports</h2>
            <button className="btn upload-btn" onClick={() => document.getElementById('report-upload').click()}>
              <FaPlus /> Upload Report
            </button>
          </div>

          {/* Upload Modal */}
          {selectedFile && (
            <div className="upload-modal">
              <div className="upload-modal-content">
                <h3>Upload Medical Report</h3>

                <div className="upload-form">
                  <div className="form-group">
                    <label>Assign to Doctor (Optional)</label>
                    <select
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      className="doctor-select"
                    >
                      <option value="">General Report (No specific doctor)</option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                          Dr. {doctor.name} - {doctor.specialty}
                        </option>
                      ))}
                    </select>
                    <small>This report will be visible to the selected doctor</small>
                  </div>

                  <div className="file-info">
                    <h4>📄 {selectedFile.name}</h4>
                    <p>Size: {(selectedFile.size / 1024).toFixed(1)} KB</p>
                    <p>Type: {selectedFile.type || 'Unknown'}</p>
                  </div>

                  {uploadProgress > 0 && (
                    <div className="upload-progress">
                      <div className="progress-bar" style={{width: (uploadProgress || 0) + '%'}}>
                        {uploadProgress}%
                      </div>
                    </div>
                  )}

                  <div className="upload-actions">
                    <button
                      type="button"
                      onClick={handleFileUpload}
                      className="btn upload-submit-btn"
                      disabled={uploadProgress > 0}
                    >
                      {uploadProgress > 0 ? 'Uploading...' : '📤 Upload Report'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setSelectedDoctor('');
                        setUploadProgress(0);
                      }}
                      className="btn cancel-btn"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form style={{display: 'none'}}>
            <input
              type="file"
              id="report-upload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </form>

          <div className="reports-list">
            {reports.length === 0 ? (
              <div className="empty-state">
                <FaFilePdf size={48} />
                <h3>No reports uploaded yet</h3>
                <p>Upload your medical reports to share with doctors</p>
                <button
                  className="btn primary-btn"
                  onClick={() => document.getElementById('report-upload').click()}
                >
                  📤 Upload Your First Report
                </button>
              </div>
            ) : (
              reports.map((report) => (
                <div key={report._id} className="report-card">
                  <div className="report-icon">
                    <FaFilePdf size={30} />
                  </div>
                  <div className="report-info">
                    <h4>{report.filename}</h4>
                    <p>📅 Uploaded: {report.uploadDate ? new Date(report.uploadDate).toLocaleDateString() : 'Date not available'}</p>
                    {report.doctorId && (
                      <p className="doctor-assigned">
                        👨‍⚕️ Assigned to Dr. {report.doctorId.name || 'Unknown Doctor'}
                      </p>
                    )}
                    <span className="file-size">💾 {report.size} KB</span>
                  </div>
                  <div className="report-actions">
                    <button className="btn view-btn">
                      <FaEye /> 👁️ View
                    </button>
                    <button className="btn download-btn">
                      <FaDownload /> 📥 Download
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'insurance' && (
        <div className="insurance-section">
          {/* My Applications Status */}
          <div className="applications-status">
            <h2>🏥 My Insurance Applications</h2>
            {insuranceApplications.length === 0 ? (
              <div className="no-applications">
                <FaShieldAlt size={48} />
                <h3>No insurance applications yet</h3>
                <p>Apply for insurance coverage from our partner companies below</p>
              </div>
            ) : (
              <div className="applications-list">
                {insuranceApplications.map((application) => (
                  <div key={application._id} className={`application-card ${application.status}`}>
                    <div className="application-header">
                      <div className="company-info">
                        <h4>{application.insuranceCompanyId?.name}</h4>
                        <p>Applied: {application.applicationDate ? new Date(application.applicationDate).toLocaleDateString() : 'Date not available'}</p>
                      </div>
                      <div className={`status-badge ${application.status}`}>
                        {application.status === 'approved' && <><FaCheckCircle /> Approved</>}
                        {application.status === 'pending' && <><FaClock /> Pending Review</>}
                        {application.status === 'rejected' && <><FaTimesCircle /> Rejected</>}
                      </div>
                    </div>

                    {application.status === 'approved' && (
                      <div className="approval-details">
                        <p><strong>Policy Number:</strong> {application.policyNumber}</p>
                        <p><strong>Coverage:</strong> ${application.premiumAmount}/month</p>
                        <p><strong>Approved on:</strong> {application.approvalDate ? new Date(application.approvalDate).toLocaleDateString() : 'Date not available'}</p>
                      </div>
                    )}

                    {application.status === 'rejected' && application.rejectionReason && (
                      <div className="rejection-details">
                        <p><strong>Reason:</strong> {application.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Available Insurance Companies */}
          <div className="companies-section">
            <h2>🛡️ Available Insurance Partners</h2>
            <div className="insurance-grid">
              {insuranceCompanies.map((company) => {
                const hasApplied = insuranceApplications.some(
                  app => app.insuranceCompanyId._id === company._id
                );
                const applicationStatus = insuranceApplications.find(
                  app => app.insuranceCompanyId._id === company._id
                )?.status;

                return (
                  <div key={company._id} className="insurance-card">
                    <div className="insurance-header">
                      <div className="insurance-icon">
                        <FaShieldAlt size={40} />
                      </div>
                      <div className="insurance-info">
                        <h3>{company.name}</h3>
                        <p>{company.description}</p>
                        <div className="premium-info">
                          <span className="premium-range">
                            {`💰 $${company.premiumRange.min}-${company.premiumRange.max}/month`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="insurance-benefits">
                      <h4>🛡️ Coverage Benefits:</h4>
                      <ul>
                        {company.benefits?.map((benefit, index) => (
                          <li key={index}>✅ {benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="insurance-contact">
                      <div className="contact-item">
                        <FaPhone />
                        <span>{company.contactNumber}</span>
                      </div>
                      <div className="contact-item">
                        <FaEnvelope />
                        <span>{company.contactEmail}</span>
                      </div>
                    </div>

                    {hasApplied ? (
                      <div className={`application-status ${applicationStatus}`}>
                        {applicationStatus === 'approved' && '🎉 Application Approved!'}
                        {applicationStatus === 'pending' && '⏳ Application Under Review'}
                        {applicationStatus === 'rejected' && '❌ Application Rejected'}
                      </div>
                    ) : (
                      <button
                        className="btn apply-btn"
                        onClick={() => handleInsuranceApplication(company._id)}
                      >
                        📝 Apply for Insurance
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="billing-section">
          <h2>Billing & Payments</h2>
          <div className="billing-summary">
            <div className="summary-card">
              <FaMoneyBillWave size={30} />
              <div>
                <h3>Total Outstanding</h3>
                <p>${bills.filter(bill => bill.status === 'pending').reduce((total, bill) => total + (bill.patientResponsibility || 0), 0).toFixed(2)}</p>
              </div>
            </div>
            <div className="summary-card">
              <FaCreditCard size={30} />
              <div>
                <h3>Paid This Month</h3>
                <p>${bills.filter(bill => bill.status === 'paid').reduce((total, bill) => total + (bill.amount || 0), 0).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bills-list">
            <h3>Recent Bills</h3>
            {bills.map((bill) => (
              <div key={bill._id} className="bill-card">
                <div className="bill-header">
                  <div className="bill-info">
                    <h4>{bill.description}</h4>
                    <p>Due: {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : 'Date not available'}</p>
                  </div>
                  <div className="bill-amount">
                    <span className="amount">${bill.patientResponsibility || 0}</span>
                    <span className={`status ${bill.status}`}>{bill.status}</span>
                  </div>
                </div>

                {bill.breakdown && (
                  <div className="bill-breakdown">
                    <h5>Breakdown:</h5>
                    {bill.breakdown.map((item, index) => (
                      <div key={index} className="breakdown-item">
                        <span>{item.item || 'Unknown Item'} (x{item.quantity || 1})</span>
                        <span>${(item.cost || 0) * (item.quantity || 1)}</span>
                      </div>
                    ))}
                    {(bill.insuranceCovered || 0) > 0 && (
                      <div className="breakdown-item insurance">
                        <span>Insurance Coverage</span>
                        <span>-${bill.insuranceCovered || 0}</span>
                      </div>
                    )}
                  </div>
                )}

                {bill.status === 'pending' && (
                  <button
                    className="btn pay-btn"
                    onClick={() => handleBillPayment(bill._id)}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health Tips Section */}
      <div className="health-tips">
        <h2>Health Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Stay Hydrated</h4>
            <p>Drink at least 8 glasses of water daily to maintain good health.</p>
          </div>
          <div className="tip-card">
            <h4>Regular Check-ups</h4>
            <p>Schedule regular health check-ups to prevent potential issues.</p>
          </div>
          <div className="tip-card">
            <h4>Healthy Diet</h4>
            <p>Eat a balanced diet rich in fruits, vegetables, and whole grains.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
