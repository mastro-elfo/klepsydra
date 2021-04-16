import { Grid, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Push } from "mastro-elfo-mui";

export default function ResultItem({ href, icon, ...props }) {
  return (
    <Grid item xs={12} sm="auto">
      <Push href={href}>
        <ListItem button>
          {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText {...props} />
        </ListItem>
      </Push>
    </Grid>
  );
}
