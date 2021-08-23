const loadCategories = () => {
    const jsn = JSON.parse(localStorage.getItem("jsn"));
    let main = document.getElementById('products');
    
    for (let i in jsn) {
        main.innerHTML += `  
        <div class="card card-bo mt-3 mb-4" >
        <img src="../assests/barbq-chickenBoti.jpg" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title" id="productName">${i.toUpperCase()}</h5>
        <button id=${jsn[i]} value=${JSON.stringify(jsn[i])} class="btn btn-warning btn-dis" onclick=${'(checkDishes(value))'} >Check Dishes</button>
        </div>
        </div>  `
        // console.log(jsn[i]);

    }

}
loadCategories()

const checkDishes = (value) => {
	localStorage.setItem("jsn-value",value);
    window.location.href = "dishes.html";

}

let allCarts = [];
let carts = localStorage.getItem('carts')

if (carts !== null) {
    allCarts = JSON.parse(carts)
    let cart_badge = document.getElementById('cart-badge');
    cart_badge.innerHTML = allCarts.length
}
