import * as React from "react";
import { Box, Stack, Typography, Avatar } from '@mui/material';

// types
import { UserInfo } from "../../models/types";

// database
import { readUserInfo } from "../../backend/Database/ProductDB/readDatabaseV2";

type SellerCardV2Props = {
  userID: string,
  postDate: string,
  sellerInfo: UserInfo, // TODO: remove mock data
}

export default function SellerCardV2(props: SellerCardV2Props) {
  const [sellerInfo, setSellerInfo] = React.useState<UserInfo>(props.sellerInfo); // TODO: remove mock data

  React.useEffect(() => {
    readUserInfo(props.userID, setSellerInfo); // TODO: handle undefined
  }, [props.userID]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Avatar
          src={sellerInfo.profilePicture}
          sx={{ width: "60px", height: "60px" }}
          alt="Remy Sharp" />
        <Stack>
          <Typography variant="h6">{sellerInfo.name}</Typography>
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