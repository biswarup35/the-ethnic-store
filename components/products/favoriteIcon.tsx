import * as React from "react";
import { IconButton } from "@mui/material";
import { isFavorite, makeFavorite, unFavorite } from "../../utils/favorites";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ProductsContext } from "../views/products";
import FavoriteIcon from "@mui/icons-material/Favorite";
interface FavoriteIconsProps {}

const FavoriteIcons: React.FunctionComponent<FavoriteIconsProps> = () => {
  const { id }: any = React.useContext(ProductsContext);
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
    <IconButton color="primary" onClick={toggleFavorite.bind(null, favorite)}>
      {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteIcons;
