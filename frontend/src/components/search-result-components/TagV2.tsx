import * as React from "react";
import Chip from "@mui/material/Chip";

import { motion } from "framer-motion";

type TagV2Props = {
    selected: boolean,
    title: string,
    preview: boolean,
    onClick: () => void,
}

export default function TagV2(props: TagV2Props) {
    return (
        <Chip
            label={props.title}
            variant="outlined"
            clickable
            onClick={props.onClick}
            size={props.preview ? "small" : "medium"}
            sx={{
                margin: "2px",
                textTransform: "none",
                color: "inherit",
                borderColor: props.selected ? "inherit" : "action.selected",
                backgroundColor: props.selected ? "action.selected" : "inherit",
            }}
        // component={motion.div}
        // whileHover={{
        //     scale: 1.1,
        //     transition: { duration: 0.2 },
        // }}
        />
    );
};

TagV2.defaultProps = {
    selected: false,
    title: "Tag Title",
    preview: false,
    onClick: () => { },
};