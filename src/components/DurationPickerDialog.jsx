import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import DurationPicker from "./DurationPicker";

export default function DurationPickerDialog({
  children,
  title = "",
  PickerProps = {},
  ...rest
}) {
  return (
    <Dialog {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DurationPicker {...PickerProps} />
      </DialogContent>
      <DialogActions>{children}</DialogActions>
    </Dialog>
  );
}
