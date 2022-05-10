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

// This method returns the data of a particular product in the database by the product ID.
var readOneProductInfo = (productID) => {
    onValue(ref(database, 'products/' + productID), (snapshot) => {
        console.log(snapshot.val())
    })
}

// This method filters the product data by a specific category.
var filterProductsByCategory = (category) => {
    var products = []
    const q = query(ref(database, 'categories'), orderByChild('categoryName'), equalTo(category));
    get(q).then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
            products = childSnapshot.val().productIDs
            console.log("Product IDs filtered by category: ")
            console.log(products)
        })
    })
}

// This method filters the product data by a specific sub-category.
var filterProductsBySubcategory = (subCategory) => {
    var products = []
    const q = query(ref(database, 'sub-categories'), orderByChild('subCategoryName'), equalTo(subCategory));
    get(q).then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
            products = childSnapshot.val().productIDs
            console.log("Product IDs filtered by sub-category: ")
            console.log(products)
        })
    })
}

// This method filters the product data by a tag.
var filterProductsByTags = (tag) => {
    var products = []
    const q = query(ref(database, 'tags'), orderByChild('tagName'), equalTo(tag));
    get(q).then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
            products = childSnapshot.val().productIDs
            console.log("Product IDs filtered by tag: ")
            console.log(products)
        })
    })
}

document.querySelector('#product-readAll').addEventListener("click", () => {
    readAllProductsInfo();
})
document.querySelector('#product-read').addEventListener("click", () => {
    readOneProductInfo("3");
})
document.querySelector('#product-readFiltered').addEventListener("click", () => {
    filterProductsByCategory("Room Decor");
})
document.querySelector('#product-readFilteredSubCategory').addEventListener("click", () => {
    filterProductsBySubcategory("Posters");
})
document.querySelector('#product-readFilteredTag').addEventListener("click", () => {
    filterProductsByTags("Gift");
})