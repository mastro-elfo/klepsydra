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
          LeftAction={
            <Push replace href="/">
              <IconButton>
                <DashboardIcon />
              </IconButton>
            </Push>
          }
        >
          t("Page Not Found")
        </Header>
      }
      content={
        <Content>
          <Typography paragraph>
            Non è possibile aprire la pagina che stavi cercando.
          </Typography>
          <List>
            <Push href="/" replace>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  secondary="Torna alla pagina principale"
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
