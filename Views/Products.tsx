import * as React from "react";
import { Grid } from "@mui/material";
import { Card } from "../components";
// import Filter from "../products/filter";
// import Sorting from "../products/sorting";

export const ProductsContext = React.createContext({});

const Products = ({ data, hideFilter }: any) => {
  return (
    <React.Fragment>
      <Grid sx={{ my: 1, px: 2 }} container spacing={2}>
        {/* {!hideFilter && (
          <Grid item lg={2}>
            <Filter />
            <Sorting />
          </Grid>
        )} */}
        <Grid container item lg={hideFilter ? 12 : 10} spacing={2}>
          {data.map((item: any) => (
            <Grid key={item.id} item lg={3}>
              <ProductsContext.Provider value={item}>
                <Card
                  id={item.id}
                  slug={item.id}
                  brand={item.brand}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  discount={item.discount}
                />
              </ProductsContext.Provider>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Products;
