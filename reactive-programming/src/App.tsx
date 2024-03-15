import { ChangeEvent, useEffect } from "react";
import "./App.css";
import { Subject, debounceTime, distinctUntilChanged, filter, map } from "rxjs";

class Item {
  id: number;
  name: string;
  quantity: number;
}

function App() {
  const list: Item[] = [
    { id: 1, name: "banana", quantity: 2 },
    { id: 2, name: "maça", quantity: 5 },
    { id: 3, name: "abacaxi", quantity: 1 },
  ];

  useEffect(() => {
    configureSubject();
  }, []);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    searchSub.next(e.target.value);
  };

  const searchSub = new Subject<string>();

  const configureSubject = () => {
    searchSub
      .pipe(
        filter((value) => value.length > 3),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe({
        next: (value: string) => {
          filterData(value);
        },
      });
  };

  const filterData = (value: string) => {
    let listFiltered = list.filter((aux) => aux.name == value);
    console.log(listFiltered);
  };

  return (
    <>
      <label>
        Buscar por nome
        <input type="text" onChange={onInput} />
      </label>

      {/* TAbela */}
    </>
  );
}

export default App;
