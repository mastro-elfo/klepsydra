import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import DurationPickerDialog from "../../components/DurationPickerDialog";
import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";

import TimerIcon from "@material-ui/icons/Timer";

export default function DurationField({ value, onChange = () => {}, ...rest }) {
  const actual = useMemo(() => {
    const seconds = Math.floor(value / 1000) % 60;
    const minutes = Math.floor(value / 60000) % 60;
    const hours = Math.floor(value / 3600000);
    return { seconds, minutes, hours };
  }, [value]);

  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(actual);
  const [fieldValue, setFieldValue] = useState("");

  useEffect(() => {
    const { hours, minutes, seconds } = actual;
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");
    setFieldValue(`${h}:${m}:${s}`);
  }, [actual]);

  const handleConfirm = useCallback(() => {
    const { hours, minutes, seconds } = duration;
    onChange(1000 * (hours * 3600 + minutes * 60 + seconds));
    setOpen(false);
    // eslint-disable-next-line
  }, [duration]);

  useEffect(() => {
    setDuration(actual);
  }, [actual]);

  const handleChange = useCallback(({ target: { value } }) => {
    setFieldValue(value);
    const [hours, minutes, seconds] = value.split(":");
    if (hours && minutes && seconds) {
      onChange(
        1000 *
          (parseInt(hours.substr(0, 2)) * 3600 +
            parseInt(minutes.substr(0, 2)) * 60 +
            parseInt(seconds.substr(0, 2)))
      );
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <TextField
        value={fieldValue}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setOpen(true)}>
                <TimerIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...rest}
      />
      <DurationPickerDialog
        open={open}
        onClose={() => setOpen(false)}
        PickerProps={{
          onChange: (length) => setDuration(length),
          initialDuration: actual,
        }}
      >
        <Button onClick={handleConfirm}>Ok</Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </DurationPickerDialog>
    </Fragment>
  );
}
