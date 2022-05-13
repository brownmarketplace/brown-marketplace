import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SoldButton from './SoldButton'
import database from "../../backend/Database/DBInstance"
import { ref, onValue }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

import './user-listings.css'

function UserListings(props) {

  const [listingIdInfo, setListingIdInfo] = useState([])
  // const [listingNames, setListingNames] = useState([])
  // const [productId, setProductId] = useState("")

  const readOneUserInfo = (id) => {
    onValue(ref(database, 'users/' + id), (snapshot) => {
      const userInfo = snapshot.val()
      if (userInfo != null) {
        if (userInfo.listings != null) {
          setListingIdInfo(userInfo.listings)
        }
      }
    })
  }

  // const readOneProductInfo = (productID) => {
  //   onValue(ref(database, 'products/' + productID), (snapshot) => {
  //       const productDetail = snapshot.val()
  //       if (productDetail != null) {
  //         const productName = productDetail.name;
  //         if (productName != null) {
  //           console.log("productName:")
  //           console.log(productName)
  //           setListingNames([...listingNames, productName]);
  //         } else {
  //           console.log("oops! productName is null");
  //         }
           
  //       }
  //   })
  // }

  useEffect(() => {
    readOneUserInfo(props.userId);
    // readOneProductInfo(productId);   
  }, [])

  const AddListingButton = (props) => {
    return (
      <div className="user-listing-item">
        <Link to="/sell" className="add-listing-link">
          + Add new listing
        </Link>
      </div>
    )
  }

  return (
    <div className="user-listing">
        <div className="user-listing-header">
          Listings
        </div>
        { 
          listingIdInfo ? (
            <div>
              <MyComponent listings={listingIdInfo} />
              {/* <MyComponent listings={listingIdInfo} names={listingNames}/> */}
            </div>
          ) : (
            <div></div>
          )
        }
        
        <AddListingButton />
    </div>
  )
}

const MyComponent = (props) => {

  const listingIds = []
  // const listingNames = []
  for (const [key, prodId] of Object.entries(props.listings)) {
    listingIds.push(prodId);
  }

  // for (const [key, name] of Object.entries(props.names)) {
  //   listingNames.push(name);
  // }
  
  return (
    <div>
      {listingIds.map((id) => 
        <div className="user-listing-item">
          <Link to={`/product/${id}`} className="add-listing-link">
            {id}
          </Link>
          <SoldButton productId={id}/>
        </div>
      )}
      {/* {listingNames.map((name) => 
        <div className="user-listing-item">
          {name}
        </div>
      )} */}
    </div>
  )
}

export default UserListings