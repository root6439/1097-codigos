import { ChangeEvent, useEffect, useState } from "react";
import { Product } from "../models/Product";
import { productsUrl } from "../models/PublicData";
import { Link } from "react-router-dom";
import { HttpClient } from "../utils/HttpUtil";
import CustomToast from "../components/Toast";
import { Table } from "react-bootstrap";
import { Cart, PenFill, Trash3Fill } from "react-bootstrap-icons";
import { Subject, debounceTime, distinctUntilChanged, filter } from "rxjs";
import { addItem } from "../services/CartService";

const SearchProducts = () => {
  const http = new HttpClient();

  const [toggle, setToggle] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProds, setAllProds] = useState<Product[]>([]);
  const searchSub = new Subject<string>();

  searchSub
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter((value) => value.length >= 3 || value.length == 0)
    )
    .subscribe({
      next: (value) => {
        getByName(value);
      },
    });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const resp: Product[] = await http.get(productsUrl);
    setProducts(resp);
    setAllProds(resp);
  };

  //Na fantasia
  const getByName = (name: string) => {
    if (name.length == 0) {
      setProducts(allProds);
    }

    const productsFiltered = allProds.filter((prod) =>
      prod.name.toLowerCase().includes(name.toLowerCase())
    );

    setProducts(productsFiltered);
  };

  // No mundo real
  // const getByName = async (name: string) => {
  //   const resp: Product[] = await http.get(`${productsUrl}?name=${name}`);
  //   console.log(resp);

  //   setProducts(resp);
  // };

  const deleteProduct = (id: number) => {
    http.delete(`${productsUrl}/${id}`).then(() => {
      setToggle(true);
      loadData();
    });
  };

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    searchSub.next(e.target.value);
  };

  const addToCart = (item: Product) => {
    addItem(item);
  };

  return (
    <>
      <Link to="/cart">
        <button className="btn btn-primary">Acessar carrinho</button>
      </Link>
      <div className="d-flex justify-content-between">
        <h1>Busca de produtos</h1>
        <Link to="/create">
          <button className="btn btn-primary">Cadastrar</button>
        </Link>
      </div>

      <div className="d-flex align-items-center my-2">
        <label htmlFor="search">Busque por nome:</label>
        <input
          type="text"
          className="form-control w-50"
          id="search"
          onChange={search}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id.</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>
                <Link to={`/update/${prod.id}`}>
                  <PenFill className="c-pointer me-2" />
                </Link>

                <Trash3Fill
                  className="c-pointer"
                  onClick={() => deleteProduct(prod.id)}
                />

                <Cart onClick={() => addToCart(prod)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CustomToast
        title="Sucesso!"
        content="Produto excluído!"
        toggle={toggle}
      />
    </>
  );
};

export default SearchProducts;
