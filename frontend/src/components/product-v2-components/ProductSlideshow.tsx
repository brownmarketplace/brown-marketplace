import * as React from "react";
import { Box, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function ArrowButton(props: { direction: "left" | "right", onClick: () => void }) {
    const isLeft = props.direction === "left";
    const style = {
        ...isLeft ? { left: "10px" } : { right: "10px" },
        ...{ position: "absolute", background: "rgba(255,255,255,0.5)" }
    }

    return (
        <IconButton color="inherit" sx={style} onClick={props.onClick}>
            {isLeft ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
        </IconButton >
    );
}

type ProductSlideShowProps = {
    images: string[],
}

export default function ProductSlideshow(props: ProductSlideShowProps) {
    const placeHolderImage = "https://d248k8q1c80cf8.cloudfront.net/WK_Foster_620_Table_0014_16_9_3c445c76f6.jpg"
    const [[page, direction], setPage] = React.useState<[number, number]>([0, 0]); // scope direction

    const paginate = (newDirection: number) => {
        setPage([(page + newDirection + props.images.length) % props.images.length, newDirection]);
        console.log((page + newDirection + props.images.length) % props.images.length);
    };

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            position: "relative"
        }}>
            <Box
                component="img"
                src={props.images.length > 0 ? props.images[page] : placeHolderImage}
                alt="slideshow"
                // sx={{
                //     width: "100%",
                //     aspectRatio: { md: "4/3" },
                //     objectFit: { md: "contain" },
                //     borderRadius: "10px",
                //     background: "rgba(0,0,0,0.5)",
                // }}
                sx={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.5)",
                }}
            />
            <ArrowButton direction="left" onClick={() => paginate(-1)} />
            <ArrowButton direction="right" onClick={() => paginate(1)} />
        </Box>
    );
};

ProductSlideshow.defaultProps = {
    images: ["https://d248k8q1c80cf8.cloudfront.net/WK_Foster_620_Table_0014_16_9_3c445c76f6.jpg"],
};