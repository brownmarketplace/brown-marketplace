import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SoldButton from './SoldButton'
import database from "../../backend/Database/DBInstance"
import { getDatabase, ref, get, onValue, query, orderByChild, orderByKey, equalTo, child }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

import './user-listings.css'

function UserListings(props) {
  // const listings = ['p45623510', 'p22455895'] // ids
  // const [sold, setSold] = useState(false);

  // useEffect(() => {
  //   async function readOneProductInfo(productID) {
  //     onValue(ref(database, 'products/' + productID), (snapshot) => {
  //       const product = snapshot.val()
  //       if (product != null) {
  //         setSold(product.sold);
  //       }
  //     })
  //   }
  // }, []);
  const [listingInfo, setListingInfo] = useState([])

  var readOneUserInfo = (id) => {
    onValue(ref(database, 'users/' + id), (snapshot) => {
      const userInfo = snapshot.val()
      if (userInfo != null) {
        if (userInfo.listings != null) {
          console.log("userInfo.listings not null")
          console.log("userInfo.listings:")
          console.log(userInfo.listings)
          
          setListingInfo(userInfo.listings)
        } else {
          console.log("userInfo.listings is null :'(")
        }
      }
    })
}

  // const readAllUserInfo = () => {
  //   onValue(ref(database, 'users'), (snapshot) => {
  //       snapshot.forEach(function(childSnapshot) {
  //         const userInfo = childSnapshot.val()
  //         if (userInfo != null && userInfo.listings != null) {
  //           console.log("userInfo.listings:")
  //           console.log(userInfo.listings)
            
  //           setListingInfo(userInfo.listings)
  //         }
  //       })
  //   })
  // }

  useEffect(() => {
    readOneUserInfo(props.userId);    
  }, [])

  const UserListingItem = (props) => {
    return (
      <div className="user-listing-item">
        {props.productId}
        <SoldButton productId={props.productId}/>
      </div>
    )
    // if (props.isSold) {
    //   return (
    //     <div className="user-listing-item">
    //       {props.productId}
    //       <SoldButton productId={props.productId}/>
    //     </div>
    //   )
    // } else {
    //   return (
    //     <div className="user-listing-item-sold">
    //       Sold: {props.productId}
    //     </div> 
    //   )
    // }   
  }

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
        {console.log(listingInfo)}
        { 
          listingInfo ? (
            <div>
              <MyComponent listings={listingInfo}/>
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
  console.log("inside MyComponent...")
  console.log("props.listings is:")
  console.log(props.listings)

  // const listingArr = JSON.parse(props.listings)
  // console.log("listingArr")
  // console.log(listingArr)
  return (
    "Hi"
    // listingArr.map((id) => {
    //   <UserListingItem productId={id} />
    // })
  )
}

export default UserListings