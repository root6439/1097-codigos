import { useState } from "react";
import "./App.css";
import ProductCreate from "./components/ProductCreate";
import ProductSearch from "./components/ProductSearch";

const App = () => {
  const [callData, setCallData] = useState(0);

  return (
    <>
      <ProductSearch callData={callData} />
      <ProductCreate updateList={() => setCallData(callData + 1)} />
    </>
  );
};

export default App;
