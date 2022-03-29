import { createContext, useContext, useState } from "react";

const ConfigurationContext = createContext();

const ConfigurationProvider = (props) => {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <ConfigurationContext.Provider
      value={{
        darkTheme,
        toggleTheme,
      }}
      {...props}
    />
  );
};

const useConfiguration = () => useContext(ConfigurationContext);

export { ConfigurationProvider, useConfiguration };
