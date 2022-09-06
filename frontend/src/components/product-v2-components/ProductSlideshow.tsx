import * as React from "react";
import { Box, IconButton, Skeleton } from "@mui/material";
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
    const [[page, direction], setPage] = React.useState<[number, number]>([0, 0]); // scope direction

    const paginate = (newDirection: number) => {
        setPage([(page + newDirection + props.images.length) % props.images.length, newDirection]);
    };

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
        }}>
            {props.images?.length > 0
                ? <Box
                    component="img"
                    src={props.images[page]}
                    alt="slideshow"
                    sx={{
                        width: "100%",
                        aspectRatio: "4/3",
                        objectFit: "cover",
                        borderRadius: "10px",
                        background: "rgba(0,0,0,0.5)",
                    }} />
                : <Box
                    sx={{
                        width: "100%",
                        aspectRatio: "4/3",
                    }}><Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: "10px" }} />
                </Box>}
            <ArrowButton direction="left" onClick={() => paginate(-1)} />
            <ArrowButton direction="right" onClick={() => paginate(1)} />
        </Box>
    );
};