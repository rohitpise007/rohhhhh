const mongoose = require('mongoose');
const InsuranceCompany = require('../models/InsuranceCompany');
require('dotenv').config();

const insuranceCompanies = [
  {
    name: "HealthFirst Insurance",
    description: "Comprehensive health insurance covering medical, dental, and vision care.",
    benefits: [
      "Complete medical coverage",
      "Dental and vision care",
      "Emergency services",
      "Prescription drugs",
      "Mental health support"
    ],
    contactNumber: "+1-800-HEALTH1",
    contactEmail: "support@healthfirst.com",
    website: "https://www.healthfirst.com",
    coverageTypes: ["medical", "dental", "vision", "prescription"],
    premiumRange: { min: 150, max: 450 }
  },
  {
    name: "MediCare Plus",
    description: "Advanced healthcare coverage with wellness programs and preventive care.",
    benefits: [
      "Preventive care coverage",
      "Wellness programs",
      "Telemedicine services",
      "Specialist consultations",
      "Hospitalization coverage"
    ],
    contactNumber: "+1-800-MEDICARE",
    contactEmail: "info@medicareplus.com",
    website: "https://www.medicareplus.com",
    coverageTypes: ["medical", "hospitalization", "prescription"],
    premiumRange: { min: 200, max: 600 }
  },
  {
    name: "SecureHealth Insurance",
    description: "Reliable health insurance with extensive network of healthcare providers.",
    benefits: [
      "Large provider network",
      "24/7 customer support",
      "Chronic disease management",
      "Maternity coverage",
      "Ambulance services"
    ],
    contactNumber: "+1-800-SECUREHL",
    contactEmail: "contact@securehealth.com",
    website: "https://www.securehealth.com",
    coverageTypes: ["medical", "dental", "vision"],
    premiumRange: { min: 120, max: 380 }
  },
  {
    name: "VitalCare Insurance",
    description: "Affordable health insurance focused on essential medical services.",
    benefits: [
      "Essential medical services",
      "Affordable premiums",
      "Online account management",
      "Family coverage options",
      "Emergency care"
    ],
    contactNumber: "+1-800-VITALCR",
    contactEmail: "support@vitalcare.com",
    website: "https://www.vitalcare.com",
    coverageTypes: ["medical", "prescription"],
    premiumRange: { min: 80, max: 250 }
  },
  {
    name: "PrimeHealth Solutions",
    description: "Premium health insurance with advanced treatment options and global coverage.",
    benefits: [
      "Global coverage",
      "Advanced treatments",
      "VIP services",
      "Second opinion services",
      "Wellness coaching"
    ],
    contactNumber: "+1-800-PRIMEHL",
    contactEmail: "premium@primehealth.com",
    website: "https://www.primehealth.com",
    coverageTypes: ["medical", "dental", "vision", "prescription", "hospitalization"],
    premiumRange: { min: 300, max: 1000 }
  },
  {
    name: "CareConnect Insurance",
    description: "Connected health insurance with digital health tracking and telemedicine.",
    benefits: [
      "Digital health tracking",
      "Telemedicine consultations",
      "Mobile app access",
      "Wearable device integration",
      "Health coaching"
    ],
    contactNumber: "+1-800-CARECON",
    contactEmail: "digital@careconnect.com",
    website: "https://www.careconnect.com",
    coverageTypes: ["medical", "telemedicine"],
    premiumRange: { min: 100, max: 320 }
  }
];

const seedInsuranceCompanies = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/medapp');

    // Clear existing data
    await InsuranceCompany.deleteMany({});
    console.log('Cleared existing insurance companies');

    // Insert new data
    await InsuranceCompany.insertMany(insuranceCompanies);
    console.log('Successfully seeded insurance companies');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding insurance companies:', error);
    process.exit(1);
  }
};

seedInsuranceCompanies();
