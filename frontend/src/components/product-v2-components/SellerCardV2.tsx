import * as React from "react";
import { Box, Stack, Typography, Avatar, IconButton } from '@mui/material';

// types
import { UserInfo } from "../../models/types";

type SellerCardV2Props = {
  sellerInfo: UserInfo,
  postDate: string,
}

export default function SellerCardV2(props: SellerCardV2Props) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" spacing={1}>
        <Avatar
          src={props.sellerInfo?.profilePicture}
          sx={{ width: "60px", height: "60px" }}
          alt={props.sellerInfo?.name} />
        <Stack>
          <Typography variant="h6">{props.sellerInfo?.name}</Typography>
          <Typography variant="body1">Posted on {props.postDate}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}