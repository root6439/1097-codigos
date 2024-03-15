import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Trash3Fill } from "react-bootstrap-icons";
import { data$, removeItem } from "../services/CartService";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    data$().subscribe((resp) => setProducts(resp));
  }, []);

  const deleteProduct = (id: number) => {
    removeItem(id);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id.</th>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <tr key={prod.id}>
            <td>{prod.id}</td>
            <td>{prod.name}</td>
            <td>{prod.price}</td>
            <td>
              <Trash3Fill
                className="c-pointer"
                onClick={() => deleteProduct(prod.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Cart;
