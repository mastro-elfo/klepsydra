import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import { BackIconButton, Content, Header, Page, Push } from "mastro-elfo-mui";

import ContactList from "./ContactList";
import Latest from "./Latest";
import Loading from "../loading";
import { useSettings } from "../settings/context";
import { fromObject, read } from "../../controllers/client";

import EditIcon from "@material-ui/icons/Edit";
import StartIcon from "@material-ui/icons/PlayArrow";

function Component() {
  const { id } = useParams();
  const { replace } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [client, setClient] = useState();
  const [settings] = useSettings();

  useEffect(() => {
    read(id)
      .then((doc) => {
        // console.log(doc);
        setClient(fromObject(doc));
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar("Errore caricamento dati", { variant: "error" });
        setTimeout(replace, 5000, "/notfound");
      });
    // eslint-disable-next-line
  }, [id]);

  if (!client) {
    return <Loading />;
  }

  const { _id, contacts, createdAt, updatedAt, name, surname, price } = client;

  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={
        <Header
          leftAction={<BackIconButton />}
          rightAction={[
            <Push key="edit" href={`/client/edit/${_id}`} state={client}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Push>,
            <Push key="play" href="/tracker" state={{ client }}>
              <IconButton disabled={!client}>
                <StartIcon />
              </IconButton>
            </Push>,
          ]}
        >
          {name || surname ? `${name} ${surname}` : "Scheda cliente"}
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem>
              <ListItemText primary={name} secondary="Nome" />
            </ListItem>
            <ListItem>
              <ListItemText primary={surname} secondary="Cognome" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${parseFloat(price).toFixed(2)} ${
                  settings.currency
                }/h`}
                secondary="Tariffa"
              />
            </ListItem>
          </List>

          <ContactList contacts={contacts} />

          <List>
            <ListItem>
              <ListItemText
                primary={new Date(createdAt).toLocaleString()}
                secondary="Creato"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={new Date(updatedAt).toLocaleString()}
                secondary="Aggiornato"
              />
            </ListItem>
          </List>

          <Latest id={id} />
        </Content>
      }
    />
  );
}

export const route = {
  path: "/client/view/:id",
  exact: true,
  component: Component,
};
