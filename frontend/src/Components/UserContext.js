import React, { createContext, useContext, useState } from 'react';

// Create UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const updateUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <UserContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
