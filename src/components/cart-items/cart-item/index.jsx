import {
  createStyles,
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export function CartItem({ cartItem }) {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <Image
          src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
          height={140}
          width={140}
        />
        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            {cartItem.name}
          </Text>
          <Badge>ItemPrice: {cartItem.price}</Badge>

          <Group noWrap spacing="xs">
            <Text size="xs">Set NumOfItems:</Text>
            <Button size="xs" color="dimmed">
              -
            </Button>
            <Text size="xs" color="blue">
              item qty
            </Text>
            <Button size="xs" color="dimmed">
              +
            </Button>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
