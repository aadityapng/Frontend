import { createContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

const DarkModeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Mendapatkan nilai isDarkMode dari localStorage saat komponen dimuat
    const storedIsDarkMode = localStorage.getItem("isDarkMode");
    return storedIsDarkMode === null ? false : storedIsDarkMode === "true";
  });

  useEffect(() => {
    // Fungsi untuk menyimpan nilai isDarkMode ke localStorage
    const storeIsDarkMode = () => {
      localStorage.setItem("isDarkMode", isDarkMode);
    };

    // Memanggil fungsi storeIsDarkMode setiap kali nilai isDarkMode berubah
    window.addEventListener("beforeunload", storeIsDarkMode);

    // Membersihkan event listener saat komponen akan dimuat ulang
    return () => {
      window.removeEventListener("beforeunload", storeIsDarkMode);
    };
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const DarkMode = DarkModeContext;
export default DarkModeContextProvider;