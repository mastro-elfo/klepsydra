import { useEffect, useRef, useState } from "react";
import { useTracker } from "./context";
import { TextField } from "@material-ui/core";

import { delta2hms } from "./utils";

export default function Pause() {
  const [tracker, setTracker] = useTracker();
  const [pause, setPause] = useState({});
  const [length, setLength] = useState(0);
  const ref = useRef();

  const { status } = tracker || {};
  const { note, start } = pause || {};

  useEffect(() => {
    setPause(tracker.pause);
    if (ref && ref.current) {
      ref.current.focus();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (status === "paused") {
      const to = setTimeout(() => {
        setLength(new Date() - start);
      }, 1000);
      return () => clearTimeout(to);
    }
  }, [length, start, status]);

  useEffect(() => {
    const to = setTimeout(() => {
      setTracker({ ...tracker, pause });
    }, 200);
    return () => clearTimeout(to);
    // eslint-disable-next-line
  }, [pause]);

  if (status !== "paused") return null;

  const handleChange = ({ target: { value } }) => {
    setPause({ ...pause, note: value });
  };

  return (
    <TextField
      fullWidth
      label={delta2hms(length)}
      value={note || ""}
      onChange={handleChange}
      inputRef={ref}
    />
  );
}
