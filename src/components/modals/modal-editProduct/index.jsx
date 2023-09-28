import {
  Modal,
  Group,
  Button,
  TextInput,
  NumberInput,
  FileInput,
  Checkbox,
  Select,
  Textarea,
  Title,
  Stack,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useToggle } from "@mantine/hooks";
import supabase from "../../../config/supabase";
import { ADD_PRODUCT } from "../../../schema";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

export default function EditProduct({
  isOpened,
  onClose,
  productId,
  title,
  description,
  quantity,
  is_sale,
  sale_price,
  price,
  category,
  image,
}) {
  const [isOnSale, toggle] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const { user } = useContext(AuthContext);
  console.log(image, "vvvv");
  const form = useForm({
    initialValues: {
      title: title,
      description: description,
      quantity: quantity,
      is_sale: is_sale,
      sale_price: sale_price,
      price: price,
      category: category,
      image: image,
    },

    validate: yupResolver(ADD_PRODUCT),
  });

  async function replaceImage(e) {
    let file = e;
    let randomid = Math.random().toString(36).slice(2, 11);
    const { data, error } = supabase.storage
      .from("uploads")
      .upload(user.id + "/" + randomid, file);

    const baseURL =
      "https://whztrazdmfdndpyhsevu.supabase.co/storage/v1/object/public/uploads/";
    setImageURL(baseURL + user.id + "/" + randomid);
  }

  async function updateProduct() {
    const { error } = await supabase
      .from("products")
      .update({
        title: form.values.title,
        description: form.values.description,
        quantity: form.values.quantity,
        is_sale: form.values.is_sale,
        sale_price: form.values.sale_price,
        price: form.values.price,
        image: imageURL,
        //category: form.values.category,
      })
      .eq("id", productId);
    onClose();
  }

  return (
    <>
      <Modal opened={isOpened} onClose={onClose} centered>
        <Title order={1} color="#FF8A65">
          Edit product named {title}
        </Title>
        <Stack justify="space-between">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              {...form.getInputProps("title")}
              value={form?.values.title}
              placeholder="Your product name"
              label="Product name"
            />
            <Textarea
              {...form.getInputProps("description")}
              label="Product description"
              placeholder="Describe your product in a few words."
              value={form?.values.description}
            />
            <NumberInput
              type="number"
              label="Product quantity"
              value={form?.values.quantity}
              {...form.getInputProps("quantity")}
            />
            {is_sale ? (
              <Checkbox
                checked
                label="Is item on sale?"
                onClick={toggle}
                {...form.getInputProps("is_sale")}
              />
            ) : (
              <Checkbox
                label="Is item on sale?"
                onClick={toggle}
                {...form.getInputProps("is_sale")}
              />
            )}
            {is_sale && (
              <NumberInput
                placeholder="0"
                label="Price on sale"
                value={form?.values.sale_price}
                {...form.getInputProps("sale_price")}
              />
            )}
            <NumberInput
              {...form.getInputProps("price")}
              value={form?.values.price}
              label="Product price"
              placeholder="0"
              required
            />

            <Select
              creatable
              label="Select one category"
              placeholder="Fruit"
              required
              data={["Vegetables", "Fruits", "Sodas"]}
              value={form?.values.category}
              {...form.getInputProps("category")}
            />
            <FileInput
              label="Input product picture"
              placeholder="Select image for product"
              onChange={(e) => replaceImage(e)}
              type="file"
              accept="image/png, image/jpeg"
            />
            <Button type="submit" onClick={updateProduct}>
              Edit product
            </Button>
          </form>
        </Stack>
      </Modal>
    </>
  );
}
