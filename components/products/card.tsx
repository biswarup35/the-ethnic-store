import * as React from "react";
import Link from "next/link";
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
  Box,
} from "@mui/material";
import Price from "./price";
import FavoriteIcons from "./favoriteIcon";

interface CardProps {
  slug: string;
  brand: string;
  title: string;
  price: number;
  discount: number;
  image: string;
}

const Card: React.FunctionComponent<CardProps> = ({
  slug,
  brand,
  title,
  price,
  discount,
  image,
}) => {
  return (
    <React.Fragment>
      <MuiCard sx={{ maxWidth: 284 }} elevation={0}>
        <CardMedia sx={{ position: "relative" }}>
          <Link href={`/${encodeURIComponent(slug)}`} passHref>
            <CardActionArea>
              <Image
                src={image}
                alt={title}
                width={284}
                height={374}
                objectFit="cover"
              />
            </CardActionArea>
          </Link>
          <Box sx={{ position: "absolute", top: 5, right: 5 }}>
            <FavoriteIcons />
          </Box>
        </CardMedia>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            {brand}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            textAlign="center"
          >
            {truncateText(title, 120)}
          </Typography>
          <Price price={price} discount={discount} />
        </CardContent>
      </MuiCard>
    </React.Fragment>
  );
};

export default Card;
