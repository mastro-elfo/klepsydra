import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { Push } from "mastro-elfo-mui";

import { latest } from "../../controllers/performance";

import CheckIcon from "@material-ui/icons/CheckCircle";

export default function Latest({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const [list, setList] = useState();

  useEffect(() => {
    latest(id)
      .then((docs) => setList(docs))
      .catch((e) => {
        console.error(e);
        enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
      });
    // eslint-disable-next-line
  }, [id]);

  if (!list)
    return (
      <List>
        {Array(10)
          .fill(true)
          .map((_, i) => (
            <ListItem key={i}>
              <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
            </ListItem>
          ))}
      </List>
    );

  return (
    <List
      subheader={
        <ListSubheader>Ultime prestazioni ({list.length})</ListSubheader>
      }
    >
      {list.map(({ _id, note, payed, start }) => (
        <Push key={_id} href={`/performance/view/${_id}`}>
          <ListItem button>
            <ListItemIcon>
              {!!payed && <CheckIcon color="secondary" />}
            </ListItemIcon>
            <ListItemText
              primary={note}
              secondary={new Date(start).toLocaleString()}
            />
          </ListItem>
        </Push>
      ))}
    </List>
  );
}
