import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import { IconButton } from "@material-ui/core";

import StopDialogButton from "./StopDialogButton";

import { useTracker } from "./context";
import { fromObject as pauseFromObject } from "../../controllers/pause";

import StartIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

export default function Controllers() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [tracker, setTracker] = useTracker();
  const { pause, pauses, status } = tracker || {};

  const handleStart = () => {
    setTracker({
      ...tracker,
      status: "started",
      start: new Date(),
      pauses: [],
    });
    enqueueSnackbar(t("Tracker.Snackbar.Started"), { variant: "info" });
  };

  const handlePause = () => {
    setTracker({
      ...tracker,
      status: "paused",
      pause: pauseFromObject(),
    });
    enqueueSnackbar(t("Tracker.Snackbar.Paused"), { variant: "info" });
  };

  const handleResume = () => {
    const end = new Date();
    setTracker({
      ...tracker,
      status: "started",
      pauses: [{ ...pause, end }, ...(pauses || [])],
      pause: null,
    });
    enqueueSnackbar(t("Tracker.Snackbar.Started"), { variant: "info" });
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
