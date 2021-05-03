import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
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
import { create, fromObject } from "../../controllers/performance";

import StopIcon from "@material-ui/icons/Stop";

export default function StopDialogButton() {
  const { replace } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [settings] = useSettings();
  const [open, setOpen] = useState(false);
  const [tracker, setTracker] = useTracker();

  const { client, price, pause, pauses, start, status } = tracker || {};

  const handleSave = () => {
    // Check if a client is selected
    if (!client) {
      setOpen(false);
      return enqueueSnackbar(t("Tracker.Snackbar.ClientNotSelected"), {
        variant: "warning",
      });
    }
    // Check if price is a valid non negative number
    if (isNaN(price) || price < 0) {
      setOpen(false);
      return enqueueSnackbar(t("Tracker.Snackbar.PriceNotValid"), {
        variant: "warning",
      });
    }

    const total = (timeDiff(start, pause.start, pauses) / 1000 / 3600) * price;
    const final = {
      ...tracker,
      end: pause.start,
      status: "stopped",
      payments: [],
      discount: settings.enableDiscountRound
        ? roundCost(total, settings.discountRound)
        : 0,
    };
    setTracker(final);
    enqueueSnackbar(t("Tracker.Snackbar.Stopped"), { variant: "info" });
    create(fromObject(final))
      .then(({ id }) => {
        enqueueSnackbar(t("Tracker.Snackbar.Saved"), { variant: "success" });
        setTimeout(replace, 500, `/performance/view/${id}`);
        setTracker();
      })
      .catch((e) => {
        enqueueSnackbar(t("Error.Save"), { variant: "error" });
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
    enqueueSnackbar(t("Tracker.Snackbar.Discarded"), { variant: "success" });
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
        <DialogTitle>{t("Tracker.Stop the tracker")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Tracker.Stop the tracker and save the performance")}
          </DialogContentText>
          <DialogContentText>
            {t("Tracker.Discard current tracker")}
          </DialogContentText>
          <DialogContentText>
            {t("Tracker.Cancel to not modify anything")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleSave}>
            {t("Save")}
          </Button>
          <DangerButton variant="contained" onClick={handleDiscard}>
            {t("Delete")}
          </DangerButton>
          <Button onClick={() => setOpen(false)}>{t("Cancel")}</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
