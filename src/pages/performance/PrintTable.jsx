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

export default function PrintTable({ list }) {
  // console.log(list);
  const [settings] = useSettings();

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
        <TableFooter>
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
          {!payed && (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="button" display="block" align="right">
                  Da Pagare
                </Typography>
              </TableCell>
              <TableCell>{payed ? "" : due.toFixed(2)}</TableCell>
            </TableRow>
          )}
        </TableFooter>
        <TableBody>
          {list.map(({ _id, ...rest }) => (
            <PrintTableRow key={_id} {...rest} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
        <Borderless>{delta2hms(timeDiff(start, end, pauses))}</Borderless>
        <Borderless>{price.toFixed(2)}</Borderless>
        <Borderless>{cost.toFixed(2)}</Borderless>
        <Borderless>{discount.toFixed(2)}</Borderless>
        <Borderless>{total.toFixed(2)}</Borderless>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3}>
          <Typography variant="body2" color="textSecondary">
            {note}
          </Typography>
        </TableCell>
        <TableCell colSpan={2}>
          {!payed && (
            <Typography variant="button" display="block" align="right">
              Da Pagare
            </Typography>
          )}
        </TableCell>
        <TableCell>{!payed && due.toFixed(2)}</TableCell>
      </TableRow>
    </Fragment>
  );
}
