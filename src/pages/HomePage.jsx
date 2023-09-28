import { createContext, useContext, useEffect, useState } from "react";
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
  Select,
} from "@mantine/core";
import TopBar from "../components/TopBar";
import { DATA } from "../data"; // fake data
import ProductList from "../components/product-items/product-list";
import supabase from "../config/supabase";
import { AuthContext } from "../contexts/AuthProvider";

export default function HomePage() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(7);
  const [sortType, setSortType] = useState(null);
  const [countPages, setCountPages] = useState(0);
  const { user, signIn, signOut } = useContext(AuthContext);
  console.log(sortType, "EEE");

  function increaseLoadMore() {
    setLoadMore(loadMore + 8);
  }

  console.log(user, "user");

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data: products, error } = await supabase
  //       .from("products")
  //       .select("*")
  //       .range(0, loadMore)
  //       .order("title", { ascending: true });
  //     if (error) {
  //       setFetchError("Could not fetch products");
  //       setProducts(null);
  //       console.log(error);
  //     }
  //     if (products) {
  //       console.log(products);
  //       setProducts(products);
  //     }
  //   };

  //   fetchProducts();
  // }, [loadMore]);

  useEffect(() => {
    const fetch = async () => {
      let query = supabase.from("products").select("*", { count: "exact" });

      if (sortType === "Oldest-Newest") {
        query = query.order("created_at", { ascending: true });
      }
      if (sortType === "Newest-Oldest") {
        query = query.order("created_at", { ascending: false });
      }
      if (sortType === "A-Z") {
        query = query.order("title", { ascending: true });
      }
      if (sortType === "Z-A") {
        query = query.order("title", { ascending: false });
      }
      if (sortType === "Most expensive-Cheapest") {
        query = query.order("price", { ascending: false });
      }
      if (sortType === "Cheapest-Most expesive") {
        query = query.order("price", { ascending: true });
      }
      const { data, error, count } = await query.range(0, loadMore);
      setProducts(data);
      setCountPages(count);
    };
    fetch();
  }, [loadMore, sortType]);
  console.log(countPages, "AAAAA");

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
      <Select
        label="Sort by"
        placeholder="Select filter"
        data={[
          "Oldest-Newest",
          "Newest-Oldest",
          "A-Z",
          "Z-A",
          "Most expensive-Cheapest",
          "Cheapest-Most expesive",
        ]}
        value={sortType}
        onChange={setSortType}
        clearable
      />
      {fetchError && <p>{fetchError}</p>}
      {products && <ProductList data={products} />}

      <Group style={{ justifyContent: "center" }}>
        <Button
          disabled={products.length === countPages}
          onClick={increaseLoadMore}
        >
          Load more
        </Button>
      </Group>
    </AppShell>
  );
}
