import * as React from "react";
// mui
import { Box, Stack, Typography, Avatar } from '@mui/material';
export default function SellerCardV2(props) {
    return (React.createElement(Box, null,
        React.createElement(Stack, { direction: "row", justifyContent: "space-between", spacing: 1 },
            React.createElement(Avatar, { src: props.sellerInfo.profilePicture, sx: { width: "60px", height: "60px" }, alt: "Remy Sharp" }),
            React.createElement(Stack, null,
                React.createElement(Typography, { variant: "h6" }, props.sellerInfo.name),
                React.createElement(Typography, { variant: "body1" },
                    "Posted on ",
                    props.postDate)))));
}
SellerCardV2.defaultProps = {
    sellerInfo: {
        profilePic: "https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg",
        name: "Josiah Carberry",
        email: "josiah_carberry@brown.edu",
    },
    postDate: "July 2, 2022",
};
//# sourceMappingURL=SellerCardV2.js.map