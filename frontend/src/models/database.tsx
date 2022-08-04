export type dbProductInfo = {
    category: string,
    date: string, // TODO: replace with Typescript Date
    description: string,
    id: string,
    name: string,
    numLiked: number,
    pictures: string[],
    price: string, // TODO: replace with number
    seller: string,
    sold: boolean,
    'sub-category': string,
    tags: { [key: string]: string },
}

export type dbUserInfo = {
  profilePic: string,
  name: string,
  email: string,
}