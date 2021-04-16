import { createContext, useContext, useEffect, useMemo, useState } from "react";

const defaultValue = {
  price: 10,
  enableDiscountRound: false,
  discountRound: 1,
  currency: "€",
};

function dump(settings) {
  localStorage.setItem("settings", JSON.stringify(settings));
}

function load() {
  try {
    return Object.assign(
      defaultValue,
      JSON.parse(localStorage.getItem("settings"))
    );
  } catch {
    return defaultValue;
  }
}

const Context = createContext();

export function useSettings() {
  return useContext(Context);
}

export default function SettingsProvider({ children, defaultValue }) {
  const [value, set] = useState({
    ...defaultValue,
    ...useMemo(load, []),
  });

  useEffect(() => {
    dump(value);
  }, [value]);

  return <Context.Provider value={[value, set]}>{children}</Context.Provider>;
}
