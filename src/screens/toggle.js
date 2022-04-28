import React from "react";
import { useToggle, toggleReducer, actionTypes } from "../context/use-toggle";
import { Switch } from "../switch";

// const Toggle = () => {
//   const [timesClicked, setTimesClicked] = React.useState(0);
//   const clickedTooMuch = timesClicked >= 4;

//   function toggleStateReducer(state, action) {
//     // switch (action.type) {
//     //   case "toggle": {
//     //     if (clickedTooMuch) {
//     //       return { on: state.on };
//     //     }
//     //     return { on: !state.on };
//     //   }
//     //   case "reset": {
//     //     return { on: false };
//     //   }
//     //   default: {
//     //     throw new Error(`Unsupported type: ${action.type}`);
//     //   }
//     // }
//     if (action.type === actionTypes.toggle && timesClicked >= 4) {
//       return { on: state.on };
//     }
//     return toggleReducer(state, action);
//   }

//   const { on, getTogglerProps, getResetterProps } = useToggle({
//     reducer: toggleStateReducer,
//   });

//   return (
//     <div>
//       <Switch
//         {...getTogglerProps({
//           disabled: clickedTooMuch,
//           on: on,
//           onClick: () => setTimesClicked((count) => count + 1),
//         })}
//       />
//       {clickedTooMuch ? (
//         <div data-testid="notice">
//           Whoa, you clicked too much!
//           <br />
//         </div>
//       ) : timesClicked > 0 ? (
//         <div data-testid="click-count">Click count: {timesClicked}</div>
//       ) : null}
//       <button {...getResetterProps({ onClick: () => setTimesClicked(0) })}>
//         Reset
//       </button>
//     </div>
//   );
// };

function Toggle({ on: controlledOn, onChange, readOnly }) {
  const { on, getTogglerProps } = useToggle({
    on: controlledOn,
    onChange,
    readOnly,
  });
  const props = getTogglerProps({ on });
  return <Switch {...props} />;
}

function ToggleApp() {
  const [bothOn, setBothOn] = React.useState();
  const [timesClicked, setTimesClicked] = React.useState(0);

  function handleToggleChange(state, action) {
    if (action.type === actionTypes.toggle && timesClicked > 4) {
      return;
    }
    setBothOn(state.on);
    setTimesClicked((c) => c + 1);
  }

  function handleResetClick() {
    setBothOn(false);
    setTimesClicked(0);
  }

  return (
    <div>
      <div>
        <Toggle on={bothOn} readOnly={false} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle
          onChange={(...args) =>
            console.info("Uncontrolled Toggle onChange", ...args)
          }
        />
      </div>
    </div>
  );
}

export default ToggleApp;
