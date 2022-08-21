/*
    This class handles reading the users in the database. It includes methods that read all the users,
    read a user by its ID, filter the users by class year.
 */
import { ref, set, get, onValue, query, orderByChild, orderByKey, equalTo, child, DataSnapshot, Unsubscribe } from "firebase/database"
import database from "../DBInstance";


export async function readInLikedList(userId: string, productId: string, setter: React.Dispatch<React.SetStateAction<boolean>>): Promise<Unsubscribe> {
    const unsubscriber: Unsubscribe = onValue(ref(database, `users/${userId}/liked-items/${productId}`), (snapshot) => {
        const inLikedList = snapshot.val()
        setter(inLikedList === 'true');
    });

    return unsubscriber;
}

/*
    This method adds a new product to a user's liked list.
 */
export async function addToLikedList(userID: string, productID: string): Promise<void> {
    const likedListRef = ref(database, `users/${userID}/liked-items/${productID}`);
    set(likedListRef, 'true');
}

/*
    This method removes a new product from a user's liked list.
 */
export async function removeFromLikedList(userID: string, productID: string): Promise<void> {
    const likedListRef = ref(database, `users/${userID}/liked-items/${productID}`);
    set(likedListRef, 'false');
}