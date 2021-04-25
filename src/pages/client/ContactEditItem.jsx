import { useEffect, useState } from "react";

import {
  IconButton,
  InputAdornment,
  ListItem,
  MenuItem,
  TextField,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import LinkIcon from "@material-ui/icons/Link";
import PhoneIcon from "@material-ui/icons/Phone";

export default function ContactItem({ contact: _contact, onChange, onDelete }) {
  const [contact, setContact] = useState(_contact);

  useEffect(() => {
    const to = setTimeout(onChange, 100, contact);
    return () => clearTimeout(to);
    // eslint-disable-next-line
  }, [contact]);

  const { type, value } = contact;

  const typeLabel =
    {
      email: "Email",
      link: "Link",
      phone: "Telefono",
    }[type] || "Non definito";

  const handleChange = (field) => ({ target: { value } }) =>
    setContact({ ...contact, [field]: value });

  return (
    <ListItem>
      <TextField
        fullWidth
        value={value}
        onChange={handleChange("value")}
        label={typeLabel}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TextField
                select
                value={type}
                onChange={handleChange("type")}
                InputProps={{ disableUnderline: true }}
              >
                <MenuItem value="email">
                  <EmailIcon />
                </MenuItem>
                <MenuItem value="link">
                  <LinkIcon />
                </MenuItem>
                <MenuItem value="phone">
                  <span></span>
                  <PhoneIcon />
                </MenuItem>
              </TextField>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </ListItem>
  );
}
