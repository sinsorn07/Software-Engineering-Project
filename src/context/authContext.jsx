import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Function to log in the user
  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(res.data);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err; // Re-throw for component handling
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout", {}, {
        withCredentials: true,
      });
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };
  

  // Function to update the current user data
  const updateUser = (updatedData) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...updatedData, // Merge updated data into current user state
    }));
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...currentUser,
        ...updatedData, // Update localStorage with merged data
      })
    );
  };

  // Synchronize localStorage with current user data
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
