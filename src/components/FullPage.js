import { useMemo } from "react";
import { styled } from "@material-ui/core/styles";

export default function FullPage({ Component, ...props }) {
  const StyledComponent = useMemo(
    () =>
      styled(Component)(() => ({
        width: "100vw",
        height: "100vh",
      })),
    [Component]
  );
  return <StyledComponent {...props} />;
}
