import { styled } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const Component = styled(Paper)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.getContrastText(theme.palette.primary.main),
}));

export default function ThemePaper(props) {
  return <Component {...props} />;
}
