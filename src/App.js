import React from "react";
// import { UserSettings, UserDataDisplay } from "./screens/user-profile";
// import { UserProvider } from "./context/user-context";
import { Switch } from "./switch";
import { ToggleProvider, useToggle } from "./context/toggle-context";

const ToggleButton = (props) => {
  const { on, getTogglerProps } = useToggle();
  return <Switch {...getTogglerProps({ on })} />;
};

const CustomButton = (props) => {
  const { on, getTogglerProps } = useToggle();
  return (
    <button
      {...getTogglerProps({
        "arial-label": "custom-button",
        onClick: (e) => console.info("onButtonClick", e),
      })}
    >
      {on ? "on" : "off"}
    </button>
  );
};

function App() {
  return (
    // <div
    //   style={{
    //     minHeight: 350,
    //     width: 300,
    //     backgroundColor: "#ddd",
    //     borderRadius: 4,
    //     padding: 10,
    //   }}
    // >
    //   <UserProvider>
    //     <UserSettings />
    //     <UserDataDisplay />
    //   </UserProvider>
    // </div>

    <div>
      <ToggleProvider>
        <ToggleButton />
        <hr />
        <CustomButton />
      </ToggleProvider>
    </div>
  );
}

export default App;
