import {
  List,
  ListItem,
  // ListItemIcon,
  // ListItemSecondaryAction,
  ListItemText,
  // ListSubheader,
} from "@material-ui/core";
import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";
import DrawerIcon from "./about/logo";
import background from "./about/background.svg";
import { version } from "../version.json";

function Component() {
  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={<Header LeftAction={<BackIconButton />}>Informazioni</Header>}
      content={
        <Content>
          <List>
            <ListItem>
              <ListItemText primary={version} secondary="Versione" />
            </ListItem>
          </List>
        </Content>
      }
      PaperProps={{
        style: {
          backgroundImage: `url(${background})`,
          backgroundSize: "auto 50%",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
        },
      }}
    />
  );
}

export const route = {
  path: "/about",
  exact: true,
  component: Component,
};

export const drawer = {
  key: "about",
  primary: "Informazioni",
  secondary: `v${version}`,
  icon: <DrawerIcon />,
  title: "Open About",
};
