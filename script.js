import { menuArray } from "./data.js";

function getMenuHtml() {
  let menuHtml = ``;
  menuArray.forEach(function (item) {
    menuHtml += `
     <div class="menu-item">
        <div class="emoji-item">${item.emoji}</div>
        <div class="item-description" data-menu-Id=${item.id}>
            <div class="item-name">${item.name}</div>
            <div>${item.ingredients}</div>
            <div>$${item.price}</div>
        </div>
        <div class="icon-holder"><i class="fa-solid fa-plus"></i></div>
    </div>
    `;
  });
  //  <i class="fa-duotone fa-plus"></i>
  return menuHtml;
}

function render() {
  document.getElementById("menu-container").innerHTML = getMenuHtml();
}

render();
