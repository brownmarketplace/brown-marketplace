import React, { useState, useEffect } from 'react'

// mui
import { Box, Button, Card, CardContent, CardMedia, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

export default function SellerCardV2(props) {
  const [sellerInfo, setSellerInfo] = useState(props.sellerInfo)

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Avatar
          src={props.sellerInfo.profilePic}
          sx={{ width: "60px", height: "60px" }}
          alt="Remy Sharp" />
        <Stack>
          <Typography variant="h6">{props.sellerInfo.name}</Typography>
          <Typography variant="body1">Posted on {props.sellerInfo.postDate}</Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

SellerCardV2.defaultProps = {
  sellerInfo: {
    profilePic: "https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg",
    name: "Josiah Carberry",
    postDate: "July 2, 2022",
  },
};