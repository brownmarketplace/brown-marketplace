import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SoldButton from './SoldButton'
import Tooltip from '@mui/material/Tooltip';
import database from "../../backend/Database/DBInstance"
import { ref, onValue }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

function UserListingItem(props) {

    const [sold, setSold] = useState(false);
    const [name, setName] = useState("")

     useEffect(() => {
        const readOneProductInfo = async (productID) => {
            onValue(ref(database, 'products/' + productID), (snapshot) => {
                const product = snapshot.val()
                if (product != null) {
                    if (product.sold != null) {
                        var isTrue = (product.sold === 'true');
                        setSold(isTrue);
                    }

                    if (product.name != null) {
                        setName(product.name);
                    }

                }
            })
        }

        readOneProductInfo(props.prodId).catch(console.error)
      }, [])

    return (
        <div className="user-listing-item">
            <Tooltip title={props.prodId}>
                <Link to={`/product/${props.prodId}`} className="add-listing-link">
                    {
                        name ? (
                            name
                        ):(
                            "Loading..."
                        )
                    }
                </Link>
            </Tooltip>            
            <SoldButton productId={props.prodId} isSold={sold}/>
        </div>
  )
}

export default UserListingItem