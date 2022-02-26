import { FC, Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import truncateText from "../../utils/truncateText";
import {
  Card as MuiCard,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { favoriteState } from "../../App";
import { useSnapshot } from "valtio";
import { Pricing, AddToFavoriteIcon } from "..";

interface CardProps {
  slug: string;
  brand: string;
  title: string;
  price: number;
  discount: number;
  image: string;
  id: string;
}

const Card: FC<CardProps> = ({
  slug,
  brand,
  title,
  price,
  discount,
  image,
  id,
}) => {
  const { add, remove, isFavorite, items } = useSnapshot(favoriteState);
  useEffect(() => {}, [items]);
  return (
    <Fragment>
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
            <AddToFavoriteIcon
              isFavorite={isFavorite(id)}
              onFavorite={() => {
                if (isFavorite(id)) {
                  remove(id);
                } else {
                  add(id);
                }
              }}
            />
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
          <Pricing price={price} discount={discount} />
        </CardContent>
      </MuiCard>
    </Fragment>
  );
};

export default Card;
