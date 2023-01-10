import { menuArray } from "./data.js";
const myCart =[];

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
document.addEventListener("click", function(e){
  if(e.target.dataset.menu){
    addToCart(e.target.dataset.menu);
  }
})


function addToCart(menuId){
  //what is added item?
  const purchasedItem = menuArray.find(item => item.id == menuId);
  const {name, price, id} = purchasedItem;
  //is the added item already in the cart? If yes, increment quant
  if(myCart.find(item=> item.id == menuId)){
    myCart.find(item=> item.id == menuId).quantity ++;
  }
  //if no, push info about the object to myCart
  else {
    myCart.push({
                  name,
                  price,
                  id,
                  quantity: 1
    });
  };

//for each through myCart and render things with quant>0

}
//add html only for the items that have been clicked
//remove button will remove the quantity info from myCart
//checkout button triggers payment moda;