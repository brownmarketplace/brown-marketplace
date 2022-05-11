import { getDatabase, ref, set, update, get, push, query, orderByChild, equalTo }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const database = getDatabase();

var validateForm = () => {
    const path = document.querySelector('#path-id').value;
    const id = document.querySelector("#product-id").value;
    const name = document.querySelector("#product-name").value;
    const description = document.querySelector("#product-description").value;
    const price = document.querySelector("#price-description").value;
    const seller = document.querySelector("#seller-description").value;
    const pictures = document.querySelector("#picture-description").value;
    const date = document.querySelector("#date-posted").value;
    const sold = document.querySelector("#sold-description").value;
    const numLiked = document.querySelector("#liked-description").value;

    if (path.trim() == "" || id.trim() == "" || name.trim() == "" || description == "" || price.trim() == ""
        || seller.trim() == "" || pictures == "" || date.trim() == "" || sold == ""
        || numLiked == "") {
        alert("form not completely filled");
    } else {
        writeBasicInfoToDatabase(path, id, name, description, price, seller, pictures, date, sold,
            numLiked);
    }
};

// This method adds a new product to the database. It replaces any existing data at that path.
var writeBasicInfoToDatabase = (path, id, name, description, price, seller, pictures, date, sold, numLiked) => {
    console.log("here")
    set(ref(database, 'products/' + path), {
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
    console.log("here")
}

var addCategoryToList = (categoryName, subCategories) => {
    // Add the category to the list of categories
    const categoryRef = ref(database, 'categories/' + categoryName);

    // Add the sub-categories to the category
    const subCategoryRef = ref(database, 'categories/' + categoryName + '/sub-categories')
    for (var i = 0; i < subCategories.length; i++) {
        const newSubcategoryRef = ref(database, 'categories/' + categoryName + '/' + subCategories[i])
        set(newSubcategoryRef, "empty")
    }
    // keep track of the current category id
    console.log("Added new category and its sub-categories")
}

// This method adds a category and a subcategory to the product.
var addCategoryAndSubCategoryToProduct = (productID, categoryName, subCategoryName) => {
    // Add the category to the product
    const categoryRef = ref(database, 'products/' + productID + '/category');
    set(categoryRef, categoryName)

    // Add the sub-category to the product
    const subCategoryRef = ref(database, 'products/' + productID + '/sub-category')
    set(subCategoryRef, subCategoryName)

    // Add the product id to the list of product ids of the sub-category in the category
    const categoryRef2 = ref(database, 'categories/' + categoryName + '/' + subCategoryName + '/' + productID)
    set(categoryRef2, "true")
    console.log("Added category to product")
}

// var getCategoryIDs = () => {
//     // map to keep track of the category ids
//     const category_to_ids = new Map();
//     category_to_ids.set("Room Decor", "-N1Ux1ljSfURmvq-bEMe")
//     category_to_ids.set("Clothing", "-N1UxEWmJFRaXRB9Y_8O")
//     category_to_ids.set("Furniture", "-N1UxP23b9LJiNw9FSxC")
//     category_to_ids.set("Accessories", "-N1UxXbrrqelBYY1JsLK")
//     category_to_ids.set("Books", "-N1UxdxXJVmBlkKkhs5r")
//     category_to_ids.set("Electronics & related", "-N1Uxqqb2-9GAEinq7Od")
//     category_to_ids.set("Other", "-N1UxwBSZrXXyiOb2KCK")
//     return category_to_ids
// }

var addSubCategoryToList = (categoryName, subCategoryName) => {
    // Add sub-category to the list of sub-categories
    const subCategoryRef = ref(database, 'sub-categories');
    const newSubCategoryRef = push(subCategoryRef)
    set(newSubCategoryRef, {
        subCategoryName: subCategoryName,
        categoryName: categoryName
    })
    console.log("Added new sub-category to the list of sub-categories")
}

// This method adds a subcategory to the product.
var addSubCategoryToProduct = (productID, categoryName, subCategoryName) => {
    // Add the sub-category to the list of subcategories under the category of the product
    let subCategoryID = getSubCategoryIDs().get(subCategoryName)

    const subCategoryRef = ref(database, 'products/' + productID + '/sub-category')
    // const newSubCategoryRef = push(subCategoryRef)
    set(subCategoryRef, subCategoryName)

    // Add the product id to the list of product ids of the sub-category
    const subCategoryRef2 = ref(database, 'sub-categories/' + subCategoryID + '/productIDs/' + productID);
    set(subCategoryRef2, productID)
    console.log("Added subcategory to product")
}

// var getSubCategoryIDs = () => {
//     // map to keep track of the category ids
//     const subCategory_to_ids = new Map();
//     subCategory_to_ids.set("Plushies", "-N1UykiIKXwQFZ3jYjGZ")
//     subCategory_to_ids.set("Plants", "-N1UytvFDjfZF1ndI3f2")
//     subCategory_to_ids.set("Lights", "-N1Uyvr4_P1TDydamPwC")
//     subCategory_to_ids.set("Posters", "-N1Uyxk4RO-2FrlUOFbA")
//     subCategory_to_ids.set("Tapestries", "-N1Uz-nLjWEurGxIY-WY")
//     subCategory_to_ids.set("Other room decor", "-N1Uz1wWd1RJ1v3mBNf3")
//     subCategory_to_ids.set("Tops", "-N1Uz79kf02luhcrKlLg")
//     subCategory_to_ids.set("Pants", "-N1UzAbzeYI93hyv5-xo")
//     subCategory_to_ids.set("Dresses", "-N1UzCNYMC65SOhsDBB8")
//     subCategory_to_ids.set("Shoes", "-N1UzE7OfFpItuifBW_j")
//     subCategory_to_ids.set("Coats and Jackets", "-N1UzFrZABvjJT6gRjNL")
//     subCategory_to_ids.set("Other Clothing", "-N1UzHyoPzEQx5KtqBns")
//     subCategory_to_ids.set("Chairs", "-N1Uz_M1anVNuKUqndqJ")
//     subCategory_to_ids.set("Couches", "-N1Uzbx_8582s6F13nFh")
//     subCategory_to_ids.set("Mattresses", "-N1UzdngQ4Oc0BPuI2au")
//     subCategory_to_ids.set("Pillows", "-N1Uzfp3SS-t6Dfhfkxy")
//     subCategory_to_ids.set("Other furniture", "-N1UziLMqvF-LKPlr-U5")
//     subCategory_to_ids.set("Necklace", "-N1UznGsU8Q9VYyPhVcM")
//     subCategory_to_ids.set("Bracelet", "-N1UzpjwO0Y0z-sErYlf")
//     subCategory_to_ids.set("Earrings", "-N1UzrnSCn00KTtU5xYN")
//     subCategory_to_ids.set("Hair clips", "-N1UzthX-LeU2XUKtaxK")
//     subCategory_to_ids.set("Other accessories", "-N1Uzvj-lq8bGdZBFYfd")
//     subCategory_to_ids.set("Textbooks", "-N1UzzP4ejJ5hZKlIQ8C")
//     subCategory_to_ids.set("Fiction", "-N1V-12XWHylud1WpjQg")
//     subCategory_to_ids.set("Nonfiction", "-N1V-3LqbyhrjEvjV8ln")
//     subCategory_to_ids.set("Poetry", "-N1V-52Fi_fnowUBmXoF")
//     subCategory_to_ids.set("Other books", "-N1V-6tqOLYaUGwMi3Lr")
//     subCategory_to_ids.set("Speakers", "-N1V-CCcaSY8PZEbV04J")
//     subCategory_to_ids.set("Phones", "-N1V-Dzqzxh26ij5fGY0")
//     subCategory_to_ids.set("Devices", "-N1V-FlzKDrZnHtqzKwl")
//     subCategory_to_ids.set("Other electronics and related", "-N1V-IKVJx59x6T1n_H1")
//     subCategory_to_ids.set("Miscellaneous", "-N1V-L5w8gne7RxkzWAF")
//     return subCategory_to_ids
// }

var addTagToList = (tagName) => {
    // add the tag to the list of tags
    const tagRef = ref(database, 'tags/' + tagName)
    set(tagRef, "empty")
    console.log("Added new tag to the list of tags")
}

// This method adds a tag to the product.
var addTagToProduct = (productID, tagName) => {
    // Add the tag to the list of tags of the product
    const tagRef = ref(database, 'products/' + productID + '/tags/' + tagName)
    set(tagRef, "true")

    // Add the product id to the list of product ids of the tag
    const tagRef2 = ref(database, 'tags/' + tagName + '/' + productID);
    set(tagRef2, "true")
    console.log("Added tag to product")
}

// var getTagIDS = () => {
//     const tag_to_ids = new Map()
//     tag_to_ids.set("New", "-N1V00Ra6AVVNwfQog8Q")
//     tag_to_ids.set("Lightly Used", "-N1V0DxoUNKHV6VVdC_p")
//     tag_to_ids.set("Used", "-N1V0Gnl_Nf0OZ4Qna5N")
//     tag_to_ids.set("Handmade", "-N1V0JD7DGWGqB6jQM7X")
//     tag_to_ids.set("Gift", "-N1V0LTkL2cG4j2OsYuV")
//     tag_to_ids.set("Spring", "-N1VtItKV8ErLPBNg1Bv")
//     tag_to_ids.set("Summer", "-N1VtMWyD9G1bIaGpfuR")
//     tag_to_ids.set("Fall", "-N1WJAi0bNjKeo6wF7xT")
//     tag_to_ids.set("Winter", "-N1WJDjEVHwXWVbZ3HMU")
//     tag_to_ids.set("Mens", "-N1WJhvwoG-h0A5SbHCQ")
//     tag_to_ids.set("Womens", "-N1WJkFAkj43U-1JWz6P")
//     tag_to_ids.set("Unisex", "-N1WJmQNrDJl63m2b55Q")
//     tag_to_ids.set("Casual Wear", "-N1WJpRzpxLlNMUM_a1g")
//     tag_to_ids.set("Formal Wear", "-N1WJsvGZkn_ErXBMWXr")
//     tag_to_ids.set("Vintage", "-N1WJvG8thC42Jctum1j")
//     tag_to_ids.set("Fitness and Sports Equipment", "-N1WJy_SfFCFvMYVaj9e")
//     tag_to_ids.set("Plus Size", "-N1WK09G9IYuzpKE2HD5")
//     tag_to_ids.set("Brown Merchandise", "-N1WK2WQkmQHaHpB-NDG")
//     tag_to_ids.set("Holiday", "-N1WK4ZG7-L6r_sECJ70")
//     tag_to_ids.set("Cute", "-N1WK6owfxIp742zSUXu")
//     tag_to_ids.set("Eco-friendly", "-N1WK97u-A2cEnFY6BnG")
//     tag_to_ids.set("Cruelty-free", "-N1WKBQaKj4rS29lOSxt")
//     tag_to_ids.set("Vegan", "-N1WKFG0GxU7RRWSTne2")
//     tag_to_ids.set("BIPOC-made", "-N1WKHVPgOvfXN2CPpH6")
//     tag_to_ids.set("Daily Essentials", "-N1WKJYmfh4OviQp3OlE")
//     tag_to_ids.set("School Essentials", "-N1WKLnx6dUm_Yoqq_UM")
//     tag_to_ids.set("Cultural", "-N1WKPXuiLYa5t3J0loq")
//     tag_to_ids.set("Beauty products", "-N1WK_j7sFTEcJ_icdZX")
//     tag_to_ids.set("Artsy", "-N1WKcWda70pbOYdlKOQ")
//     tag_to_ids.set("Custom", "-N1WKemwu5ZPbCuiXgu8")
//     tag_to_ids.set("Sports Wear", "-N1WKh9V6xuySa3qhkLN")
//     tag_to_ids.set("Street Wear", "-N1WKjQdV4IadNOxk8Gj")
//     return tag_to_ids
// }

// This method adds one to the number of likes the product has.
var modifyNumLiked = (id, change) => {
    const q = query(ref(database, 'products/'), orderByChild('id'), equalTo(id));
    let newNumLiked;

    get(q).then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
            newNumLiked = String(parseInt(childSnapshot.val().numLiked) + change);
            update(ref(database, 'products/' + id), {
                numLiked: newNumLiked
            })
        })
    })
}

// This method toggles the sold flag.
var updateSoldFlag = (id) => {
    const q = query(ref(database, 'products/'), orderByChild('id'), equalTo(id));
    let currSoldFlag = "No";
    get(q).then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().sold === "No") {
                currSoldFlag = "Yes";
            }
            update(ref(database, 'products/' + id), {
                sold: currSoldFlag
            })
        })
    })
}

document.querySelector('#product-register').addEventListener("click", () => {
    validateForm();
})
document.querySelector('#product-add-category').addEventListener("click", () => {
    addCategoryAndSubCategoryToProduct("p3", "Room Decor", "Posters")
})
document.querySelector('#product-add-sub-category').addEventListener("click", () => {
    addSubCategoryToList("3", "Room Decor", "Posters")
})
document.querySelector('#product-add-tag').addEventListener("click", () => {
    addTagToProduct("p1", "Cute")
})
document.querySelector('#product-add-liked').addEventListener("click", () => {
    modifyNumLiked("1", 1)
})
document.querySelector('#product-update-sold').addEventListener("click", () => {
    updateSoldFlag("1")
})

