import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export type TabRouteNavsProps = {
  tabs: CustomTab[];
  customRouterLink?: React.ElementType;
  customStyle?: string;
};

export type CustomTab = {
  key: string;
  title: string;
  href: string;
  tabMatchResolver?: (locationPathname: string) => boolean;
};

const TabRouteNavs = (
  props: React.PropsWithChildren<TabRouteNavsProps>
): JSX.Element => {
  const { tabs, customRouterLink, customStyle } = props;

  const location = useLocation();
  const [value, setValue] = React.useState<string>(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const onChangeHandler = (eventKey: string | null) => {
    setValue(eventKey!);
  };

  return (
    <Tabs activeKey={value} onSelect={onChangeHandler} className={customStyle}>
      {tabs.map((tab, index) => (
        <Tab key={tab.key} title={tab.title} />
      ))}
    </Tabs>
  );
};

export default TabRouteNavs;
