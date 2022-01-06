import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import * as React from "react";
interface SortingProps {}

const Sorting: React.FunctionComponent<SortingProps> = () => {
  return (
    <React.Fragment>
      <Typography
        sx={{ textTransform: "uppercase" }}
        variant="h6"
        component="div"
        gutterBottom
      >
        Sort by
      </Typography>
      <Divider />
      <List>
        <ListItem button disablePadding>
          <ListItemText primary="Better discount %" />
        </ListItem>
        <ListItem button disablePadding>
          <ListItemText primary="Price: Low to High" />
        </ListItem>
        <ListItem button disablePadding>
          <ListItemText primary="Price: High to Low" />
        </ListItem>
        <ListItem button disablePadding>
          <ListItemText primary="Rating: High to Low" />
        </ListItem>
        <ListItem button disablePadding>
          <ListItemText primary="Rating: Low to High" />
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default Sorting;
