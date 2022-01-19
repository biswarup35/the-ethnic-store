import * as React from "react";
import { IconButton } from "@mui/material";
import { isFavorite } from "../../utils/favorites";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ProductsContext } from "../views/products";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { GlobalContext } from "../AppContext/GlobalContext";

interface FavoriteIconsProps {}

const FavoriteIcons: React.FunctionComponent<FavoriteIconsProps> = () => {
  const { favService }: any = React.useContext(GlobalContext);
  const { id }: any = React.useContext(ProductsContext);
  const [favorite, setFavorite] = React.useState<boolean>();

  const toggleFavorite = (fav: boolean | undefined) => {
    if (fav) {
      void favService.send({
        type: "REMOVE_FAV",
        id,
      });
      setFavorite(false);
    }
    if (!fav) {
      void favService.send({
        type: "ADD_FAV",
        id,
      });
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
