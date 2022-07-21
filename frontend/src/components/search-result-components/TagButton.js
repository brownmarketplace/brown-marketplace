import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

export default function TagButton(props) {
    const [active, setActive] = useState(props.active);

    const Toggle = () => {
        setActive(!active);
        props.onClick();
    }

    useEffect(() => {
        setActive(props.active);
    }, [props.active])

    return (
        <Box sx={props.sx}>
            <IconButton disableRipple
                color="inherit"
                sx={{
                    padding: 0,
                    borderRadius: "1000px",
                }}
                component={motion.div}
                whileHover={{
                    scale: 1.2,
                    originX: 0,
                    transition: { duration: 0.2 },
                }}
                onClick={Toggle}>
                <Typography
                    sx={{
                        textTransform: 'capitalize',
                        fontWeight: active ? 'bold' : 'normal',
                    }}>
                    {props.title}
                </Typography>
            </IconButton>
        </Box>
    );
}

TagButton.defaultProps = {
    title: "Tag Name",
    active: false,
}