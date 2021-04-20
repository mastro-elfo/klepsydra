import Performance from "../db/performance";

const defaultValue = {
  client: null,
  discount: 0,
  // TODO: Remove, use length instead
  end: null,
  length: 0,
  note: "",
  pauses: [],
  payments: [],
  price: 0,
  start: null,
  status: null,
};
const keys = Object.keys(defaultValue);

export function fromObject(data) {
  return Object.assign(
    {},
    defaultValue,
    Object.keys(data)
      .filter((k) => keys.indexOf(k) !== -1)
      .reduce((acc, curr) => ({ ...acc, [curr]: data[curr] }), {})
  );
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
  const re = RegExp(`.*${query}.*`, "i");
  return new Performance()
    .search({
      selector: {
        start: { $gt: null },
        $or: [
          { "client.name": { $regex: re } },
          { "client.surname": { $regex: re } },
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

export function latest(client_id) {
  return new Performance()
    .search({
      selector: {
        start: { $gt: null },
        ...(client_id ? { "client._id": client_id } : null),
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
