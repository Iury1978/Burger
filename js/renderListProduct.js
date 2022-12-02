import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { createCardProduct } from "./createCardProduct.js";
import { catalogList } from "./elements.js";
import { getData } from "./getData.js";

// export const renderListProduct = () => {
//   getData(`${API_URL}${PREFIX_PRODUCT}`).then (data => console.log(data));
// }

// либо делаем функцию асинхронной
// по дефолту присваиваем категорию бургер
export const renderListProduct = async (category= "burger") => {
  catalogList.textContent = "";
  //  ?category=${category} это поиск по категории
  const listProduct = await getData(
    `${API_URL}${PREFIX_PRODUCT}?category=${category}`
  );
  // console.log('listProduct: ', listProduct);
  //  0
  // {id: '3184803604', title: 'Мясная бомба', price: 689, weight: 520, calories: 430, …}
  // 1
  // {id: '4593457527', title: 'Супер сырный', price: 550, weight: 512, calories: 590, …}
  // 2
  // {id: '8818264880', title: 'Сытный', price: 639, weight: 580, calories: 740, …}
  // 3
  // {id: '4667225618', title: 'Тяжелый удар', price: 480, weight: 470, calories: 810, …}
  // 4
  // {id: '1223980593', title: 'Вечная классика', price: 450, weight: 450, calories: 610, …}
  const listCard = listProduct.map(createCardProduct);
  catalogList.append(...listCard);
};
