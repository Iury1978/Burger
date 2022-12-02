import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { catalogList, countAmount, modalProductBtn, orderCount, orderList } from "./elements.js";
import { getData } from "./getData.js";

export const getCart = () => {
  // обращаемся в локалстор по идентификатору cart
  const cartList = localStorage.getItem("cart");
  // проверяем есть ли там записи и, если есть, возращаем имеющуюся строку,
  // и распарсиваем JSON в обычный массив
  // иначе возвращаем пустой массив
  if (cartList) {
    return JSON.parse(cartList);
  } else {
    return [];
  }
};


//  рендер списка товаров в корзине
const renderCartList = async () => {
  const cartList = getCart();
  // console.log("cartList: ", cartList);
  // 0: {id: '3184803604', count: 1}
  // 1: {id: '4593457527', count: 1}
  // 2: {id: '8818264880', count: 7}
  // 3: {id: '4667225618', count: 3}
  // получем все айдишки товаров в корзине
  const allIdProduct = cartList.map((item) => item.id);

  // проверяем пустая ли корзина, если нет - создаем запрос, если да - пустой массив присваиваем
  const data = cartList.length
    // GET /api/product?{list="id,id,id"} - получить список с id); описание ручек в апишке
    ? await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allIdProduct}`)
    : [];
  console.log("data: ", data);
  // 0:{id: '3184803604', title: 'Мясная бомба', price: 689, weight: 520, calories: 430, …}
  // 1:{id: '4593457527', title: 'Супер сырный', price: 550, weight: 512, calories: 590, …}
  // 2:{id: '8818264880', title: 'Сытный', price: 639, weight: 580, calories: 740, …}
  // 3:{id: '4667225618', title: 'Тяжелый удар', price: 480, weight: 470, calories: 810, …}
  // 4:{id: '3355055171', title: 'Итальянский', price: 560, weight: 510, calories: 535, …}

  // получаем и выводим количество заказанногог товара
  const countProduct = cartList.reduce((acc, item) => acc + item.count, 0);
  console.log('countProduct: ', countProduct);
  orderCount.textContent = countProduct;

  // выводим карточки заказанных товаров
  const cartItems = data.map(item => {
    const li = document.createElement("li");
    li.classList.add("order__item");
    // добавляем дата аттрибут
    li.dataset.idProduct = item.id
    // в item есть все о товаре, кроме его количества. Количество получам так
    const product = cartList.find((cartItem => cartItem.id === item.id));

    li.innerHTML = `
      <img src="${API_URL}/${item.image}" alt="${item.title}" class="order__image">

      <div class="order__product">
        <h3 class="order__product-title">${item.title}</h3>

        <p class="order__product-weight">${item.weight}</p>

        <p class="order__product-price">${item.price}</p>
      </div>

      <div class="order__product-count count">
        <button class="count__minus">-</button>

        <p class="count__amount">${product.count}</p>

        <button class="count__plus">+</button>
      </div>
    `;
    return li;
  })
orderList.textContent = "";
orderList.append(...cartItems);
};


// функция обновления корзины
// в виде параметра корзина обовленная и записываем ее в локалстор,
// перевода JSON в строку ( локалтрор хранит строки)
const updateCartList = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
  // после обновления рендерим список товаров в корзине
  renderCartList();
};

// при добавлении в корзину передаем id товара и количество товара, по умолчанию 1
const addCart = (id, count = 1) => {
  // console.log(id, count);
  // 3184803604 1
  const cartList = getCart();
  // это тот товар, который добавляем в корзину. если он уже есть в корзине- надо добавить число только
  // если его совсем нет - надо создать.
  //  поэтомусначала проверяем есть ли товар в корзине
  const product = cartList.find((item) => {
    // проверяем, есть ли такой айди уже в корзине. Сравниваем по id
    // если он есть то ретурн даст тру , а метод find вернет (метод find вернет его, если он есть)
    return id === item.id;
  });
  // если продукт уже был - добавляем в счетчике,
  // если не был - добавляем пробукт и количество в счетчике
  if (product) {
    product.count += count;
  } else {
    cartList.push({ id, count });
  }
  // вносим изменения в список товаров в корзине
  updateCartList(cartList);
};

const removeCart = (id) => {};

//   тут будут все слушатели addEventListener
const cartController = () => {
  // сразу добаем из объекта target, без эвента (деструктуризация)
  catalogList.addEventListener("click", ({ target }) => {
    // если кликнули по кнопке добавлению в корину( на странице прямо, не в модалке)
    if (target.closest(".product__add")) {
      // передаем айдишку продукта в addCart
      // <article class="product" data-id-product=${product.id}>
      // тут прописана в createCardProduct.js
      addCart(target.closest(".product").dataset.idProduct);
    }
  });
  // если кликнули по кнопке добавлению в корину в модалке
  modalProductBtn.addEventListener("click", () => {
    // передаем айдишку и данные из счетчика количества продукта в модалке (в виде числа)
    addCart(
      modalProductBtn.dataset.idProduct,
      parseInt(countAmount.textContent)
    );
  });
};

// запуск всей корзины. вызываться будет в init в index.js
export const cartInit = () => {
  // вызываем, а в нем будут уже вызываться другие.
  cartController();
  renderCartList();
};
