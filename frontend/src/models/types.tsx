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

export type Category = {
    title: string,
    subcategories: string[],
};

export type Path = {
    title: string,
    href: string | null,
}[];