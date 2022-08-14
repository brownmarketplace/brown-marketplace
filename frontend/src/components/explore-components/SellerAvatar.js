import React, { useState, useEffect } from 'react'

// mui
import { Card, CardContent, CardMedia } from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'

// database
import { ref, onValue }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js"
import database from '../../backend/Database/DBInstance'

function SellerAvatar(props) {
  const [sellerInfo, setSellerInfo] = useState(props.sellerInfo)

  const readOneUserInfo = async () => {
    onValue(ref(database, 'users/' + props.userID), (snapshot) => {
      const userInfo = snapshot.val()
      setSellerInfo(userInfo)
    })
  }

  useEffect(() => {
    if ( props.userID == null)  {
      return
    }
    readOneUserInfo().catch(console.error)
  }, [props])

  return (
    <Avatar
    // get the image from the product's seller pfp
    src={sellerInfo.profilePic}
    // src={"https://lh3.googleusercontent.com/a/AATXAJyvgt7jlsYmgwJF9xaEIj4_ho9cfFLVZE8dc4A3=s96-c"}
    sx={{ width: 72, height: 72, marginLeft: 1, marginRight: 2}} 
    />
  )
}

SellerAvatar.defaultProps = {
  sellerInfo: {
    profilePic: null,
    name: "Unknown",
    email: "Unknown",
  },
}

export default SellerAvatar