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
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

export default function AddProduct({ isOpened, onClose }) {
  const [isOnSale, toggle] = useToggle([false, true]);
  const [imageURL, setImageURL] = useState("");
  const { user } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      quantity: 0,
      is_sale: false,
      sale_price: 0,
      price: 0,
      category: "",
      image: "",
    },

    validate: yupResolver(ADD_PRODUCT),
  });
  async function uploadImage(e) {
    let file = e;
    let randomid = Math.random().toString(36).slice(2, 11);
    const { data, error } = supabase.storage
      .from("uploads")
      .upload(user.id + "/" + randomid, file);

    const baseURL =
      "https://whztrazdmfdndpyhsevu.supabase.co/storage/v1/object/public/uploads/";
    setImageURL(baseURL + user.id + "/" + randomid);

    console.log(file);
    console.log(imageURL);
  }

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          title: form.values.title,
          description: form.values.description,
          quantity: form.values.quantity,
          is_sale: form.values.is_sale,
          sale_price: form.values.sale_price,
          price: form.values.price,
          user_id: user.id,
          image: imageURL,
        },
      ])
      .select()
      .from();
    if (data) {
      console.log(data);
    }

    form.reset();
    onClose();
    toggle();
  };

  return (
    <>
      <Modal opened={isOpened} onClose={onClose} centered>
        <Title order={1} color="#FF8A65">
          Add a new product
        </Title>
        <Stack justify="space-between">
          <form onSubmit={form.onSubmit(() => handleSubmit())}>
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
              placeholder="0"
              label="Product quantity"
              value={form?.values.quantity}
              {...form.getInputProps("quantity")}
            />
            <Checkbox
              label="Is item on sale?"
              onClick={toggle}
              {...form.getInputProps("is_sale")}
            />
            {isOnSale && (
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
              onChange={(e) => uploadImage(e)}
              type="file"
              accept="image/png, image/jpeg"
            />
            <Button type="submit">Add product</Button>
          </form>
        </Stack>
      </Modal>
    </>
  );
}
