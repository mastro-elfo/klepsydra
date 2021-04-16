import open from "./open";

export default class Model {
  constructor(table, id) {
    this._table = table;
    this._id = id;
    this._db = open(table);
    this._indexes = [
      {
        fields: [{ updatedAt: "desc" }],
        name: "idx_updatedAt",
      },
    ];
  }

  async init() {
    return Promise.all(
      this._indexes.map((index) => this._db.createIndex({ index }))
    ).catch((e) => {
      console.error(e);
    });
  }

  create(doc, options = {}) {
    // https://pouchdb.com/api.html#create_document
    // {
    //   "ok" : true,
    //   "id" : "8A2C3761-FFD5-4770-9B8C-38C33CED300A",
    //   "rev" : "1-d3a8e0e5aa7c8fff0c376dac2d8a4007"
    // }
    return this._db.post(
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        ...doc,
      },
      options
    );
  }

  read(options = {}) {
    // https://pouchdb.com/api.html#fetch_document
    return this._db.get(this._id, options);
  }

  update(doc, options = {}) {
    // https://pouchdb.com/api.html#create_document
    return this._db.get(this._id).then((dbdoc) =>
      this._db.put(
        {
          _id: this._id,
          _rev: dbdoc._rev,
          ...doc,
          updatedAt: new Date(),
        },
        options
      )
    );
  }

  delete(options = {}) {
    // https://pouchdb.com/api.html#delete_document
    return this._db.get(this._id).then((dbdoc) => this._db.remove(dbdoc));
  }

  search(request) {
    // https://pouchdb.com/api.html#query_index
    return this._db.find(request);
  }

  all(options = {}) {
    return this._db.allDocs(options);
  }
}
