import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import EmailIcon from "@material-ui/icons/Email";
import LinkIcon from "@material-ui/icons/Link";
import PhoneIcon from "@material-ui/icons/Phone";

export default function ContactItem({ contact }) {
  const { type, value } = contact;

  const typeIcon = {
    email: <EmailIcon />,
    link: <LinkIcon />,
    phone: <PhoneIcon />,
  }[type] || <BrokenImageIcon />;

  const typeLabel =
    {
      email: "Email",
      link: "Link",
      phone: "Telefono",
    }[type] || "Non definito";

  return (
    <ListItem>
      <ListItemIcon>{typeIcon}</ListItemIcon>
      <ListItemText primary={value} secondary={typeLabel} />
    </ListItem>
  );
}
