import { Fragment } from "react";

import { withStyles } from "@material-ui/core/styles";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { TableHeadCell } from "mastro-elfo-mui";

import { useSettings } from "../settings/context";
import { delta2hms, timeDiff } from "../tracker/utils";

import CheckIcon from "@material-ui/icons/CheckCircle";

export default function PrintTable({
  list = [],
  printTitle = "",
  printBefore = "",
  printAfter = "",
  printNote = false,
}) {
  // console.log(list);
  const [settings] = useSettings();
  // const { printTitle, printBefore, printAfter } = settings;

  const cost = list
    .map(
      ({ start, end, pauses, price }) =>
        (timeDiff(start, end, pauses) / 1000 / 3600) * price
    )
    .reduce((acc, cur) => acc + cur, 0);
  const discount = list
    .map(({ discount }) => discount)
    .reduce((acc, cur) => acc + cur, 0);
  const total = cost - discount;
  const balance = list
    .map(({ payments }) => payments.reduce((acc, { value }) => acc + value, 0))
    .reduce((cur, acc) => cur + acc, 0);
  const due = total - balance;
  const payed = list.every(({ payed }) => !!payed);

  return (
    <Fragment>
      {!!printTitle && (
        <Typography variant="h4" gutterBottom>
          {printTitle}
        </Typography>
      )}
      {!!printBefore &&
        printBefore.split("\n").map((p, i) => (
          <Typography key={i} variant="body2">
            {p}
          </Typography>
        ))}
      {!!printBefore && <Typography variant="body2" gutterBottom></Typography>}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Data e Ora</TableHeadCell>
              <TableHeadCell>Durata</TableHeadCell>
              <TableHeadCell>Prezzo {settings.currency}/h</TableHeadCell>
              <TableHeadCell>Costo {settings.currency}</TableHeadCell>
              <TableHeadCell>Sconto {settings.currency}</TableHeadCell>
              <TableHeadCell>Tot. {settings.currency}</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableFooter></TableFooter>
          <TableBody>
            {list.map(({ _id, ...rest }) => (
              <PrintTableRow key={_id} printNote={printNote} {...rest} />
            ))}
            <TableRow>
              <Borderless colSpan={3}>
                <Typography variant="button" display="block" align="right">
                  Totale
                </Typography>
              </Borderless>
              <Borderless>{cost.toFixed(2)}</Borderless>
              <Borderless>{discount.toFixed(2)}</Borderless>
              <Borderless>{total.toFixed(2)}</Borderless>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}>
                <Typography
                  variant="button"
                  display="block"
                  align="right"
                  color={payed ? "default" : "secondary"}
                >
                  {payed ? "Pagato" : "Da Pagare"}
                </Typography>
              </TableCell>
              <TableCell>
                {payed ? (
                  <CheckIcon color="secondary" />
                ) : (
                  <Typography color="secondary" variant="body2">
                    {due.toFixed(2)}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {!!printAfter && <Typography variant="body2" gutterBottom></Typography>}
      {!!printAfter &&
        printAfter.split("\n").map((p, i) => (
          <Typography key={i} variant="body2">
            {p}
          </Typography>
        ))}
    </Fragment>
  );
}

const Borderless = withStyles({
  root: {
    borderBottom: "none",
  },
})(TableCell);

function PrintTableRow({
  client: { name, surname },
  discount,
  end,
  note,
  pauses,
  payed,
  payments,
  price,
  start,
  printNote = false,
}) {
  // const [settings] = useSettings();

  const length = timeDiff(start, end, pauses);
  const cost = (length / 1000 / 3600) * price;
  const total = cost - discount;
  const balance = payments.reduce((acc, { value }) => acc + value, 0);
  const due = total - balance;

  return (
    <Fragment key={start}>
      <TableRow>
        <Borderless>{new Date(start).toLocaleString()}</Borderless>
        <Borderless>{delta2hms(length)}</Borderless>
        <Borderless>{price.toFixed(2)}</Borderless>
        <Borderless>{cost.toFixed(2)}</Borderless>
        <Borderless>{discount.toFixed(2)}</Borderless>
        <Borderless>{total.toFixed(2)}</Borderless>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3}>
          <Typography variant="body2" color="textSecondary">
            {printNote ? note : ""}
          </Typography>
        </TableCell>
        <TableCell colSpan={2}>
          <Typography
            variant="button"
            display="block"
            align="right"
            color={payed ? "default" : "secondary"}
          >
            {payed ? "Pagato" : "Da Pagare"}
          </Typography>
        </TableCell>
        <TableCell>
          {payed ? (
            <CheckIcon color="secondary" />
          ) : (
            <Typography color={payed ? "default" : "secondary"} variant="body2">
              {due.toFixed(2)}
            </Typography>
          )}
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
