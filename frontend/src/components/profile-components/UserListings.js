import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserListingItem from './UserListingItem'
import database from "../../backend/Database/DBInstance"
import { ref, onValue }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

import './user-listings.css'

function UserListings(props) {

  const [listingIdInfo, setListingIdInfo] = useState([])

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

  useEffect(() => {
    readOneUserInfo(props.userId);  
  }, [])

  const AddListingButton = () => {
    return (
      <div className="user-listing-item">
        <Link to="/sell" className="add-listing-link">
          + Add new listing
        </Link>
      </div>
    )
  }

  const UserListingsMapper = (props) => {

    const listingIds = []
    for (const [_, prodId] of Object.entries(props.listings)) {
      listingIds.push(prodId);
    }
    
    return (
      <div>
        {listingIds.map((id) => 
          <UserListingItem prodId={id}/>
        )}
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
              <UserListingsMapper listings={listingIdInfo} />
            </div>
          ) : (
            <div></div>
          )
        }
        
        <AddListingButton />
    </div>
  )
}

export default UserListings