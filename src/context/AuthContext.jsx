import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const userInfo = localStorage.getItem("userInfo");

        if (token && userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          // console.log("Retrieved user info:", parsedUserInfo);

          if (parsedUserInfo && parsedUserInfo.username) {
            setUser(parsedUserInfo);
          } else {
            console.error("Invalid user data in storage");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    console.log("Logging in with user data:", userData);
    console.log("Login validation:", {
      hasUserData: !!userData,
      hasUsername: userData?.username,
      hasEmail: userData?.email,
      hasToken: !!token,
      userDataKeys: userData ? Object.keys(userData) : []
    });

    if (!userData || !userData.username) {
      console.error("Invalid user data provided to login:", {
        userData,
        missingUsername: !userData?.username
      });
      return;
    }

    try {
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      setUser(userData);
      console.log("User data stored successfully");
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const logout = () => {
    console.log("Logging out user");
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      setUser(null);
      console.log("User data cleared successfully");
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  // console.log("AuthContext current state:", value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
