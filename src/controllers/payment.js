import { merge } from "./utils";

const defaultValue = {
  id: null,
  date: null,
  value: 0,
};

export function fromObject(...data) {
  const date = new Date();
  return merge(
    defaultValue,
    {
      id: date,
      date,
    },
    ...data
  );
}
