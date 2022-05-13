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

function SellerCard(props) {
  const [sellerInfo, setSellerInfo] = useState(props.sellerInfo)

  const readOneUserInfo = async () => {
    onValue(ref(database, 'users/' + props.userID), (snapshot) => {
      const userInfo = snapshot.val()
      setSellerInfo(userInfo)
    })
  }

  useEffect(() => {
    readOneUserInfo().catch(console.error)
  }, [props])

  return (
    <Card style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#EEEEEE' }}>
      <Avatar
        src={sellerInfo.profilePic}
        sx={{ width: 90, height: 90 }} />
      <CardContent>
        <Typography variant="h5" color="text.primary">Seller Information</Typography>
        <Typography variant="body1">{sellerInfo.name}</Typography>
        <Typography variant="body1">{sellerInfo.email}</Typography>
      </CardContent>
    </Card>
  )
}

SellerCard.defaultProps = {
  sellerInfo: {
    profilePic: null,
    name: "Unknown",
    email: "Unknown",
  },
}

export default SellerCard