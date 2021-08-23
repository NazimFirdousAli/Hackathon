const loadDishes = () => {
    const jsn = JSON.parse(localStorage.getItem("jsn-value"));
    let main = document.getElementById('products');

    for (let i in jsn) {
        main.innerHTML += `  
        <div class="card card-bo mt-3 mb-4" >
        <img src="../assests/barbq-chickenBoti.jpg" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title" id="productName">${jsn[i].itemName.toUpperCase()}</h5>
        <p class="card-text" id="productPrice">Price = Rs: ${jsn[i].price}</p>
        <p class="card-text" id="productPrice">Delivery = ${jsn[i].deliveryType.toUpperCase()}</p>
        <button id=${jsn[i]} value=${JSON.stringify(jsn[i])} class="btn btn-warning btn-dis" onclick=${'(addToCart(value))'} >Add To Card</button>
        </div>
        </div>  `
    }
}
loadDishes()

let allCarts = [];
let carts = localStorage.getItem('carts')

if (carts !== null) {
    allCarts = JSON.parse(carts)
    let cart_badge = document.getElementById('cart-badge');
    cart_badge.innerHTML = allCarts.length
}


function addToCart(value) {
    let cart = JSON.parse(value);

    allCarts.push(cart)
    localStorage.setItem('carts', JSON.stringify(allCarts))
    let cart_badge = document.getElementById('cart-badge');
    cart_badge.innerHTML = allCarts.length;

}

