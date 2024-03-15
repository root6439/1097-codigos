import "./MyButton.css";

type MyButtonProps = {
  type: "submit" | "reset" | "button" | undefined;
  text: string;
  appearance: "primary" | "secondary" | "ternary";
  onClickMyButton: (data?: any) => void;
};

const MyButton = ({
  type,
  text,
  appearance,
  onClickMyButton,
}: MyButtonProps) => {
  const getClassButton = () => {
    const dict = {
      primary: "primary-button",
      secondary: "secondary-button",
      ternary: "ternary-button",
    };

    return dict[appearance];
  };

  const onClickFunction = () => {
    onClickMyButton("data qualquer coisa");
  };

  return (
    <>
      <button
        className={getClassButton()}
        type={type}
        onClick={onClickFunction}
      >
        {text}
      </button>
    </>
  );
};

export default MyButton;
