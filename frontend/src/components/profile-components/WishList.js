import React from 'react'
// import ProductPreview from './ProductPreview'
import "./wishlist.css"

function WishList(props) {
    const wishList = ['something', 'something2', 'something3', 'something4']
    const TempProductPreview = (props) => {
        return (
            <div className="wishlist-items">
            </div>
        )
    }

    return (
        <div className="wish-list-container">
            <div className="wish-list-header">
                WishList
            </div>
            <div style={{ display: "flex" }}>
                { wishList.map((elt) => {
                    return (
                        <TempProductPreview product={elt}/>
                    )
                }) }
            </div>
        </div>
    )
}

export default WishList