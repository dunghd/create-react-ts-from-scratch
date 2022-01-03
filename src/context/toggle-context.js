import React from "react";

const ToggleContext = React.createContext();
ToggleContext.displayName = "ToggleContext";

function ToggleProvider({ children }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  const value = [on, toggle];

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
}

function useToggle() {
  const context = React.useContext(ToggleContext);
  if (context === undefined) {
    throw new Error(`useToggle must be used within a ToggleProvider`);
  }
  return context;
}

export { ToggleProvider, useToggle };
