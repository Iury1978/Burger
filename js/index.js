
import { renderListProduct } from "./renderListProduct.js";
import { navigationListController } from "./navigationListController.js";
import { cartInit } from "./cart.js";
import { modalController } from "./modalController.js";


const init = () => {
  // по умолчанию можем и тут передаем burger, можем и в самом теле функции renderListProduct
  renderListProduct();
  navigationListController(renderListProduct);
  cartInit();
  modalController();
};

init();
