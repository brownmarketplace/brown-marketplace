import { Button, ButtonBase, Chip, Typography } from "@mui/material";
import React from "react";

import { motion } from "framer-motion";

export default function TagV2(props) {
    return (
        <Chip
            label={props.title}
            variant="outlined"
            clickable
            onClick={props.onClick}
            size="small"
            // disableRipple
            sx={{
                margin: "2px",
                textTransform: "none",
                color: "inherit",
                borderColor: props.selected ? "inherit" : "action.selected",
                backgroundColor: props.selected ? "action.selected" : "inherit",
            }}
            component={motion.div}
            whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
            }} />
        // <Button variant="outlined" disableRipple
        //     onClick={event => {
        //         event.stopPropagation();
        //         event.preventDefault();
        //         props.onClick();
        //     }}
        //     sx={{
        //         borderRadius: "1000px",
        //         paddingTop: 0,
        //         paddingBottom: 0,
        //         paddingLeft: "5px",
        //         paddingRight: "5px",
        //         margin: "2px",
        //         textTransform: "none",
        //         color: "inherit",
        //         borderColor: props.selected ? "inherit" : "action.selected",
        //         backgroundColor: props.selected ? "action.selected" : "inherit",
        //     }}
        // component={motion.div}
        // whileHover={{
        //     scale: 1.1,
        //     transition: { duration: 0.2 },
        // }}>
        // <Typography variant={props.variant}>{props.title}</Typography>
        // </Button>
    );
};

TagV2.defaultProps = {
    selected: false,
    title: "Tag Title",
    onClick: () => { },
};