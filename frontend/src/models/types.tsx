export type ProductInfo = {
    id: string,
    name: string,
    price: number,
    description: string,
    images: string[],
    tags: string[],
    category: string,
    subcategory: string,
    seller: string,
    postDate: string,
};

export type UserInfo = {
    profilePicture: string,
    name: string,
    email: string,
};