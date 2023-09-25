import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

export default function ProductCard({ data }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{data.title}</Text>
        <Badge color="pink" variant="light">
          Price: {data.price}
        </Badge>
      </Group>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => console.log(data.price)}
      >
        Add to cart
      </Button>
    </Card>
  );
}
