import { useTranslation } from "react-i18next";

import { useTracker } from "./context";
import { List, ListItem, ListSubheader } from "@material-ui/core";

import Pause from "./Pause";
import PauseItem from "./PauseItem";

export default function Pauses() {
  const { t } = useTranslation();
  const [tracker] = useTracker();

  const { pauses, status } = tracker || { pauses: [] };

  const hasPauses = !!(pauses && pauses.length);

  return (
    <List
      subheader={
        (hasPauses || status === "paused") && (
          <ListSubheader>{t("Pause")}</ListSubheader>
        )
      }
    >
      {!!status && status === "paused" && (
        <ListItem>
          <Pause />
        </ListItem>
      )}
      {hasPauses &&
        pauses.map(({ start }, i) => (
          <ListItem key={start}>
            <PauseItem index={i} />
          </ListItem>
        ))}
    </List>
  );
}
