$(function () {
	'use strict';


	$('.form-control').on('input', function () {
		var $field = $(this).closest('.form-group');
		if (this.value) {
			$field.addClass('field--not-empty');
		} else {
			$field.removeClass('field--not-empty');
		}
	});

});


const signupResturant = (e) => {
	let resturantName = document.getElementById("resturantName").value;
	let email = document.getElementById("email").value;
	let country = document.getElementById("country").value;
	let city = document.getElementById("city").value;
	let password = document.getElementById("password").value;

	if (password.length < 6) {
		alert("Password length mush be greater than 6");
		return false;
	}
	var re = /resturant-[a-z0-9!#$%&'*+/=?^_`{|}~-]+@+[a-z]+[.]+com/g;
	if (re.test(email) == false) {
		alert(`Email must include resturant- in first like resturant-abc@gmail.com`)
		return false;
	}



	console.log(resturantName, email, country, city, password);
	var obj = {
		resturantName,
		email,
		country,
		city,
		password
	}
	// const replaceValue = email.replaceAll(".", ",");

	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			var user = userCredential.user;
			console.log(user.uid);
			firebase.database().ref("Resturants").child(user.uid).set(obj);
			// localStorage.setItem("adminEmail", user.bc.email);
			// window.location.href = "dashboard/dashboard.html";
			alert("Signup Sucessfully");
			setTimeout(function () {
				window.location.href = '../index.html';
			}, 4000);
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			alert(errorMessage);
		});

	event.preventDefault(e);
}



const login = (e) => {
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	var re = /resturant-[a-z0-9!#$%&'*+/=?^_`{|}~-]+@+[a-z]+[.]+com/g;
	event.preventDefault(e);
	if (re.test(email) == true) {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				var user = userCredential.user;
				localStorage.setItem("uid", user.uid);
				localStorage.setItem("email", email);
				window.location.href = "resturant/addDishes.html";
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(errorMessage);
			});
	}
	else {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				var user = userCredential.user;
				localStorage.setItem("email", user.bc.email);
				window.location.href = "user/user.html";
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(errorMessage);
			});

	}
}


const addDishes = (e) => {
	// alert("dsdsdsdsd");
	const category = document.getElementById("category").value;
	const itemName = document.getElementById("itemName").value;
	const price = document.getElementById("price").value;
	const deliveryType = document.getElementById("deliveryType").value;
	event.preventDefault(e);
	const uid = localStorage.getItem("uid");

	const obj = {
		category,
		itemName,
		price,
		deliveryType
	}
	firebase.database().ref(`Resturants/${uid}/categories`).child(obj.category).push(obj);

	setTimeout(function () {
		alert("Dish Added");

	}, 3000)
	firebase.database().ref("Resturants").child(`${replaceValue}`).push(obj);
	firebase.database().ref(`Resturants/${uid}/categories`).child("chinese").on('value', function (data) {
		console.log(data.val())
	})

}

const logoutAdmin = () => {
	firebase.auth().signOut().then(() => {
		window.location.href = "../index.html";
	}).catch((error) => {
		// An error happened.
	});

}

