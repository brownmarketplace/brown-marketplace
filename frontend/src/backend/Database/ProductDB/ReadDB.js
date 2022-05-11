import { getDatabase, ref, get, onValue, query, orderByChild, orderByKey, equalTo, child }
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
var filterProductsByCategory = (categoryName) => {
    const q = query(ref(database, 'products'), orderByChild('category'), equalTo(categoryName));
    get(q).then(snapshot => {
        let products = []
        snapshot.forEach(function(childSnapshot) {
            products.push(childSnapshot.val().id)
        })
        console.log(products)
    })
}

// This method filters the product data by a specific sub-category.
var filterProductsBySubcategory = (subCategoryName) => {
    const q = query(ref(database, 'products'), orderByChild('sub-category'), equalTo(subCategoryName));
    get(q).then(snapshot => {
        let products = []
        snapshot.forEach(function(childSnapshot) {
            products.push(childSnapshot.val().id)
        })
        console.log(products)
    })
}

// This method filters the product data by a tag.
var filterProductsByTags = (tagName) => {
    const q = query(ref(database, 'tags'), orderByKey(), equalTo(tagName));
    get(q).then(snapshot => {
        let products = []
        snapshot.forEach(function(childSnapshot) {
            var key = Object.keys(childSnapshot.val());
            for (let i = 0; i < key.length; i++) {
                products.push(key[i])
            }
        })
        console.log(products)
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
    filterProductsBySubcategory("Lights");
})
document.querySelector('#product-readFilteredTag').addEventListener("click", () => {
    filterProductsByTags("Used");
})