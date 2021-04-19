export function create(props) {
  const date = new Date();
  return {
    id: date,
    date,
    value: 0,
    ...props,
  };
}
