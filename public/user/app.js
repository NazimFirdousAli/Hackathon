


const signupUser = (e) => {
	event.preventDefault(e);
	let userName = document.getElementById("userName").value;
	let email = document.getElementById("email").value;
	let country = document.getElementById("country").value;
	let phoneNumber = document.getElementById("phoneNumber").value;
	let city = document.getElementById("city").value;
	let password = document.getElementById("password").value;
	// alert(userName);
	console.log(userName, email, phoneNumber, country, city, password);
	var obj = {
		userName,
		email,
		phoneNumber,
		country,
		city,
		password
	}
	
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then((userCredential) => {
			firebase.database().ref("Users").child("Data").push(obj);
			var user = userCredential.user;
			// localStorage.setItem("adminEmail", user.bc.email);
			// window.location.href = "dashboard/dashboard.html";
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			alert(errorMessage);
		});

}


var arr = [];

const loadResturant = () => {
	firebase.database().ref(`Resturants`).on('value', function (data) {
		// console.log(data.val().categories);
		arr.push(data.val());

	})

	let main = document.getElementById('products');
	setTimeout(() => {
		for (var i = 0; i < arr.length; i++) {
			// console.log(Object.keys(arr[i]));
			main.innerHTML += `  
    <div class="card card-bo mt-3 mb-4" >
    <img src="../assests/vectorImage.png" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title" id="productName">${arr[i][Object.keys(arr[i])].resturantName.toUpperCase()}</h5>
    <button id=${arr[i][Object.keys(arr[i])].categories} value=${JSON.stringify(arr[i][Object.keys(arr[i])].categories)} class="btn btn-warning btn-dis" onclick=${'(resturants(value))'} >GOTO Resturant</button>
    </div>
</div>  `

		}
	}, 8000);
}
loadResturant();


const resturants = (value) => {
	localStorage.setItem("jsn",value);
	window.location.href = "resturantCategory.html";
}

let allCarts = [];
let carts = localStorage.getItem('carts')

if (carts !== null) {
    allCarts = JSON.parse(carts)
    let cart_badge = document.getElementById('cart-badge');
    cart_badge.innerHTML = allCarts.length
}
