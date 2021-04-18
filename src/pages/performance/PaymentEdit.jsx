import { Fragment, useEffect, useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  // DialogContentText,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { DangerButton } from "mastro-elfo-mui";

import { useSettings } from "../settings/context";

import EditIcon from "@material-ui/icons/Edit";

export default function PaymentEdit({ payment: _payment, onChange, onDelete }) {
  const [settings] = useSettings();
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState(_payment);

  useEffect(() => {
    const to = setTimeout(onChange, 250, payment);
    return () => clearTimeout(to);
    // eslint-disable-next-line
  }, [payment]);

  const { date, value } = payment;

  const handleChange = (field, cast = (v) => v) => ({ target: { value } }) => {
    setPayment({ ...payment, [field]: cast(value) });
  };

  const handleChangeValue = (field) => (value) => {
    setPayment({ ...payment, [field]: value });
  };

  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <Fragment>
      <ListItem>
        <TextField
          fullWidth
          type="number"
          label={new Date(date).toLocaleString()}
          value={parseFloat(value).toFixed(2)}
          onChange={handleChange("value", parseFloat)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {settings.currency}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setOpen(true)}>
                  <EditIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </ListItem>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Modifica pagamento</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <KeyboardDateTimePicker
                fullWidth
                ampm={false}
                label="Data e Ora"
                value={date}
                onChange={handleChangeValue("date")}
                format="dd/MM/yyyy HH:mm"
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <DangerButton onClick={handleDelete}>Elimina</DangerButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
