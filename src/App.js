import React from "react";
import { Switch } from "./switch";

function Toggle({ children }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  // 🐨 replace this with a call to React.Children.map and map each child in
  // props.children to a clone of that child with the props they need using
  // React.cloneElement.
  // 💰 React.Children.map(props.children, child => {/* return child clone here */})
  // 📜 https://reactjs.org/docs/react-api.html#reactchildren
  // 📜 https://reactjs.org/docs/react-api.html#cloneelement
  // return <Switch on={on} onClick={toggle} />;

  return React.Children.map(children, (child) => {
    if (allowTypes.includes(child.type)) {
      return React.cloneElement(child, { on, toggle });
    }
    return child;
  });
}

// 🐨 Flesh out each of these components

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = ({ on, children }) => (on ? children : null);
// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = ({ on, children }) => (on ? null : children);
// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = ({ on, toggle }) => <Switch on={on} onClick={toggle} />;

const MyToggleButton = ({ on, toggle }) => {
  return on ? (
    <button onClick={toggle}>The button is on yo.</button>
  ) : (
    <button onClick={toggle}>The button is off soooo.</button>
  );
};

const allowTypes = [ToggleOn, ToggleOff, ToggleButton, MyToggleButton];

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <br />
        <MyToggleButton />
        <span>Hello</span>
        <ToggleButton />
      </Toggle>
    </div>
  );
}

export default App;
