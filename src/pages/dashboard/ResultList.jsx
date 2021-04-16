import { Grid, Typography } from "@material-ui/core";
import ResultItem from "./ResultItem";

export default function ResultList({ Item = ResultItem, Icon, list, title }) {
  if (!list) return null;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">
          {title} ({list.length})
        </Typography>
      </Grid>
      <Grid item xs={12} container spacing={2}>
        {list.map((item) => (
          <Item icon={Icon ? <Icon /> : <span />} {...item} />
        ))}
      </Grid>
    </Grid>
  );
}
