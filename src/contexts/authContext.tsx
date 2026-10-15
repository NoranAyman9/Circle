import { createContext, useEffect, useState, type ReactElement } from "react";
import { authServices } from "../services/authService";

// 1- create Context
export const authContext = createContext<any>({});

// 2- create context provider (components, data)
export default function AuthContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getUserData() {
    try {
      const { data } = await authServices.getUserData();      
      setUserData(data.user);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, userData }}>
      {children}
    </authContext.Provider>
  );
}