import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  // ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
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

import DurationField from "./DurationField";
import PauseEditList from "./PauseEditList";
import PaymentEditList from "./PaymentEditList";
import { read as read_client } from "../../controllers/client";
import { update, destroy } from "../../controllers/performance";
import { roundCost, timeDiff } from "../tracker/utils";
import { useSettings } from "../settings/context";
import { closeTo } from "./utils";

import ClockIcon from "@material-ui/icons/AccessTime";
import FillIcon from "@material-ui/icons/AddCircle";
import ReloadIcon from "@material-ui/icons/Autorenew";
import SaveIcon from "@material-ui/icons/Save";
// import TimerIcon from "@material-ui/icons/Timer";

function Component() {
  const { t } = useTranslation();
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
  const balance = payments.reduce(
    (acc, { value }) => acc + parseFloat(value),
    0
  );
  const due = total - balance;
  const payed = closeTo(due, 0);

  const handleSave = () => {
    // Check client
    // Check price
    if (isNaN(price) || price < 0) {
      return enqueueSnackbar(t("Performance.Snackbar.InvalidPrice"), {
        variant: "warning",
      });
    }
    update(id, { ...performance, payed })
      .then((r) => {
        // console.log(r);
        enqueueSnackbar(t("Performance.Snackbar.ChangesSaved"), {
          variant: "success",
        });
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
        enqueueSnackbar(t("Performance.Snackbar.PerformanceDeleted"), {
          variant: "success",
        });
        setTimeout(go, 500, -2);
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
      });
  };

  const handleChange = (field, cast = (v) => v) => ({ target: { value } }) =>
    setPerformance({ ...performance, [field]: cast(value) });

  const handleChangeValue = (field, cast = (v) => v) => (value) =>
    setPerformance({ ...performance, [field]: cast(value) });

  // Changing the start means also changing the end to keep the length constant
  const handleChangeStart = (value) =>
    setPerformance({
      ...performance,
      start: value,
      end: new Date(+new Date(end) + (new Date(value) - new Date(start))),
    });

  // Changing the length means changing the end value
  const handleChangeLength = (value) =>
    setPerformance({
      ...performance,
      end: new Date(+new Date(end) + (value - length)),
    });

  const handleAddPayment = () => {
    const date = new Date();
    setPerformance({
      ...performance,
      payments: [{ id: date, date, value: due }, ...performance.payments],
    });
  };

  const handleReloadClient = () =>
    read_client(client._id)
      .then((client) => {
        setPerformance({ ...performance, client });
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
      });

  return (
    <Page
      header={
        <Header
          leftAction={<BackIconButton />}
          rightAction={
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
                secondary={t("Client.Key")}
              />{" "}
              <ListItemSecondaryAction>
                <IconButton onClick={handleReloadClient}>
                  <ReloadIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`${balance.toFixed(2)} ${settings.currency}`}
                secondary={t("Performance.Balance")}
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
                label={t("Performance.StartDate")}
                value={start}
                onChange={handleChangeStart}
                format="dd/MM/yyyy"
              />
              <KeyboardTimePicker
                fullWidth
                ampm={false}
                label={t("Performance.StartHour")}
                value={start}
                onChange={handleChangeStart}
                views={["hours", "minutes", "seconds"]}
                keyboardIcon={<ClockIcon />}
                format="HH:mm:ss"
              />
            </ListItem>
            <ListItem>
              <DurationField
                fullWidth
                label={t("Performance.Length")}
                value={length}
                onChange={handleChangeLength}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                label={t("Performance.Price")}
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
                secondary={t("Performance.Cost")}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                label={t("Performance.Discount")}
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
                secondary={t("Performance.Total")}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                multiline
                variant="outlined"
                label={t("Performance.Notes")}
                rows={2}
                rowsMax={4}
                value={note}
                onChange={handleChange("note")}
              />
            </ListItem>
          </List>

          <PauseEditList
            pauses={pauses}
            onChange={handleChangeValue("pauses")}
          />

          <PaymentEditList
            due={due}
            payments={payments}
            onChange={handleChangeValue("payments")}
          />

          <List>
            <ListItem>
              <ConfirmDialogButton
                variant="contained"
                Component={DangerButton}
                onConfirm={handleDelete}
                DialogProps={{
                  title: t("Performance.Delete"),
                  content: t("Performance.Confirm delete performance"),
                  confirm: t("Delete"),
                  cancel: t("Cancel"),
                }}
              >
                {t("Delete")}
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
