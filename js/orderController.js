import { clearCart } from "./cart.js";
import { delivery, modalDeliveryContainer, modalDeliveryForm } from "./elements.js";

export const orderController = (getCart) => {
  // проверка отправки, что бы после отправки заказа сбросились не только данные в формах,
  // но и сама форма, где  адрес, дом и тд была скрыта, как было первоначально
  const checkDelivery = () => {
    // обращаемся к радиокнопкам,  у них name = format  и берём его value
    if (modalDeliveryForm.format.value === "pickup") {
      // тогда обращаемся к филдсету с name = address-info. скрывать его или отображать решаем
      // так как через дефис аттрибут- обращаемся не через точку,
      // как выше modalDeliveryForm.format , а через[""]
      modalDeliveryForm["address-info"].classList.add(
        "modal-delivery__fieldset-input_hide"
      );
    }

    if (modalDeliveryForm.format.value === "delivery") {
      modalDeliveryForm["address-info"].classList.remove(
        "modal-delivery__fieldset-input_hide"
      );
    }
  };
  modalDeliveryForm.addEventListener("change", checkDelivery);

  // отправление данных на сервер
  // при отправлении на сервер срабатывает событие submit  и страница перегружается
  // отменим вручную это событие
  modalDeliveryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // если заполнены все поля name в форме, тогда можно получить все данные сразу
    // если нет- придется по всем полям собирать вручную. у нас  все поля c name
    const formData = new FormData(modalDeliveryForm);
    const data = Object.fromEntries(formData);
    // console.log('data: ', data);
    // formData:  {name: 'IURII', phone: '34554', format: 'pickup', address: '', floor: '', …}
    //  удаляю ненужнве поля из формы отправки на сервер при самовывозе
    if (data.format === "pickup") {
      delete data.address;
      delete data.floor;
      delete data.intercom;
    }

    // и добавляем наш заказ из корзины (в поле order)
    data.order = getCart();

    // отправляем данные на сервер
    // первый праметр фэйковый API
    // потом метод и сами данные преобразуем в строку JSON
    fetch("https://reqres.in/api/users", {
      method: "post",
      body: JSON.stringify(data),
    })
      // получаем ответ от сервера в виде promise и новым промисом обрабатываем его и выводим в консоль
      .then((response) => response.json())
      // .then((data) => console.log(data));
      // {id: '585', createdAt: '2022-12-03T13:18:15.755Z'}
      .then((data) => {
        console.log(data);
        // очищаем корзину
        clearCart();
        delivery.innerHTML = ``;
        const h2 = document.createElement("h2");
        const h3 = document.createElement("h3");
        h2.classList.add("modal__thank-you");
        h3.classList.add("modal__thank-order-number");
        h2.textContent = "Спасибо большое за заказ";
        h3.textContent = `Ваш номер заказа ${data.id}`;
        delivery.style.display = 'flex';
        delivery.style.flexDirection = "column";
        delivery.style.alignItems = 'center';
        delivery.style.background = 'white';
        delivery.style.padding = '24px';
        delivery.append(h2, h3);
        // ресетим данные формы
        modalDeliveryForm.reset();
        checkDelivery();
      });
  });
};
