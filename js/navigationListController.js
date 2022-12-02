import {
  navigationList,
  navigationListItems,
  catalogTitle,
} from "./elements.js";

export const navigationListController = (cb) => {
  navigationList.addEventListener("click", (event) => {
    const categoryItem = event.target.closest(".navigation__button");

    if (!categoryItem) return;

    navigationListItems.forEach((item) => {
      if (item === categoryItem) {
        item.classList.add("navigation__button_active");
        catalogTitle.textContent = item.textContent;
        // передаем в callback функцию cb наш датасет,
        // прописанный в data - category у каждой категории продуктов
        // и получаем выборку нужной категории продуктов при нажатии на нее
        cb(item.dataset.category);
      } else {
        item.classList.remove("navigation__button_active");
      }
    });
  });
};
