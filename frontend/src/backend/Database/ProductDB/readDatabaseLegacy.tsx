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
        This method returns products' data from one category in the database.
     */
    export async function readProductsInfoByCategory(category: string, setter: React.Dispatch<React.SetStateAction<ProductInfo[]>>): Promise<void> {
        const q = query(productRef, orderByChild('category'), equalTo(category));
        get(q).then((snapshot) => {
            let products: ProductInfo[] = [];
            snapshot.forEach((child: DataSnapshot) => {
                console.log(child.val());
                const dbProduct: dbProductInfo = { ...{ id: child.key ?? "no key" }, ...child.val() }; // TODO: handle no key
                products.push(toProductInfo(dbProduct));
            })
            console.log(products);
            setter(products);
        });
    }
    
    /*
        This method returns products' data from one subcategory in the database.
     */
    export async function readProductsInfoBySubcategory(subcategory: string, setter: React.Dispatch<React.SetStateAction<ProductInfo[]>>): Promise<void> {
        const q = query(productRef, orderByChild('sub-category'), equalTo(subcategory));
        get(q).then((snapshot) => {
            let products: ProductInfo[] = [];
            snapshot.forEach((child: DataSnapshot) => {
                const dbProduct: dbProductInfo = { ...{ id: child.key ?? "no key" }, ...child.val() }; // TODO: handle no key
                products.push(toProductInfo(dbProduct));
            })
            console.log(products);
            setter(products);
        });
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