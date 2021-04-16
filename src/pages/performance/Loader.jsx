import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { For } from "mastro-elfo-mui";
import Loading from "../loading";

export default function Loader() {
  return (
    <Loading>
      <List>
        <For
          each={Array(10).fill(true)}
          Component={() => (
            <ListItem>
              <ListItemIcon>
                <Skeleton variant="circle" width={20} heigth={20} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6">
                        <Skeleton width="75%" />
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <ListItemText
                        primary={<Skeleton width="75%" />}
                        secondary={<Skeleton width="65%" />}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <ListItemText
                        primary={<Skeleton width="75%" />}
                        secondary={<Skeleton width="65%" />}
                      />
                    </Grid>
                  </Grid>
                }
                secondary={<Skeleton />}
              />
              <ListItemSecondaryAction>
                <Skeleton variant="circle" width={20} heigth={20} />
              </ListItemSecondaryAction>
            </ListItem>
          )}
        />
      </List>
    </Loading>
  );
}
