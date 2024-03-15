import { useEffect, useState } from "react";
import { Product } from "../shared/models/Product";

type ProductSearchProps = {
  callData: number;
};

const ProductSearch = ({ callData }: ProductSearchProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log("chamou");

    loadProds();
  }, [callData]);

  const loadProds = async () => {
    const data = await fetch("http://localhost:3000/produtos");
    const prods = await data.json();
    setProducts(prods);
  };

  return (
    <>
      <ul>
        {products.map((prod) => (
          <li key={prod.id}>
            {prod.name} - R$ {prod.price}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductSearch;
