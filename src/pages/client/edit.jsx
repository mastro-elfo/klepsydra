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

import ContactList from "./ContactList";
import Loading from "../loading";
import { useSettings } from "../settings/context";
import { fromObject, read, update, destroy } from "../../controllers/client";

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
          setClient(fromObject(doc));
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

  const handleChangeValue = (field) => (value) =>
    setClient({ ...client, [field]: value });

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

  const { contacts, name, surname, price } = client;

  return (
    <Page
      header={
        <Header
          leftAction={<BackIconButton />}
          rightAction={
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

          <ContactList
            contacts={contacts}
            edit
            onChange={handleChangeValue("contacts")}
          />

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
