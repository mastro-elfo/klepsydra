import { merge } from "./utils";

const defaultValue = {
  id: null,
  start: null,
  end: null,
  note: "",
};

export function fromObject(...data) {
  const start = new Date();
  return merge(
    defaultValue,
    {
      id: +start,
      start,
      end: start,
    },
    ...data
  );
}
