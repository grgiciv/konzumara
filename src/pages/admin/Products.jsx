import { useState, useEffect } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Stack,
  Button,
} from "@mantine/core";
import TopBar from "../../components/TopBar";
//import { DATA } from "../../data"; // fake data
import AdminTable from "../../components/AdminTable";
import { Link } from "react-router-dom";
import supabase from "../../config/supabase";

export default function AdminProducts() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");

    setProducts(data);

    return data;
  };

  async function onDelete(id) {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .select();
    if (error) {
      throw new Error(error.message);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [onDelete]);

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
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Title color="#FF8A65">Products</Title>
          <Stack spacing={20}>
            <Link to="/admin/products">
              <Button>Products</Button>
            </Link>

            <Link to="/admin/categories">
              <Button>Categories</Button>
            </Link>

            <Link to="/admin/orders">
              <Button>Orders</Button>
            </Link>
          </Stack>
        </Navbar>
      }
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
            <TopBar />
          </div>
        </Header>
      }
    >
      {products && (
        <AdminTable
          getData={fetchProducts}
          data={products}
          onDelete={onDelete}
        />
      )}
    </AppShell>
  );
}
