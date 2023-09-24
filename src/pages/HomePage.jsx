import { useEffect, useState } from "react";
import {
  AppShell,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  Button,
} from "@mantine/core";
import TopBar from "../components/TopBar";
import { DATA } from "../data"; // fake data
import ProductList from "../components/product-items/product-list";
import supabase from "../config/supabase";

export default function HomePage() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: products, error } = await supabase
        .from("products")
        .select("*");
      if (error) {
        setFetchError("Could not fetch products");
        setProducts(null);
        console.log(error);
      }
      if (products) {
        setProducts(products);
      }
    };

    fetchProducts();
  }, []);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <TopBar data={DATA} />
          </div>
        </Header>
      }
    >
      {fetchError && <p>{fetchError}</p>}
      {products && <ProductList data={products} />}

      <Group style={{ justifyContent: "center" }}>
        <Button>Load more</Button>
      </Group>
    </AppShell>
  );
}
