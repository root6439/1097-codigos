import { createBrowserRouter } from "react-router-dom";
import SearchProducts from "./pages/SearchProducts";
import CreateProduct from "./pages/CreateProduct";
import Cart from "./pages/Cart";

export const router = createBrowserRouter([
  { path: "/", Component: SearchProducts },
  { path: "/create", Component: CreateProduct },
  { path: "/update/:id", Component: CreateProduct },
  { path: "/cart", Component: Cart },
]);
