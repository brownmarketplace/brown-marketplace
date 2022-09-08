/*
    This class handles reading the users in the database. It includes methods that read all the users,
    read a user by its ID, filter the users by class year.
 */
import { ref, set, get } from "firebase/database"
import database from "../DBInstance";

/*
    This method read if a product is in a user's liked list
 */
export async function readInLikedList(userId: string, productId: string): Promise<boolean> {
    const snapshot = await get(ref(database, `users/${userId}/liked-items/${productId}`))
    return snapshot.val();
}

/*
    This method adds a new product to a user's liked list.
 */
export async function addToLikedList(userID: string, productID: string): Promise<void> {
    const likedListRef = ref(database, `users/${userID}/liked-items/${productID}`);
    set(likedListRef, true);
}

/*
    This method removes a product from a user's liked list.
 */
export async function removeFromLikedList(userID: string, productID: string): Promise<void> {
    const likedListRef = ref(database, `users/${userID}/liked-items/${productID}`);
    set(likedListRef, false);
}