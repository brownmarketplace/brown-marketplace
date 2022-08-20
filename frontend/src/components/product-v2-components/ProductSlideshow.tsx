import * as React from "react";
import { Box } from "@mui/material";

type ProductSlideShowProps = {
    images: string[],
}

export default function ProductSlideshow(props: ProductSlideShowProps) {
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
            src={props.images.length > 0 ? props.images[0] : "placeholder"}
        />
    );
};

ProductSlideshow.defaultProps = {
    images: ["https://d248k8q1c80cf8.cloudfront.net/WK_Foster_620_Table_0014_16_9_3c445c76f6.jpg"],
};