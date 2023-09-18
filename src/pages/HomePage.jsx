import { useState } from "react";
import {
  AppShell,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import TopBar from "../components/TopBar";
import { DATA } from "../data"; // fake data
import ProductList from "../components/product-items/product-list";

export default function HomePage() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  console.log("aafsf", DATA);

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
      <ProductList data={DATA} />
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
}
