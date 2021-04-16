import { useEffect, useState } from "react";
import { useTracker } from "./context";
import { delta2hms, timeDiff } from "./utils";

export default function Timer() {
  const [tracker] = useTracker();
  const [timer, setTimer] = useState("00:00:00");
  const { pause, pauses, start, status } = tracker || {};
  useEffect(() => {
    if (start) {
      if (status === "started") {
        const to = setTimeout(() => {
          setTimer(
            delta2hms(timeDiff(start, pause ? pause.start : new Date(), pauses))
          );
        }, 1000);
        return () => clearTimeout(to);
      }
    } else {
      setTimer("00:00:00");
    }
    // eslint-disable-next-line
  }, [start, status, timer]);
  return timer;
}
