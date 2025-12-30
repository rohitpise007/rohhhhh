import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({
  isAuthenticated: false,
  user: {},
  userRole: null,
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState(null);

  const updateUser = (userData) => {
    console.log("updateUser called with:", userData);
    console.log("Setting userRole to:", userData?.role || null);
    setUser(userData);
    setUserRole(userData?.role || null);
  };

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
