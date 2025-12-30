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

const OPDModule = () => {
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
            <p><strong>Integrated with Billing, Appointments, A/D/T modules, Diagnosis Centres and Pharmacy</strong></p>
            <ul>
              <li>Record Patient allergies, History of present illness, Diagnosis and prescription advised by consultants</li>
              <li>Generate Patient Statistics (Department wise, Case wise, Consultant wise, Area wise, Gender wise)</li>
              <li>Direct transfer of Clinical orders to Lab and Pharmacy department</li>
              <li>Track patient history, last visits</li>
              <li>Collection reports (User wise, Department wise, Time wise, Consultant wise)</li>
            </ul>
          </div>
        </div>

        {/* Integration Features */}
        <div className="integration-section">
          <h2>Advanced Integrations</h2>
          <div className="integration-grid">
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

export default OPDModule;
