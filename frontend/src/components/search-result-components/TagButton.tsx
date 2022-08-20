import * as React from "react";
import { Box, IconButton, Typography } from "@mui/material";

import { motion } from "framer-motion";

type TagButtonProps = {
    title: string,
    active: boolean,
    onClick: () => void,
}

export default function TagButton(props: TagButtonProps) {
    const [active, setActive] = React.useState<boolean>(props.active);

    const Toggle = () => {
        setActive(!active);
        props.onClick();
    }

    React.useEffect(() => {
        setActive(props.active);
    }, [props.active])

    return (
        <Box sx={{ marginLeft: "10px" }}>
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
    onClick: () => { },
}