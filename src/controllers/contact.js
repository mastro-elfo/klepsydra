import { merge } from "./utils";

export const defaultValue = {
  id: null,
  type: "email",
  value: "",
};

export function fromObject(data) {
  return merge(defaultValue, { id: +new Date() }, data);
}
