import { useRef, useState } from "react";
import {
  IconButton,
  InputAdornment,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";

export default function ListItemTextField({
  EditComponent = _EditComponent,
  ViewComponent = _ViewComponent,
  ...props
}) {
  const [edit, setEdit] = useState(false);
  const handleToggle = () => setEdit(!edit);
  if (edit) {
    return <EditComponent onToggle={handleToggle} {...props} />;
  }
  return <ViewComponent onToggle={handleToggle} {...props} />;
}

function _ViewComponent({ value, onToggle, ListItemProps = {}, ...props }) {
  return (
    <ListItem {...ListItemProps}>
      <ListItemText primary={value} {...props} />
      <ListItemSecondaryAction>
        <IconButton onClick={onToggle}>
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

function _EditComponent({
  value,
  onToggle,
  ListItemProps = {},
  onChange,
  ...props
}) {
  const [innerValue, setInnerValue] = useState(value);
  const handleClickDone = () => {
    onChange(value);
    onToggle();
  };
  return (
    <ListItem {...ListItemProps}>
      <TextField
        value={innerValue}
        onChange={({ target: { value } }) => setInnerValue(value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickDone}>
                <DoneIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </ListItem>
  );
}
