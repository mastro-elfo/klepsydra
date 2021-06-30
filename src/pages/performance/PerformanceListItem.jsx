import {
  Checkbox,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { useSettings } from "../settings/context";
import { delta2hms, timeDiff } from "../tracker/utils";

import CheckIcon from "@material-ui/icons/CheckCircle";

export default function PerformanceListItem({
  checked,
  onClick,
  onToggle,
  performance,
}) {
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
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        {!!payed ? <CheckIcon color="secondary" /> : <span />}
      </ListItemIcon>
      <ListItemText
        primary={
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6">
                {name} {surname}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3}>
              <ListItemText
                primary={new Date(start).toLocaleString()}
                secondary="Data"
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <ListItemText
                primary={delta2hms(timeDiff(start, end, pauses))}
                secondary="Durata"
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <ListItemText
                primary={`${parseFloat(due).toFixed(2)} ${settings.currency}`}
                secondary="Dovuto"
              />
            </Grid>
          </Grid>
        }
        secondary={note}
      />
      <ListItemSecondaryAction>
        <Checkbox checked={checked} onChange={onToggle} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
