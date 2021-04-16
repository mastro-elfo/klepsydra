
import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export function useTracker() {
  return useContext(Context);
}

export default function TrackerProvider({ children, defaultValue }) {
  const value = useState(defaultValue);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

