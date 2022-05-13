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
    <Card style={{ display: 'flex', justifyContent: 'center', padding: 10, backgroundColor: '#EEEEEE' }}>
      {/* <Grid container>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={8}>
        </Grid>
      </Grid> */}

      <Avatar
        alt={sellerInfo.name}
        src={sellerInfo.profilePic}
        sx={{ width: 120, height: 120 }} />
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
    name: "Nim Telson",
    email: "nim_telson@brown.edu",
  },
}

export default SellerCard