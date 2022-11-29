// const productDetail = document.querySelector(".product__detail");
// productDetail.addEventListener("click", () => {
//   modalProduct.classList.add("modal_open");
// });
const modalProduct = document.querySelector(".modal_product");
const catalogList = document.querySelector(".catalog__list");

const product = {
  title: "Бургер Супербиг",
  price: 1000,
  weight: 500,
  calories: 1500,
  description:
    "Огромный вкусный бургер. Съешь сам или поделись с друзьями, если боишься лопнуть",
  image: "img/megaburger.jpg",
  ingredients: [
    "Пшеничная булочка",
    "Мега котлета",
    "Много сыра",
    "Листья салата",
    "Майонез",
  ],
};

const modalProductTitle = document.querySelector(".modal-product__title");
const modalProductImage = document.querySelector(".modal-product__image");
const modalProductDescription = document.querySelector(
  ".modal-product__description"
);
const ingredientsList = document.querySelector(".ingredients__list");
const ingredientsCalories = document.querySelector(".ingredients__calories");
const modalProductPriceCount = document.querySelector(
  ".modal-product__price-count"
);

modalProductTitle.textContent = product.title;
modalProductImage.src = product.image;
modalProductDescription.textContent = product.description;
modalProductPriceCount.textContent = product.price;
ingredientsCalories.textContent =
  `${product.weight}` + `г, ккал ` + `${product.calories}`;

ingredientsList.textContent = "";

// for (let i = 0; i < product.ingredients.length; i++) {
//   const li = document.createElement("li");
//   li.classList.add("ingredients__item");
//   li.textContent = product.ingredients[i];
//   ingredientsList.append(li);
// }

// product.ingredients.forEach((item) => {
//   const li = document.createElement("li");
//   li.classList.add("ingredients__item");
//   li.textContent = item;
//     ingredientsList.append(li);
// });

const ingredientsListItem = product.ingredients.map((item) => {
  const li = document.createElement("li");
  li.classList.add("ingredients__item");
  li.textContent = item;
  return li;
});
ingredientsList.append(...ingredientsListItem);

catalogList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest(".product__detail") || target.closest(".product__image")) {
    modalProduct.classList.add("modal_open");
  }
});

modalProduct.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest(".modal__close") || target === modalProduct) {
    modalProduct.classList.remove("modal_open");
  }
});
