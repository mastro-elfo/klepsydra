import { Switch, Redirect, Route } from "react-router-dom";
import DrawerIcon from "@material-ui/icons/School";

import { route as Edit } from "./performance/edit";
import { route as List } from "./performance/list";
import { route as View } from "./performance/view";

import { useTitle } from "./utils";

function Component() {
  useTitle("Prestazioni");

  return (
    <Switch>
      <Route {...Edit} />
      <Route {...List} />
      <Route {...View} />
      <Redirect to="/notfound" />
    </Switch>
  );
}

export const route = {
  path: "/performance",
  component: Component,
};

export const drawer = {
  key: "performance",
  primary: "Prestazioni",
  secondary: "",
  icon: <DrawerIcon />,
  title: "Open Performance",
};
