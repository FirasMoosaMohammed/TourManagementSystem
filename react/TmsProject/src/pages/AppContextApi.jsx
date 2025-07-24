import { createContext, useState, useEffect } from "react";
import { listPackages, listSchedules } from "../api/fetchApi";

export const AppContext = createContext();

function AppContextApi({ children }) {
  const [packages, setPackages] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  const fetchPackages = async () => {
    try {
      const res = await listPackages();
      setPackages(res.data || []);
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  const fetchSchedules = async () => {
    try {
      const res = await listSchedules();
      setSchedules(res.data || []);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchSchedules();
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        packages,
        schedules,
        fetchPackages,
        fetchSchedules,
        setPackages,
        setSchedules,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextApi;
