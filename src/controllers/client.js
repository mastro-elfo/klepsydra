import Client from "../db/client";

const fields = ["_id", "email", "name", "price", "surname", "telephone"];

export async function init() {
  return new Client().init();
}

export function create(data) {
  return new Client().create(data);
}

export function read(id) {
  return new Client(id).read();
}

export function update(id, data) {
  return new Client(id).update(data);
}

export function destroy(id) {
  return new Client(id).delete();
}

export function search(query) {
  const re = RegExp(`.*${query}.*`, "i");
  return new Client()
    .search({
      selector: {
        $or: [
          { name: { $regex: re } },
          { surname: { $regex: re } },
          { email: { $regex: re } },
          { telephone: { $regex: re } },
        ],
      },
      fields,
    })
    .then(({ docs, warning }) => {
      if (warning) console.warn(warning);
      return docs;
    });
}

export function latest() {
  return new Client()
    .search({
      selector: {
        updatedAt: { $gt: null },
      },
      fields,
      sort: [{ updatedAt: "desc" }],
      limit: 10,
    })
    .then(({ docs, warning }) => {
      if (warning) console.warn(warning);
      return docs;
    });
}
