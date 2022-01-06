import * as React from "react";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import truncateText from "../../utils/truncateText";
import {
  Card as MuiCard,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import Price from "./price";

interface CardProps {
  category: string;
  title: string;
  rating: number;
  price: number;
}

const Card: React.FunctionComponent<CardProps> = ({
  category,
  title,
  rating,
  price,
}) => {
  const [favorite, setFavorite] = React.useState(false);
  const toggleFavorite = () => {
    setFavorite((value) => !value);
  };

  return (
    <React.Fragment>
      <MuiCard sx={{ maxWidth: 284 }} elevation={0}>
        <CardMedia sx={{ position: "relative" }}>
          <CardActionArea>
            <Image
              src="/libas.png"
              alt="libas"
              width={284}
              height={374}
              objectFit="cover"
            />
          </CardActionArea>
          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={toggleFavorite}
          >
            <FavoriteIcon htmlColor={favorite ? "hotpink" : ""} />
          </IconButton>
        </CardMedia>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            {category}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            textAlign="center"
          >
            {truncateText(title, 120)}
          </Typography>
          <Price price={price} discount={15} />
        </CardContent>
      </MuiCard>
    </React.Fragment>
  );
};

export default Card;
