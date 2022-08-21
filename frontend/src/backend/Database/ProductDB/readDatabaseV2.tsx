/*
    This class handles reading the products in the database. It includes methods that read all the products,
    read a product by its ID, filter the products by category, sub-category and tag.
 */
import { ref, get, onValue, query, orderByChild, orderByKey, equalTo, child, DataSnapshot, Unsubscribe } from "firebase/database"
import database from "../DBInstance";

import { ProductInfo, UserInfo, Category } from "../../../models/types";
import { dbProductInfo, dbUserInfo } from "../../../models/database";

export const productRef = ref(database, 'products');

function toProductInfo(dbProduct: dbProductInfo): ProductInfo {
    return {
        id: dbProduct.id,
        name: dbProduct.name,
        price: parseFloat(dbProduct.price),
        description: dbProduct.description,
        images: dbProduct.pictures,
        tags: dbProduct.tags != null ? Object.keys(dbProduct.tags) : [],
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
    This method finds and returns a product in the database by its ID.
 */
export async function readOneProductInfo(productID: string): Promise<ProductInfo> {
    const snapshot = await get(ref(database, 'products/' + productID));
    const dbProduct: dbProductInfo = { ...{ id: snapshot.key ?? "no key" }, ...snapshot.val() }; // TODO: handle no key
    return toProductInfo(dbProduct);
}

/*
    This method returns all the products' data in the database.
 */
export async function readAllProductsInfo(): Promise<ProductInfo[]> {
    const products: ProductInfo[] = [];
    const snapshot = await get(productRef);
    snapshot.forEach((child: DataSnapshot) => {
        const dbProduct: dbProductInfo = { ...{ id: child.key ?? "no key" }, ...child.val() }; // TODO: handle no key
        products.push(toProductInfo(dbProduct));
    });
    return products;
}

/*
    This method returns products' data from one category in the database.
 */
export async function readProductsInfoByCategory(category: string): Promise<ProductInfo[]> {
    const products: ProductInfo[] = [];
    const q = query(productRef, orderByChild('category'), equalTo(category));
    const snapshot = await get(q);
    snapshot.forEach((child: DataSnapshot) => {
        const dbProduct: dbProductInfo = { ...{ id: child.key ?? "no key" }, ...child.val() }; // TODO: handle no key
        products.push(toProductInfo(dbProduct));
    })
    return products;
}

/*
    This method returns products' data from one subcategory in the database.
 */
export async function readProductsInfoBySubcategory(subcategory: string): Promise<ProductInfo[]> {
    const products: ProductInfo[] = [];
    const q = query(productRef, orderByChild('sub-category'), equalTo(subcategory));
    const snapshot = await get(q);
    snapshot.forEach((child: DataSnapshot) => {
        const dbProduct: dbProductInfo = { ...{ id: child.key ?? "no key" }, ...child.val() }; // TODO: handle no key
        products.push(toProductInfo(dbProduct));
    })
    return products;
}

/*
    This method finds and returns a product in the database by its ID.
 */
export async function readUserInfo(userID: string): Promise<UserInfo> {
    const snapshot = await get(ref(database, 'users/' + userID));
    const dbUser: dbUserInfo = snapshot.val();
    return dbUser !== null ? toUserInfo(dbUser) : {} as UserInfo;
}

/*
    This method finds and returns a product in the database by its ID.
 */
export async function readCategories(setter: React.Dispatch<React.SetStateAction<Category[]>>): Promise<Unsubscribe> {
    const unsubscriber: Unsubscribe = onValue(ref(database, 'categories'), (snapshot) => {
        const categories: Category[] = [];
        snapshot.forEach((child: DataSnapshot) => {
            categories.push({
                title: child.key ?? "", // handle no key
                subcategories: Object.keys(child.val()),
            } as Category);
        });
        setter(categories.sort());
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