import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";

import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";
import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";

import { useSettings } from "../settings/context";
import { create, fromObject } from "../../controllers/client";

import SaveIcon from "@material-ui/icons/Save";

function Component() {
  const { replace } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useLocation();
  const [settings] = useSettings();
  const [client, setClient] = useState(
    fromObject({
      price: settings.price,
      ...state,
    })
  );

  const handleChange = (field, cast = (v) => v) => ({ target: { value } }) =>
    setClient({ ...client, [field]: cast(value) });

  const handleSave = () => {
    create(fromObject(client))
      .then(({ id }) => {
        // console.log(r);
        enqueueSnackbar("Documento creato", { variant: "success" });
        setTimeout(replace, 500, `/client/view/${id}`);
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar("Errore", { variant: "error" });
      });
  };

  const { name, surname, price, email, telephone } = client;

  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={
        <Header
          LeftAction={<BackIconButton />}
          RightActions={
            <IconButton onClick={handleSave}>
              <SaveIcon />
            </IconButton>
          }
        >
          Crea Studente
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem>
              <TextField
                fullWidth
                label="Nome"
                value={name}
                onChange={handleChange("name")}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                label="Cognome"
                value={surname}
                onChange={handleChange("surname")}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                type="email"
                label="Email"
                value={email || ""}
                onChange={handleChange("email")}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                type="tel"
                label="Telefono"
                value={telephone || ""}
                onChange={handleChange("telephone")}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                label="Tariffa"
                type="number"
                value={parseFloat(price || 0).toFixed(2)}
                onChange={handleChange("price", parseFloat)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {settings.currency}/h
                    </InputAdornment>
                  ),
                }}
              />
            </ListItem>
          </List>
        </Content>
      }
    />
  );
}

export const route = {
  path: "/client/create",
  exact: true,
  component: Component,
};
