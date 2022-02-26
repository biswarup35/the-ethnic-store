import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FC } from "react";

interface IAddToFavoriteProps {
  isFavorite: boolean;
  onFavorite: () => void;
}

const AddToFavoriteIcon: FC<IAddToFavoriteProps> = ({
  onFavorite,
  isFavorite,
}) => {
  return (
    <IconButton onClick={onFavorite}>
      {isFavorite ? (
        <FavoriteIcon htmlColor="hotpink" />
      ) : (
        <FavoriteBorderIcon htmlColor="hotpink" />
      )}
    </IconButton>
  );
};

export default AddToFavoriteIcon;
