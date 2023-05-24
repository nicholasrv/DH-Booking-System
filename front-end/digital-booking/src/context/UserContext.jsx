import { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  return (
    <UserContext.Provider 
      value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}