import { getDatabase, ref, set, update, get, push, query, orderByChild, equalTo }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const database = getDatabase();

var validateForm = () => {
    const id = document.querySelector("#product-id").value;
    const name = document.querySelector("#product-name").value;
    const description = document.querySelector("#product-description").value;
    const price = document.querySelector("#price-description").value;
    const tag = document.querySelector("#tag-description").value;
    const category = document.querySelector("#category-description").value;
    const seller = document.querySelector("#seller-description").value;
    const pictures = document.querySelector("#picture-description").value;
    const date = document.querySelector("#date-posted").value;
    const sold = document.querySelector("#sold-description").value;
    const numLiked = document.querySelector("#liked-description").value;
    const numBookmarked = document.querySelector("#bookmarked-description").value;
    const numDisliked = document.querySelector("#disliked-description").value;

    if (id.trim() == "" || name.trim() == "" || description == "" || price.trim() == "" || tag == ""
        || category == "" || seller.trim() == "" || pictures == "" || date.trim() == "" || sold == ""
        || numLiked == "" || numBookmarked == "" || numDisliked == "") {
        alert("form not completely filled");
    } else {
        writeBasicInfoToDatabase(id, name, description, price, tag, category, seller, pictures, date, sold,
            numLiked, numBookmarked, numDisliked);
    }
};

// This method adds a new product to the database. It replaces any existing data at that path.
var writeBasicInfoToDatabase = (id, name, description, price, tag, category,
                                  seller, pictures, date, sold, numLiked, numBookmarked, numDisliked) => {
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
        numBookmarked: numBookmarked,
        numDisliked: numDisliked
    });
    console.log("here")
}

var addCategoryToList = (categoryName, subCategories) => {
    // Add the category to the list of categories
    const categoryRef = ref(database, 'categories');
    const newCategoryRef = push(categoryRef)
    set(newCategoryRef, {
        categoryName: categoryName
    })

    // Add the sub-categories to the category
    const subCategoryRef = ref(database, 'categories/' + newCategoryRef.key + '/sub-categories')
    for (var i = 0; i < subCategories.length; i++) {
        const newSubCategoryRef = push(subCategoryRef)
        set(newSubCategoryRef, {
            subCategoryName: subCategories[i]
        })
    }
    // keep track of the current category id
    // category_to_ids.set(categoryName, newCategoryRef.key)
    console.log("Added new category and its sub-categories")
}

// This method adds a category to the product.
var addCategoryToProduct = (productID, categoryName) => {
    // Add the category to the list of categories of the product
    const categoryRef = ref(database, 'products/' + productID + '/categories');
    const newCategoryRef = push(categoryRef)
    set(newCategoryRef, {
        categoryName: categoryName
    })

    // Add the product id to the list of product ids of the category
    var category_to_ids = getCategoryIDs()
    var categoryID = category_to_ids.get(categoryName)

    const categoryRef2 = ref(database, 'categories/' + categoryID + '/productIDs');
    const newCategoryRef2 = push(categoryRef2)
    set(newCategoryRef2, {
        productID: productID
    })
    console.log("Added category to product")
}

var getCategoryIDs = () => {
    // map to keep track of the category ids
    const category_to_ids = new Map();
    category_to_ids.set("Room Decor", "-N1Ux1ljSfURmvq-bEMe")
    category_to_ids.set("Clothing", "-N1UxEWmJFRaXRB9Y_8O")
    category_to_ids.set("Furniture", "-N1UxP23b9LJiNw9FSxC")
    category_to_ids.set("Accessories", "-N1UxXbrrqelBYY1JsLK")
    category_to_ids.set("Books", "-N1UxdxXJVmBlkKkhs5r")
    category_to_ids.set("Electronics & related", "-N1Uxqqb2-9GAEinq7Od")
    category_to_ids.set("Other", "-N1UxwBSZrXXyiOb2KCK")
    return category_to_ids
}

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
var addSubCategoryToProduct = (productID, categoryID, subCategoryName, subCategoryID) => {
    // Add the sub-category to the list of subcategories under the category of the product
    const subCategoryRef = ref(database, 'products/' + productID + '/categories/' + categoryID + '/subcategories/'
    + subCategoryID)
    set(subCategoryRef, {
        subcategoryID: subCategoryID,
        subCategoryName: subCategoryName
    })

    // Add the product id to the list of product ids of the sub-category
    const subCategoryRef2 = ref(database, 'sub-categories/' + subCategoryID + '/productIDs/' + productID);
    set(subCategoryRef2, {
        productID: productID
    })
    console.log("Added subcategory to product")
}

var addTagToList = (tagName) => {
    // add the tag to the list of tags
    const tagRef = ref(database, 'tags')
    const newTagRef = push(tagRef)
    set(newTagRef, {
        tagName: tagName
    })
    console.log("Added new tag to the list of tags")
}

// This method adds a tag to the product.
var addTagToProduct = (id, tag, tagID) => {
    // Add the tag to the list of tags of the product
    const tagRef = ref(database, 'products/' + id + '/tags/' + tagID)
    set(tagRef, {
        tagID: tagID,
        tagName: tag
    })

    // Add the product id to the list of product ids of the tag
    const tagRef2 = ref(database, 'tags/' + tagID + '/productIDs/' + id);
    set(tagRef2, {
        productID: id
    })
    console.log("Added tag to product")
}

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
    addCategoryToProduct(3, "Room Decor")
})
document.querySelector('#product-add-sub-category').addEventListener("click", () => {
    addSubCategoryToList("Other", "Miscellaneous")
})
document.querySelector('#product-add-tag').addEventListener("click", () => {
    addTagToList("Gift")
})
document.querySelector('#product-add-liked').addEventListener("click", () => {
    modifyNumLiked("1", 1)
})
document.querySelector('#product-update-sold').addEventListener("click", () => {
    updateSoldFlag("1")
})

