import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export interface ICustomNav {
  key: string;
  title: string;
  href: string;
}

type INavRoutesProps = {
  tabs: ICustomNav[];
};

const NavRoutes = (props: INavRoutesProps) => {
  const { tabs } = props;
  const history = useHistory();

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Nav className="me-auto">
        {tabs.map((tab) => {
          return (
            <Nav.Link key={tab.key} onClick={() => history.push(tab.href)}>
              {tab.title}
            </Nav.Link>
          );
        })}
      </Nav>
    </Navbar>
  );
};

export default NavRoutes;
