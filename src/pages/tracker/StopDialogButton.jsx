import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@material-ui/core";
import { DangerButton } from "mastro-elfo-mui";

import { useTracker } from "./context";
import { useSettings } from "../settings/context";
import { roundCost, timeDiff } from "./utils";
import { create } from "../../controllers/performance";

import StopIcon from "@material-ui/icons/Stop";

export default function StopDialogButton() {
  const { replace } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [settings] = useSettings();
  const [open, setOpen] = useState(false);
  const [tracker, setTracker] = useTracker();

  const { client, price, pause, pauses, start, status } = tracker || {};

  const handleSave = () => {
    // Check if a client is selected
    if (!client) {
      setOpen(false);
      return enqueueSnackbar("Seleziona uno studente", { variant: "warning" });
    }
    // Check if price is a valid non negative number
    if (isNaN(price) || price < 0) {
      setOpen(false);
      return enqueueSnackbar("La tariffa inserita non è valida", {
        variant: "warning",
      });
    }

    const total = (timeDiff(start, pause.start, pauses) / 1000 / 3600) * price;
    const final = {
      ...tracker,
      end: pause.start,
      status: "stopped",
      // balance is probabily not used
      balance: 0,
      payments: [],
      discount: settings.enableDiscountRound
        ? roundCost(total, settings.discountRound)
        : 0,
    };
    setTracker(final);
    enqueueSnackbar("Cronometro interrotto", { variant: "success" });
    create(final)
      .then(({ id }) => {
        enqueueSnackbar("Prestazione salvata", { variant: "success" });
        setTimeout(replace, 500, `/performance/view/${id}`);
        setTracker();
      })
      .catch((e) => {
        enqueueSnackbar("Errore salvataggio", { variant: "error" });
      });
  };

  const handleDiscard = () => {
    setTracker({
      note: "",
      pause: null,
      pauses: [],
      price: settings.price,
      start: null,
      status: null,
    });
    enqueueSnackbar("Prestazione eliminata", { variant: "success" });
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton
        key="_stop"
        color="inherit"
        disabled={!status || status !== "paused"}
        onClick={() => setOpen(true)}
      >
        <StopIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Ferma il timer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Puoi fermare il timer e creare una nuova prestazione
          </DialogContentText>
          <DialogContentText>
            Puoi eliminare il timer corrente
          </DialogContentText>
          <DialogContentText>
            Clicca su annulla per non applicare modifiche
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleSave}>
            Salva
          </Button>
          <DangerButton variant="contained" onClick={handleDiscard}>
            Elimina
          </DangerButton>
          <Button onClick={() => setOpen(false)}>Annulla</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
