import { Stack } from "@mantine/core";
import { CartItem } from "../cart-item";

export function CartList({ data }) {
  return (
    <Stack>
      {data?.map((item) => {
        return <CartItem key={item.id} cartItem={item} />;
      })}
    </Stack>
  );
}
