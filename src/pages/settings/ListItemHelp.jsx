import PropTypes from "prop-types";

import { ListItemIcon, Tooltip, Typography } from "@material-ui/core";

import HelpIcon from "@material-ui/icons/Help";

export default function ListItemHelp({ children, title = "" }) {
  return (
    <ListItemIcon>
      <Tooltip
        arrow
        title={
          children ? children : <Typography variant="body2">{title}</Typography>
        }
      >
        <HelpIcon style={{ cursor: "help" }} />
      </Tooltip>
    </ListItemIcon>
  );
}

ListItemHelp.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
