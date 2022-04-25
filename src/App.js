import React from "react";
// import { UserSettings, UserDataDisplay } from "./screens/user-profile";
// import { UserProvider } from "./context/user-context";
// import { Switch } from "./switch";
// import { ToggleProvider, useToggle } from "./context/toggle-context";
// import { useToggle } from "./context/toggle-context";
import Toggle from "./screens/toggle";

// const ToggleButton = (props) => {
//   const { on, getTogglerProps } = useToggle();
//   return <Switch {...getTogglerProps({ on })} />;
// };

// const CustomButton = (props) => {
//   const { on, getTogglerProps } = useToggle();
//   return (
//     <button
//       {...getTogglerProps({
//         "arial-label": "custom-button",
//         onClick: (e) => console.info("onButtonClick", e),
//       })}
//     >
//       {on ? "on" : "off"}
//     </button>
//   );
// };

function App() {
  return <Toggle />;
}

export default App;
