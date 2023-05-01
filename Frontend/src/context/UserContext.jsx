import { createContext, useEffect, useState } from "react";
import { getToken } from "../helpers/auth";
import { API_URL } from "../env/env";
import axios from "axios"

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true); // variable de estado para indicar si se está cargando o no

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!getToken()) {
          setLoading(false); // indicar que ya no se está cargando
          return;
        } else {
          const response = await axios.get(`${API_URL}/users`, {
            headers: {
              Authorization: `Bearer ${getToken()}`
            },
          });
          setUserData(response.data.user);
          setLoading(false); // indicar que ya no se está cargando
        }
      } catch (error) {
        console.log("Error getting user data:", error);
        setLoading(false); // indicar que ya no se está cargando
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return null; // si se está cargando, no renderizar nada
  }

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }