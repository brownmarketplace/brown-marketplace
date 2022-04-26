import React from 'react'
import ProductPreview from './ProductPreview'

function WishList(props) {
    const wishList = []

    return (
        <div className="wish-list">
            <div>
            WishList
            </div>
            <div>
                <ul>
                    {wishList.map((e) => <li><ProductPreview/></li>)}
                </ul>
            </div>
        </div>
    )
}

export default WishList