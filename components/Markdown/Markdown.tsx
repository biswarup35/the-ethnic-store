import Markedown from "markdown-to-jsx";
import { Typography } from "@mui/material";

const Markdown = (props: any) => {
  return (
    <Markedown
      options={{
        overrides: {
          h2: {
            component: Typography,
            props: { gutterBottom: true, variant: "h6" },
          },
          h3: {
            component: Typography,
            props: {
              gutterBottom: true,
              variant: "subtitle1",
              sx: { fontWeight: 600 },
            },
          },
        },
      }}
      {...props}
    />
  );
};

export default Markdown;
