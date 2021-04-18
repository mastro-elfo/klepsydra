import {
  Checkbox,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { delta2hms, timeDiff } from "../tracker/utils";

import CheckIcon from "@material-ui/icons/CheckCircle";

export default function PerformanceListItem({
  checked,
  onClick,
  onToggle,
  performance,
}) {
  const {
    client: { name, surname },
    end,
    note,
    pauses,
    payed,
    start,
  } = performance;
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        {!!payed ? <CheckIcon color="secondary" /> : <span />}
      </ListItemIcon>
      <ListItemText
        primary={
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">
                {name} {surname}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <ListItemText
                primary={new Date(start).toLocaleString()}
                secondary="Data"
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <ListItemText
                primary={delta2hms(timeDiff(start, end, pauses))}
                secondary="Durata"
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
