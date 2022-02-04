import React from "react";

const ToggleContext = React.createContext();
ToggleContext.displayName = "ToggleContext";

function callAll(...fns) {
  return (...args) => {
    fns.forEach((fn) => {
      console.log(args);
      fn && fn(...args);
    });
  };
}

function ToggleProvider({ children }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      "arial-pressed": on.toString(),
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }

  const value = { on, getTogglerProps };

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
