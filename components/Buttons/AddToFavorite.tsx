import { Button } from "@mui/material";
import { FC } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface IAddToFavoriteProps {
  isFavorite: boolean;
  onFavorite: () => void;
}

const AddToFavorite: FC<IAddToFavoriteProps> = ({ isFavorite, onFavorite }) => {
  return (
    <Button
      endIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      onClick={onFavorite}
      size="large"
      variant="outlined"
    >
      {isFavorite ? "Remove" : "Add to favorites"}
    </Button>
  );
};

export default AddToFavorite;
