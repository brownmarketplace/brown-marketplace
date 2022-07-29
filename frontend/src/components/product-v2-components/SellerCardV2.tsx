import * as React from "react";

// mui
import { Box, Stack, Typography, Avatar } from '@mui/material';

type SellerInfo = {
  profilePicture: string,
  name: string,
  email: string,
}

type SellerCardV2Props = {
  sellerInfo: SellerInfo,
  postDate: string,
}

export default function SellerCardV2(props: SellerCardV2Props) {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Avatar
          src={props.sellerInfo.profilePicture}
          sx={{ width: "60px", height: "60px" }}
          alt="Remy Sharp" />
        <Stack>
          <Typography variant="h6">{props.sellerInfo.name}</Typography>
          <Typography variant="body1">Posted on {props.postDate}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

SellerCardV2.defaultProps = {
  sellerInfo: {
    profilePic: "https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg",
    name: "Josiah Carberry",
    email: "josiah_carberry@brown.edu",
  },
  postDate: "July 2, 2022",
};