import { useState } from "react";

import { IconButton, TextField } from "@material-ui/core";

import { ConfirmDialogButton } from "mastro-elfo-mui";

import PrintIcon from "@material-ui/icons/Print";

export default function PrintDialogButton({ onPrint, ...props }) {
  const [title, setTitle] = useState("");
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");

  const handleConfirm = () => {
    onPrint({ title, before: before.split("\n"), after: after.split("\n") });
  };

  return (
    <ConfirmDialogButton
      Component={IconButton}
      onConfirm={handleConfirm}
      DialogProps={{
        title: "Stampa",
        confirm: "Stampa",
        cancel: "Annulla",
        content: [
          <TextField
            key="title"
            fullWidth
            label="Titolo"
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
          />,
          <TextField
            key="before"
            fullWidth
            label="Prima"
            value={before}
            onChange={({ target: { value } }) => setBefore(value)}
            multiline
            rows={2}
            rowsMax={4}
          />,
          <TextField
            key="after"
            fullWidth
            label="Dopo"
            value={after}
            onChange={({ target: { value } }) => setAfter(value)}
            multiline
            rows={2}
            rowsMax={4}
          />,
        ],
      }}
      {...props}
    >
      <PrintIcon />
    </ConfirmDialogButton>
  );
}
