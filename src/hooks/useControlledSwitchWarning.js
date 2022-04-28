import React from "react";
import warning from "warning";

export default function useControlledSwitchWarning(
  controlPropValue,
  controlPropName,
  componentName
) {
  const isControlled = controlPropValue != null;
  const { current: wasControlled } = React.useRef(isControlled);

  React.useEffect(() => {
    warning(
      !(isControlled && !wasControlled),
      `\`${componentName}\` is changing from uncontrolled to be controlled. Components should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`
    );
    warning(
      !(!isControlled && wasControlled),
      `\`${componentName}\` is changing from controlled to be uncontrolled. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`
    );
  }, [controlPropName, componentName, isControlled, wasControlled]);
}
