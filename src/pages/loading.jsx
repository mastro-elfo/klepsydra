import { IconButton } from "@material-ui/core";
import { Content, Header, Page } from "mastro-elfo-mui";
import WaitIcon from "@material-ui/icons/HourglassEmpty";

export default function Loading({ children, title = "Loading..." }) {
  return (
    <Page
      TopFabProps={{ color: "secondary", size: "small" }}
      header={
        <Header
          LeftAction={
            <IconButton>
              <WaitIcon />
            </IconButton>
          }
        >
          {title}
        </Header>
      }
      content={<Content>{children}</Content>}
    />
  );
}
