import { Drawer, Button, Stack, Title, Text } from "@mantine/core";
import { CartList } from "../../cart-items/cart-list";

export default function CartDrawer({ isOpened, onClose, data }) {
  function calculateTotalPrice(data) {
    return data?.reduce((acc, cv) => acc + cv.price, 0).toFixed(2);
  }
  return (
    <>
      <Drawer opened={isOpened} onClose={onClose}>
        <Title color="#FF8A65" align="center" mb={25}>
          Basket checkout
        </Title>
        <Stack>
          <CartList data={data} />
          <Text>{`Price total: ${calculateTotalPrice(data)}`}</Text>
          <Button fullWidth>Buy now</Button>
        </Stack>
      </Drawer>
    </>
  );
}
