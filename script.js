import { menuArray } from "./data.js";
const myCart = [];

function getMenuHtml() {
  let menuHtml = ``;
  menuArray.forEach(function (item) {
    menuHtml += `
     <div class="menu-item" >
        <div class="emoji-item">${item.emoji}</div>
        <div class="item-description">
            <div class="item-name">${item.name}</div>
            <div>${item.ingredients}</div>
            <div>$${item.price}</div>
        </div>
        <div class="icon-holder" ><i data-menu="${item.id}" class="fa-solid fa-plus"></i></div>
    </div>
    `;
  });
  //  <i class="fa-duotone fa-plus"></i>
  return menuHtml;
}

function render() {
  document.getElementById("menu-container").innerHTML = getMenuHtml();
  //only render the bottom if order != complete
}

render();

//event listener for cart clicks
document.addEventListener("click", function (e) {
  if (e.target.dataset.menu) {
    addToCart(e.target.dataset.menu);
  }
  if (e.target.dataset.remove) {
    removeFromCart(e.target.dataset.remove);
  }
  if (e.target.id === "checkout-button") {
    completeOrder();
  }
  if (e.target.id === "modal-close-btn") {
    document.getElementById("modal-payment").style.display = "none";
  }
});

//add items to myCart array
function addToCart(menuId) {
  //what is added item?
  const purchasedItem = menuArray.find((item) => item.id == menuId);
  const { name, price, id } = purchasedItem;
  //is the added item already in the cart? If yes, increment quant
  if (myCart.find((item) => item.id == menuId)) {
    myCart.find((item) => item.id == menuId).quantity++;
  }
  //if no, push info about the object to myCart
  else {
    myCart.push({
      name,
      price,
      id,
      quantity: 1,
    });
  }
  renderOrder();
}

function renderOrder() {
  let cartHtml = ``;
  let orderTotal = 0;

  myCart.forEach(function (item) {
    orderTotal += item.price * item.quantity;
    if (item.quantity > 0) {
      cartHtml +=
        //add each item in cart to order html
        `
      <div class="order-item">
          <div class="order-item-name">
              ${item.name} x${item.quantity}
              <div class="remove-btn" data-remove="${item.id}">Remove</div>
              </div>
          <div class="order-item-price">$${item.price * item.quantity}</div>
      </div>
    `;
    }
  });

  document.getElementById("order-summary").innerHTML =
    `<div id="order-title">~Your Order~</div>` +
    cartHtml +
    `<div id="order-total">Order Total: $${orderTotal}</div>` +
    `<button id="checkout-button">Complete Order</button>`;
}

function removeFromCart(menuId) {
  //decrement item quantity
  if (myCart.find((item) => item.id == menuId).quantity > 0) {
    myCart.find((item) => item.id == menuId).quantity--;
  }
  //re-render cart html
  renderOrder();
}

function completeOrder() {
  document.getElementById("modal-payment").style.display = "flex";
}
