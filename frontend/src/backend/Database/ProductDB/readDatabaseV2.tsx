/*
    This class handles reading the products in the database. It includes methods that read all the products,
    read a product by its ID, filter the products by category, sub-category and tag.
 */
import { ref, get, onValue, query, orderByChild, orderByKey, equalTo, child, DataSnapshot, Unsubscribe } from "firebase/database"
import database from "../DBInstance";

import { ProductInfo, UserInfo } from "../../../models/types";
import { dbProductInfo, dbUserInfo } from "../../../models/database";

export const productRef = ref(database, 'products');

function toProductInfo(dbProduct: dbProductInfo): ProductInfo {
    return {
        id: dbProduct.id,
        name: dbProduct.name,
        price: parseFloat(dbProduct.price),
        description: dbProduct.description,
        images: dbProduct.pictures,
        tags: Object.keys(dbProduct.tags),
        category: dbProduct.category,
        subcategory: dbProduct["sub-category"],
        seller: dbProduct.seller,
    } as ProductInfo;
}

function toUserInfo(dbUser: dbUserInfo): UserInfo {
    return {
        profilePicture: dbUser.profilePic,
        name: dbUser.name,
        email: dbUser.email,
        postDate: "no post date stored in DB",
    } as UserInfo;
}

/*
    This method returns all the products' data in the database.
 */
export async function readAllProductsInfo(setter: React.Dispatch<React.SetStateAction<ProductInfo[]>>): Promise<Unsubscribe> {
    const unsubscriber: Unsubscribe = onValue(productRef, (snapshot) => {
        const products: ProductInfo[] = [];
        snapshot.forEach((child: DataSnapshot) => {
            const dbProduct: dbProductInfo = { ...{ id: child.key ?? "no key" }, ...child.val() }; // TODO: handle no key
            products.push(toProductInfo(dbProduct));
        });
        setter(products);
    });

    return unsubscriber;
}

/*
    This method finds and returns a product in the database by its ID.
 */
export async function readOneProductInfo(productID: string, setter: React.Dispatch<React.SetStateAction<ProductInfo>>): Promise<Unsubscribe> {
    const unsubscriber: Unsubscribe = onValue(ref(database, 'products/' + productID), (snapshot) => {
        const dbProduct: dbProductInfo = { ...{ id: snapshot.key ?? "no key" }, ...snapshot.val() }; // TODO: handle no key
        setter(toProductInfo(dbProduct));
    });

    return unsubscriber;
}

/*
    This method finds and returns a product in the database by its ID.
 */
export async function readUserInfo(userID: string, setter: React.Dispatch<React.SetStateAction<UserInfo>>): Promise<Unsubscribe> {
    const unsubscriber: Unsubscribe = onValue(ref(database, 'users/' + userID), (snapshot) => {
        const dbUser: dbUserInfo = snapshot.val();
        setter(toUserInfo(dbUser));
    });

    return unsubscriber;
}


// /*
//     This method filters the products by a specific category.
//  */
// var filterProductsByCategory = (categoryName) => {
//     const q = query(ref(database, 'products'), orderByChild('category'), equalTo(categoryName));
//     get(q).then(snapshot => {
//         let products = []
//         snapshot.forEach(function (childSnapshot) {
//             products.push(childSnapshot.val().id)
//         })
//         console.log(products)
//     })
// }

// /*
//     This method filters the products by a specific sub-category.
//  */
// var filterProductsBySubcategory = (subCategoryName) => {
//     const q = query(ref(database, 'products'), orderByChild('sub-category'), equalTo(subCategoryName));
//     get(q).then(snapshot => {
//         let products = []
//         snapshot.forEach(function (childSnapshot) {
//             products.push(childSnapshot.val().id)
//         })
//         console.log(products)
//     })
// }

// /*
//     This method filters the products by a specific tag.
//  */
// var filterProductsByTags = (tagName) => {
//     const q = query(ref(database, 'tags'), orderByKey(), equalTo(tagName));
//     get(q).then(snapshot => {
//         let products = []
//         snapshot.forEach(function (childSnapshot) {
//             var key = Object.keys(childSnapshot.val());
//             for (let i = 0; i < key.length; i++) {
//                 products.push(key[i])
//             }
//         })
//         console.log(products)
//     })
// }