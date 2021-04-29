import { LinearProgress, Typography } from "@material-ui/core";
import AppLoading from "./components/AppLoading";

export default function AppLoader({ children, loading }) {
  if (loading) {
    return (
      <AppLoading>
        <Typography variant="h3">Loading</Typography>
        <LinearProgress variant="indeterminate" color="secondary" />
      </AppLoading>
    );
  }
  return children;
}
