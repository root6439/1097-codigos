import { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";

type CustomToastProps = {
  toggle: boolean;
  title: string;
  content: string;
  timestamp?: number;
};

const CustomToast = ({
  toggle,
  title,
  content,
  timestamp = 2000,
}: CustomToastProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(toggle);

    if (toggle) {
      closeAfterTimeMilis();
    }
  }, [toggle]);

  const closeAfterTimeMilis = () => {
    setTimeout(() => {
      setShow(false);
    }, timestamp);
  };

  return (
    <Toast show={show} onClose={() => setShow(false)}>
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{content}</Toast.Body>
    </Toast>
  );
};

export default CustomToast;
