import { useEffect, useState } from "react";

import {
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
  ListItemText,
} from "@material-ui/core";

import PaymentEdit from "./PaymentEdit";
import { fromObject as paymentFromObject } from "../../controllers/payment";

import AddIcon from "@material-ui/icons/Add";

export default function PaymentEditList({
  due,
  payments: _payments,
  onChange,
}) {
  const [payments, setPayments] = useState(_payments);

  useEffect(() => {
    if (_payments.length > payments.length) {
      // A payment is added from outside
      setPayments(_payments);
    }
    // eslint-disable-next-line
  }, [_payments]);

  useEffect(() => {
    const to = setTimeout(onChange, 250, payments);
    return () => clearTimeout(to);
    // eslint-disable-next-line
  }, [payments]);

  const handleAddPayment = () =>
    setPayments([paymentFromObject({ value: due }), ...payments]);

  const handleChange = (index) => (payment) => {
    const _payments = payments.slice();
    _payments[index] = payment;
    setPayments(_payments);
  };

  const handleDelete = (index) => () => {
    const _payments = payments.slice();
    _payments.splice(index, 1);
    setPayments(_payments);
  };

  return (
    <List subheader={<ListSubheader>Pagamenti</ListSubheader>}>
      <ListItem button onClick={handleAddPayment}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Aggiungi" />
      </ListItem>
      {payments.map(({ id, ...payment }, i) => (
        <PaymentEdit
          key={id}
          payment={{ id, ...payment }}
          onChange={handleChange(i)}
          onDelete={handleDelete(i)}
        />
      ))}
    </List>
  );
}
