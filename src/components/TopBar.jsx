import { Group, Button, Image } from "@mantine/core";
import { ShoppingCart } from "iconsax-react";
import CartDrawer from "./drawers/cart-drawer";
import LogInModal from "./modals/modal-login";
import RegisterModal from "./modals/modal-register";
import { useState, useContext } from "react";
import { useDisclosure } from "@mantine/hooks";
import { AuthContext } from "../contexts/AuthProvider";

export default function TopBar({ data }) {
  //const [cartOpen, setCartOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [loginOpened, setLogin] = useState(false);
  const [registerOpened, setRegister] = useState(false);

  const { user, signOut } = useContext(AuthContext);

  console.log("vaaa");

  function openLogin() {
    setLogin(true);
  }

  function closeLogin() {
    setLogin(false);
  }

  function openRegister() {
    setRegister(true);
  }

  function closeRegister() {
    setRegister(false);
  }

  return (
    <>
      <Image maw={60} radius="xl" src="/Shoplogo.png" alt="Random image" />
      <Group position="right" spacing="xl">
        <Button variant="outline" size="lg" onClick={open}>
          <ShoppingCart size="44" color="#FF8A65" variant="Outline" />
        </Button>
        {user ? (
          <Button variant="outline" size="lg" onClick={signOut}>
            Log out
          </Button>
        ) : (
          <>
            <Button variant="outline" size="lg" onClick={openLogin}>
              Login
            </Button>
            <Button variant="outline" size="lg" onClick={openRegister}>
              Register
            </Button>
          </>
        )}
      </Group>
      <CartDrawer isOpened={opened} onClose={close} data={data} />
      <LogInModal isOpened={loginOpened} onClose={closeLogin} />
      <RegisterModal isOpened={registerOpened} onClose={closeRegister} />
    </>
  );
}
