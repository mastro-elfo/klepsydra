import { useTranslation } from "react-i18next";

import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  List,
  ListItem,
  ListSubheader,
  TextField,
} from "@material-ui/core";
import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";

import DrawerIcon from "@material-ui/icons/Settings";

import { useTitle } from "./utils";
import ListItemHelp from "./settings/ListItemHelp";
import { useSettings } from "./settings/context";

function Component() {
  const [settings, setSettings] = useSettings();
  const { t } = useTranslation();
  useTitle(t("Settings.Key"));

  const handleChange = (field, cast = (v) => v) => ({ target: { value } }) =>
    setSettings({ ...settings, [field]: cast(value) });
  // const handleSet = (field, cast = (v) => v) => (value) =>
  // setSettings({ ...settings, [field]: cast(value) });

  const {
    currency,
    discountRound,
    enableDiscountRound,
    price,
    printTitle,
    printBefore,
    printAfter,
    printNote,
  } = settings;

  return (
    <Page
      header={
        <Header leftAction={<BackIconButton />}>{t("Settings.Key")}</Header>
      }
      content={
        <Content>
          <List
            subheader={<ListSubheader>{t("Settings.General")}</ListSubheader>}
          >
            <ListItem>
              <ListItemHelp title={t("Settings.Price.Tooltip")} />
              <TextField
                fullWidth
                label={t("Settings.Price.Key")}
                value={parseFloat(price || 0).toFixed(2)}
                onChange={handleChange("price", parseFloat)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {currency}/h
                    </InputAdornment>
                  ),
                }}
              />
            </ListItem>

            <ListItem>
              <ListItemHelp title={t("Settings.Rounding.Tooltip")} />
              <TextField
                fullWidth
                label={t("Settings.Rounding.Key")}
                onChange={handleChange("discountRound", parseFloat)}
                value={parseFloat(discountRound || 0).toFixed(2)}
                disabled={!enableDiscountRound}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{currency}</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Checkbox
                        checked={enableDiscountRound}
                        onChange={handleChange(
                          "enableDiscountRound",
                          () => !enableDiscountRound
                        )}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </ListItem>

            <ListItem>
              <ListItemHelp title={t("Settings.Currency.Tooltip")} />
              <TextField
                fullWidth
                label={t("Settings.Currency.Key")}
                onChange={handleChange("currency")}
                value={currency}
              />
            </ListItem>
          </List>

          <List
            subheader={<ListSubheader>{t("Settings.Print")}</ListSubheader>}
          >
            <ListItem>
              <ListItemHelp title={t("Settings.PrintTitle.Tooltip")} />
              <TextField
                fullWidth
                label={t("Settings.PrintTitle.Key")}
                onChange={handleChange("printTitle")}
                value={printTitle}
              />
            </ListItem>
            <ListItem>
              <ListItemHelp title={t("Settings.PrintBefore.Tooltip")} />
              <TextField
                fullWidth
                label={t("Settings.PrintBefore.Key")}
                onChange={handleChange("printBefore")}
                value={printBefore}
                multiline
                rows={2}
                rowsMax={4}
              />
            </ListItem>
            <ListItem>
              <ListItemHelp title={t("Settings.PrintAfter.Tooltip")} />
              <TextField
                fullWidth
                label={t("Settings.PrintAfter.Key")}
                onChange={handleChange("printAfter")}
                value={printAfter}
                multiline
                rows={2}
                rowsMax={4}
              />
            </ListItem>
            <ListItem>
              <ListItemHelp title={t("Settings.PrintNote.Tooltip")} />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={printNote}
                    onChange={handleChange("printNote", () => !printNote)}
                  />
                }
                label={t("Settings.PrintNote.Key")}
              />
            </ListItem>
          </List>

          {
            //   <List
            //   subheader={
            //     <ListSubheader>{t("Settings.Introduction")}</ListSubheader>
            //   }
            // >
            //   <ListItem
            //     button
            //     onClick={() => setSettings({ ...settings, intro: true })}
            //   >
            //     <ListItemHelp>
            //       <Typography variant="body2">
            //         {t("Settings.Intro.Click to watch again")}
            //       </Typography>
            //     </ListItemHelp>
            //     <ListItemText primary={t("Settings.Intro.Watch Again")} />
            //   </ListItem>
            // </List>
          }
        </Content>
      }
    />
  );
}

export const route = {
  path: "/settings",
  exact: true,
  component: Component,
};

export const drawer = {
  key: "settings",
  primary: "Settings.Key",
  secondary: "",
  icon: <DrawerIcon />,
  title: "$t(Open) $t(Settings.Key)",
};
