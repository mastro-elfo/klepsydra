import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import { BackIconButton, Content, Header, Page, Push } from "mastro-elfo-mui";

import Latest from "./Latest";
import Loading from "../loading";
import { useSettings } from "../settings/context";
import { read } from "../../controllers/client";

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
        setClient(doc);
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

  const {
    _id,
    createdAt,
    updatedAt,
    email,
    name,
    surname,
    price,
    telephone,
  } = client;

  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={
        <Header
          LeftAction={<BackIconButton />}
          RightActions={[
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
        >{`${name} ${surname}`}</Header>
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
              <ListItemText primary={email} secondary="Email" />
            </ListItem>
            <ListItem>
              <ListItemText primary={telephone} secondary="Telefono" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${parseFloat(price).toFixed(2)} ${
                  settings.currency
                }/h`}
                secondary="Tariffa"
              />
            </ListItem>
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
