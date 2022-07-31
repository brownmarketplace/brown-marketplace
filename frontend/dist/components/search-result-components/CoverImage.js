import * as React from "react";
import Box from "@mui/material/Box";
export default function CoverImage(props) {
    return (React.createElement(Box, { component: "img", sx: {
            width: "100%",
            aspectRatio: "10/3",
            objectFit: "cover",
            borderRadius: "10px",
        }, alt: "cover image", src: props.image }));
}
;
CoverImage.defaultProps = {
    image: "https://d248k8q1c80cf8.cloudfront.net/WK_Foster_620_Table_0014_16_9_3c445c76f6.jpg"
};
//# sourceMappingURL=CoverImage.js.map