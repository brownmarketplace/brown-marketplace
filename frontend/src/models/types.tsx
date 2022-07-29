export type ProductInfo = {
    id: number,
    name: string,
    price: number,
    description: string,
    pictures: string[],
    tags: string[],
    category: string,
    subcategory: string,
};

export type SellerInfo = {
    profilePicture: string,
    name: string,
    email: string,
    postDate: string,
};