import { useEffect, useState } from "react";

const getDarkMode = () => JSON.parse(localStorage.getItem("dark-mode")) || false;

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(getDarkMode);

  useEffect(() => {
    const initialValue = getDarkMode();
    if (initialValue !== darkMode) {
      localStorage.setItem("dark-mode", darkMode);
      window.location.reload();
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};