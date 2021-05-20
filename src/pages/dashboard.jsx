import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
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

import { useTitle } from "./utils";

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
  useTitle();
  const { push } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [trackerContext] = useTracker();
  const { status } = trackerContext || {};
  const [clientList, setClientList] = useState();
  const [performanceList, setPerformanceList] = useState();
  const [didSearch, setDidSearch] = useState(false);
  const { t } = useTranslation();

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
          leftAction={[
            <DrawerIconButton key="drawer" color="inherit">
              <DrawerLists
                lists={[
                  {
                    key: "pages",
                    items: [
                      {
                        onClick: () => push("/tracker"),
                        ...tracker,
                        primary: t(tracker.primary),
                        title: t(tracker.title),
                        secondary: t(`Tracker.Status.${status}`),
                        icon: statusIcon,
                      },
                      {
                        onClick: () => push("/client"),
                        ...client,
                        primary: t(client.primary),
                        title: t(client.title),
                      },
                      {
                        onClick: () => push("/performance"),
                        ...performance,
                        primary: t(performance.primary),
                        title: t(performance.title),
                      },
                    ],
                  },
                  {
                    key: "app",
                    items: [
                      {
                        onClick: () => push("/about"),
                        ...about,
                        primary: t(about.primary),
                        title: t(about.title),
                      },
                      {
                        onClick: () => push("/settings"),
                        ...settings,
                        primary: t(settings.primary),
                        title: t(settings.title),
                      },
                    ],
                  },
                ]}
              />
            </DrawerIconButton>,
            <HeaderSearchField
              key="search"
              fullWidth
              placeholder={t("Search")}
              onSearch={handleSearch}
              onClear={handleClear}
            />,
          ]}
          rightAction={
            <Push href="/tracker">
              <IconButton color="inherit">{statusIcon}</IconButton>
            </Push>
          }
        ></Header>
      }
      content={
        <Content>
          <ResultList
            title={t("Client.Key", {
              count: clientList ? clientList.length : 0,
            })}
            Icon={ClientIcon}
            list={
              !!clientList &&
              clientList.map(({ _id, name, surname, contacts }) => ({
                _id,
                key: _id,
                primary: `${name} ${surname}`,
                secondary: contacts && contacts.length ? contacts[0].value : "",
                href: `/client/view/${_id}`,
              }))
            }
          />
          <ResultList
            title={t("Performance.Key", {
              count: performanceList ? performanceList.length : 0,
            })}
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
