import { merge } from "./utils";

export const defaultValue = {
  client: null,
  note: "",
  pause: null,
  pauses: [],
  price: 0,
  start: null,
  status: null,
};

export function fromObject(...data) {
  return merge(defaultValue, ...data);
}
