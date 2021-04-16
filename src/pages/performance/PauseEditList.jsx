import { useEffect, useState } from "react";

import {
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
  ListItemText,
} from "@material-ui/core";

import PauseEdit from "./PauseEdit";

import AddIcon from "@material-ui/icons/Add";

export default function PauseEditList({ pauses: _pauses, onChange }) {
  const [pauses, setPauses] = useState(_pauses);

  useEffect(() => {
    const to = setTimeout(onChange, 250, pauses);
    return () => clearTimeout(to);
    // eslint-disable-next-line
  }, [pauses]);

  const handleAddPause = () => {
    const start = new Date();
    setPauses([{ id: start, start, end: start, note: "" }, ...pauses]);
  };

  const handleChange = (index) => (pause) => {
    const _pauses = pauses.slice();
    _pauses[index] = pause;
    setPauses(_pauses);
  };

  const handleDelete = (index) => () => {
    const _pauses = pauses.slice();
    _pauses.splice(index, 1);
    setPauses(_pauses);
  };

  return (
    <List subheader={<ListSubheader>Pause</ListSubheader>}>
      <ListItem button onClick={handleAddPause}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Aggiungi" />
      </ListItem>
      {pauses.map(({ id, ...pause }, i) => (
        <PauseEdit
          key={id || i}
          pause={pause}
          onChange={handleChange(i)}
          onDelete={handleDelete(i)}
        />
      ))}
    </List>
  );
}
