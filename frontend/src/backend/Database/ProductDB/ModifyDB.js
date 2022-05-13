/*
    This class handles all the modifications of the products in the database, including adding a product, adding
    category, sub-category and tags to a product, and modifying the fields of a product.
 */
import { getDatabase, ref, set, update, get, query, orderByChild, equalTo }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const database = getDatabase();

/*
    This method gets the inputs from the test html file, verifies the inputs and uses them to call
    a method that adds a product to the database.
 */
var validateForm = () => {
    const id = document.querySelector("#product-id").value;
    const name = document.querySelector("#product-name").value;
    const description = document.querySelector("#product-description").value;
    const price = document.querySelector("#price-description").value;
    const seller = document.querySelector("#seller-description").value;
    const pictures = document.querySelector("#picture-description").value;
    const date = document.querySelector("#date-posted").value;
    const sold = document.querySelector("#sold-description").value;
    const numLiked = document.querySelector("#liked-description").value;

    if (id.trim() == "" || name.trim() == "" || description == "" || price.trim() == ""
        || seller.trim() == "" || pictures == "" || date.trim() == "" || sold == ""
        || numLiked == "") {
        alert("form not completely filled");
    } else {
        writeBasicInfoToDatabase(id, name, description, price, seller, pictures, date, sold,
            numLiked);
    }
};

/*
    This method adds a new product to the database with the basic fields. It replaces any existing data at that path.
 */
var writeBasicInfoToDatabase = (id, name, description, price, seller, pictures, date, sold, numLiked) => {
    console.log("here")
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
    console.log("here")
}

/*
    This method adds a category and its corresponding sub-categories to the list of categories in the database.
 */
var addCategoryToList = (categoryName, subCategories) => {
    // loop through all the sub-category names
    for (var i = 0; i < subCategories.length; i++) {
        const newSubcategoryRef = ref(database, 'categories/' + categoryName + '/' + subCategories[i])
        set(newSubcategoryRef, "empty") // initialize the sub-category path
    }
    console.log("Added new category and its sub-categories")
}

/*
    This method adds a category and a sub-category to a product. The sub-category also stores the product ids of the
    products belonging to it.
 */
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

/*
    This method adds a tag to the list of tags.
 */
var addTagToList = (tagName) => {
    // add the tag to the list of tags
    const tagRef = ref(database, 'tags/' + tagName)
    set(tagRef, "empty")
    console.log("Added new tag to the list of tags")
}

/*
    This method adds a tag to a product.
 */
var addTagToProduct = (productID, tagName) => {
    // Add the tag to the list of tags of the product
    const tagRef = ref(database, 'products/' + productID + '/tags/' + tagName)
    set(tagRef, "true")

    // Add the product id to the list of product ids of the tag
    const tagRef2 = ref(database, 'tags/' + tagName + '/' + productID);
    set(tagRef2, "true")
    console.log("Added tag to product")
}

/*
    This method adds or subtracts one from the number of likes of the product.
 */
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
    console.log("number of likes modified")
}

/*
    This method toggles the sold flag of the product. The sold flag is either true or false.
 */
var updateSoldFlag = (id) => {
    const q = query(ref(database, 'products/'), orderByChild('id'), equalTo(id));
    let currSoldFlag = "false";
    get(q).then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().sold === "false") {
                currSoldFlag = "true";
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
    addCategoryAndSubCategoryToProduct("p15", "Electronics & related",
        "Other electronics and related")
})
document.querySelector('#product-add-tag').addEventListener("click", () => {
    addTagToProduct("p15", "School Essentials")
})
document.querySelector('#product-add-liked').addEventListener("click", () => {
    modifyNumLiked("p1", -1)
})
document.querySelector('#product-update-sold').addEventListener("click", () => {
    updateSoldFlag("p1")
})

