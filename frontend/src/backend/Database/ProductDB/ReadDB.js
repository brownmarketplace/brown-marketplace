import { getDatabase, ref, get, onValue, query, orderByChild, equalTo, child }
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

// This method filters the product data by a specific category.
var filterProductsByCategory = (category) => {
    var products = []
    const q = query(ref(database, 'categories'), orderByChild('categoryName'), equalTo(category));
    get(q).then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
            products.push(childSnapshot.val().productID)
        })
        console.log("List of product IDs in the category: " + products)
    })
}

document.querySelector('#product-readAll').addEventListener("click", () => {
    readAllProductsInfo();
})
document.querySelector('#product-readFiltered').addEventListener("click", () => {
    filterProductsByCategory("Home Decor");
})