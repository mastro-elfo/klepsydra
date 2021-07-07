import { useState } from "react";

import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import { ConfirmDialogButton } from "mastro-elfo-mui";
// import { useTranslation } from "react-i18next";

import { useSettings } from "../settings/context";

import PrintIcon from "@material-ui/icons/Print";

export default function PrintModal({ onPrint = () => {}, ...rest }) {
  const [settings] = useSettings();
  // const { t } = useTranslation();
  const [printTitle, setPrintTitle] = useState(settings.printTitle);
  const [printBefore, setPrintBefore] = useState(settings.printBefore);
  const [printAfter, setPrintAfter] = useState(settings.printAfter);
  const [printNote, setPrintNote] = useState(settings.printNote);

  const handleOpen = () => {
    setPrintTitle(settings.printTitle);
    setPrintBefore(settings.printBefore);
    setPrintAfter(settings.printAfter);
  };

  const handlePrint = () => {
    setTimeout(onPrint, 225, {
      printTitle,
      printBefore,
      printAfter,
      printNote,
    });
  };

  return (
    <ConfirmDialogButton
      isIcon
      DialogProps={{
        title: "Print document",
        confirm: "Print",
        cancel: "Cancel",
        content: (
          <>
            <TextField
              key="title"
              fullWidth
              label="Title"
              value={printTitle}
              onChange={({ target: { value } }) => setPrintTitle(value)}
            />
            <TextField
              key="before"
              fullWidth
              label="Before"
              value={printBefore}
              onChange={({ target: { value } }) => setPrintBefore(value)}
            />
            <TextField
              key="after"
              fullWidth
              label="After"
              value={printAfter}
              onChange={({ target: { value } }) => setPrintAfter(value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={printNote}
                  onChange={() => setPrintNote(!printNote)}
                />
              }
              label="Print note"
            />
          </>
        ),
      }}
      onConfirm={handlePrint}
      onOpen={handleOpen}
      {...rest}
    >
      <PrintIcon />
    </ConfirmDialogButton>
  );
}
