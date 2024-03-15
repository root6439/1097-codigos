import { FormEvent, useEffect, useRef, useState } from "react";
import { productsUrl } from "../models/PublicData";
import CustomToast from "../components/Toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HttpClient } from "../utils/HttpUtil";
import { Product } from "../models/Product";

const CreateProduct = () => {
  const http = new HttpClient();

  let { id } = useParams();
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    id ? updateProduct() : createProduct();
  };

  useEffect(() => {
    if (id) {
      getById();
    }
  }, []);

  const getById = async () => {
    const prod: Product = await http.get(`${productsUrl}/${id}`);
    setName(prod.name);
    setPrice(prod.price);
  };

  const resetForm = () => {
    setName("");
    setPrice(0);
  };

  const createProduct = async () => {
    try {
      await http.post(productsUrl, { name, price });
    } catch (e) {
      console.error(e);
    }

    resetForm();
    focusOnInputName();

    setToggle(true);

    setTimeout(() => {
      setToggle(false);
    }, 3000);
  };

  const updateProduct = async () => {
    try {
      await http.put(`${productsUrl}/${id}`, { name, price });
      navigate(-1);
    } catch (e) {
      console.error(e);
    }
  };

  const focusOnInputName = () => {
    inputRef.current.focus();
  };

  const disableForm = () => {
    return name?.length == 0 || !price || price == 0;
  };

  return (
    <>
      <h1>{id ? "Atualização" : "Cadastro"} de produto</h1>

      <form onSubmit={onSubmit} onReset={resetForm}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Nome:
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            ref={inputRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Preço
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text">R$</span>
            <input
              type="text"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              id="price"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary me-2"
          disabled={disableForm()}
        >
          {id ? "Atualizar" : "Cadastrar"}
        </button>
        <button type="reset" className="btn btn-outline-primary">
          Limpar
        </button>

        <Link to="/">
          <button
            style={{ backgroundColor: "transparent", color: "#0D6EFE" }}
            type="button"
            className="btn btn-outline-primary border-0"
          >
            Voltar
          </button>
        </Link>
      </form>

      <CustomToast
        title="Sucesso!"
        content="Produto cadastrado!"
        toggle={toggle}
      />
    </>
  );
};

export default CreateProduct;
