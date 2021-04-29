import { Grid } from "@material-ui/core";
import FullPage from "./FullPage";
import ThemePaper from "./ThemePaper";

export default function AppLoading({ children }) {
  return (
    <ThemePaper square elevation={0}>
      <FullPage
        Component={Grid}
        container
        alignItems="center"
        justify="center"
        alignContent="center"
      >
        <Grid item>{children}</Grid>
      </FullPage>
    </ThemePaper>
  );
}
