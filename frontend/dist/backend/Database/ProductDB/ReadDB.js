/*
    This class handles reading the products in the database. It includes methods that read all the products,
    read a product by its ID, filter the products by category, sub-category and tag.
 */
import { getDatabase, ref, get, onValue, query, orderByChild, orderByKey, equalTo } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
var database = getDatabase();
/*
    This method returns all the products' data in the database.
 */
var readAllProductsInfo = function () {
    onValue(ref(database, 'products'), function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot.val());
        });
    });
};
/*
    This method finds and returns a product in the database by its ID.
 */
var readOneProductInfo = function (productID) {
    onValue(ref(database, 'products/' + productID), function (snapshot) {
        console.log(snapshot.val());
    });
};
/*
    This method filters the products by a specific category.
 */
var filterProductsByCategory = function (categoryName) {
    var q = query(ref(database, 'products'), orderByChild('category'), equalTo(categoryName));
    get(q).then(function (snapshot) {
        var products = [];
        snapshot.forEach(function (childSnapshot) {
            products.push(childSnapshot.val().id);
        });
        console.log(products);
    });
};
/*
    This method filters the products by a specific sub-category.
 */
var filterProductsBySubcategory = function (subCategoryName) {
    var q = query(ref(database, 'products'), orderByChild('sub-category'), equalTo(subCategoryName));
    get(q).then(function (snapshot) {
        var products = [];
        snapshot.forEach(function (childSnapshot) {
            products.push(childSnapshot.val().id);
        });
        console.log(products);
    });
};
/*
    This method filters the products by a specific tag.
 */
var filterProductsByTags = function (tagName) {
    var q = query(ref(database, 'tags'), orderByKey(), equalTo(tagName));
    get(q).then(function (snapshot) {
        var products = [];
        snapshot.forEach(function (childSnapshot) {
            var key = Object.keys(childSnapshot.val());
            for (var i = 0; i < key.length; i++) {
                products.push(key[i]);
            }
        });
        console.log(products);
    });
};
document.querySelector('#product-readAll').addEventListener("click", function () {
    readAllProductsInfo();
});
document.querySelector('#product-read').addEventListener("click", function () {
    readOneProductInfo("p300");
});
document.querySelector('#product-readFiltered').addEventListener("click", function () {
    filterProductsByCategory("Room Decor");
});
document.querySelector('#product-readFilteredSubCategory').addEventListener("click", function () {
    filterProductsBySubcategory("Lights");
});
document.querySelector('#product-readFilteredTag').addEventListener("click", function () {
    filterProductsByTags("Used");
});
//# sourceMappingURL=ReadDB.js.map