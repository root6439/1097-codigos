import { FormEvent, useState } from "react";

type ProductCreateProps = {
  updateList: () => void;
};

const ProductCreate = ({ updateList }: ProductCreateProps) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const createProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("http://localhost:3000/produtos/1", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });

    setName("");
    setPrice(0);
    updateList();

    alert("Produto cadastrado");
  };

  return (
    <>
      <form onSubmit={createProduct}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Preço:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </label>

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
};

export default ProductCreate;
