import { createContext, useContext, useState } from "react";

const ConfigurationContext = createContext();

const ConfigurationProvider = (props) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [colorfulBackground, setColorfulBackground] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const setTheme = (theme) => {
    if (theme === "dark") {
      setDarkTheme(true);
    } else if (theme === "light") {
      setDarkTheme(false);
    }
  };

  const toggleBackground = () => {
    setColorfulBackground(!colorfulBackground);
  };

  return (
    <ConfigurationContext.Provider
      value={{
        darkTheme,
        colorfulBackground,
        toggleTheme,
        toggleBackground,
        setTheme,
      }}
      {...props}
    />
  );
};

const useConfiguration = () => useContext(ConfigurationContext);

export { ConfigurationProvider, useConfiguration };
