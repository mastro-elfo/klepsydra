import { ListItemIcon, Tooltip } from "@material-ui/core";

import HelpIcon from "@material-ui/icons/Help";

export default function ListItemHelp({ children }) {
  return (
    <ListItemIcon>
      <Tooltip arrow title={children}>
        <HelpIcon style={{ cursor: "help" }} />
      </Tooltip>
    </ListItemIcon>
  );
}
