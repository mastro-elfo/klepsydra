import { useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import {
  // Box,
  // Checkbox,
  // Grid,
  IconButton,
  // InputAdornment,
  // List,
  ListItem,
  // ListItemIcon,
  ListItemText,
  // Typography,
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
  const { enqueueSnackbar } = useSnackbar();
  const [settings] = useSettings();
  const [open, setOpen] = useState(false);

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
        enqueueSnackbar("Pagamenti effettuati", { variant: "success" });
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
          <ListItem key="first">
            <ListItemText
              primary={`${total.toFixed(2)}${settings.currency}`}
              secondary="Totale"
            />
          </ListItem>,
          ...selected.map((item) => {
            const { due } = derived(item);
            return (
              <ListItem key={item._id}>
                <ListItemText
                  primary={`${item.client.name} ${item.client.surname}`}
                  secondary={`${new Date(item.start).toLocaleString()} ${
                    item.note
                  }`}
                />
                <ListItemText
                  primary={`${due.toFixed(2)}${settings.currency}`}
                />
              </ListItem>
            );
          }),
        ],
      }}
    >
      <MonetizationOnIcon />
    </ConfirmDialogButton>
  );
}
