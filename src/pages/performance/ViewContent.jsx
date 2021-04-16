import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@material-ui/core";

import { GrowTypography } from "mastro-elfo-mui";

import { useSettings } from "../settings/context";
import { delta2hms, timeDiff } from "../tracker/utils";

import CheckIcon from "@material-ui/icons/CheckCircle";

export default function ViewContent({ performance, print = false }) {
  const [settings] = useSettings();
  const {
    client: { name, surname },
    discount,
    end,
    note,
    pauses,
    payed,
    payments,
    price,
    start,
  } = performance;

  const length = timeDiff(start, end, pauses);
  const cost = (length / 1000 / 3600) * price;
  const total = cost - discount;
  const balance = payments.reduce((acc, { value }) => acc + value, 0);
  const due = total - balance;

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <GrowTypography variant="h4">
          {name} {surname}
        </GrowTypography>
        <Box display="flex" alignItems="center">
          {!!payed && (
            <ListItemIcon>
              <CheckIcon color="secondary" />
            </ListItemIcon>
          )}
          <ListItemText
            primary={
              <Typography variant="h5">
                {parseFloat(total).toFixed(2)} {settings.currency}
              </Typography>
            }
            secondary="Totale"
          />
        </Box>
      </Box>

      <Grid container justify="space-between">
        <Grid item xs={6} sm="auto">
          <ListItemText
            primary={new Date(start).toLocaleString()}
            secondary="Inizio"
          />
        </Grid>
        <Grid item xs={6} sm="auto">
          <ListItemText
            primary={new Date(end).toLocaleString()}
            secondary="Fine"
          />
        </Grid>
        <Grid item xs={6} sm="auto">
          <ListItemText primary={delta2hms(length)} secondary="Durata" />
        </Grid>
      </Grid>

      {!!note && (
        <Box mb={1}>
          <Typography variant="h6">Note</Typography>
          {note.split("\n").map((p, i) => (
            <Typography key={i} variant="body2" color="textSecondary">
              {p}
            </Typography>
          ))}
        </Box>
      )}

      <Typography variant="h6">Riepilogo</Typography>
      <Grid container justify="space-between">
        <Grid item xs={4} sm={3} md="auto">
          <ListItemText
            primary={`${parseFloat(price).toFixed(2)} ${settings.currency}/h`}
            secondary="Tariffa"
          />
        </Grid>
        <Grid item xs={4} sm={3} md="auto">
          <ListItemText
            primary={`${parseFloat(cost).toFixed(2)} ${settings.currency}`}
            secondary="Costo"
          />
        </Grid>
        <Grid item xs={4} sm={3} md="auto">
          <ListItemText
            primary={`${parseFloat(discount).toFixed(2)} ${settings.currency}`}
            secondary="Sconto"
          />
        </Grid>
        <Grid item xs={4} sm={3} md="auto">
          <ListItemText
            primary={`${parseFloat(total).toFixed(2)} ${settings.currency}`}
            secondary="Totale"
          />
        </Grid>
        <Grid item xs={4} sm={3} md="auto">
          <ListItemText
            primary={`${parseFloat(balance).toFixed(2)} ${settings.currency}`}
            secondary="Saldo"
          />
        </Grid>
        <Grid item xs={4} sm={3} md="auto">
          <ListItemText
            primary={`${parseFloat(due).toFixed(2)} ${settings.currency}`}
            secondary="Dovuto"
          />
        </Grid>
      </Grid>

      {!!pauses && pauses.length !== 0 && (
        <List subheader={<ListSubheader>Pause</ListSubheader>}>
          {pauses.map(({ note, length }, i) => (
            <ListItem key={i}>
              <ListItemText primary={note} secondary={delta2hms(length)} />
            </ListItem>
          ))}
        </List>
      )}

      {!!payments && payments.length !== 0 && (
        <List subheader={<ListSubheader>Pagamenti</ListSubheader>}>
          {payments.map(({ value, date }) => (
            <ListItem key={date}>
              <ListItemText
                primary={`${parseFloat(value).toFixed(2)} ${settings.currency}`}
                secondary={new Date(date).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
