import { Switch, Redirect, Route } from "react-router-dom";

import { route as Create } from "./client/create";
import { route as Edit } from "./client/edit";
import { route as List } from "./client/list";
import { route as View } from "./client/view";

import { useTitle } from "./utils";

import DrawerIcon from "@material-ui/icons/Person";

function Component() {
  useTitle("Clienti");
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
  primary: "Client.Key_plural",
  secondary: "",
  icon: <DrawerIcon />,
  title: "$t(Open) $t(Client.Key_plural)",
};
