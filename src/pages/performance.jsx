import { Switch, Redirect, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { route as Edit } from "./performance/edit";
import { route as List } from "./performance/list";
import { route as View } from "./performance/view";

import { useTitle } from "./utils";

import DrawerIcon from "@material-ui/icons/School";

function Component() {
  const { t } = useTranslation();
  useTitle(t("Performance.Key_plural"));

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
  primary: "Performance.Key_plural",
  secondary: "",
  icon: <DrawerIcon />,
  title: "$t(Open) $t(Performance.Key_plural)",
};
