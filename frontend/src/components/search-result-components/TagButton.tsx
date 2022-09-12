import * as React from "react";
import { IconButton, Typography } from "@mui/material";

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
        <IconButton disableRipple
            color="inherit"
            sx={{
                width: "auto",
                textAlign: "left",
                borderRadius: "1000px",
                padding: 0,
                marginRight: "10px",
            }}
            component={motion.button}
            whileHover={{
                scale: 1.2,
                originX: 0,
                transition: { duration: 0.2 },
            }}
            onClick={Toggle}>
            <Typography fontWeight={active ? "fontWeightBold" : ""}>
                {props.title}
            </Typography>
        </IconButton >
    );
}