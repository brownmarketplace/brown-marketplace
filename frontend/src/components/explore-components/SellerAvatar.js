import React, { useState, useEffect } from 'react'

// mui
import Avatar from '@mui/material/Avatar'

// database imports
import { ref, onValue }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js"
import database from '../../backend/Database/DBInstance'

/**
 * Component that renders the seller's Avatar on Product Cards.
 * 
 * It receives the seller of the product's ID, retrieves the profile picture
 * of the seller from the database, and then renders.
 */
function SellerAvatar(props) {
  const [sellerInfo, setSellerInfo] = useState(props.userID)

  /**
   * Function that retrieves the seller's information
   * from the database.
   */
  const readOneUserInfo = async () => {
    onValue(ref(database, 'users/' + props.userID), (snapshot) => {
      const userInfo = snapshot.val()
      setSellerInfo(userInfo)
    })
  }

  /**
   * On render and change of userID,
   * Calls readOneUserInfo to 
   * retrieve seller information.
   */
  useEffect(() => {
    if (props.userID == null)  {
      return
    }
    readOneUserInfo().catch(console.error)
  }, [props])

  return (
    <Avatar
    // get the image from the product's seller pfp
    src={sellerInfo.profilePic}
    sx={{ width: 72, height: 72, marginLeft: 1, marginRight: 2}} 
    />
  )
}

// Default props
SellerAvatar.defaultProps = {
  userID: ''
}

export default SellerAvatar