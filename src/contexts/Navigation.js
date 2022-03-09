import React, { useContext, createContext, useState, useEffect } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  useEffect(() => {}, []);
  const [noteWindow, setNoteWindow] = useState({showNote:false,type:"input",item:{}});
  const [showTally, setShowTally] = useState(false);

  return (
    <NavigationContext.Provider
      value={{
        noteWindow,
        setNoteWindow,
        showTally,
        setShowTally,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
