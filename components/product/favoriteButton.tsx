import * as React from "react";
import { isFavorite, makeFavorite, unFavorite } from "../../utils/favorites";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "@mui/material";
import { ProductContext } from "../../pages/[slug]";
interface FavoriteButtonProps {}

const FavoriteButton: React.FunctionComponent<FavoriteButtonProps> = () => {
  const { id }: any = React.useContext(ProductContext);
  const [favorite, setFavorite] = React.useState<boolean>();

  const toggleFavorite = (fav: boolean | undefined) => {
    if (fav) {
      void unFavorite(id);
      setFavorite(false);
    }
    if (!fav) {
      void makeFavorite(id);
      setFavorite(true);
    }
  };

  React.useEffect(() => {
    setFavorite(isFavorite(id) === id);
  }, [id]);

  return (
    <Button
      onClick={toggleFavorite.bind(null, favorite)}
      size="large"
      variant="outlined"
      endIcon={favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    >
      {favorite ? "Favorite" : "Add to favorite"}
    </Button>
  );
};

export default FavoriteButton;
