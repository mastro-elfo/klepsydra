import Model from "./model";

export default class Performance extends Model {
  constructor(id) {
    super("performance", id);
    this._indexes.push({
      fields: [{ start: "desc" }],
      name: "idx_start",
    });
  }
}
