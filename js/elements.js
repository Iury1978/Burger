export const modalProduct = document.querySelector(".modal_product");
export const catalogList = document.querySelector(".catalog__list");

export const modalProductTitle = document.querySelector(
  ".modal-product__title"
);
export const modalProductImage = document.querySelector(
  ".modal-product__image"
);
export const modalProductDescription = document.querySelector(
  ".modal-product__description"
);
export const ingredientsList = document.querySelector(".ingredients__list");
export const ingredientsCalories = document.querySelector(
  ".ingredients__calories"
);
export const modalProductPriceCount = document.querySelector(
  ".modal-product__price-count"
);

export const navigationList = document.querySelector(".navigation__list");
export const navigationListItems = document.querySelectorAll(
  ".navigation__button"
);

export const catalogTitle = document.querySelector(".catalog__title");

export const modalProductBtn = document.querySelector(".modal-product__btn");
// селектор, что бы выбрать счетчик именно в нужном модальном окне
export const countAmount = document.querySelector(
  ".modal-product .count__amount"
);

// корзина.
export const orderCount = document.querySelector(".order__count");
export const orderList = document.querySelector(".order__list");
export const orderTotalAmount = document.querySelector(".order__total-amount");
export const orderSubmit = document.querySelector(".order__submit");
// вызов отображения корзины в мобильной и планшетных версиях
export const order = document.querySelector(".order");
export const orderWrapTitle = document.querySelector(".order__wrap-title");

// кнопка заказа товара в корзине
export const modalDelivery = document.querySelector(".modal_delivery");
// форма заказа
export const modalDeliveryForm = document.querySelector(
  ".modal-delivery__form"
);
//  для УдалениЯ!!! формы после заказа, что бы в модалке уже написать номер заказа и прочее
// вместо формы
export const modalDeliveryContainer = document.querySelector(
  ".modal-delivery__container"
);
// обертка модалки. хочу убрать в ней картинку
export const delivery = document.querySelector(".modal-delivery");