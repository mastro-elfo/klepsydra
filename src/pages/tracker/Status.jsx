import { Fragment, useEffect, useMemo, useState } from "react";
import { ListItemIcon, ListItemText } from "@material-ui/core";

import { useTracker } from "./context";

import PauseIcon from "@material-ui/icons/Pause";
import StartIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";

export default function Status() {
  const [tracker] = useTracker();
  const [date, setDate] = useState(new Date());
  const { start, status } = tracker || {};

  useEffect(() => {
    if (start) {
      if (new Date(start) - new Date(date) !== 0) {
        setDate(new Date(start));
      }
    } else {
      const to = setTimeout(() => {
        setDate(new Date());
      }, 1000);
      return () => clearTimeout(to);
    }
  }, [date, start]);

  const statusLabel = useMemo(
    () =>
      ({ started: "Avviato", paused: "In Pausa", stopped: "Fermato" }[status] ||
      "Non Avviato"),
    [status]
  );

  const statusIcon = useMemo(
    () =>
      ({
        started: <StartIcon />,
        paused: <PauseIcon />,
        stopped: <StopIcon />,
      }[status] || <StopIcon />),
    [status]
  );

  return (
    <Fragment>
      <ListItemIcon>{statusIcon}</ListItemIcon>
      <ListItemText primary={statusLabel} secondary="Stato" />
      <ListItemText
        primary={new Date(date).toLocaleDateString()}
        secondary="Data"
      />
      <ListItemText
        primary={new Date(date).toLocaleTimeString()}
        secondary="Ora"
      />
    </Fragment>
  );
}
