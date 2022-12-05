import { addCart } from "./cart.js";
import { API_URL, PREFIX_PRODUCT } from "./const.js";
import {
  ingredientsList,
  modalProductTitle,
  modalProductImage,
  modalProductDescription,
  ingredientsCalories,
  modalProductPriceCount,
  modalProduct,
  modalProductBtn,
  catalogList,
  countAmount,
} from "./elements.js";
import { getData } from "./getData.js";

const openModal = async (id) => {
  const product = await getData(`${API_URL}${PREFIX_PRODUCT}/${id}`);
  modalProductTitle.textContent = product.title;
  modalProductImage.src = `${API_URL}/${product.image}`;
  modalProductDescription.textContent = product.description;
  modalProductPriceCount.textContent = product.price;
  // передаем в дата аттрибут кнопки добавить в модалке  айдишку товара
  modalProductBtn.dataset.idProduct = product.id;

  ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;

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
  // сначала заполняем модалку данными, а потом открываем.
  modalProduct.classList.add("modal_open");
};

export const modalController = () => {
  const countMinus = modalProduct.querySelector(".count__minus");
  const countPlus = modalProduct.querySelector(".count__plus");

  countMinus.addEventListener("click", () => {
    if (countAmount.textContent === "1") return;
    countAmount.textContent = +countAmount.textContent - 1;
  });

  countPlus.addEventListener("click", () => {
    countAmount.textContent = +countAmount.textContent + 1;
  });

  catalogList.addEventListener("click", (event) => {
    const target = event.target;

    if (
      target.closest(".product__detail") ||
      target.closest(".product__image")
    ) {
      const id = target.closest(".product").dataset.idProduct;
      openModal(id);
      countAmount.textContent = "1";
    }
  });

  modalProduct.addEventListener("click", (event) => {
    const target = event.target;

    if (target.closest(".modal__close") || target === modalProduct) {
      modalProduct.classList.remove("modal_open");
    }
  });
};
