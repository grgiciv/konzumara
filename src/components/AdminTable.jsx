import { Table, Button, Group, Text } from "@mantine/core";
import { useState } from "react";
import "./modals/modal-addProduct/index";
import AddProduct from "./modals/modal-addProduct/index";
import supabase from "../config/supabase";
import { AdminTableRow } from "./AdminTableRow";

export default function AdminTable({ data, onDelete }) {
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
              <AdminTableRow
                onDelete={onDelete}
                key={product.id}
                product={product}
              />
            );
          })}
        </tbody>
      </Table>
      <AddProduct isOpened={addProduct} onClose={closeNewProduct} />
    </>
  );
}
