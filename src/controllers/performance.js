import Performance from "../db/performance";

const fields = [
  "_id",
  "client",
  "discount",
  "end",
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
