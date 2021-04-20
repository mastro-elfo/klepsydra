import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Content, Header, Page, Push } from "mastro-elfo-mui";
import DashboardIcon from "@material-ui/icons/Dashboard";

import { useTitle } from "./utils";

function Component() {
  useTitle("404 Non trovato");
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
          Pagina non trovata
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
