import * as React from "react";
import { Grid } from "@mui/material";
import Card from "../products/card";
import Filter from "../products/filter";
import Sorting from "../products/sorting";

const Products = () => {
  return (
    <React.Fragment>
      <Grid sx={{ my: 1, px: 2 }} container spacing={2}>
        <Grid item lg={2}>
          <Filter />
          <Sorting />
        </Grid>
        <Grid
          container
          item
          lg={10}
          spacing={2}
          direction="row"
          justifyContent="center"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
            <Grid key={index} item lg={3}>
              <Card
                category="Libas"
                title="Women Black Pure Cotton Kurta with Palazzos & With Dupatta"
                price={1200}
                rating={4.5}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Products;
