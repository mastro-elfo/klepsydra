import { merge } from "./utils";
import Performance from "../db/performance";

export const defaultValue = {
  _id: undefined,
  client: null,
  discount: 0,
  end: null,
  // length: 0,
  note: "",
  pauses: [],
  payments: [],
  price: 0,
  start: null,
  // status: null,
};

export function fromObject(data) {
  return merge(defaultValue, data);
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

export function search(query) {
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
          { start: { $gt: null } },
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
    })
    .then(({ docs, warning }) => {
      if (warning) console.warn(warning);
      return docs;
    });
}

export function latest({ client_id = null } = {}) {
  return new Performance()
    .search({
      selector: {
        $and: [
          { start: { $gt: null } },
          client_id ? { "client._id": client_id } : {},
        ],
      },
      fields,
      sort: [{ start: "desc" }],
      limit: 10,
    })
    .then(({ docs, warning }) => {
      if (warning) console.warn(warning);
      return docs;
    });
}
