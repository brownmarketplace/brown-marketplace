import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import ProductPreview from '../../components/category-components/ProductPreview.js'
import database from "../../backend/Database/DBInstance"
import { ref, onValue }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";


import "./wishlist.css"

function WishList(props) {
    const [likedList, setLikedList] = useState([])

    const TempProductPreview = (props) => {
        let productId = props.productId.substring(1);
        productId = productId.substring(0, productId.length - 1);
        return (
            <div className="wishlist-items">
                <Link to={`/product/${productId}`} className="liked-id-link">
                    {productId}
                </Link>
            </div>

            // Further work could include showing the product card instead of just the id:
            // <ProductPreview id={} title={} price={} description={} pictures={}/>
        )
    }

    const readOneUserInfo = (id) => {
        onValue(ref(database, 'users/' + id), (snapshot) => {
        const userInfo = snapshot.val()
        if (userInfo != null) {
            if (userInfo["liked-items"] != null) {
                setLikedList(userInfo["liked-items"])
            }
        }
        })
    }

    useEffect(() => {
        readOneUserInfo(props.userID);  
    }, [])

    const likedItemIds = []
    for (const [itemId, _] of Object.entries(likedList)) {
        likedItemIds.push(itemId);
    }
    
    return (
        <div className="wish-list-container">
            <div className="wish-list-header">
                Liked Items
            </div>
            <div style={{ display: "flex" }}>
                { likedItemIds.map((elt) => {
                    return (
                        <TempProductPreview productId={elt}/>
                    )
                }) }
            </div>
        </div>
    )
}

export default WishList