import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  TextField,
} from "@material-ui/core";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import {
  BackIconButton,
  ConfirmDialogButton,
  Content,
  DangerButton,
  Header,
  Page,
} from "mastro-elfo-mui";

import { update, destroy } from "../../controllers/performance";
import { delta2hms, roundCost, timeDiff } from "../tracker/utils";
import { useSettings } from "../settings/context";
import { closeTo } from "./utils";
import DurationField from "./DurationField";

import AddIcon from "@material-ui/icons/Add";
import ClockIcon from "@material-ui/icons/AccessTime";
import FillIcon from "@material-ui/icons/AddCircle";
import ReloadIcon from "@material-ui/icons/Autorenew";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
// import TimerIcon from "@material-ui/icons/Timer";

function Component() {
  const [settings] = useSettings();
  const { go, goBack, location } = useHistory();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [performance, setPerformance] = useState(location.state);

  const {
    start,
    end,
    price,
    discount,
    pauses,
    note,
    payments,
    client,
  } = performance;

  const { name, surname } = client;

  const length = timeDiff(start, end, pauses);
  const cost = (length / 1000 / 3600) * price;
  const total = cost - discount;
  const balance = payments.reduce((acc, { value }) => acc + value, 0);
  const due = total - balance;
  const payed = closeTo(due, 0);

  const handleSave = () => {
    // Check client
    // Check price
    if (isNaN(price) || price < 0) {
      return enqueueSnackbar("La tariffa inserita non è valida", {
        variant: "warning",
      });
    }
    update(id, { ...performance, payed })
      .then((r) => {
        // console.log(r);
        enqueueSnackbar("Modifiche salvate", { variant: "success" });
        setTimeout(goBack, 500);
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
      });
  };

  const handleDelete = () => {
    destroy(id)
      .then((r) => {
        // console.log(r);
        enqueueSnackbar("Prestazione eliminata", { variant: "success" });
        setTimeout(go, 500, -2);
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
      });
  };

  const handleChange = (field, cast = (v) => v) => ({ target: { value } }) =>
    setPerformance((p) => ({ ...p, [field]: cast(value) }));

  const handleChangeValue = (field, cast = (v) => v) => (value) =>
    setPerformance((p) => ({ ...p, [field]: cast(value) }));

  const handleChangeLength = (value) =>
    setPerformance((p) => ({
      ...p,
      end: new Date(+new Date(end) + (value - length)),
    }));

  const handleAddPayment = () => {
    setPerformance((p) => ({
      ...p,
      payments: [{ date: new Date(), value: due }, ...p.payments],
    }));
  };

  const handleDeletePayment = (i) => () => {
    const _payments = payments.slice();
    _payments.splice(i, 1);
    setPerformance((p) => ({ ...p, payments: _payments }));
  };

  const handleChangePayment = (i) => ({ target: { value } }) => {
    const _payments = payments.slice();
    _payments[i].value = parseFloat(value);
    setPerformance((p) => ({ ...p, payments: _payments }));
  };

  const handleAddPause = () =>
    setPerformance((p) => ({
      ...p,
      pauses: [
        { start: new Date(), end: new Date(), length: 0, note: "" },
        ...p.pauses,
      ],
    }));

  const handleDeletePause = (i) => () => {
    const _pauses = pauses.slice();
    _pauses.splice(i, 1);
    setPerformance((p) => ({ ...p, pauses: _pauses }));
  };

  const handleChangePause = (i, field, value) => {
    const _pauses = pauses.slice();
    _pauses[i][field] = value;
    setPerformance((p) => ({ ...p, pauses: _pauses }));
  };

  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={
        <Header
          LeftAction={<BackIconButton />}
          RightActions={
            <IconButton onClick={handleSave}>
              <SaveIcon />
            </IconButton>
          }
        >
          Modifica
        </Header>
      }
      content={
        <Content>
          <List>
            <ListItem>
              <ListItemText
                primary={`${name} ${surname}`}
                secondary="Studente"
              />{" "}
              <ListItemText
                primary={`${balance.toFixed(2)} ${settings.currency}`}
                secondary="Saldo"
              />
              <ListItemSecondaryAction>
                <IconButton onClick={handleAddPayment} disabled={payed}>
                  <FillIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <KeyboardDatePicker
                fullWidth
                label="Data di inizio"
                value={start}
                onChange={handleChangeValue("start")}
                format="dd/MM/yyyy"
              />
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
            <ListItem>
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
              <ListItemText
                primary={`${parseFloat(cost || 0).toFixed(2)} ${
                  settings.currency
                }`}
                secondary="Costo"
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                label="Sconto"
                type="number"
                value={parseFloat(discount || 0).toFixed(2)}
                onChange={handleChange("discount", parseFloat)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {settings.currency}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleChange("discount", () =>
                          roundCost(cost, settings.discountRound)
                        )}
                      >
                        <ReloadIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputProps={{ min: 0 }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${parseFloat(total || 0).toFixed(2)} ${
                  settings.currency
                }`}
                secondary="Totale"
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                multiline
                variant="outlined"
                label="Note"
                rows={2}
                rowsMax={4}
                value={note}
                onChange={handleChange("note")}
              />
            </ListItem>
          </List>

          <List subheader={<ListSubheader>Pause</ListSubheader>}>
            <ListItem button onClick={handleAddPause}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Aggiungi" />
            </ListItem>
            {pauses.map(({ start, end, note, length }, i) => (
              <ListItem key={i}>
                <TextField
                  fullWidth
                  label={delta2hms(length)}
                  value={note}
                  onChange={({ target: { value } }) =>
                    handleChangePause(i, "note", value)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton onClick={handleDeletePause(i)}>
                          <DeleteIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
            ))}
          </List>

          <List subheader={<ListSubheader>Pagamenti</ListSubheader>}>
            <ListItem button onClick={handleAddPayment}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Aggiungi" />
            </ListItem>
            {payments.map(({ value, date }, i) => (
              <ListItem key={i}>
                <TextField
                  fullWidth
                  type="number"
                  label={new Date(date).toLocaleString()}
                  value={parseFloat(value).toFixed(2)}
                  onChange={handleChangePayment(i)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {settings.currency}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleDeletePayment(i)}>
                          <DeleteIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
            ))}
          </List>

          <List>
            <ListItem>
              <ConfirmDialogButton
                variant="contained"
                Component={DangerButton}
                onConfirm={handleDelete}
                DialogProps={{
                  title: "Elimina Prestazione",
                  content: `Confermi di eliminare la prestazione?`,
                  confirm: "Elimina",
                  cancel: "Annulla",
                }}
              >
                Elimina
              </ConfirmDialogButton>
            </ListItem>
          </List>
        </Content>
      }
    />
  );
}

export const route = {
  path: "/performance/edit/:id",
  exact: true,
  component: Component,
};
