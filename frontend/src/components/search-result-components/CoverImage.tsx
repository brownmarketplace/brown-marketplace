import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

type CoverImageProps = {
    image: string,
}

export default function CoverImage(props: CoverImageProps) {
    return (
        <Box>
            {props.image === "loading"
                ? <Box
                    sx={{
                        width: "100%",
                        aspectRatio: "10/3",
                    }}><Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: "10px" }} />
                </Box>
                : <Box
                    component="img"
                    sx={{
                        width: "100%",
                        aspectRatio: "10/3",
                        objectFit: "cover",
                        borderRadius: "10px",
                    }}
                    alt="cover image"
                    src={props.image}
                />
            }
        </Box>
    );
};

CoverImage.defaultProps = {
    image: "https://d248k8q1c80cf8.cloudfront.net/WK_Foster_620_Table_0014_16_9_3c445c76f6.jpg"
};