import { useEffect, useState } from "react";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";

import ContactEditItem from "./ContactEditItem";
import ContactItem from "./ContactItem";
import { fromObject } from "../../controllers/contact";

import AddIcon from "@material-ui/icons/Add";

export default function ContactList({
  contacts: _contacts,
  edit = false,
  onChange,
}) {
  const [contacts, setContacts] = useState(_contacts);

  useEffect(() => {
    const to = setTimeout(onChange, 100, contacts);
    return () => clearTimeout(to);
    // eslint-disable-next-line
  }, [contacts]);

  const handleAdd = () => setContacts([fromObject(), ...contacts]);

  const handleDelete = (index) => () => {
    const _contacts = contacts.slice();
    _contacts.splice(index, 1);
    setContacts(_contacts);
  };

  const handleChange = (index) => (contact) => {
    const _contacts = contacts.slice();
    _contacts[index] = contact;
    setContacts(_contacts);
  };

  const Item = edit ? ContactEditItem : ContactItem;

  return (
    <List subheader={<ListSubheader>Contatti</ListSubheader>}>
      {!!edit && (
        <ListItem button onClick={handleAdd}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Aggiungi" />
        </ListItem>
      )}
      {contacts.map((contact, index) => {
        return (
          <Item
            key={contact.id}
            contact={contact}
            onChange={handleChange(index)}
            onDelete={handleDelete(index)}
          />
        );
      })}
    </List>
  );
}
