import { useEffect, useState } from "react";

import { AppContainer } from "mastro-elfo-mui";
import { BrowserRouter } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import primary from "@material-ui/core/colors/purple";
import secondary from "@material-ui/core/colors/pink";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// Import routes
import { route as about } from "./pages/about";
import { route as client } from "./pages/client";
import { route as dashboard } from "./pages/dashboard";
import { route as notfound } from "./pages/notfound";
import { route as performance } from "./pages/performance";
import { route as settings } from "./pages/settings";
import { route as tracker } from "./pages/tracker";
// Aside
import AppLoader from "./AppLoader";
// import Intro from "./pages/intro";

// Import contextes
import SettingsProvider from "./pages/settings/context";
import TrackerProvider from "./pages/tracker/context";

import { init as client_init } from "./controllers/client";
import { init as performance_init } from "./controllers/performance";

export default function App() {
  const [initialized, setInitialized] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (!initialized) {
      async function init() {
        await client_init();
        await performance_init();
        setInitialized(true);
      }
      init();
    }
  }, [initialized]);

  return (
    <AppContainer
      ThemeProps={{
        palette: {
          primary,
          secondary,
          type: prefersDarkMode ? "dark" : "light",
        },
      }}
      RouterProps={{
        Router: BrowserRouter,
        routes: [
          about,
          client,
          dashboard,
          notfound,
          performance,
          settings,
          tracker,
        ],
        basename: "/klepsydra",
      }}
      WrapperProps={{
        Children: [
          { Component: AppLoader, loading: !initialized },
          { Component: SettingsProvider },
          // { Component: Intro },
          {
            Component: TrackerProvider,
          },
          { Component: MuiPickersUtilsProvider, utils: DateFnsUtils },
        ],
      }}
      NotifyProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      }}
      ConfigProps={{
        TopFab: { color: "secondary", size: "small" },
      }}
    />
  );
}
