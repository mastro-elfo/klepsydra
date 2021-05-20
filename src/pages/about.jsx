import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  List,
  ListItem,
  // ListItemIcon,
  // ListItemSecondaryAction,
  ListItemText,
  // ListSubheader,
} from "@material-ui/core";
import {
  BackIconButton,
  ConfirmDialog,
  Content,
  Header,
  Page,
} from "mastro-elfo-mui";
import DrawerIcon from "./about/logo";
import background from "./about/background.svg";

import { useTitle } from "./utils";
import { version } from "../version.json";

function Component() {
  useTitle("Informazioni");
  const [licenseDialog, setLicenseDialog] = useState(false);
  const { t } = useTranslation();

  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={<Header leftAction={<BackIconButton />}>Informazioni</Header>}
      content={
        <Content>
          <List>
            <ListItem>
              <ListItemText primary={version} secondary={t("Version")} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Francesco Michienzi"
                secondary={t("Software Development")}
              />
            </ListItem>
            <ListItem button onClick={() => setLicenseDialog(true)}>
              <ListItemText
                primary="Copyright (c) 2021 mastro-elfo"
                secondary={t("MIT License")}
              />
            </ListItem>
          </List>
          <ConfirmDialog
            open={licenseDialog}
            onClose={() => setLicenseDialog(false)}
            content={[
              "Copyright (c) 2021 mastro-elfo",
              'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:',
              "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.",
              'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
            ]}
            confirm="Letto"
            onConfirm={() => setLicenseDialog(false)}
          ></ConfirmDialog>
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
  primary: "About.Key",
  secondary: `v${version}`,
  icon: <DrawerIcon />,
  title: "$t(Open) $t(About.Key)",
};
