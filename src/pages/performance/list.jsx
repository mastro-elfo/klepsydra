import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import {
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  BackIconButton,
  Content,
  Header,
  HeaderSearchField,
  Page,
  Push,
} from "mastro-elfo-mui";

import Loader from "./Loader";
import PerformanceListItem from "./PerformanceListItem";
import PrintTable from "./PrintTable";
import { latest, search } from "../../controllers/performance";

import AddIcon from "@material-ui/icons/Add";
import BlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckIcon from "@material-ui/icons/CheckBox";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PrintIcon from "@material-ui/icons/Print";

function Component() {
  const { enqueueSnackbar } = useSnackbar();
  const [list, setList] = useState();
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [didSearch, setDidSearch] = useState(false);
  const [includePayed, setIncludePayed] = useState(true);
  const [includeNotPayed, setIncludeNotPayed] = useState(true);
  const [print, setPrint] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      // setDidSearch(true);
      // Load latest
      latest({ includePayed, includeNotPayed })
        .then((docs) =>
          docs.filter(
            (d) =>
              d.payed === undefined ||
              (includePayed && d.payed === true) ||
              (includeNotPayed && d.payed === false)
          )
        )
        .then((docs) => setList(docs))
        .catch((e) => {
          console.error(e);
          enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
        });
    }
    // eslint-disable-next-line
  }, [searchQuery, includePayed, includeNotPayed]);

  useEffect(() => {
    if (searchQuery) {
      // TODO: Evetually move to handleSearch
      search(searchQuery, { includePayed, includeNotPayed })
        .then((docs) =>
          docs.filter(
            (d) =>
              d.payed === undefined ||
              (includePayed && d.payed === true) ||
              (includeNotPayed && d.payed === false)
          )
        )
        .then((docs) => setList(docs))
        .catch((e) => {
          console.error(e);
          enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
        });
    }
    // eslint-disable-next-line
  }, [searchQuery, includePayed, includeNotPayed]);

  // useEffect(() => {
  //   if (!(includePayed || includeNotPayed)) {
  //     setIncludeNotPayed(true);
  //   }
  // }, [includePayed]);
  //
  // useEffect(() => {
  //   if (!(includePayed || includeNotPayed)) {
  //     setIncludePayed(true);
  //   }
  // }, [includeNotPayed]);

  useEffect(() => {
    const _selected = selected
      .slice()
      .filter(({ _id }) => list.find((item) => item._id === _id));
    setSelected(_selected);
    // eslint-disable-next-line
  }, [list]);

  useEffect(() => {
    if (print) {
      window.print();
    }
  }, [print]);

  if (!list) {
    return <Loader />;
  }

  const handleToggle = (performance) => () => {
    const index = selected.indexOf(performance);
    if (index === -1) {
      setSelected([...selected, performance]);
    } else {
      const _selected = selected.slice();
      _selected.splice(index, 1);
      setSelected(_selected);
    }
  };

  const handleToggleAll = () => {
    if (selected.length === list.length) {
      setSelected([]);
    } else {
      setSelected(list.slice());
    }
  };

  const handleSearch = (_, q) => {
    if (q === "") {
      // setDidSearch(false);
      setSearchQuery("");
    } else {
      // setDidSearch(true);
      setSearchQuery(q);
      // search(q)
      //   .then((docs) => setList(docs))
      //   .catch((e) => {
      //     console.error(e);
      //     enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
      //   });
    }
  };

  const handleClear = () => {
    // setDidSearch(false);
    setSearchQuery("");
  };

  const handlePrint = () => {
    // window.print();
    setPrint(true);
  };

  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={
        <Header
          LeftAction={[
            <BackIconButton key="back" />,
            <HeaderSearchField
              key="search"
              fullWidth
              placeholder="Cerca prestazioni"
              onSearch={handleSearch}
              onClear={handleClear}
            />,
          ]}
          RightActions={[
            <Push key="create" replace href="/tracker">
              <IconButton disabled={selected.length !== 0}>
                <AddIcon />
              </IconButton>
            </Push>,
            <IconButton key="pay" disabled={selected.length === 0}>
              <MonetizationOnIcon />
            </IconButton>,
            <IconButton
              key="print"
              disabled={selected.length === 0}
              onClick={handlePrint}
            >
              <PrintIcon />
            </IconButton>,
            <Checkbox
              key="select"
              checked={list.length > 0 && list.length === selected.length}
              indeterminate={
                selected.length > 0 && selected.length < list.length
              }
              onChange={handleToggleAll}
              disabled={list.length === 0}
            />,
          ]}
        ></Header>
      }
      content={
        <Content>
          <Grid container>
            <Grid item>
              <ListItem button onClick={() => setIncludePayed(!includePayed)}>
                <ListItemIcon>
                  {includePayed ? (
                    <CheckIcon color="secondary" />
                  ) : (
                    <BlankIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary="Pagate" />
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem
                button
                onClick={() => setIncludeNotPayed(!includeNotPayed)}
              >
                <ListItemIcon>
                  {includeNotPayed ? (
                    <CheckIcon color="secondary" />
                  ) : (
                    <BlankIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary="Da pagare" />
              </ListItem>
            </Grid>
            <Grid item></Grid>
            <Grid item></Grid>
          </Grid>

          {list.length === 0 && (
            <Typography>
              Non ci sono prestazioni, inizia a tracciare per usare questa
              sezione.
            </Typography>
          )}
          <List>
            {list.map((performance) => {
              const { _id } = performance;
              return (
                <Push key={_id} href={`/performance/view/${_id}`}>
                  <PerformanceListItem
                    performance={performance}
                    checked={!!selected.find((item) => item._id === _id)}
                    onToggle={handleToggle(performance)}
                  />
                </Push>
              );
            })}
          </List>
        </Content>
      }
      print={!!print ? <PrintTable list={selected} /> : null}
    />
  );
}

export const route = {
  path: "/performance",
  exact: true,
  component: Component,
};
