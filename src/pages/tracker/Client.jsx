import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

import { IconButton, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { useTracker } from "./context";
import { search } from "../../controllers/client";

import AddIcon from "@material-ui/icons/Add";

export default function Client() {
  const { push } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [tracker, setTracker] = useTracker();

  const { client } = tracker || {};

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");

  const handleSearch = debounce(({ target: { value } }) => {
    setLoading(true);
    setSearchString(value);
    search(value)
      .then((docs) => setList(docs))
      .catch((e) => {
        console.error(e);
        enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, 250);

  const handleChange = (_, client) => setTracker((t) => ({ ...t, client }));

  const handleAdd = () => {
    const [name, surname] = searchString.split(" ");
    push("/client/create", { name, surname });
  };

  return (
    <Autocomplete
      fullWidth
      freeSolo
      loading={loading}
      options={list}
      getOptionLabel={({ _id, name, surname }) =>
        _id ? `${name} ${surname}` : ""
      }
      getOptionSelected={(option, value) => option._id === value._id}
      value={client || null}
      onChange={handleChange}
      renderInput={(props) => (
        <TextField
          label={t("Client.Key")}
          fullWidth
          onChange={handleSearch}
          {...props}
          InputProps={{
            ...props.InputProps,
            endAdornment: (
              <Fragment>
                {!client && !!searchString && (
                  <IconButton size="small" onClick={handleAdd}>
                    <AddIcon />
                  </IconButton>
                )}
                {props.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}
