import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface ICounter {
  hideTitle?: boolean;
  count?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const Counter: FC<ICounter> = ({
  count = 1,
  onIncrement,
  onDecrement,
  hideTitle,
}) => {
  return (
    <Box sx={{ my: 1 }}>
      {!hideTitle && (
        <Typography variant="h6" color="GrayText" component="div" gutterBottom>
          Quantity
        </Typography>
      )}
      <Stack direction="row" spacing={2}>
        <IconButton
          disabled={count === 1}
          color="primary"
          onClick={onDecrement}
        >
          <RemoveIcon />
        </IconButton>

        <TextField
          size="small"
          sx={{ width: 50 }}
          value={count}
          variant="outlined"
        />
        <IconButton color="primary" onClick={onIncrement}>
          <AddIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Counter;
