import { Grid } from "@mantine/core";
import ProductCard from "../product-card";

export default function ProductList({ data }) {
  console.log(data);
  return (
    <Grid columns={4} gutter="xl" m={10}>
      {data?.map((product) => {
        return (
          <Grid.Col key={product.id} span={1}>
            <ProductCard data={product} />
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
