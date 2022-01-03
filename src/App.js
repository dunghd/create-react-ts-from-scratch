import React from "react";
import { Switch } from "./switch";
import { ToggleProvider, useToggle } from "./context/toggle-context";

// function Toggle({ children }) {
//   const [on, setOn] = React.useState(false);
//   const toggle = () => setOn(!on);

//   return React.Children.map(children, (child) => {
//     if (allowTypes.includes(child.type)) {
//       return React.cloneElement(child, { on, toggle });
//     }
//     return child;
//   });
// }

const ToggleOn = ({ children }) => {
  const [on] = useToggle();
  return on ? children : null;
};
const ToggleOff = ({ children }) => {
  const [on] = useToggle();
  return on ? null : children;
};
const ToggleButton = (props) => {
  const [on, toggle] = useToggle();
  return <Switch on={on} onClick={toggle} {...props} />;
};

// const MyToggleButton = ({ on, toggle }) => {
//   return on ? (
//     <button onClick={toggle}>The button is on yo.</button>
//   ) : (
//     <button onClick={toggle}>The button is off soooo.</button>
//   );
// };

// const allowTypes = [ToggleOn, ToggleOff, ToggleButton, MyToggleButton];

function App() {
  return (
    <div>
      <ToggleProvider>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <br />
        {/* <MyToggleButton /> */}
        {/* <span>Hello</span> */}
        <br />
        <div>
          <ToggleButton />
        </div>
      </ToggleProvider>
    </div>
  );
}

export default App;
