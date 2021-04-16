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
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import { DangerButton } from "mastro-elfo-mui";

import DurationField from "./DurationField";
import { delta2hms, timeDiff } from "../tracker/utils";

import ClockIcon from "@material-ui/icons/AccessTime";
import EditIcon from "@material-ui/icons/Edit";

export default function PauseEdit({ pause: _pause, onChange, onDelete }) {
  const [open, setOpen] = useState(false);
  const [pause, setPause] = useState(_pause);

  useEffect(() => {
    const to = setTimeout(onChange, 250, pause);
    return () => clearTimeout(to);
    // eslint-disable-next-line
  }, [pause]);

  const { note, start, end } = pause;

  const length = timeDiff(start, end);

  const handleChange = (field) => ({ target: { value } }) => {
    const newPause = { ...pause, [field]: value };
    setPause(newPause);
  };

  const handleChangeValue = (field) => (value) => {
    const newPause = { ...pause, [field]: value };
    setPause(newPause);
  };

  const handleChangeLength = (value) => {
    const newPause = {
      ...pause,
      end: new Date(+new Date(end) + (value - length)),
    };
    setPause(newPause);
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
          label={delta2hms(length)}
          value={note}
          onChange={handleChange("note")}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={() => setOpen(true)}>
                  <EditIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </ListItem>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Modifica pausa</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <KeyboardDatePicker
                fullWidth
                label="Data di inizio"
                value={start}
                onChange={handleChangeValue("start")}
                format="dd/MM/yyyy"
              />
            </ListItem>
            <ListItem>
              <KeyboardTimePicker
                fullWidth
                ampm={false}
                label="Ora di inizio"
                value={start}
                onChange={handleChangeValue("start")}
                views={["hours", "minutes", "seconds"]}
                keyboardIcon={<ClockIcon />}
                format="HH:mm:ss"
              />
            </ListItem>
            <ListItem>
              <DurationField
                fullWidth
                label="Durata"
                value={length}
                onChange={handleChangeLength}
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
