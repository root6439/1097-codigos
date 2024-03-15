import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useEffect, useState } from "react";
import { data$ } from "./services/CartService";

export const App = () => {
  const [itemsNumber, setItemsNumber] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    configSubscriptions();
  }, []);

  const configSubscriptions = () => {
    data$().subscribe((resp) => {
      let itemsNumberAux = 0;

      resp.forEach((value) => {
        itemsNumberAux += value.price * value.quantity || 1;
        console.log(value);
      });

      let amountAux = 0;

      resp.forEach((value) => {
        amountAux += value.price * value.quantity || 1;
      });

      setItemsNumber(itemsNumberAux);
      setAmount(amountAux);
    });
  };

  return (
    <>
      <header
        className="navbar"
        style={{ backgroundColor: "#0D6EFE", color: "#fff" }}
      >
        <div className="container-fluid">
          E-Commerce{" "}
          <p>
            N° de itens: {itemsNumber}, total: {amount}
          </p>
        </div>
      </header>
      <main className="container mt-3">
        <RouterProvider router={router} />
      </main>
    </>
  );
};

export default App;
