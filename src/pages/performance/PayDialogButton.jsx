import { useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import {
  // Box,
  // Checkbox,
  Grid,
  IconButton,
  // InputAdornment,
  // List,
  ListItem,
  // ListItemIcon,
  ListItemText,
  Typography,
  // TextField,
} from "@material-ui/core";

import { ConfirmDialogButton } from "mastro-elfo-mui";

import { closeTo } from "./utils";
import { useSettings } from "../settings/context";
import {
  derived,
  fromObject as performanceFromObject,
  update,
} from "../../controllers/performance";
import { fromObject as paymentFromObject } from "../../controllers/payment";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

export default function PayDialogButton({ selected, onUpdate }) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [settings] = useSettings();
  const [open, setOpen] = useState(false);
  u;
  const total = useMemo(
    () =>
      selected.map((item) => derived(item)).reduce((a, { due }) => a + due, 0),
    [selected]
  );

  const handleConfirm = () => {
    Promise.all(
      selected
        .map((item) => {
          const { due } = derived(item);
          if (closeTo(due, 0)) {
            return null;
          }
          const newItem = performanceFromObject(item, {
            payed: true,
            payments: [...item.payments, paymentFromObject({ value: due })],
          });
          return newItem;
        })
        .filter((item) => !!item)
        .map((item) => update(item._id, item))
    )
      .then(() => {
        enqueueSnackbar(t("Performance.PaymentDone"), { variant: "success" });
        onUpdate();
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
      });
  };

  return (
    <ConfirmDialogButton
      Component={IconButton}
      open={open}
      onClose={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      onConfirm={handleConfirm}
      disabled={selected.length === 0}
      DialogProps={{
        title: "Conferma il pagamento",
        confirm: "Conferma",
        cancel: "Annulla",
        content: [
          ...selected.map((item) => {
            const { due } = derived(item);
            return (
              <ListItem key={item._id}>
                <ListItemText
                  primary={
                    <Grid container>
                      <Grid item xs={12} md={5}>
                        <Typography variant="h6">
                          {item.client.name} {item.client.surname}
                        </Typography>
                      </Grid>
                      <Grid item xs={10} md={5}>
                        <ListItemText
                          primary={new Date(item.start).toLocaleString()}
                          secondary="Date"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant="h6">{`${due.toFixed(2)}${
                          settings.currency
                        }`}</Typography>
                      </Grid>
                    </Grid>
                  }
                  secondary={item.note}
                />
              </ListItem>
            );
          }),
          <ListItem key="last">
            <ListItemText
              primary={
                <Grid container>
                  <Grid item xs={10}>
                    <Typography variant="h6">Total</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">
                      {`${total.toFixed(2)}${settings.currency}`}
                    </Typography>
                  </Grid>
                </Grid>
              }
            />
          </ListItem>,
        ],
      }}
    >
      <MonetizationOnIcon />
    </ConfirmDialogButton>
  );
}
