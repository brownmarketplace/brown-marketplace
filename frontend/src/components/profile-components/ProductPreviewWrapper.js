import React, { useState, useEffect } from 'react'
import ProductPreview from '../../components/category-components/ProductPreview.js'
import database from "../../backend/Database/DBInstance"
import { ref, onValue }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

import "./wishlist.css"

function ProductPreviewWrapper(props) {
    let productId = props.productId;

    const [productInfo, setProductInfo] = useState({
        id: productId,
        name: '',
        description: '',
        price: '',
        pictures: ''
    })

    useEffect(() => {
        const readOneProductInfo = async (productID) => {
            onValue(ref(database, 'products/' + productID), (snapshot) => {
                const product = snapshot.val()
                if (product != null) {
                    let NewInputValue = {}

                    if (product.name) {
                        NewInputValue = {...productInfo, ["name"]: product.name}
                    }

                    if (product.price) {
                        NewInputValue = {...NewInputValue, ["price"]: product.price}
                    }

                    if (product.description) {
                        NewInputValue = {...NewInputValue, ["description"]: product.description}
                    }

                    if (product.pictures) {
                        NewInputValue = {...NewInputValue, ["pictures"]: product.pictures}
                    }

                    setProductInfo(NewInputValue);
                }
            })
        }

        readOneProductInfo(productId).catch(console.error)
    }, [])

    return (
        <div className="wishlist-items">
            <ProductPreview productInfo={productInfo} />
        </div>        
    )
}

export default ProductPreviewWrapper