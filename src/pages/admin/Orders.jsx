import { useState } from "react";
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
import { DATA } from "../../data"; // fake data
import AdminTable from "../../components/AdminTable";
import { Link } from "react-router-dom";

export default function AdminOrders() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
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
          <Title color="#FF8A65">Orders</Title>
          <Stack spacing={20}>
            <Link to="/admin/products">
              <Button w={150}>Products</Button>
            </Link>

            <Link to="/admin/categories">
              <Button w={150}>Categories</Button>
            </Link>

            <Link to="/admin/orders">
              <Button w={150}>Orders</Button>
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
      <AdminTable data={DATA} />
    </AppShell>
  );
}
