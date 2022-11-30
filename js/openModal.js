import {
  ingredientsList,
  modalProductTitle,
  modalProductImage,
  modalProductDescription,
  ingredientsCalories,
  modalProductPriceCount,
  modalProduct
} from "./elements.js";

// функция заполнения модального окна при его открытии
export const openModal = (product) => {
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
  // сначала заполняем модалку данными, а потом открываем.
  modalProduct.classList.add("modal_open");
};
