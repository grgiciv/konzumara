import { Table, Button, Group, Text } from "@mantine/core";
import { useState } from "react";
import "./modals/modal-addProduct/index";
import AddProduct from "./modals/modal-addProduct/index";

export default function AdminTable({ data }) {
  const [addProduct, setAddProduct] = useState(false);

  function addNewProduct() {
    console.log(addProduct);
    setAddProduct(true);
    console.log(addProduct);
  }

  function closeNewProduct() {
    setAddProduct(false);
    console.log(addProduct);
  }

  return (
    <>
      <Group justify="space-between">
        <Button onClick={addNewProduct}>Add new product</Button>
      </Group>
      <Table highlightOnHover striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>On sale?</th>
            <th>Sale price</th>
            <th>Regular price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => {
            return (
              <tr key={product.id}>
                <td>
                  <Text color="#FF8A65" size="lg">
                    {product.title}
                  </Text>
                </td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.is_sale}</td>
                <td>{product.sale_price}</td>
                <td>{product.price}</td>
                <td>
                  <button>Edit</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddProduct isOpened={addProduct} onClose={closeNewProduct} />
    </>
  );
}
