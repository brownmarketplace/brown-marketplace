// import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from
//         "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
//
// const provider = new GoogleAuthProvider();
//
// const userSignIn = () => {
//     const auth = getAuth();
//     signInWithPopup(auth, provider)
//         .then((result) => {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             // The signed-in user info.
//             const user = result.user;
//
//         }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//     });
// }
//
// const userSignOut = () => {
//     const auth = getAuth();
//     signOut(auth).then(() => {
//         console.log("User successfully signed out")
//         // Sign-out successful.
//     }).catch((error) => {
//         // An error happened.
//     });
// }
//
// const manageUserState = () => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             // user signed in; console.log user's properties
//             console.log("User signed in: ")
//             console.log("User ID: " + user.uid)
//             console.log("User display name: " + user.displayName)
//             console.log("User email: " + user.email)
//         } else {
//             console.log("User ID: " + user.uid + " signed out");
//         }
//     })
// }
//
//
// document.querySelector('#user-signin').addEventListener("click", () => {
//     userSignIn();
// })
// document.querySelector('#user-signout').addEventListener("click", () => {
//     userSignOut();
// })
