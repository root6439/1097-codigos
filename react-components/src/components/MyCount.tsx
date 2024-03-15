import { useState } from "react";
import MyButton from "./MyButton";

const MyCount = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      <p>Botão pressionado: {count} </p>
      <MyButton
        text="Clique-me"
        appearance="primary"
        onClickMyButton={increment}
        type="submit"
      />
    </>
  );
};

export default MyCount;
