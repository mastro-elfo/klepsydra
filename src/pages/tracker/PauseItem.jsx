import { useEffect, useState } from "react";
import { useTracker } from "./context";
import { TextField } from "@material-ui/core";

import { delta2hms } from "./utils";

export default function PauseItem({ index }) {
  const [tracker, setTracker] = useTracker();
  const { pauses } = tracker || {};

  const [pause, setPause] = useState(pauses[index]);

  useEffect(() => {
    const to = setTimeout(() => {
      const _pauses = pauses.slice();
      _pauses[index] = pause;
      setTracker({ ...tracker, pauses: _pauses });
    }, 200);
    return () => clearTimeout(to);
    // eslint-disable-next-line
  }, [pause]);

  const { note, length } = pause;

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
