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

          {/* Radiology Module */}
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

          {/* OT Module */}
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

          {/* Pathology Module */}
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

          {/* Nursing Station Module */}
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

          {/* Inventory Module */}
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

          {/* Pharmacy Module */}
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
        </div>
      </div>
    </section>
  );
};

export default AarogyaModules;
