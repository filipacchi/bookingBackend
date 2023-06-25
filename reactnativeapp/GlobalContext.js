import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [showInformation, setShowInformation] = useState(false);

  const updateShowInformation = () => {
    setShowInformation(!showInformation);
  };

  const globalState = {
    showInformation,
    setShowInformation,
    updateShowInformation,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};
