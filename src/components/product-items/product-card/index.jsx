import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

export default function ProductCard({ data }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={data.image} height={200} width={200} alt={data.title} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{data.title}</Text>
        {data.is_sale ? (
          <Group>
            <Text color="#7d7a77">
              <s>Price: {data.price}€</s>
            </Text>
            <Badge color="green">
              <Text size={"md"}>Price: {data.sale_price}€</Text>
            </Badge>
          </Group>
        ) : (
          <Text color="#FF8A65">Price: {data.price}€</Text>
        )}
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
