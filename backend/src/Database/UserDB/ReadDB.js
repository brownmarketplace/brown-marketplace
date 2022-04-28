import { getDatabase, ref, get, onValue, query, orderByChild, equalTo }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const database = getDatabase();

/*
  This method reads the information of a particular user in the database. It listens for changes and uses
  onValue() to observe events. This method is triggered once when the listener is attached and again every time the
  data, including children, changes
 */
const readOneUserInfo = (id) => {
    onValue(ref(database, 'users/' + id), (snapshot) => {
        console.log(snapshot.val())
        // console.log(snapshot.val().id);
    })
}

const readMultipleUserInfo = () => {
    onValue(ref(database, 'users'), (snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            console.log(childSnapshot.val())
            // console.log(childSnapshot.val().id);
        })
    })
}

// This method reads all the data for users who are sophomores.
const filterUsersByClassYear = (classYear) => {
    const q = query(ref(database, 'users/'), orderByChild('classYear'), equalTo(classYear));
    get(q).then(snapshot => {
        console.log(snapshot.val())
    })
}

// This method reads the data of a specific user.
const getUserData = (userID) => {
    const q = query(ref(database, 'users/'), orderByChild('id'), equalTo(userID));
    get(q).then(snapshot => {
        console.log(snapshot.val())
    })
}

document.querySelector('#read').addEventListener("click", () => {
    readOneUserInfo(1);
})
document.querySelector('#readAll').addEventListener("click", () => {
    readMultipleUserInfo();
})
document.querySelector('#readFiltered').addEventListener("click", () => {
    filterUsersByClassYear("sophomore");
})
document.querySelector('#readSpecificUser').addEventListener("click", () => {
    getUserData("2");
})