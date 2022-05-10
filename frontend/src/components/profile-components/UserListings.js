import React from 'react'
import SoldButton from './SoldButton'
import './user-listings.css'

function UserListings(props) {
  const listings = [45623510, 22455895] // ids

  const UserListingItem = (props) => {
    return (
      <div className="user-listing-item">
        {props.prodId}
        <SoldButton />
      </div>
    )
  }

  return (
    <div className="user-listing">
        <div className="user-listing-header">
          Listings
        </div>
          
        { listings.map((id) => {
          return (<UserListingItem prodId={id}/>)
        }) }
    </div>
  )
}

export default UserListings