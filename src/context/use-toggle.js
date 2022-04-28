import React from "react";
import warning from "warning";
import useControlledSwitchWarning from "../hooks/useControlledSwitchWarning";
import useOnChangeReadOnlyWarning from "../hooks/useOnChangeReadOnlyWarning";

const ToggleContext = React.createContext();
ToggleContext.displayName = "ToggleContext";

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn?.(...args));

const actionTypes = {
  toggle: "toggle",
  reset: "reset",
};

function toggleReducer(state, { type, initialState }) {
  switch (type) {
    case actionTypes.toggle: {
      return { on: !state.on };
    }
    case actionTypes.reset: {
      return initialState;
    }
    default: {
      throw new Error(`Unsupported type: ${type}`);
    }
  }
}

function useToggle({
  initialOn = false,
  reducer = toggleReducer,
  onChange,
  on: controlledOn,
  readOnly = false,
} = {}) {
  const { current: initialState } = React.useRef({ on: initialOn });
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const onIsControlled = controlledOn !== null && controlledOn !== undefined;
  const on = onIsControlled ? controlledOn : state.on;

  if (process.env.NODE_ENV !== "production") {
    useControlledSwitchWarning(controlledOn, "on", "useToggle");
    useOnChangeReadOnlyWarning(
      controlledOn,
      "on",
      "useToggle",
      Boolean(onChange),
      readOnly,
      "readOnly",
      "initialOn",
      "onChange"
    );
  }

  // We want to call `onChange` any time we need to make a state change, but we
  // only want to call `dispatch` if `!onIsControlled` (otherwise we could get
  // unnecessary renders).
  // 🐨 To simplify things a bit, let's make a `dispatchWithOnChange` function
  // right here. This will:
  // 1. accept an action
  // 2. if onIsControlled is false, call dispatch with that action
  // 3. Then call `onChange` with our "suggested changes" and the action.
  function dispatchWithOnChange(action) {
    if (!onIsControlled) {
      dispatch(action);
    }

    onChange?.(reducer({ ...state, on }, action), action);
  }

  // 🦉 "Suggested changes" refers to: the changes we would make if we were
  // managing the state ourselves. This is similar to how a controlled <input />
  // `onChange` callback works. When your handler is called, you get an event
  // which has information about the value input that _would_ be set to if that
  // state were managed internally.
  // So how do we determine our suggested changes? What code do we have to
  // calculate the changes based on the `action` we have here? That's right!
  // The reducer! So if we pass it the current state and the action, then it
  // should return these "suggested changes!"
  //
  // 💰 Sorry if Olivia the Owl is cryptic. Here's what you need to do for that onChange call:
  // `onChange(reducer({...state, on}, action), action)`
  // 💰 Also note that user's don't *have* to pass an `onChange` prop (it's not required)
  // so keep that in mind when you call it! How could you avoid calling it if it's not passed?

  // make these call `dispatchWithOnChange` instead
  // const toggle = () => dispatch({ type: actionTypes.toggle });
  // const reset = () => dispatch({ type: actionTypes.reset, initialState });
  const toggle = () => dispatchWithOnChange({ type: actionTypes.toggle });
  const reset = () =>
    dispatchWithOnChange({ type: actionTypes.reset, initialState });

  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      "aria-pressed": on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }

  function getResetterProps({ onClick, ...props } = {}) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    };
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  };
}

export { toggleReducer, useToggle, actionTypes };
