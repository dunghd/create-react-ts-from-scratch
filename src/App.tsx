import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NavRoutes, { ICustomNav } from "./common/components/NavRoutes";
import ProjectDetail from "./screens/ProjectDetail/ProjectDetail";
import ProjectList from "./screens/ProjectList/ProjectList";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MainTabs: ICustomNav[] = [
  {
    key: "home",
    title: "Home",
    href: "/home",
  },
  {
    key: "project-list",
    title: "Project List",
    href: "/project-list",
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <main>
          <NavRoutes tabs={MainTabs} />
          <Switch>
            <Route exact path="/project-list">
              <ProjectList />
            </Route>
            <Route path="/project-list/:id">
              <ProjectDetail />
            </Route>
            <Route path="/home" exact>
              Home
            </Route>
            <Route path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
