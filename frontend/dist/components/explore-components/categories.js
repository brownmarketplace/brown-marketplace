// MUI Icons
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ChairIcon from '@mui/icons-material/Chair';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DiamondIcon from '@mui/icons-material/Diamond';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PendingIcon from '@mui/icons-material/Pending';
// store all categories and subcategories
var categories = [
    {
        name: "Room Decor",
        icon: React.createElement(LightbulbIcon, null),
        path: "/category/Room Decor",
        subcats: [
            {
                name: "Plushies",
                icon: "",
                path: "/category/Room Decor/Plushies"
            },
            {
                name: "Plants",
                icon: "",
                path: "/category/Room Decor/Plants"
            },
            {
                name: "Lights",
                icon: "",
                path: "/category/Room Decor/Lights"
            },
            {
                name: "Posters",
                icon: "",
                path: "/category/Room Decor/Posters"
            },
            {
                name: "Tapestries",
                icon: "",
                path: "/category/Room Decor/Tapestries"
            },
            {
                name: "Other room decor",
                icon: "",
                path: "/category/Room Decor/Other room decor"
            },
        ]
    },
    {
        name: "Clothing",
        icon: React.createElement(LocalOfferIcon, null),
        path: "/category/Clothing",
        subcats: [
            {
                name: "Tops",
                icon: "",
                path: "/category/Clothing/Tops"
            },
            {
                name: "Pants",
                icon: "",
                path: "/category/Clothing/Pants"
            },
            {
                name: "Dresses",
                icon: "",
                path: "/category/Clothing/Dresses"
            },
            {
                name: "Shoes",
                icon: "",
                path: "/category/Clothing/Shoes"
            },
            {
                name: "Coats and Jackets",
                icon: "",
                path: "/category/Clothing/Coats and Jackets"
            },
            {
                name: "Other Clothing",
                icon: "",
                path: "/category/Clothing/Other Clothing"
            },
        ]
    },
    {
        name: "Furniture",
        icon: React.createElement(ChairIcon, null),
        path: "/category/Furniture",
        subcats: [
            {
                name: "Chairs",
                icon: "",
                path: "/category/Furniture/Chairs"
            },
            {
                name: "Couches",
                icon: "",
                path: "/category/Furniture/Couches"
            },
            {
                name: "Mattresses",
                icon: "",
                path: "/category/Furniture/Mattresses"
            },
            {
                name: "Pillows",
                icon: "",
                path: "/category/Furniture/Pillows"
            },
            {
                name: "Other furniture",
                icon: "",
                path: "/category/Furniture/Other furniture"
            },
        ]
    },
    {
        name: "Accessories",
        icon: React.createElement(DiamondIcon, null),
        path: "/category/Accessories",
        subcats: [
            {
                name: "Necklace",
                icon: "",
                path: "/category/Accessories/Necklace"
            },
            {
                name: "Bracelet",
                icon: "",
                path: "/category/Accessories/Bracelet"
            },
            {
                name: "Earrings",
                icon: "",
                path: "/category/Accessories/Earrings"
            },
            {
                name: "Hair clips",
                icon: "",
                path: "/category/Accessories/Hair clips"
            },
            {
                name: "Other accessories",
                icon: "",
                path: "/category/Accessories/Other accessories"
            },
        ]
    },
    {
        name: "Books",
        icon: React.createElement(MenuBookIcon, null),
        path: "/category/Books",
        subcats: [
            {
                name: "Textbooks",
                icon: "",
                path: "/category/Books/Textbooks"
            },
            {
                name: "Fiction",
                icon: "",
                path: "/category/Books/Fiction"
            },
            {
                name: "Nonfiction",
                icon: "",
                path: "/category/Books/Nonfiction"
            },
            {
                name: "Poetry",
                icon: "",
                path: "/category/Books/Poetry"
            },
            {
                name: "Other books",
                icon: "",
                path: "/category/Books/Other books"
            },
        ]
    },
    {
        name: "Electronics & related",
        icon: React.createElement(PhoneIphoneIcon, null),
        path: "/category/Electronics & related",
        subcats: [
            {
                name: "Speakers",
                icon: "",
                path: "/category/Electronics & related/Speakers"
            },
            {
                name: "Phones",
                icon: "",
                path: "/category/Electronics & related/Phones"
            },
            {
                name: "Devices",
                icon: "",
                path: "/category/Electronics & related/Devices"
            },
            {
                name: "Other electronics and related",
                icon: "",
                path: "/category/Electronics & related/Other electronics and related"
            },
        ]
    },
    {
        name: "Other",
        icon: React.createElement(PendingIcon, null),
        path: "/category/Other",
        subcats: [
            {
                name: "Miscellaneous",
                icon: "",
                path: "/category/Other/Miscellaneous"
            },
        ]
    }
];
export default categories;
//# sourceMappingURL=categories.js.map