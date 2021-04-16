import { useSnackbar } from "notistack";

import { IconButton } from "@material-ui/core";

import StopDialogButton from "./StopDialogButton";

import { useTracker } from "./context";
import { timeDiff } from "./utils";

import StartIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

export default function Controllers() {
  const { enqueueSnackbar } = useSnackbar();
  const [tracker, setTracker] = useTracker();
  const { pause, pauses, status } = tracker || {};

  const handleStart = () => {
    setTracker({
      ...tracker,
      status: "started",
      start: new Date(),
      pauses: [],
    });
    enqueueSnackbar("Cronometro avviato", { variant: "success" });
  };

  const handlePause = () => {
    const start = new Date();
    setTracker({
      ...tracker,
      status: "paused",
      pause: { id: start, start, end: null, length: 0, note: "" },
    });
    enqueueSnackbar("Cronometro in pausa", { variant: "success" });
  };

  const handleResume = () => {
    const end = new Date();
    setTracker({
      ...tracker,
      status: "started",
      pauses: [
        { ...pause, end, length: timeDiff(tracker.pause.start, end) },
        ...(pauses || []),
      ],
      pause: null,
    });
    enqueueSnackbar("Cronometro avviato", { variant: "success" });
  };

  return [
    <StopDialogButton key="stop" />,
    <IconButton
      key="pause"
      color="inherit"
      disabled={!status || status !== "started"}
      onClick={handlePause}
    >
      <PauseIcon />
    </IconButton>,
    !!status && (
      <IconButton
        key="resume"
        color="inherit"
        disabled={status !== "paused"}
        onClick={handleResume}
      >
        <StartIcon />
      </IconButton>
    ),
    !status && (
      <IconButton key="play" color="inherit" onClick={handleStart}>
        <StartIcon />
      </IconButton>
    ),
  ];
}
