/*
    This class handles all the modifications of the users in the database, including adding, updating and deleting a
    user; adding to a user's listings, liked items and purchased items.
 */
import { getDatabase, ref, set, update, remove } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const database = getDatabase();

/*
    This method gets the inputs from the test html file, verifies the inputs and uses them to call
    a method that adds a user to the database.
 */
var validateForm = () => {
    const path = document.querySelector('#user-path').value;
    const id = document.querySelector("#form-id").value;
    const username = document.querySelector("#form-username").value;
    const name = document.querySelector("#form-name").value;
    const email = document.querySelector("#form-email").value;
    const profilePic = document.querySelector("#form-profilePic").value;
    const classYear = document.querySelector("#form-classYear").value;

    if (path.trim() == "" || id.trim() == "" || username.trim() == "" || name == "" || email.trim() == "" || profilePic == ""
    || classYear == "") {
        alert("form not completely filled");
    } else {
        addUser(path, id, username, name, email, profilePic, classYear);
    }
};

/*
    This method adds a new user to the database with the basic fields. It replaces any existing data at that path.
 */
var addUser = (path, id, username, name, email, profilePic, classYear) => {
    console.log("here")
    set(ref(database, 'users/' + path), {
        id: id,
        username: username,
        name: name,
        email: email,
        profilePic: profilePic,
        classYear: classYear
    });
    console.log("here")
}

/*
    This method adds a new product to a user's list of listings.
 */
var addNewListing = (userID, productID) => {
    console.log("Added new listing")
    const listingRef = ref(database, 'users/' + userID + '/listings/' + productID);
    set(listingRef, "true")
}

/*
    This method adds a new product to a user's liked list.
 */
var addToLikedList = (userID, productID) => {
    console.log("Added to liked list")
    const likedListRef = ref(database, 'users/' + userID + '/liked-items/' + productID);
    set(likedListRef, "true")
}

/*
    This method adds a new product to a user's purchased list.
 */
var addToPurchasedList = (userID, productID) => {
    console.log("Added new purchased item")
    const purchasedListRef = ref(database, 'users/' + userID + "/purchased-items/" + productID);
    set(purchasedListRef, "true")
}

/*
    This method updates specific fields of user data in the database.
 */
var updateData = (id, username) => {
    update(ref(database, 'users/' + id), {
        username: username
    })
    console.log("here")
}

/*
    This method deletes user data from the database.
 */
var deleteData = (id) => {
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
    addNewListing("u2", "p2");
})
document.querySelector('#likedList').addEventListener("click", () => {
    addToLikedList("u3", "p2");
})
document.querySelector('#purchased').addEventListener("click", () => {
    addToPurchasedList("u3", "p3");
})