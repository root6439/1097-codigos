import { useState } from "react";

const MyButton = () => {
  const [name, setName] = useState("");
  const [showName, setShowName] = useState(false);

  const user = {
    name: "Rodrigo",
    age: 21,
    weight: 78,
  };

  const renderName = () => {
    if (showName) {
      return <p>{name}</p>;
    }
  };

  const handleInputChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <div>
      <label>
        Digite seu nome:
        <input type="text" onChange={handleInputChange} />
      </label>
      <button onClick={() => setShowName(!showName)}>Clique-me</button>
      {renderName()}

      <p>{user.name}</p>

      <p>{user.age}</p>

      <p>{user.weight}</p>
    </div>
  );
};

export default MyButton;
