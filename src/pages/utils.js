import { useEffect } from "react";

export function useTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = `Klepsýdra - ${title}`;
    } else {
      document.title = "Klepsýdra";
    }
  }, []);
}
