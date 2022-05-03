import { getDatabase, ref, get, onValue, query, orderByChild, equalTo }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const database = getDatabase();

// This method returns all the products' data in the database.
var readAllProductsInfo = () => {
    onValue(ref(database, 'products'), (snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            console.log(childSnapshot.val())
        })
    })
}

document.querySelector('#product-readAll').addEventListener("click", () => {
    readAllProductsInfo();
})