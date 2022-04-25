import React from "react";
import { useToggle, toggleReducer, actionTypes } from "../context/use-toggle";
import { Switch } from "../switch";

const Toggle = () => {
  const [timesClicked, setTimesClicked] = React.useState(0);
  const clickedTooMuch = timesClicked >= 4;

  function toggleStateReducer(state, action) {
    // switch (action.type) {
    //   case "toggle": {
    //     if (clickedTooMuch) {
    //       return { on: state.on };
    //     }
    //     return { on: !state.on };
    //   }
    //   case "reset": {
    //     return { on: false };
    //   }
    //   default: {
    //     throw new Error(`Unsupported type: ${action.type}`);
    //   }
    // }
    if (action.type === actionTypes.toggle && timesClicked >= 4) {
      return { on: state.on };
    }
    return toggleReducer(state, action);
  }

  const { on, getTogglerProps, getResetterProps } = useToggle({
    reducer: toggleStateReducer,
  });

  return (
    <div>
      <Switch
        {...getTogglerProps({
          disabled: clickedTooMuch,
          on: on,
          onClick: () => setTimesClicked((count) => count + 1),
        })}
      />
      {clickedTooMuch ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <button {...getResetterProps({ onClick: () => setTimesClicked(0) })}>
        Reset
      </button>
    </div>
  );
};

export default Toggle;
