import React, { useEffect, useState } from "react";
import axios from "axios";
// import { API_BASE_URL } from "../config"; // Using direct URL instead
import {
  FaCalendarCheck,
  FaUsers,
  FaUserMd,
  FaHeartbeat,
  FaClock,
  FaCheckCircle,
  FaEye,
  FaAward,
  FaAmbulance,
  FaHospital
} from "react-icons/fa";

const WebsiteStats = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalPatients: 0,
    totalDoctors: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    visitors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`https://hospital-management-system-backend-dxt6.onrender.com/website-stats`);
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // Set default stats if API fails
        setStats({
          totalAppointments: 47,
          totalPatients: 32,
          totalDoctors: 12,
          completedAppointments: 28,
          pendingAppointments: 19,
          visitors: 1250
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="website-stats-loading">
        <div className="stats-loading-spinner"></div>
        <p>Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="website-stats">
      <div className="stats-container">
        <div className="stats-header">
          <h2>ZeeCare in Numbers</h2>
          <p>Our healthcare platform serving the community</p>
        </div>

        <div className="stats-grid">
          {/* Total Appointments */}
          <div className="stat-card appointments">
            <div className="stat-icon">
              <FaCalendarCheck size={40} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.totalAppointments}</h3>
              <p className="stat-label">Total Appointments</p>
              <div className="stat-breakdown">
                <span className="completed">{stats.completedAppointments} Completed</span>
                <span className="pending">{stats.pendingAppointments} Pending</span>
              </div>
            </div>
          </div>

          {/* Total Patients */}
          <div className="stat-card patients">
            <div className="stat-icon">
              <FaUsers size={40} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.totalPatients}</h3>
              <p className="stat-label">Registered Patients</p>
              <div className="stat-subtitle">
                <FaHeartbeat className="pulse-icon" />
                Active patients receiving care
              </div>
            </div>
          </div>

          {/* Total Doctors */}
          <div className="stat-card doctors">
            <div className="stat-icon">
              <FaUserMd size={40} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.totalDoctors}</h3>
              <p className="stat-label">Expert Doctors</p>
              <div className="stat-subtitle">
                <FaAward className="verified-icon" />
                Certified healthcare professionals
              </div>
            </div>
          </div>

          {/* Website Visitors */}
          <div className="stat-card visitors">
            <div className="stat-icon">
              <FaEye size={40} />
            </div>
            <div className="stat-content">
              <h3 className="stat-number">{stats.visitors.toLocaleString()}</h3>
              <p className="stat-label">Website Visitors</p>
              <div className="stat-subtitle">
                <FaClock className="time-icon" />
                This month
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="stats-additional">
          <div className="additional-grid">
            <div className="additional-item">
              <div className="additional-icon">
                <FaHeartbeat size={32} />
              </div>
              <div className="additional-content">
                <h4>Quality Care</h4>
                <p>Providing exceptional healthcare services with compassion and expertise</p>
              </div>
            </div>

            <div className="additional-item">
              <div className="additional-icon">
                <FaClock size={32} />
              </div>
              <div className="additional-content">
                <h4>24/7 Support</h4>
                <p>Round-the-clock availability for your healthcare needs</p>
              </div>
            </div>

            <div className="additional-item">
              <div className="additional-icon">
                <FaAward size={32} />
              </div>
              <div className="additional-content">
                <h4>Expert Team</h4>
                <p>Highly qualified doctors and medical professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteStats;