import {
  Checkbox,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import * as React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
interface FilterProps {}

const Filter: React.FunctionComponent<FilterProps> = () => {
  const [brandOpen, setBrandOpen] = React.useState(false);
  const [ratingOpen, setRatingOpen] = React.useState(false);
  const [priceOpen, setPriceOpen] = React.useState(true);
  const brandToggle = () => {
    setBrandOpen((value) => !value);
  };
  const ratingToggle = () => {
    setRatingOpen((value) => !value);
  };
  const priceToggle = () => {
    setPriceOpen((value) => !value);
  };
  return (
    <React.Fragment>
      <Typography
        sx={{ textTransform: "uppercase" }}
        variant="h6"
        component="div"
        gutterBottom
      >
        Filter by
      </Typography>
      <Divider />

      <List>
        <ListItem disablePadding button onClick={brandToggle}>
          <ListItemText sx={{ textTransform: "uppercase" }} primary="Brand" />
          {brandOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={brandOpen} unmountOnExit>
          <List>
            {["All", "Anouk", "Mitera", "Kalini", "Asika"].map((item) => (
              <ListItemButton key={item} dense>
                <Checkbox size="small" edge="start" />
                {item}
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItem disablePadding button onClick={priceToggle}>
          <ListItemText sx={{ textTransform: "uppercase" }} primary="Price" />
          {priceOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={priceOpen} unmountOnExit>
          <List>
            {["All", "1000-1500", "1500-2000", "2000-2500", "2500-3000"].map(
              (item) => (
                <ListItemButton key={item} dense>
                  <Checkbox size="small" edge="start" />
                  {item}
                </ListItemButton>
              )
            )}
          </List>
        </Collapse>
        <ListItem disablePadding button onClick={ratingToggle}>
          <ListItemText sx={{ textTransform: "uppercase" }} primary="Rating" />
          {ratingOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={ratingOpen} unmountOnExit>
          <List>
            {[
              "All",
              "4 and above",
              "3 and above",
              "2 and above",
              "1 and above",
            ].map((item) => (
              <ListItemButton key={item} dense>
                <Checkbox size="small" edge="start" />
                {item}
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </React.Fragment>
  );
};

export default Filter;
