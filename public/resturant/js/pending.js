var allcarts = [];
const a = localStorage.getItem("uid");

firebase.database().ref(`Resturants/${a}/Orders`).on('child_added', function (data) {
    allcarts.push(data.val());
    // console.log(data.val());
})

var values = document.getElementById('cartProducts');

setTimeout(() => {
    for (let i = 0; i < allcarts.length; i++) {
        values.innerHTML += `
        <tr class= "mt-4">
    <td>${allcarts[i].userName}</td>
    <td>${allcarts[i].itemName}</td>
    <td>${allcarts[i].Price}</td>
     <td><button> Approved </button> <button> Reject </button> </td> 
     </tr>`
    }
}, 8000);

const logoutAdmin = () => {
	firebase.auth().signOut().then(() => {
		window.location.href = "index.html";
	}).catch((error) => {
		// An error happened.
	});

}
