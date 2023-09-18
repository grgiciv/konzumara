import { Group, Button, Image } from "@mantine/core";
import { ShoppingCart } from "iconsax-react";
import CartDrawer from "./drawers/cart-drawer";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export default function TopBar({ data }) {
  //const [cartOpen, setCartOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Image
        maw={60}
        radius="xl"
        src="../public/Shoplogo.png"
        alt="Random image"
      />
      <Group position="right" spacing="xl">
        <Button variant="outline" size="lg" onClick={open}>
          <ShoppingCart size="44" color="#FF8A65" variant="Outline" />
        </Button>
        <Button variant="outline" size="lg">
          Login
        </Button>
        <Button variant="outline" size="lg">
          Register
        </Button>
      </Group>
      <CartDrawer isOpened={opened} onClose={close} data={data} />
    </>
  );
}
