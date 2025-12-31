# Hospital Management System - Frontend

This is the frontend application for the Hospital Management System built with React, Vite, and modern web technologies.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install
```

### Development
```bash
# Start development server
npm run dev
```
The app will run on `http://localhost:5173`

### Production Build
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🔧 Configuration

### Backend API
The frontend is configured to use the deployed backend API:
```
https://hospital-management-system-backend-dxt6.onrender.com
```

### Environment Variables
The API base URL is configured in `src/config.js`:
```javascript
export const API_BASE_URL = 'https://hospital-management-system-backend-dxt6.onrender.com';
```

## 📱 Features

### Authentication
- **Patient Registration**: `/register`
- **Patient Login**: `/login`
- **Admin Login**: `/admin-login`

### Dashboards
- **Patient Dashboard**: `/dashboard`
- **Admin Dashboard**: `/admin-dashboard`
- **Doctor Dashboard**: `/Viewall-appointment`

### Healthcare Services
- **Appointment Booking**: `/appointment`
- **OPD Module**: `/opd-module`
- **Hospital Statistics**: Homepage

## 🏥 User Roles

### Patient
- Register and login
- Book appointments
- View medical reports
- Access billing information
- Apply for insurance

### Doctor
- Login to system
- View assigned appointments
- Manage patient care

### Admin
- Full system management
- User management
- Doctor registration
- System statistics
- Insurance management

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: CSS with glassmorphism effects
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Icons**: React Icons

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Hosting Services
The `dist` folder contains the production build that can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Environment Configuration
For different environments, you can override the API URL:
```bash
# Development
VITE_API_BASE_URL=http://localhost:5000 npm run dev

# Production (default)
npm run build
```

## 🔍 Troubleshooting

### Common Issues

1. **Login not working**
   - Check if backend is running
   - Verify API_BASE_URL in config.js
   - Check browser console for network errors

2. **Registration failing**
   - Ensure all required fields are filled
   - Check password strength requirements
   - Verify email format

3. **Build failing**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

### Debug Mode
Enable detailed logging by checking the browser's developer console (F12) for:
- Network requests to the backend
- Authentication state changes
- Error messages

## 📞 Support

For issues or questions:
1. Check the browser console for error messages
2. Verify backend API is accessible
3. Ensure all dependencies are installed correctly

## 📄 License

ISC License