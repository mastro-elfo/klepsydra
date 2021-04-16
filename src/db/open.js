import PouchDB from "pouchdb";
import find from "pouchdb-find";
PouchDB.plugin(find);
export default function open(name, options = {}) {
  return new PouchDB(name, options);
}
