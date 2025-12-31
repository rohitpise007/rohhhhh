import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../main";
// Using direct backend URL instead of API_BASE_URL
import {
  FaUsers,
  FaUserMd,
  FaCalendarAlt,
  FaFileAlt,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
  FaTrash,
  FaDownload,
  FaShieldAlt,
  FaMoneyBillWave,
  FaChartLine,
  FaHospital,
  FaAmbulance,
  FaHeartbeat,
  FaPhone
} from "react-icons/fa";

const AdminDashboard = () => {
  const { user, userRole } = useContext(Context);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`https://hospital-management-system-backend-dxt6.onrender.com/admin-dashboard`, {
          withCredentials: true,
        });
        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Failed to load admin dashboard:", error);
        console.error("Error details:", error.response?.data);
        console.error("Error status:", error.response?.status);
        console.error("Request URL:", `https://hospital-management-system-backend-dxt6.onrender.com/admin-dashboard`);
        setDashboardData(null);
      } finally {
        setLoading(false);
      }
    };

    // Try to fetch dashboard data if user is authenticated, regardless of role
    // The backend will handle authorization
    if (user) {
      fetchDashboardData();
    } else {
      console.log("No user found, not fetching dashboard");
      setLoading(false);
    }
  }, [user]);

  const handleInsuranceApproval = async (applicationId, action) => {
    try {
      const endpoint = action === 'approve'
        ? `https://hospital-management-system-backend-dxt6.onrender.com/insurance-applications/${applicationId}/approve`
        : `https://hospital-management-system-backend-dxt6.onrender.com/insurance-applications/${applicationId}/reject`;

      const response = await axios.post(endpoint, {}, {
        withCredentials: true,
      });

      // Update the local state
      setDashboardData(prev => ({
        ...prev,
        pendingInsuranceApps: prev.pendingInsuranceApps.filter(app => app._id !== applicationId)
      }));

      alert(`Insurance application ${action}d successfully!`);
    } catch (error) {
      console.error(`Failed to ${action} insurance application:`, error);
      alert(`Failed to ${action} insurance application`);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    try {
      await axios.post(`https://hospital-management-system-backend-dxt6.onrender.com/delete-doctor/${doctorId}`, {}, {
        withCredentials: true,
      });

      setDashboardData(prev => ({
        ...prev,
        doctors: prev.doctors.filter(doctor => doctor._id !== doctorId)
      }));

      alert('Doctor deleted successfully!');
    } catch (error) {
      console.error('Failed to delete doctor:', error);
      alert('Failed to delete doctor');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-wrapper">
        <div className="error-container">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this dashboard.</p>
          <p>Please ensure you are logged in as an administrator.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-wrapper">
      {/* Admin Header */}
      <div className="admin-header">
        <div className="admin-welcome">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.name || 'Administrator'}</p>
        </div>
        <div className="admin-stats-overview">
          <div className="stat-mini">
            <FaUsers />
            <span>{dashboardData.patients?.length || 0} Patients</span>
          </div>
          <div className="stat-mini">
            <FaUserMd />
            <span>{dashboardData.doctors?.length || 0} Doctors</span>
          </div>
          <div className="stat-mini">
            <FaCalendarAlt />
            <span>{dashboardData.appointments?.length || 0} Appointments</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-nav">
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaChartLine /> Overview
          </button>
          <button
            className={`nav-tab ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            <FaCalendarAlt /> Appointments
          </button>
          <button
            className={`nav-tab ${activeTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            <FaUserMd /> Doctors
          </button>
          <button
            className={`nav-tab ${activeTab === 'insurance' ? 'active' : ''}`}
            onClick={() => setActiveTab('insurance')}
          >
            <FaShieldAlt /> Insurance
          </button>
          <button
            className={`nav-tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FaFileAlt /> Reports
          </button>
          <button
            className={`nav-tab ${activeTab === 'billing' ? 'active' : ''}`}
            onClick={() => setActiveTab('billing')}
          >
            <FaCreditCard /> Billing
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="overview-section">
          {/* Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card patients">
              <div className="stat-icon">
                <FaUsers size={40} />
              </div>
              <div className="stat-content">
                <h3 className="stat-number">{dashboardData.patients?.length || 0}</h3>
                <p className="stat-label">Total Patients</p>
                <div className="stat-subtitle">
                  <FaHeartbeat className="pulse-icon" />
                  Registered users
                </div>
              </div>
            </div>

            <div className="stat-card doctors">
              <div className="stat-icon">
                <FaUserMd size={40} />
              </div>
              <div className="stat-content">
                <h3 className="stat-number">{dashboardData.doctors?.length || 0}</h3>
                <p className="stat-label">Total Doctors</p>
                <div className="stat-subtitle">
                  <FaHospital className="verified-icon" />
                  Healthcare professionals
                </div>
              </div>
            </div>

            <div className="stat-card appointments">
              <div className="stat-icon">
                <FaCalendarAlt size={40} />
              </div>
              <div className="stat-content">
                <h3 className="stat-number">{dashboardData.appointments?.length || 0}</h3>
                <p className="stat-label">Total Appointments</p>
                <div className="stat-subtitle">
                  <FaClock className="time-icon" />
                  Scheduled visits
                </div>
              </div>
            </div>

            <div className="stat-card insurance">
              <div className="stat-icon">
                <FaShieldAlt size={40} />
              </div>
              <div className="stat-content">
                <h3 className="stat-number">{dashboardData.pendingInsuranceApps?.length || 0}</h3>
                <p className="stat-label">Pending Insurance</p>
                <div className="stat-subtitle">
                  <FaCheckCircle className="approved-icon" />
                  Applications to review
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-grid">
              <div className="activity-card">
                <FaUsers className="activity-icon" />
                <div className="activity-content">
                  <h4>New Patient Registration</h4>
                  <p>John Doe registered 2 hours ago</p>
                  <span className="activity-time">2h ago</span>
                </div>
              </div>

              <div className="activity-card">
                <FaCalendarAlt className="activity-icon" />
                <div className="activity-content">
                  <h4>Appointment Scheduled</h4>
                  <p>Dr. Smith consultation booked</p>
                  <span className="activity-time">4h ago</span>
                </div>
              </div>

              <div className="activity-card">
                <FaShieldAlt className="activity-icon" />
                <div className="activity-content">
                  <h4>Insurance Application</h4>
                  <p>New application submitted</p>
                  <span className="activity-time">6h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="appointments-section">
          <div className="section-header">
            <h2>All Appointments</h2>
            <div className="filters">
              <select className="filter-select">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="appointments-table">
            <div className="table-header">
              <div>Patient</div>
              <div>Doctor</div>
              <div>Disease</div>
              <div>Date & Time</div>
              <div>Status</div>
            </div>

            {dashboardData.appointments?.map((appointment) => (
              <div key={appointment._id} className="table-row">
                <div className="patient-info">
                  <strong>{appointment.user?.name}</strong>
                  <span>{appointment.user?.email}</span>
                </div>
                <div className="doctor-info">
                  <strong>Dr. {appointment.doctor?.name}</strong>
                  <span>{appointment.doctor?.specialty}</span>
                </div>
                <div>{appointment.disease || 'General Checkup'}</div>
                <div>
                  {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : 'N/A'}
                  <br />
                  <small>{appointment.appointmentTime || 'N/A'}</small>
                </div>
                <div>
                  <span className={`status-badge ${appointment.status}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'doctors' && (
        <div className="doctors-section">
          <div className="section-header">
            <h2>All Doctors</h2>
            <button className="btn primary-btn">Add New Doctor</button>
          </div>

          <div className="doctors-grid">
            {dashboardData.doctors?.map((doctor) => (
              <div key={doctor._id} className="doctor-admin-card">
                <div className="doctor-header">
                  <div className="doctor-avatar">
                    {doctor.image ? (
                      <img src={`/uploads/doctors/${doctor.image}`} alt={doctor.name} />
                    ) : (
                      <FaUserMd size={40} />
                    )}
                  </div>
                  <div className="doctor-info">
                    <h3>Dr. {doctor.name}</h3>
                    <p>{doctor.specialty || 'General Physician'}</p>
                    <p className="doctor-email">{doctor.email}</p>
                  </div>
                </div>

                <div className="doctor-stats">
                  <div className="stat">
                    <FaCalendarAlt />
                    <span>{doctor.experience || '5+'} years</span>
                  </div>
                  <div className="stat">
                    <FaPhone />
                    <span>{doctor.phone}</span>
                  </div>
                </div>

                <div className="doctor-actions">
                  <button className="btn view-btn">
                    <FaEye /> View Details
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDeleteDoctor(doctor._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'insurance' && (
        <div className="insurance-section">
          <div className="section-header">
            <h2>Insurance Applications</h2>
            <div className="filters">
              <select className="filter-select">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="insurance-applications">
            {dashboardData.pendingInsuranceApps?.map((application) => (
              <div key={application._id} className="insurance-card">
                <div className="application-header">
                  <div className="patient-info">
                    <h4>{application.patientId?.name}</h4>
                    <p>{application.patientId?.email}</p>
                  </div>
                  <div className="company-info">
                    <h4>{application.insuranceCompanyId?.name}</h4>
                    <p>Coverage: {application.coverageType}</p>
                  </div>
                  <div className="application-date">
                    <small>Applied: {new Date(application.applicationDate).toLocaleDateString()}</small>
                  </div>
                </div>

                <div className="application-actions">
                  <button
                    className="btn approve-btn"
                    onClick={() => handleInsuranceApproval(application._id, 'approve')}
                  >
                    <FaCheckCircle /> Approve
                  </button>
                  <button
                    className="btn reject-btn"
                    onClick={() => handleInsuranceApproval(application._id, 'reject')}
                  >
                    <FaTimesCircle /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="reports-section">
          <div className="section-header">
            <h2>All Medical Reports</h2>
            <div className="filters">
              <select className="filter-select">
                <option value="all">All Reports</option>
                <option value="recent">Recent</option>
                <option value="medical_report">Medical Reports</option>
                <option value="lab_result">Lab Results</option>
              </select>
            </div>
          </div>

          <div className="reports-list">
            {dashboardData.recentReports?.map((report) => (
              <div key={report._id} className="report-admin-card">
                <div className="report-info">
                  <div className="report-icon">
                    <FaFileAlt size={30} />
                  </div>
                  <div className="report-details">
                    <h4>{report.filename}</h4>
                    <p>Patient: {report.patientId?.name}</p>
                    <p>Doctor: {report.doctorId?.name || 'N/A'}</p>
                    <small>Uploaded: {new Date(report.uploadDate).toLocaleDateString()}</small>
                  </div>
                </div>

                <div className="report-actions">
                  <button className="btn download-btn">
                    <FaDownload /> Download
                  </button>
                  <button className="btn view-btn">
                    <FaEye /> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="billing-section">
          <div className="section-header">
            <h2>Billing Management</h2>
            <div className="billing-summary">
              <div className="summary-stat">
                <FaMoneyBillWave />
                <div>
                  <h4>Total Billed</h4>
                  <p>${dashboardData.billingStats?.total || 0}</p>
                </div>
              </div>
              <div className="summary-stat">
                <FaCheckCircle />
                <div>
                  <h4>Paid Bills</h4>
                  <p>{dashboardData.billingStats?.paid || 0}</p>
                </div>
              </div>
              <div className="summary-stat">
                <FaClock />
                <div>
                  <h4>Pending Bills</h4>
                  <p>{dashboardData.billingStats?.pending || 0}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bills-management">
            <h3>Bill Management</h3>
            <p>Detailed billing information and payment tracking will be available here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;