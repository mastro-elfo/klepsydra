import { useEffect, useState } from "react";
import { useTracker } from "./context";
import { TextField } from "@material-ui/core";

import { delta2hms, timeDiff } from "../tracker/utils";

export default function PauseItem({ index }) {
  const [tracker, setTracker] = useTracker();
  const { pauses } = tracker || {};

  const [pause, setPause] = useState(pauses[index]);
  const { end, note, start } = pause;
  const length = timeDiff(start, end);

  useEffect(() => {
    const to = setTimeout(() => {
      const _pauses = pauses.slice();
      _pauses[index] = pause;
      setTracker({ ...tracker, pauses: _pauses });
    }, 200);
    return () => clearTimeout(to);
    // eslint-disable-next-line
  }, [pause]);

  const handleChange = ({ target: { value } }) =>
    setPause({ ...pause, note: value });

  return (
    <TextField
      fullWidth
      label={delta2hms(length)}
      value={note}
      onChange={handleChange}
    />
  );
}
