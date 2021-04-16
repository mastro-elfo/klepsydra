import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { IconButton } from "@material-ui/core";

import {
  DrawerIconButton,
  DrawerLists,
  Content,
  Header,
  HeaderSearchField,
  Page,
  Push,
} from "mastro-elfo-mui";

// import { useTracker } from "./tracker/context";

// Import drawer items
import { drawer as about } from "./about";
import { drawer as client } from "./client";
import { drawer as performance } from "./performance";
import { drawer as settings } from "./settings";
import { drawer as tracker } from "./tracker";

import ResultList from "./dashboard/ResultList";
import { latest, search } from "../controllers/dashboard";
import { useTracker } from "./tracker/context";

// Import icons
import TrackerIcon from "@material-ui/icons/HourglassEmpty";
import TrackerActiveIcon from "@material-ui/icons/HourglassFull";
import ClientIcon from "@material-ui/icons/Person";
import PerformanceIcon from "@material-ui/icons/School";

function Component() {
  const { push } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [trackerContext] = useTracker();
  const { status } = trackerContext || {};
  const [clientList, setClientList] = useState();
  const [performanceList, setPerformanceList] = useState();
  const [didSearch, setDidSearch] = useState(false);

  useEffect(() => {
    if (!didSearch) {
      setDidSearch(true);
      latest()
        .then(([clients, performances]) => {
          setClientList(clients);
          setPerformanceList(performances);
        })
        .catch((e) => {
          console.error(e);
          enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
        });
    }
    // eslint-disable-next-line
  }, [didSearch]);

  const statusLabel = useMemo(
    () => ({ started: "Avviato", paused: "In Pausa" }[status] || ""),
    [status]
  );

  const statusIcon = useMemo(
    () =>
      !!status ? <TrackerActiveIcon color="secondary" /> : <TrackerIcon />,
    [status]
  );

  const handleSearch = (_, q) => {
    if (q === "") {
      setDidSearch(false);
    } else {
      setDidSearch(true);
      search(q)
        .then(([clients, performances]) => {
          setClientList(clients);
          setPerformanceList(performances);
        })
        .catch((e) => {
          console.error(e);
          enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
        });
    }
  };

  const handleClear = () => {
    setDidSearch(false);
  };

  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={
        <Header
          LeftAction={[
            <DrawerIconButton key="drawer" color="inherit">
              <DrawerLists
                lists={[
                  {
                    key: "pages",
                    items: [
                      {
                        onClick: () => push("/tracker"),
                        ...tracker,
                        secondary: statusLabel,
                        icon: statusIcon,
                      },
                      { onClick: () => push("/client"), ...client },
                      { onClick: () => push("/performance"), ...performance },
                    ],
                  },
                  {
                    key: "app",
                    items: [
                      { onClick: () => push("/about"), ...about },
                      { onClick: () => push("/settings"), ...settings },
                    ],
                  },
                ]}
              />
            </DrawerIconButton>,
            <HeaderSearchField
              key="search"
              fullWidth
              placeholder="Cerca"
              onSearch={handleSearch}
              onClear={handleClear}
            />,
          ]}
          RightActions={
            <Push href="/tracker">
              <IconButton color="inherit">{statusIcon}</IconButton>
            </Push>
          }
        ></Header>
      }
      content={
        <Content>
          <ResultList
            title="Studenti"
            Icon={ClientIcon}
            list={
              !!clientList &&
              clientList.map(({ _id, name, surname, email, telephone }) => ({
                _id,
                key: _id,
                primary: `${name} ${surname}`,
                secondary: email || telephone,
                href: `/client/view/${_id}`,
              }))
            }
          />
          <ResultList
            title="Prestazioni"
            Icon={PerformanceIcon}
            list={
              !!performanceList &&
              performanceList.map(
                ({ _id, client: { name, surname }, note, start }) => ({
                  _id,
                  key: _id,
                  primary: `${name} ${surname} - ${new Date(
                    start
                  ).toLocaleString()}`,
                  secondary: note,
                  href: `/performance/view/${_id}`,
                })
              )
            }
          />
        </Content>
      }
    />
  );
}

export const route = {
  path: "/",
  exact: true,
  component: Component,
};
