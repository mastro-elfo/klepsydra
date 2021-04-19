export function create(props) {
  const start = new Date();
  return {
    id: +start,
    start,
    end: start,
    note: "",
    ...props,
  };
}
