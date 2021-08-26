var allcarts = [];

var carts = localStorage.getItem('carts');

if (carts != null) {
    allcarts = JSON.parse(carts);

}
console.log(allcarts);

var values = document.getElementById('cartProducts');


for (let i = 0; i < allcarts.length; i++) {
    values.innerHTML += `
        <tr class= "mt-4">
    <td>${allcarts[i].itemName}</td>
    <td>${allcarts[i].price}</td>
     <td> pending </td> 
     </tr>`
}

var final = 0;
for (let i = 0; i < allcarts.length; i++) {
    result = parseInt(allcarts[i].price);
    final = result + final;
}
var price = document.getElementById('price');
price.innerHTML = `Rs: ${final}`


let remove = () => {
    localStorage.removeItem('carts');
    location.reload();
}

let buy = () => {
    for (let i = 0; i < allcarts.length; i++) {
        let obj = {
            userName: localStorage.getItem('email'),
            itemName: allcarts[i].itemName,
            Price: allcarts[i].price,
            Total: final,
            count:0,
            status: "Pending"
        }
        const a = localStorage.getItem("uid")
        //   var key = Math.random()*10000;
        //      firebase.database().ref('UserOrder'+key.toFixed()).push(obj);
        firebase.database().ref(`Resturants/${a}/Orders`).push(obj);

    }
    localStorage.removeItem('carts');
    alert('Your Order will be delivered with in 24 hours.\nThank You')
    setTimeout(function(){
        localStorage.removeItem('carts');
        location.reload();
    },7000)

}







