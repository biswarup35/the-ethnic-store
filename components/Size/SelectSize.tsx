import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  Stack,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FC } from "react";

interface ISelectSize {
  items: string[];
  onSelect: (size: string) => void;
}

const SelectSize: FC<ISelectSize> = ({ items, onSelect }) => {
  return (
    <Box>
      <Typography variant="h6" color="GrayText" component="div" gutterBottom>
        Size Available
      </Typography>
      <FormControl>
        <RadioGroup
          onChange={(e) => {
            onSelect(e.target.value);
          }}
        >
          <Stack direction="row" flexWrap="wrap">
            {items.map((item: string) => (
              <FormControlLabel
                key={item}
                control={<Radio />}
                label={item}
                value={item}
              />
            ))}
          </Stack>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default SelectSize;
