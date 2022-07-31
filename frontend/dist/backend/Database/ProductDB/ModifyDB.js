/*
    This class handles all the modifications of the products in the database, including adding a product, adding
    category, sub-category and tags to a product, and modifying the fields of a product.
 */
import { getDatabase, ref, set, update, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
var database = getDatabase();
/*
    This method gets the inputs from the test html file, verifies the inputs and uses them to call
    a method that adds a product to the database.
 */
var validateForm = function () {
    var id = document.querySelector("#product-id").value;
    var name = document.querySelector("#product-name").value;
    var description = document.querySelector("#product-description").value;
    var price = document.querySelector("#price-description").value;
    var seller = document.querySelector("#seller-description").value;
    var pictures = document.querySelector("#picture-description").value;
    var date = document.querySelector("#date-posted").value;
    var sold = document.querySelector("#sold-description").value;
    var numLiked = document.querySelector("#liked-description").value;
    if (id.trim() == "" || name.trim() == "" || description == "" || price.trim() == ""
        || seller.trim() == "" || pictures == "" || date.trim() == "" || sold == ""
        || numLiked == "") {
        alert("form not completely filled");
    }
    else {
        writeBasicInfoToDatabase(id, name, description, price, seller, pictures, date, sold, numLiked);
    }
};
/*
    This method adds a new product to the database with the basic fields. It replaces any existing data at that path.
 */
var writeBasicInfoToDatabase = function (id, name, description, price, seller, pictures, date, sold, numLiked) {
    console.log("here");
    set(ref(database, 'products/' + id), {
        id: id,
        name: name,
        description: description,
        price: price,
        seller: seller,
        pictures: pictures,
        date: date,
        sold: sold,
        numLiked: numLiked,
    });
    console.log("here");
};
/*
    This method adds a category and its corresponding sub-categories to the list of categories in the database.
 */
var addCategoryToList = function (categoryName, subCategories) {
    // loop through all the sub-category names
    for (var i = 0; i < subCategories.length; i++) {
        var newSubcategoryRef = ref(database, 'categories/' + categoryName + '/' + subCategories[i]);
        set(newSubcategoryRef, "empty"); // initialize the sub-category path
    }
    console.log("Added new category and its sub-categories");
};
/*
    This method adds a category and a sub-category to a product. The sub-category also stores the product ids of the
    products belonging to it.
 */
var addCategoryAndSubCategoryToProduct = function (productID, categoryName, subCategoryName) {
    // Add the category to the product
    var categoryRef = ref(database, 'products/' + productID + '/category');
    set(categoryRef, categoryName);
    // Add the sub-category to the product
    var subCategoryRef = ref(database, 'products/' + productID + '/sub-category');
    set(subCategoryRef, subCategoryName);
    // Add the product id to the list of product ids of the sub-category in the category
    var categoryRef2 = ref(database, 'categories/' + categoryName + '/' + subCategoryName + '/' + productID);
    set(categoryRef2, "true");
    console.log("Added category to product");
};
/*
    This method adds a tag to the list of tags.
 */
var addTagToList = function (tagName) {
    // add the tag to the list of tags
    var tagRef = ref(database, 'tags/' + tagName);
    set(tagRef, "empty");
    console.log("Added new tag to the list of tags");
};
/*
    This method adds a tag to a product.
 */
var addTagToProduct = function (productID, tagName) {
    // Add the tag to the list of tags of the product
    var tagRef = ref(database, 'products/' + productID + '/tags/' + tagName);
    set(tagRef, "true");
    // Add the product id to the list of product ids of the tag
    var tagRef2 = ref(database, 'tags/' + tagName + '/' + productID);
    set(tagRef2, "true");
    console.log("Added tag to product");
};
/*
    This method adds or subtracts one from the number of likes of the product.
 */
var modifyNumLiked = function (id, change) {
    var q = query(ref(database, 'products/'), orderByChild('id'), equalTo(id));
    var newNumLiked;
    get(q).then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            newNumLiked = String(parseInt(childSnapshot.val().numLiked) + change);
            update(ref(database, 'products/' + id), {
                numLiked: newNumLiked
            });
        });
    });
    console.log("number of likes modified");
};
/*
    This method toggles the sold flag of the product. The sold flag is either true or false.
 */
var updateSoldFlag = function (id) {
    var q = query(ref(database, 'products/'), orderByChild('id'), equalTo(id));
    var currSoldFlag = "false";
    get(q).then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.val().sold === "false") {
                currSoldFlag = "true";
            }
            update(ref(database, 'products/' + id), {
                sold: currSoldFlag
            });
        });
    });
};
document.querySelector('#product-register').addEventListener("click", function () {
    validateForm();
});
document.querySelector('#product-add-category').addEventListener("click", function () {
    addCategoryAndSubCategoryToProduct("p17", "Clothing", "Coats and Jackets");
});
document.querySelector('#product-add-tag').addEventListener("click", function () {
    addTagToProduct("p17", "Artsy");
});
document.querySelector('#product-add-liked').addEventListener("click", function () {
    modifyNumLiked("p1", -1);
});
document.querySelector('#product-update-sold').addEventListener("click", function () {
    updateSoldFlag("p1");
});
//# sourceMappingURL=ModifyDB.js.map