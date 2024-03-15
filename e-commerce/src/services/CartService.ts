import { BehaviorSubject } from "rxjs";
import { Product } from "../models/Product";

const data = new BehaviorSubject<Product[]>([]);

export const data$ = () => {
  return data.asObservable();
};

export const addItem = (item: Product): void => {
  const actualItems = data.value ?? [];

  const index = actualItems.findIndex((value) => value.id == item.id);
  console.log(index);
  

  if (index == -1) {
    data.next([...actualItems, item]);
  } else {
    actualItems[index].quantity += 1;
    data.next(actualItems);
  }
};

export const removeItem = (id: number) => {
  data.next(data.value.filter((value) => value.id != id));
};
