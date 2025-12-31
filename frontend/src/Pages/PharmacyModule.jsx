import React from "react";
import {
  FaCloud,
  FaShieldAlt,
  FaCogs,
  FaUsers,
  FaHospital,
  FaCalendarAlt,
  FaStethoscope,
  FaAmbulance,
  FaFlask,
  FaPills,
  FaCreditCard,
  FaShoppingCart,
  FaMoneyBillWave,
  FaHeartbeat,
  FaWhatsapp,
  FaUserMd,
  FaFileInvoiceDollar,
  FaUserInjured,
  FaChartLine,
  FaDollarSign,
  FaThumbsUp
} from "react-icons/fa";

const PharmacyModule = () => {
  return (
    <div className="opd-module-page">
      <div className="opd-container">
        {/* Header Section */}
        <div className="opd-header">
          <div className="header-content">
            <FaCloud className="header-icon" />
            <h1>Cloud-Based Healthcare Solutions</h1>
            <p>In today's fast-paced healthcare environment, hospitals and healthcare facilities require efficient and user-friendly solutions to manage their operations seamlessly.</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {/* HIPAA Compliant */}
          <div className="feature-card hipaa">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <div className="feature-content">
              <h3>HIPAA Compliant</h3>
              <p>Our software plays a crucial role in healthcare operations, but it must prioritize patient data security & compliance with regulations such as the Health Insurance Portability & Accountability Act (HIPAA).</p>
            </div>
          </div>

          {/* All-in-One Solution */}
          <div className="feature-card solution">
            <div className="feature-icon">
              <FaCogs />
            </div>
            <div className="feature-content">
              <h3>All-in-One Solution</h3>
              <p>Healthcare Management Information System (HMIS) software has become indispensable for healthcare providers, streamlining operations and improving patient care.</p>
            </div>
          </div>

          {/* Customization Ready */}
          <div className="feature-card customization">
            <div className="feature-icon">
              <FaUsers />
            </div>
            <div className="feature-content">
              <h3>Customization Ready</h3>
              <p>Healthcare Management Information System (HMIS) software plays a pivotal role in modern healthcare, but every healthcare facility is unique with its specific requirements.</p>
            </div>
          </div>
        </div>

        {/* HIMS Aarogya Section */}
        <div className="aarogya-section">
          <div className="aarogya-header">
            <h2>HIMS</h2>
            <h3>Aarogya</h3>
          </div>
          <div className="aarogya-content">
            <p>Aarogya is a state of the art Hospital Information System(HIS) which is comprehensive enterprise wide software that covers all aspects of management and operations of small, medium and large hospitals. it enables healthcare providers to improve the operational effectiveness, reduce costs, reduce medical errors and enhance delivery of quality of care.</p>
            <p>The solution is modular and gives healthcare organizations the convenience of a flexible rollout strategy. Hospital can choose to prioritize the deployment of the those modules considered critical from the organization's patient care delivery goals.</p>
          </div>
        </div>

        {/* Software Modules */}
        <div className="modules-section">
          <h2>Software Modules</h2>
          <div className="modules-grid">
            <div className="module-item">
              <FaCalendarAlt />
              <span>Patient Appointment</span>
            </div>
            <div className="module-item">
              <FaStethoscope />
              <span>OPD/Consultancy</span>
            </div>
            <div className="module-item">
              <FaAmbulance />
              <span>Day-Care Emergency</span>
            </div>
            <div className="module-item">
              <FaHospital />
              <span>IPD</span>
            </div>
            <div className="module-item">
              <FaHeartbeat />
              <span>Operation Theatre</span>
            </div>
            <div className="module-item">
              <FaFlask />
              <span>Diagnostic Services</span>
            </div>
            <div className="module-item">
              <FaPills />
              <span>Pharmacy</span>
            </div>
            <div className="module-item">
              <FaCreditCard />
              <span>Corporate Billing</span>
            </div>
            <div className="module-item">
              <FaShoppingCart />
              <span>Purchase & Stores</span>
            </div>
            <div className="module-item">
              <FaMoneyBillWave />
              <span>Finance</span>
            </div>
            <div className="module-item">
              <FaUserMd />
              <span>Nursing Care</span>
            </div>
          </div>

          <div className="modules-description">
            <p><strong>Pharmacy Management Features:</strong></p>
            <ul>
              <li>Manage Indents, Ordering, Purchase, Sales and Stock of medicines</li>
              <li>Efficient tools for Expiry checks, Slow moving, and Non-moving items</li>
              <li>ABC/FSN Analysis reports for optimized pharmacy store management</li>
              <li>Prescription processing and automated dispensing systems</li>
              <li>Drug interaction checking and allergy alerts</li>
              <li>Integration with electronic prescribing and patient records</li>
            </ul>
            <p><strong>Discover More</strong></p>
          </div>
        </div>

        {/* Software Extensions */}
        <div className="integration-section">
          <h2>Software Extensions</h2>
          <div className="integration-grid">
            <div className="integration-card ambulance">
              <div className="integration-icon">
                <FaAmbulance />
              </div>
              <div className="integration-content">
                <h4>Ambulance</h4>
                <p>Ambulance dispatch: This feature allows hospital staff to quickly and efficiently dispatch ambulances to locations where patients need transport to the hospital</p>
                <p>Patient tracking: This feature enables hospital staff to track the location of the ambulance in real-time and monitor the patient's condition during transportation</p>
                <p>Resource management: This feature helps hospital staff to manage ambulance resources, including tracking the availability of ambulances, scheduling maintenance, and managing fuel expenses.</p>
                <p>Billing and documentation: This feature enables the hospital to generate invoices for ambulance services provided to patients and maintain detailed records of all ambulance-related activities for billing and auditing purposes.</p>
                <p>Reporting and analytics: An ambulance module also includes reporting and analytics tools that enable hospital staff to analyze ambulance service data to improve patient care, optimize resource utilization, and identify areas for improvement.</p>
              </div>
            </div>

            <div className="integration-card housekeeping">
              <div className="integration-icon">
                <FaUsers />
              </div>
              <div className="integration-content">
                <h4>Housekeeping</h4>
                <p>Streamlines housekeeping operations, manages room cleaning schedules, tracks maintenance requests, and ensures optimal facility cleanliness and maintenance.</p>
              </div>
            </div>

            <div className="integration-card dietary">
              <div className="integration-icon">
                <FaUserMd />
              </div>
              <div className="integration-content">
                <h4>Dietary</h4>
                <p>Manages patient dietary requirements, meal planning, nutritional assessments, and ensures proper diet administration according to medical prescriptions.</p>
              </div>
            </div>

            <div className="integration-card medical">
              <div className="integration-icon">
                <FaFileInvoiceDollar />
              </div>
              <div className="integration-content">
                <h4>M.R.D (Medical Records Department)</h4>
                <p>Comprehensive medical records management system for maintaining, organizing, and retrieving patient medical history, test results, and documentation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seamless Interfaces & Integrations */}
        <div className="integration-section">
          <h2>Seamless Interfaces & Integrations</h2>
          <div className="integration-grid">
            <div className="integration-card sms">
              <div className="integration-icon">
                <FaUserInjured />
              </div>
              <div className="integration-content">
                <h4>SMS & Email Interface</h4>
                <p>By integrating SMS and email with hospital software, healthcare providers can communicate more effectively and efficiently</p>
              </div>
            </div>

            <div className="integration-card lab">
              <div className="integration-icon">
                <FaFlask />
              </div>
              <div className="integration-content">
                <h4>Lab Machine Integration</h4>
                <p>Lab data can be automatically transferred & stored in a central database, reducing the risk of errors & improving operational efficiency</p>
              </div>
            </div>

            <div className="integration-card whatsapp">
              <div className="integration-icon">
                <FaWhatsapp />
              </div>
              <div className="integration-content">
                <h4>WhatsApp Integration</h4>
                <p>WhatsApp with hospital software, healthcare providers can communicate more effectively and efficiently, improving patient care & efficiency</p>
              </div>
            </div>

            <div className="integration-card consultant">
              <div className="integration-icon">
                <FaUserMd />
              </div>
              <div className="integration-content">
                <h4>Consultant Portal</h4>
                <p>Integrating consultant portals with hospital software, healthcare providers can easily share patient data, collaborate & manage schedules & appointments</p>
              </div>
            </div>

            <div className="integration-card tally">
              <div className="integration-icon">
                <FaFileInvoiceDollar />
              </div>
              <div className="integration-content">
                <h4>Tally Interface</h4>
                <p>This integration can help automate manual processes, reduce errors, and provide real-time financial data to hospital administrators</p>
              </div>
            </div>

            <div className="integration-card patient">
              <div className="integration-icon">
                <FaUserInjured />
              </div>
              <div className="integration-content">
                <h4>Patient Portal</h4>
                <p>Integrating patient portals with hospital software, patients can easily access their health information, schedule appointments & communicate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <h2>Key Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-card efficiency">
              <div className="benefit-icon">
                <FaChartLine />
              </div>
              <div className="benefit-content">
                <h4>Improved Efficiency</h4>
                <p>Streamline healthcare business processes such as patient scheduling, billing, and inventory management</p>
              </div>
            </div>

            <div className="benefit-card savings">
              <div className="benefit-icon">
                <FaDollarSign />
              </div>
              <div className="benefit-content">
                <h4>Cost Savings</h4>
                <p>Healthcare organizations can reduce administrative costs, improve supply chain management and reduce inventory costs</p>
              </div>
            </div>

            <div className="benefit-card decisions">
              <div className="benefit-icon">
                <FaThumbsUp />
              </div>
              <div className="benefit-content">
                <h4>Better Decision Making</h4>
                <p>Can provide real-time data on patient outcomes, financial performance and operational metrics</p>
              </div>
            </div>

            <div className="benefit-card experience">
              <div className="benefit-icon">
                <FaHeartbeat />
              </div>
              <div className="benefit-content">
                <h4>Enhanced Patient Experience</h4>
                <p>Streamlining processes and reducing wait times, Aarogya can help improve the patient experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyModule;
