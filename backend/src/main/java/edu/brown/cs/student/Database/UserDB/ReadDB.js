import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const database = getDatabase();

/*
  This method reads the information of a particular user in the database. It listens for changes and uses
  onValue() to observe events. This method is triggered once when the listener is attached and again every time the
  data, including children, changes
 */
const readOneUserInfo = (id) => {
    onValue(ref(database, 'users/' + id), (snapshot) => {
        console.log(snapshot.val().id);
        console.log(snapshot.val().username);
        console.log(snapshot.val().name);
        console.log(snapshot.val().email);
        console.log(snapshot.val().profilePic);
        console.log(snapshot.val().classYear);
    })
}

const readMultipleUserInfo = () => {
    onValue(ref(database, 'users'), (snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            console.log(childSnapshot.val().id);
            console.log(childSnapshot.val().username);
            console.log(childSnapshot.val().name);
            console.log(childSnapshot.val().email);
            console.log(childSnapshot.val().profilePic);
            console.log(childSnapshot.val().classYear);
        })
    })
}

document.querySelector('#read').addEventListener("click", () => {
    readOneUserInfo(1);
})
document.querySelector('#readAll').addEventListener("click", () => {
    readMultipleUserInfo();
})