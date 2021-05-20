import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { IconButton } from "@material-ui/core";
import { BackIconButton, Content, Header, Page, Push } from "mastro-elfo-mui";

import ViewContent from "./ViewContent";
import Loading from "../loading";
import { read } from "../../controllers/performance";

import EditIcon from "@material-ui/icons/Edit";
import PrintIcon from "@material-ui/icons/Print";

function Component() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [performance, setPerformance] = useState();

  useEffect(() => {
    read(id)
      .then((doc) => setPerformance(doc))
      .catch((e) => {
        console.error(e);
        enqueueSnackbar(`${e.name} ${e.message}`, { variant: "error" });
      });
  }, [id, enqueueSnackbar]);

  if (!performance) {
    return <Loading />;
  }

  const handlePrint = () => {
    window.print();
  };

  const { _id } = performance;

  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={
        <Header
          leftAction={<BackIconButton />}
          rightAction={[
            <IconButton key="print" onClick={handlePrint}>
              <PrintIcon />
            </IconButton>,
            <Push
              key="edit"
              href={`/performance/edit/${_id}`}
              state={performance}
            >
              <IconButton>
                <EditIcon />
              </IconButton>
            </Push>,
          ]}
        >
          Prestazione
        </Header>
      }
      content={
        <Content>
          <ViewContent performance={performance} />
        </Content>
      }
      print={<ViewContent performance={performance} print={true} />}
    />
  );
}

export const route = {
  path: "/performance/view/:id",
  exact: true,
  component: Component,
};
