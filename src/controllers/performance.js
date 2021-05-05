import { merge } from "./utils";
import { timeDiff } from "../pages/tracker/utils";
import Performance from "../db/performance";

export const defaultValue = {
  _id: undefined,
  client: null,
  discount: 0,
  end: null,
  // length: 0,
  note: "",
  pauses: [],
  payed: false,
  payments: [],
  price: 0,
  start: null,
  // status: null,
};

export function fromObject(...data) {
  return merge(defaultValue, ...data);
}

export function derived(performance) {
  const { discount, end, pauses, payments, price, start } = performance;
  const length = timeDiff(start, end, pauses);
  const cost = (length / 1000 / 3600) * price;
  const total = cost - discount;
  const balance = (payments || []).reduce((acc, { value }) => acc + value, 0);
  const due = total - balance;
  return { balance, cost, due, length, total };
}

const fields = [
  "_id",
  "client",
  "discount",
  // TODO: Remove, use length instead
  "end",
  "length",
  "note",
  "pauses",
  "payed",
  "payments",
  "price",
  "start",
];

export async function init() {
  return new Performance().init();
}

export function create(data) {
  return new Performance().create(data);
}

export function read(id) {
  return new Performance(id).read();
}

export function update(id, data) {
  return new Performance(id).update(data);
}

export function destroy(id) {
  return new Performance(id).delete();
}

export function search(
  query,
  { fromDate = null, toDate = null, notPayed = false, skip = 0 } = {}
) {
  // const re = RegExp(`.*${query}.*`, "i");
  const re = RegExp(
    query
      .split(" ")
      .map((q) => `.*${q}.*`)
      .join("|"),
    "i"
  );
  return new Performance()
    .search({
      selector: {
        $and: [
          {
            start: {
              $gte: fromDate ? fromDate.toISOString() : null,
              $lte: toDate ? toDate.toISOString() : new Date().toISOString(),
            },
          },
          notPayed ? { payed: false } : { payed: { $gte: null } },
          {
            $or: [
              { "client.name": { $regex: re } },
              { "client.surname": { $regex: re } },
            ],
          },
        ],
      },
      fields,
      sort: [{ start: "desc" }],
      limit: 10,
      skip,
    })
    .then(({ docs, warning }) => {
      if (warning) console.warn(warning);
      return docs;
    });
}

export function latest({
  client_id = null,
  fromDate = null,
  toDate = null,
  notPayed = false,
  skip = 0,
} = {}) {
  return new Performance()
    .search({
      selector: {
        $and: [
          {
            start: {
              $gte: fromDate ? fromDate.toISOString() : null,
              $lte: toDate ? toDate.toISOString() : new Date().toISOString(),
            },
          },
          notPayed ? { payed: false } : { payed: { $gte: null } },
          client_id ? { "client._id": client_id } : {},
        ],
      },
      fields,
      sort: [{ start: "desc" }],
      limit: 10,
      skip,
    })
    .then(({ docs, warning }) => {
      if (warning) console.warn(warning);
      return docs;
    });
}
