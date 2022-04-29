import { getDatabase, ref, set, update, get, query, orderByChild, equalTo }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const database = getDatabase();
const validateForm = () => {
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
const writeBasicInfoToDatabase = (id, name, description, price, tag, category,
                                  seller, pictures, date, sold, numLiked, numBookmarked, numDisliked) => {
    console.log("here")
    set(ref(database, 'products/' + id), {
        id: id,
        name: name,
        description: description,
        price: price,
        tag: tag,
        category: category,
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

// This method adds one to the number of likes the product has.
const modifyNumLiked = (id, change) => {
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
const updateSoldFlag = (id) => {
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
document.querySelector('#product-add-liked').addEventListener("click", () => {
    modifyNumLiked("1", 1)
})
document.querySelector('#product-update-sold').addEventListener("click", () => {
    updateSoldFlag("1")
})
