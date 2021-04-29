import { merge } from "./utils";
import Client from "../db/client";

export const defaultValue = {
  _id: undefined,
  contacts: [],
  name: "",
  price: 0,
  surname: "",
  // TODO: Deprecated, will be removed soon
  email: "",
  telephone: "",
};

export function fromObject(...data) {
  return merge(defaultValue, ...data);
}

const fields = [
  "_id",
  "contacts",
  "name",
  "price",
  "surname",
  // TODO: Deprecated, will be removed soon
  "email",
  "telephone",
];

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
  const re = RegExp(
    query
      .split(" ")
      .filter((q) => !!q.trim())
      .map((q) => `.*${q}.*`)
      .join("|"),
    "i"
  );
  return new Client()
    .search({
      selector: {
        $or: [
          { name: { $regex: re } },
          { surname: { $regex: re } },
          { contacts: { $elemMatch: { value: { $regex: re } } } },
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
