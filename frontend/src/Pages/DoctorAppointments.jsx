import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { API_BASE_URL } from "../config"; // Using direct URL instead
import {
  FaCalendarAlt,
  FaFilePdf,
  FaUserMd,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaDownload,
  FaUser
} from "react-icons/fa";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [reports, setReports] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`https://hospital-management-system-backend-dxt6.onrender.com/Viewall-appointment`, {
          withCredentials: true,
        });
        setAppointments(res.data.appointments);
      } catch (err) {
        toast.error("Failed to load appointments");
      }
    };

    const fetchReports = async () => {
      try {
        const res = await axios.get(`https://hospital-management-system-backend-dxt6.onrender.com/doctor-reports`, {
          withCredentials: true,
        });
        setReports(res.data.reports);
      } catch (err) {
        toast.error("Failed to load reports");
      }
    };

    fetchAppointments();
    fetchReports();
  }, []);

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

  return (
    <div className="dashboard-wrapper">
      {/* Navigation Tabs */}
      <div className="dashboard-nav">
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            <FaCalendarAlt /> Appointments
          </button>
          <button
            className={`nav-tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FaFilePdf /> Patient Reports
          </button>
        </div>
      </div>

      {/* Appointments Tab */}
      {activeTab === 'appointments' && (
        <div className="appointments-section">
          <div className="section-header">
            <h2>All Appointments</h2>
          </div>

          {appointments.length === 0 ? (
            <div className="empty-state">
              <FaCalendarAlt size={48} />
              <h3>No appointments found</h3>
              <p>You don't have any appointments scheduled yet.</p>
            </div>
          ) : (
            <div className="appointment-list">
              {appointments.map((appt) => (
                <div key={appt._id} className="appointment-card">
                  <div className="appointment-header">
                    <div className="appointment-info">
                      <h4>{appt.disease || 'General Checkup'}</h4>
                      <p className="patient-info">
                        <FaUser /> Patient ID: {appt.user}
                      </p>
                    </div>
                    <div className={`appointment-status ${appt.status}`}>
                      {getStatusIcon(appt.status)}
                      <span>{appt.status}</span>
                    </div>
                  </div>

                  <div className="appointment-details">
                    <div className="detail-item">
                      <FaCalendarAlt />
                      <span>{appt.appointmentDate ? new Date(appt.appointmentDate).toLocaleDateString() : 'Date not set'}</span>
                    </div>
                    <div className="detail-item">
                      <FaClock />
                      <span>{appt.appointmentTime || 'Time not set'}</span>
                    </div>
                  </div>

                  {appt.about && (
                    <p className="appointment-description">{appt.about}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="reports-section">
          <div className="section-header">
            <h2>Patient Reports</h2>
            <div className="reports-summary">
              <span>{reports.length} Total Reports</span>
            </div>
          </div>

          {reports.length === 0 ? (
            <div className="empty-state">
              <FaFilePdf size={48} />
              <h3>No patient reports</h3>
              <p>Reports uploaded by your patients will appear here.</p>
            </div>
          ) : (
            <div className="reports-list">
              {reports.map((report) => (
                <div key={report._id} className="report-card">
                  <div className="report-icon">
                    <FaFilePdf size={30} />
                  </div>
                  <div className="report-info">
                    <h4>{report.filename}</h4>
                    <p>Patient: {report.patientId?.name}</p>
                    <p>Email: {report.patientId?.email}</p>
                    <small>Uploaded: {new Date(report.uploadDate).toLocaleDateString()}</small>
                  </div>
                  <div className="report-meta">
                    <span className="file-size">{report.size} KB</span>
                    <span className="report-type">{report.reportType}</span>
                  </div>
                  <div className="report-actions">
                    <button className="btn view-btn">
                      <FaEye /> View
                    </button>
                    <button className="btn download-btn">
                      <FaDownload /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
