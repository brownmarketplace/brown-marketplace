import { getDatabase, ref, set, update, remove, push } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const database = getDatabase();
const validateForm = () => {
    const id = document.querySelector("#form-id").value;
    const username = document.querySelector("#form-username").value;
    const name = document.querySelector("#form-name").value;
    const email = document.querySelector("#form-email").value;
    const profilePic = document.querySelector("#form-profilePic").value;
    const classYear = document.querySelector("#form-classYear").value;

    if (id.trim() == "" || username.trim() == "" || name == "" || email.trim() == "" || profilePic == ""
    || classYear == "") {
        alert("form not completely filled");
    } else {
        writeBasicInfoToDatabase(id, username, name, email, profilePic, classYear);
    }
};

// This method writes data to a specified path in the database. It replaces any existing data at that path.
const writeBasicInfoToDatabase = (id, username, name, email, profilePic, classYear) => {
    console.log("here")
    set(ref(database, 'users/' + id), {
        id: id,
        username: username,
        name: name,
        email: email,
        profilePic: profilePic,
        classYear: classYear
    });
    console.log("here")
}

// This method adds a new listing to the user's list of listings.
const addNewListing = (userID, productID) => {
    console.log("here")
    const listingRef = ref(database, 'users/' + userID + '/listings');
    const newListingRef = push(listingRef);
    set(newListingRef, {
        productID: productID
    })
}

// This method adds a new referral to the user's list of referred users.
const addNewReferral = (userID, referredUserID) => {
    console.log("here")
    const referralRef = ref(database, 'users/' + userID + '/referrals');
    const newReferralRef = push(referralRef)
    set(newReferralRef, {
        referredUserID: referredUserID
    })
}

// This method adds a new product to the user's wish list.
const addToWishList = (userID, productID) => {
    console.log("here")
    const wishListRef = ref(database, 'users/' + userID + '/wish-list');
    const newWishListRef = push(wishListRef);
    set(newWishListRef, {
        productID: productID
    })
}

// This method adds a new product to the user's liked list.


// This method adds a new product to the user's bookmarked list.


// This method adds a new product to the user's disliked list.

// This method updates specific fields of data in the database.
const updateData = (id, username) => {
    update(ref(database, 'users/' + id), {
        username: username
    })
    console.log("here")
}

// This method deletes data from the database.
const deleteData = (id) => {
    remove(ref(database, 'users/' + id))
}

document.querySelector('#register').addEventListener("click", () => {
    validateForm();
})
document.querySelector('#update').addEventListener("click", () => {
    updateData(1, "Ostrich");
})
document.querySelector('#delete').addEventListener("click", () => {
    deleteData(4);
})
document.querySelector('#listing').addEventListener("click", () => {
    addNewListing(1, 10002);
})
document.querySelector('#referral').addEventListener("click", () => {
    addNewReferral(1, 2);
})
document.querySelector('#wishList').addEventListener("click", () => {
    addToWishList(1, 10003);
})