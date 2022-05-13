import React, { useState, useEffect } from 'react'
import ProductPreviewWrapper from './ProductPreviewWrapper';
import Storefronts from '../category-components/Storefronts'
import database from "../../backend/Database/DBInstance"
import { ref, onValue }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

import "./wishlist.css"

function WishList(props) {
    const [likedList, setLikedList] = useState([])

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
            <div style={{ display: "flex", marginTop: "20px" }}>
                { likedItemIds.map((id) => {
                    return (
                        <ProductPreviewWrapper productId={id}/>
                    )
                }) }
                {/* <Storefronts products={}/> */}
            </div>
        </div>
    )
}

export default WishList