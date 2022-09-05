import * as React from "react";
import { Box, Stack, Typography, Avatar, Skeleton } from '@mui/material';

// types
import { UserInfo } from "../../models/types";

// database
import { readUserInfo } from "../../backend/Database/ProductDB/readDatabaseV2";

type SellerCardV2Props = {
  userID: string,
  postDate: string,
}

export default function SellerCardV2(props: SellerCardV2Props) {
  const [sellerInfo, setSellerInfo] = React.useState<UserInfo>({} as UserInfo);

  React.useEffect(() => {
    async function fetchSellerInfo() {
      const response = await readUserInfo(props.userID);
      setSellerInfo(response);
    }

    fetchSellerInfo();
  }, [props.userID]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={1}>
        <Avatar
          src={sellerInfo?.profilePicture}
          sx={{ width: "60px", height: "60px" }}
          alt={sellerInfo?.name} />
        <Stack>
          <Typography variant="h6">{sellerInfo?.name}</Typography>
          <Typography variant="body1">Posted on {props.postDate}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

// SellerCardV2.defaultProps = {
//   sellerInfo: {
//     profilePic: "https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg",
//     name: "Josiah Carberry",
//     email: "josiah_carberry@brown.edu",
//   },
//   postDate: "July 2, 2022",
// };