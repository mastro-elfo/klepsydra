// import { useEffect, useState } from "react";
import {
  Checkbox,
  InputAdornment,
  List,
  ListItem,
  ListSubheader,
  TextField,
  Typography,
} from "@material-ui/core";
import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";

import DrawerIcon from "@material-ui/icons/Settings";

import { useTitle } from "./utils";
import ListItemHelp from "./settings/ListItemHelp";
import { useSettings } from "./settings/context";

function Component() {
  useTitle("Impostazioni");
  const [settings, setSettings] = useSettings();

  const handleChange = (field, cast = (v) => v) => ({ target: { value } }) =>
    setSettings({ ...settings, [field]: cast(value) });

  const {
    currency,
    discountRound,
    enableDiscountRound,
    price,
    printTitle,
    printBefore,
    printAfter,
  } = settings;

  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={<Header LeftAction={<BackIconButton />}>Impostazioni</Header>}
      content={
        <Content>
          <List>
            <ListItem>
              <ListItemHelp>
                <Typography variant="body2">
                  Questa è la tua tariffa base, puoi selezionare tariffe diverse
                  per ogni cliente e per ogni prestazione
                </Typography>
              </ListItemHelp>
              <TextField
                fullWidth
                label="Tariffa"
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
              <ListItemHelp>
                <Typography variant="body2">
                  Applica automaticamente uno sconto per arrotondare al valore
                  più vicino
                </Typography>
              </ListItemHelp>
              <TextField
                fullWidth
                label="Arrotondamento"
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
              <ListItemHelp>
                <Typography variant="body2">
                  Imposta il simbolo della valuta
                </Typography>
              </ListItemHelp>
              <TextField
                fullWidth
                label="Valuta"
                onChange={handleChange("currency")}
                value={currency}
              />
            </ListItem>
          </List>

          <List subheader={<ListSubheader>Stampa</ListSubheader>}>
            <ListItem>
              <ListItemHelp>
                <Typography variant="body2">
                  Titolo della pagina di stampa
                </Typography>
              </ListItemHelp>
              <TextField
                fullWidth
                label="Titolo"
                onChange={handleChange("printTitle")}
                value={printTitle}
              />
            </ListItem>
            <ListItem>
              <ListItemHelp>
                <Typography variant="body2">
                  Testo prima della tabella, può contenere più righe
                </Typography>
              </ListItemHelp>
              <TextField
                fullWidth
                label="Prima"
                onChange={handleChange("printBefore")}
                value={printBefore}
                multiline
                rows={2}
                rowsMax={4}
              />
            </ListItem>
            <ListItem>
              <ListItemHelp>
                <Typography variant="body2">
                  Testo dopo la tabella, può contenere più righe
                </Typography>
              </ListItemHelp>
              <TextField
                fullWidth
                label="Dopo"
                onChange={handleChange("printAfter")}
                value={printAfter}
                multiline
                rows={2}
                rowsMax={4}
              />
            </ListItem>
          </List>
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
  primary: "Impostazioni",
  secondary: "",
  icon: <DrawerIcon />,
  title: "Open Settings",
};
