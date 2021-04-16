import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";
import {
  BackIconButton,
  ConfirmDialogButton,
  Content,
  DangerButton,
  Header,
  Page,
} from "mastro-elfo-mui";

import Loading from "../loading";
import { useSettings } from "../settings/context";
import { read, update, destroy } from "../../controllers/client";

import SaveIcon from "@material-ui/icons/Save";

function Component() {
  const { go, goBack, location } = useHistory();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [client, setClient] = useState(location.state);
  const [settings] = useSettings();

  useEffect(() => {
    if (!client) {
      read(id)
        .then((doc) => {
          // console.log(doc);
          setClient(doc);
        })
        .catch((e) => {
          console.error(e);
          enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
        });
    }
    // eslint-disable-next-line
  }, [id, client]);

  if (!client) {
    return <Loading />;
  }

  const handleChange = (field, cast = (v) => v) => ({ target: { value } }) =>
    setClient({ ...client, [field]: cast(value) });

  const handleSave = () => {
    update(id, client)
      .then((r) => {
        // console.log(r);
        enqueueSnackbar("Modifiche salvate", { variant: "success" });
        setTimeout(goBack, 500);
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
      });
  };

  const handleDelete = () => {
    destroy(id)
      .then((r) => {
        // console.log(r);
        enqueueSnackbar("Studente eliminato", { variant: "success" });
        setTimeout(go, 500, -2);
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
      });
  };

  const { email, name, surname, price, telephone } = client;

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
          Modifica
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem>
              <TextField
                fullWidth
                label="Nome"
                value={name || ""}
                onChange={handleChange("name")}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                label="Cognome"
                value={surname || ""}
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
          <List>
            <ListItem>
              <ConfirmDialogButton
                variant="contained"
                Component={DangerButton}
                onConfirm={handleDelete}
                DialogProps={{
                  title: "Elimina Studente",
                  content: `Confermi di eliminare "${name} ${surname}"?`,
                  confirm: "Elimina",
                  cancel: "Annulla",
                }}
              >
                Elimina
              </ConfirmDialogButton>
            </ListItem>
          </List>
        </Content>
      }
    />
  );
}

export const route = {
  path: "/client/edit/:id",
  exact: true,
  component: Component,
};