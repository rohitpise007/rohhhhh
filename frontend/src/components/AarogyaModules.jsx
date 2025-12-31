import React from "react";
import { Link } from "react-router-dom";

const AarogyaModules = () => {
  return (
    <section className="aarogya-hms-section">
      <div className="aarogya-container">
        {/* Header - Exact match from image */}
        <div className="aarogya-header">
          <h2 className="aarogya-title">
            AAROGYA HMS MODULES - HOSPITAL MANAGEMENT SYSTEM
          </h2>
          <p className="aarogya-subtitle">
            Aarogya Hospital Software is suitable for small nursing homes (10-bed) to Large Hospital (2000-bed) with modular approach serving over 100,000 patients as well as Cloud Healthcare software suite in Client/Server version
          </p>
        </div>

        {/* Modules Grid - Exact yellow cards from image */}
        <div className="modules-grid">
          {/* Patient Appointment Module */}
          <Link to="/appointment" className="module-card-link">
            <div className="module-card patient-appointment">
              <div className="module-icon">
                <span className="module-emoji">👤</span>
                  </div>
              <div className="module-content">
                <h3 className="module-title">
                  Patient Appointment
                  </h3>
                <p className="module-description">
                  Patient can book their appointments at Hospital Desk or Online through Hospital Portal or App for a consultant as per available slot, Make payments and get notification for booked appointment on their mobile.
                  </p>
                  </div>
                </div>
              </Link>

          {/* OPD Module */}
          <Link to="/opd-module" className="module-card-link">
            <div className="module-card opd-module">
              <div className="module-icon">
                <span className="module-emoji">🏥</span>
              </div>
              <div className="module-content">
                <h3 className="module-title">
                  OPD Module
                </h3>
                <p className="module-description">
                  OPD Management module streamlines the entire OPD cycle from Patient OP registration, Queue management, Billing, Consultant Computerised Prescription, Daycare scheduling, making it more efficient for both patients and healthcare providers.
                </p>
              </div>
            </div>
          </Link>

          {/* IPD Module */}
          <Link to="/ipd-module" className="module-card-link">
            <div className="module-card ipd-module">
              <div className="module-icon">
                <span className="module-emoji">🏢</span>
              </div>
              <div className="module-content">
                <h3 className="module-title">
                  IPD Module
                </h3>
                <p className="module-description">
                  Indoor Patient Management module helps to manage efficiently the Admission, Discharge, Transfer (A/D/T) process, Nursing Care, Patient provisional and final bills and Discharge Summary and many more.
                </p>
              </div>
            </div>
          </Link>

          {/* Radiology Module */}
          <Link to="/radiology-module" className="module-card-link">
            <div className="module-card radiology-module">
              <div className="module-icon">
                <span className="module-emoji">🩻</span>
              </div>
              <div className="module-content">
                <h3 className="module-title">
                  Radiology
              </h3>
                <p className="module-description">
                  This module covers sub-specialties such as X-Ray, Ultrasound, CT Scan, MRI etc. Managing entire Radiology process from Registration, Scheduling tests to generating Test reports.
                </p>
              </div>
            </div>
          </Link>

          {/* OT Module */}
          <Link to="/ot-module" className="module-card-link">
            <div className="module-card ot-module">
              <div className="module-icon">
                <span className="module-emoji">🔪</span>
              </div>
              <div className="module-content">
                <h3 className="module-title">
                  OT Module
                </h3>
                <p className="module-description">
                  O.T. Management helps to Book O.T., Schedule Surgeries, Record surgical notes, Pre and post Anaesthesia follow-ups, O.T. Consents etc.
                </p>
              </div>
            </div>
          </Link>

          {/* Pathology Module */}
          <Link to="/pathology-module" className="module-card-link">
            <div className="module-card pathology-module">
              <div className="module-icon">
                <span className="module-emoji">🧪</span>
              </div>
              <div className="module-content">
                <h3 className="module-title">
                  Pathology
                </h3>
                <p className="module-description">
                  The Laboratory module handles OP/IP Patient Test Bookings, Sample Collection, Test report preparation, Lab inventory, linked with Consultant module and robust Interfacing with Lab Machines for Auto test result data capture.
                </p>
              </div>
            </div>
          </Link>

          {/* Nursing Station Module */}
          <Link to="/nursing-station-module" className="module-card-link">
            <div className="module-card nursing-module">
              <div className="module-icon">
                <span className="module-emoji">👩‍⚕️</span>
              </div>
              <div className="module-content">
                <h3 className="module-title">
                  Nursing Station
                </h3>
                <p className="module-description">
                  The Nursing Care module manages the Operation of nursing Stations in a hospital providing centralized platform for nursing staff to provide better patient care, communicate & access patient information across the departments in the hospital.
                </p>
              </div>
            </div>
          </Link>

          {/* Inventory Module */}
          <Link to="/inventory-module" className="module-card-link">
            <div className="module-card inventory-module">
              <div className="module-icon">
                <span className="module-emoji">📦</span>
              </div>
              <div className="module-content">
                <h3 className="module-title">
                  Inventory Module
                </h3>
                <p className="module-description">
                  It is designed to track the procurement and supply of hospital Consumables, equipment and other inventory items of hospital stores.
                </p>
              </div>
            </div>
          </Link>

          {/* Pharmacy Module */}
          <Link to="/pharmacy-module" className="module-card-link">
            <div className="module-card pharmacy-module">
              <div className="module-icon">
                <span className="module-emoji">💊</span>
              </div>
              <div className="module-content">
                <h3 className="module-title">
                  Pharmacy Module
                </h3>
                <p className="module-description">
                  Aarogya Pharmacy module manages Indents, Ordering, Purchase, Sales and Stock of medicines. Efficient tools like Expiry checks, Slow moving, Non-moving Items, ABC/FSN Analysis reports helps to run Pharmacy store at optimized levels.
                </p>
              </div>
            </div>
          </Link>

          {/* Billing & Finance Module */}
          <div className="module-card billing-module">
            <div className="module-icon">
              <span className="module-emoji">💰</span>
            </div>
            <div className="module-content">
              <h3 className="module-title">
                Billing & Finance
              </h3>
              <p className="module-description">
                Comprehensive billing system handling OP/IP billing, insurance claims, corporate billing, payment processing, financial reporting, and revenue cycle management for optimal financial performance.
              </p>
            </div>
          </div>

          {/* Blood Bank Module */}
          <div className="module-card bloodbank-module">
            <div className="module-icon">
              <span className="module-emoji">🩸</span>
            </div>
            <div className="module-content">
              <h3 className="module-title">
                Blood Bank
              </h3>
              <p className="module-description">
                Complete blood bank management including donor registration, blood collection, testing, storage, inventory management, cross-matching, and transfusion records with compliance to safety standards.
              </p>
            </div>
          </div>

          {/* CSSD Module */}
          <div className="module-card cssd-module">
            <div className="module-icon">
              <span className="module-emoji">🧹</span>
            </div>
            <div className="module-content">
              <h3 className="module-title">
                CSSD (Central Sterile Supply Department)
              </h3>
              <p className="module-description">
                Manages sterilization processes, instrument tracking, equipment maintenance, quality control, and ensures proper sterilization protocols for surgical instruments and medical devices.
              </p>
            </div>
          </div>

          {/* HR & Payroll Module */}
          <div className="module-card hr-module">
            <div className="module-icon">
              <span className="module-emoji">👥</span>
            </div>
            <div className="module-content">
              <h3 className="module-title">
                HR & Payroll
              </h3>
              <p className="module-description">
                Employee management system covering staff scheduling, attendance tracking, payroll processing, leave management, performance evaluation, and compliance with labor regulations.
              </p>
            </div>
          </div>

          {/* Asset Management Module */}
          <div className="module-card asset-module">
            <div className="module-icon">
              <span className="module-emoji">🏗️</span>
            </div>
            <div className="module-content">
              <h3 className="module-title">
                Asset Management
              </h3>
              <p className="module-description">
                Tracks hospital equipment and assets, maintenance schedules, depreciation, insurance coverage, and ensures optimal utilization of medical equipment and facilities.
              </p>
            </div>
          </div>

          {/* Housekeeping Module */}
          <div className="module-card housekeeping-module">
            <div className="module-icon">
              <span className="module-emoji">🧽</span>
            </div>
            <div className="module-content">
              <h3 className="module-title">
                Housekeeping
              </h3>
              <p className="module-description">
                Manages housekeeping operations, room cleaning schedules, maintenance requests, inventory of cleaning supplies, and ensures optimal facility cleanliness and maintenance standards.
              </p>
            </div>
          </div>

          {/* Dietary Module */}
          <div className="module-card dietary-module">
            <div className="module-icon">
              <span className="module-emoji">🍽️</span>
            </div>
            <div className="module-content">
              <h3 className="module-title">
                Dietary Services
              </h3>
              <p className="module-description">
                Manages patient dietary requirements, meal planning, nutritional assessments, diet administration, kitchen operations, and ensures proper nutrition according to medical prescriptions.
              </p>
            </div>
          </div>

          {/* Medical Records Module */}
          <div className="module-card mrd-module">
            <div className="module-icon">
              <span className="module-emoji">📋</span>
            </div>
            <div className="module-content">
              <h3 className="module-title">
                Medical Records (MRD)
              </h3>
              <p className="module-description">
                Comprehensive medical records management system for maintaining, organizing, and retrieving patient medical history, test results, discharge summaries, and ensuring HIPAA compliance.
              </p>
            </div>
          </div>

          {/* CRM Module */}
          <div className="module-card crm-module">
            <div className="module-icon">
              <span className="module-emoji">🤝</span>
            </div>
            <div className="module-content">
              <h3 className="module-title">
                CRM (Customer Relationship Management)
              </h3>
              <p className="module-description">
                Patient relationship management system for tracking patient interactions, feedback, loyalty programs, appointment reminders, and improving overall patient satisfaction and retention.
              </p>
            </div>
          </div>

          {/* Bio-Medical Waste Module */}
          <div className="module-card waste-module">
            <div className="module-icon">
              <span className="module-emoji">🗑️</span>
            </div>
            <div className="module-content">
              <h3 className="module-title">
                Bio-Medical Waste Management
              </h3>
              <p className="module-description">
                Manages bio-medical waste segregation, collection, treatment, disposal, and ensures compliance with environmental and health safety regulations for proper waste management.
              </p>
            </div>
          </div>

          {/* Emergency Module */}
          <div className="module-card emergency-module">
            <div className="module-icon">
              <span className="module-emoji">🚨</span>
            </div>
            <div className="module-content">
              <h3 className="module-title">
                Emergency Management
              </h3>
              <p className="module-description">
                Emergency department management system for triage, patient assessment, emergency response coordination, ambulance tracking, and critical care management in emergency situations.
              </p>
            </div>
          </div>

          {/* Quality Assurance Module */}
          <div className="module-card quality-module">
            <div className="module-icon">
              <span className="module-emoji">⭐</span>
            </div>
            <div className="module-content">
              <h3 className="module-title">
                Quality Assurance
              </h3>
              <p className="module-description">
                Monitors and ensures quality standards across all hospital operations, tracks KPIs, manages accreditations, conducts audits, and implements continuous quality improvement programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AarogyaModules;
