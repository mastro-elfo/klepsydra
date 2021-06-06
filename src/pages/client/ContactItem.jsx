import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import EmailIcon from "@material-ui/icons/Email";
import LinkIcon from "@material-ui/icons/Link";
import PhoneIcon from "@material-ui/icons/Phone";

export default function ContactItem({ contact }) {
  const { t } = useTranslation();
  const { type, value } = contact;

  const typeIcon = {
    email: <EmailIcon />,
    link: <LinkIcon />,
    phone: <PhoneIcon />,
  }[type] || <BrokenImageIcon />;

  const typeLabel =
    {
      email: t("Email"),
      link: t("Link"),
      phone: t("Telephone"),
    }[type] || t("Undefined");

  return (
    <ListItem>
      <ListItemIcon>{typeIcon}</ListItemIcon>
      <ListItemText primary={value} secondary={typeLabel} />
    </ListItem>
  );
}
