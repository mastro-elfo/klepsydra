import { useTranslation } from "react-i18next";

import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Content, Header, Page, Push } from "mastro-elfo-mui";

import { useTitle } from "./utils";

import DashboardIcon from "@material-ui/icons/Dashboard";

function Component() {
  const { t } = useTranslation();

  useTitle(`404 ${t("Page Not Found")}`);
  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={
        <Header
          leftAction={
            <Push replace href="/">
              <IconButton>
                <DashboardIcon />
              </IconButton>
            </Push>
          }
        >
          {t("Page Not Found")}
        </Header>
      }
      content={
        <Content>
          <Typography paragraph>{t("NotFound.Content")}</Typography>
          <List>
            <Push href="/" replace>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  secondary={t("NotFound.Back to Dashboard")}
                />
              </ListItem>
            </Push>
          </List>
        </Content>
      }
    />
  );
}

export const route = {
  path: "/notfound",
  exact: true,
  component: Component,
};
