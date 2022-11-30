import { modalProduct,
catalogList
} from "./elements.js";

import { createCardProduct } from "./createCardProduct.js";
import { openModal } from "./openModal.js";
import { renderListProduct } from "./renderListProduct.js";
import { navigationListController } from "./navigationListController.js";

const superBig = {
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




catalogList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest(".product__detail") || target.closest(".product__image")) {
    openModal(superBig);
  }
});

modalProduct.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest(".modal__close") || target === modalProduct) {
    modalProduct.classList.remove("modal_open");
  }
});

const init = () => {
  renderListProduct();
  navigationListController();
}

init();