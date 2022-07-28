import { Box } from "@mui/material";
import React from "react";

export default function ProductSlideshow(props) {
    return (
        <Box
            component="img"
            sx={{
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                borderRadius: "10px",
            }}
            alt="slideshow"
            src={props.image}
        />
    );
};

ProductSlideshow.defaultProps = {
    image: "https://d248k8q1c80cf8.cloudfront.net/WK_Foster_620_Table_0014_16_9_3c445c76f6.jpg",
};