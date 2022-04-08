import { createContext, useContext, useState } from "react";

const ConfigurationContext = createContext();

const ConfigurationProvider = (props) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [colorfulBackground, setColorfulBackground] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
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
      }}
      {...props}
    />
  );
};

const useConfiguration = () => useContext(ConfigurationContext);

export { ConfigurationProvider, useConfiguration };
