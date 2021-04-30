import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

import { IconButton, List, ListItem, ListItemText } from "@material-ui/core";

import {
  BackIconButton,
  Content,
  Header,
  HeaderSearchField,
  Page,
  Push,
} from "mastro-elfo-mui";

import AddIcon from "@material-ui/icons/Add";

import { latest, search } from "../../controllers/client";

function Component() {
  const { push } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [list, setList] = useState([]);
  const [didSearch, setDidSearch] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!didSearch) {
      setDidSearch(true);
      // Load latest
      latest()
        .then((docs) => setList(docs))
        .catch((e) => {
          console.error(e);
          enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
        });
    }
    // eslint-disable-next-line
  }, [didSearch]);

  const handleSearch = (_, q) => {
    if (q === "") {
      setDidSearch(false);
    } else {
      setDidSearch(true);
      search(q)
        .then((docs) => setList(docs))
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
            <BackIconButton key="back" />,
            <HeaderSearchField
              key="search"
              fullWidth
              placeholder={t("Client.Search")}
              onSearch={handleSearch}
              onClear={handleClear}
            />,
          ]}
          RightActions={
            <Push key="create" href="/client/create">
              <IconButton>
                <AddIcon />
              </IconButton>
            </Push>
          }
        ></Header>
      }
      content={
        <Content>
          <List>
            {list.map(({ _id, name, surname, contacts }) => (
              <ListItem
                key={_id}
                button
                onClick={() => push(`/client/view/${_id}`)}
              >
                <ListItemText
                  primary={`${name} ${surname}`}
                  secondary={
                    // TODO: Remove `contacts &&`
                    `${contacts && contacts.length ? contacts[0].value : ""}`
                  }
                />
              </ListItem>
            ))}
          </List>
        </Content>
      }
    />
  );
}

export const route = {
  path: "/client",
  exact: true,
  component: Component,
};
