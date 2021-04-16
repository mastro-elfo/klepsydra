import { Switch, Redirect, Route } from "react-router-dom";
import DrawerIcon from "@material-ui/icons/Person";

import { route as Create } from "./client/create";
import { route as Edit } from "./client/edit";
import { route as List } from "./client/list";
import { route as View } from "./client/view";

function Component() {
  return (
    <Switch>
      <Route {...Create} />
      <Route {...Edit} />
      <Route {...List} />
      <Route {...View} />
      <Redirect to="/notfound" />
    </Switch>
  );
}

export const route = {
  path: "/client",
  component: Component,
};

export const drawer = {
  key: "client",
  primary: "Studenti",
  secondary: "",
  icon: <DrawerIcon />,
  title: "Open Client",
};
