import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
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

import { KeyboardDatePicker } from "@material-ui/pickers";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [print, setPrint] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [notPayed, setNotPayed] = useState(false);
  const [skip, setSkip] = useState(0);
  const { t } = useTranslation();

  useEffect(() => setSkip(() => 0), [searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      // Load latest
      latest({ fromDate, toDate, notPayed, skip })
        .then((docs) => {
          if (skip === 0) {
            setList(docs);
          } else {
            setList([...list, ...docs]);
          }
        })
        .catch((e) => {
          console.error(e);
          enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
        });
    }
    // eslint-disable-next-line
  }, [searchQuery, fromDate, toDate, notPayed, skip]);

  useEffect(() => {
    if (searchQuery) {
      search(searchQuery, { fromDate, toDate, notPayed, skip })
        .then((docs) => {
          if (skip === 0) {
            setList(docs);
          } else {
            setList([...list, ...docs]);
          }
        })
        .catch((e) => {
          console.error(e);
          enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
        });
    }
    // eslint-disable-next-line
  }, [searchQuery, fromDate, toDate, notPayed, skip]);

  useEffect(() => {
    const _selected = selected
      .slice()
      .filter(({ _id }) => list.find((item) => item._id === _id));
    setSelected(_selected);
    // eslint-disable-next-line
  }, [list]);

  useEffect(() => {
    if (print) {
      const to = setTimeout(() => {
        window.print();
        setPrint(false);
        // Delay 225 because modal dialog has opacity transition 225ms long
      }, 225);
      return () => clearTimeout(to);
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
      setSearchQuery("");
    } else {
      setSearchQuery(q);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const handlePrint = () => {
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
              placeholder={t("Performance.Search")}
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
          <Paper>
            <Box padding={2}>
              <Grid container justify="space-around">
                <Grid item xs={12} sm="auto">
                  <KeyboardDatePicker
                    fullWidth
                    clearable
                    label="Da"
                    value={fromDate}
                    onChange={(date) => setFromDate(date)}
                    maxDate={new Date()}
                    format="dd/MM/yyyy"
                  />
                </Grid>
                <Grid item xs={12} sm="auto">
                  <KeyboardDatePicker
                    fullWidth
                    clearable
                    label="A"
                    value={toDate}
                    onChange={(date) => setToDate(date)}
                    maxDate={new Date()}
                    format="dd/MM/yyyy"
                  />
                </Grid>
                <Grid item xs={12} sm="auto">
                  <ListItem button onClick={() => setNotPayed(!notPayed)}>
                    <ListItemIcon>
                      {notPayed ? (
                        <CheckIcon color="secondary" />
                      ) : (
                        <BlankIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText primary="Non pagate" />
                  </ListItem>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {list.length === 0 && (
            <Typography>
              Non ci sono prestazioni, inizia a tracciare per usare questa
              sezione.
            </Typography>
          )}
          <List>
            <InfiniteScroll
              dataLength={list.length}
              next={() => setSkip(skip + 10)}
              hasMore={true}
            >
              {" "}
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
            </InfiniteScroll>
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
