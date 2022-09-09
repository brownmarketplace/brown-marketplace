import React from 'react';
import ChooseSubInner from './ChooseSubInner';

import './add-details.css'

const roomDecorSub = [
    "Plushies", "Plants", "Lights", "Posters", "Tapestries",
    "Other room decor"
]

const furnitureSub = [
    "Chairs", "Couches", "Mattresses", 
    "Pillows", "Other furniture"
]

const clothingSub = [
    "Tops", "Pants", "Dresses", "Shoes",
    "Coats and jackets", "Other clothing"
]

const accessoriesSub = [
    "Necklace", "Bracelet", "Earrings",
    "Hair clips", "Other accessories"
]

const booksSub = [
    "Textbooks", "Fiction", "Nonfiction", 
    "Poetry", "Other books"
]

const electronicsSub = [
    "Speakers", "Phones", "Devices", 
    "Other electronics and related"
]

const otherSub = [
    "Miscellaneous"
]

function ChooseSub({ productCat, productSubcategory, handleInputChange }) {
    
    const getComponent = () => {
        if (productCat === "Room Decor") {
            return <ChooseSubInner 
                subs={roomDecorSub} 
                productSubcategory={productSubcategory} 
                handleInputChange={handleInputChange} 
            />;
        }
        else if (productCat === "Furniture") {
            return <ChooseSubInner 
                subs={furnitureSub} 
                productSubcategory={productSubcategory} 
                handleInputChange={handleInputChange} 
            />;
        }
        else if (productCat === "Clothing") {
            return <ChooseSubInner 
                subs={clothingSub} 
                productSubcategory={productSubcategory} 
                handleInputChange={handleInputChange} 
            />;
        }
        else if (productCat === "Accessories") {
            return <ChooseSubInner 
                subs={accessoriesSub} 
                productSubcategory={productSubcategory} 
                handleInputChange={handleInputChange} 
            />;
        }
        else if (productCat === "Books") {
            return <ChooseSubInner 
                subs={booksSub} 
                productSubcategory={productSubcategory} 
                handleInputChange={handleInputChange} 
            />;
        }
        else if (productCat === "Electronics and related") {
            return <ChooseSubInner 
                subs={electronicsSub} 
                productSubcategory={productSubcategory} 
                handleInputChange={handleInputChange}
            />;
        }
        else if (productCat === "Other") {
            return <ChooseSubInner 
                subs={otherSub} 
                productSubcategory={productSubcategory} 
                handleInputChange={handleInputChange} 
            />;
        }
    };

    return getComponent();
}

export default ChooseSub