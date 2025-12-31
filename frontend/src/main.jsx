import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f8f9ff'
        }}>
          <h1 style={{ color: '#e74c3c', marginBottom: '20px' }}>Something went wrong!</h1>
          <p style={{ color: '#666', textAlign: 'center', maxWidth: '600px' }}>
            The application encountered an error. Please refresh the page or contact support.
          </p>
          <details style={{ marginTop: '20px', textAlign: 'left' }}>
            <summary style={{ cursor: 'pointer', color: '#3498db' }}>Error Details</summary>
            <pre style={{
              backgroundColor: '#f8f8f8',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              overflow: 'auto',
              maxWidth: '600px',
              fontSize: '12px',
              marginTop: '10px'
            }}>
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const Context = createContext({
  isAuthenticated: false,
  user: {},
  userRole: null,
});

console.log("🚀 App starting...");

const AppWrapper = () => {
  console.log("📦 AppWrapper component rendering");
  // Load authentication state from localStorage on app start
  const loadAuthState = () => {
    try {
      const savedAuth = localStorage.getItem('authState');
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        console.log("Loading saved auth state:", authData);
        return authData;
      }
    } catch (error) {
      console.error("Error loading auth state:", error);
    }
    return { isAuthenticated: false, user: {}, userRole: null };
  };

  const initialAuthState = loadAuthState();

  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState.isAuthenticated);
  const [user, setUser] = useState(initialAuthState.user);
  const [userRole, setUserRole] = useState(initialAuthState.userRole);

  const updateUser = (userData) => {
    console.log("updateUser called with:", userData);
    console.log("Setting userRole to:", userData?.role || null);
    setUser(userData);
    setUserRole(userData?.role || null);

    // Save to localStorage
    const authState = {
      isAuthenticated: true,
      user: userData,
      userRole: userData?.role || null
    };
    localStorage.setItem('authState', JSON.stringify(authState));
  };

  const updateIsAuthenticated = (value) => {
    setIsAuthenticated(value);
    if (!value) {
      // Clear localStorage when logging out
      localStorage.removeItem('authState');
      setUser({});
      setUserRole(null);
    }
  };

  console.log("🔧 Context provider rendering with:", {
    isAuthenticated,
    user,
    userRole
  });

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated: updateIsAuthenticated,
        user,
        setUser: updateUser,
        userRole,
        setUserRole,
      }}
    >
      <App />
    </Context.Provider>
  );
};

console.log("🎯 Starting React app...");

const rootElement = document.getElementById("root");
console.log("📍 Root element found:", rootElement);

if (!rootElement) {
  console.error("❌ Root element not found!");
} else {
  console.log("✅ Root element found, creating React root...");
  const root = ReactDOM.createRoot(rootElement);
  console.log("✅ React root created, rendering app...");

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <AppWrapper />
      </ErrorBoundary>
    </React.StrictMode>
  );

  console.log("✅ App rendered successfully!");
}
