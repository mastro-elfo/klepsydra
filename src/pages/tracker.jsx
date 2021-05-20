import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { InputAdornment, List, ListItem, TextField } from "@material-ui/core";

import { BackIconButton, Content, Header, Page } from "mastro-elfo-mui";

import { useTitle } from "./utils";
import { useSettings } from "./settings/context";
import Client from "./tracker/Client";
import Controllers from "./tracker/Controllers";
import Pauses from "./tracker/Pauses";
import Status from "./tracker/Status";
import Timer from "./tracker/Timer";
import { useTracker } from "./tracker/context";
import { fromObject } from "../controllers/tracker";

import DrawerIcon from "@material-ui/icons/HourglassEmpty";

function Component() {
  useTitle("Timer");
  const { state } = useLocation();
  const [settings] = useSettings();
  const [tracker, setTracker] = useTracker();
  const pauseRef = useRef();

  const { client, note, pause, price, status } = tracker || {};

  useEffect(() => {
    // Initialize tracker
    setTracker(fromObject(tracker, { price: settings.price }, state));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (client) {
      setTracker({ ...tracker, price: client.price });
    }
    // eslint-disable-next-line
  }, [client]);

  useEffect(() => {
    if (status === "paused" && pauseRef && pauseRef.current) {
      pauseRef.current.focus();
    }
  }, [status]);

  // Due to react-hooks/exhaustive-deps
  const _pauseEnd = pause && pause.end;
  useEffect(() => {
    if (pause) {
      const to = setTimeout(
        () =>
          setTracker((tracker) => ({
            ...tracker,
            pause: { ...tracker.pause, end: new Date() },
          })),
        1000
      );
      return () => clearTimeout(to);
    }
  }, [pause, _pauseEnd, setTracker]);

  const handleChange = (field, cast = (v) => v) => ({ target: { value } }) => {
    setTracker({ ...tracker, [field]: cast(value) });
  };

  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={
        <Header leftAction={<BackIconButton />} rightAction={<Controllers />}>
          <Timer />
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem>
              <Status />
            </ListItem>
            <ListItem>
              <Client />
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
                inputProps={{ min: 0 }}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                rowsMax={8}
                label="Note"
                value={note}
                onChange={handleChange("note")}
              />
            </ListItem>
          </List>
          <Pauses />
        </Content>
      }
    />
  );
}

export const route = {
  path: "/tracker",
  exact: true,
  component: Component,
};

export const drawer = {
  key: "tracker",
  primary: "Tracker.Key",
  secondary: "",
  icon: <DrawerIcon />,
  title: "$t(Open) $t(Tracker.Key)",
};
