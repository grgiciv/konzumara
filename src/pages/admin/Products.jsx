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
  Pagination,
} from "@mantine/core";
import TopBar from "../../components/TopBar";
//import { DATA } from "../../data"; // fake data
import AdminTable from "../../components/AdminTable";
import { Link } from "react-router-dom";
import supabase from "../../config/supabase";
import { SearchBar } from "../../components/SearchBar";

export default function AdminProducts() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [products, setProducts] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countPages, setCountPages] = useState(0);
  const pageSize = 5;

  const fetchProducts = async () => {
    const range = currentPage ? currentPage - 1 : 0;
    const offset = range * pageSize;
    let query = supabase.from("products").select("*", { count: "exact" });

    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error, count } = await query
      .range(offset, offset + pageSize + 1)
      .limit(5);
    setProducts(data);
    setCountPages(count);

    return data;
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(value);
    }
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
    fetchProducts();
  }
  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery]);

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
      <SearchBar value={value} setValue={setValue} onEnter={handleSearch} />
      {products && (
        <>
          <AdminTable
            getData={fetchProducts}
            data={products}
            onDelete={onDelete}
          />
          <Pagination
            value={currentPage}
            total={Math.ceil(countPages / pageSize)}
            onChange={(value) => {
              setCurrentPage(value);
            }}
          />
        </>
      )}
    </AppShell>
  );
}
