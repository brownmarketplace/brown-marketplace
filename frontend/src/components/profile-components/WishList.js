import React, { useState, useEffect } from 'react'
import ProductPreviewWrapper from './ProductPreviewWrapper';
import Grid from '@mui/material/Grid'
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
        <div>
            <div className="wish-list-header">
                Liked Items
            </div>
            <div className="wish-list-item-spacing"> 
                <Grid container spacing={4}>
                    {likedItemIds.map((id) =>
                        <Grid item xs={6} md={4} lg={3} display="flex">
                            <ProductPreviewWrapper productId={id} />
                        </Grid>)}
                </Grid>
            </div>
        </div>
    )
}


export default WishList