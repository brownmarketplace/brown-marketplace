import * as React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
export default function TagButton(props) {
    var _a = React.useState(props.active), active = _a[0], setActive = _a[1];
    var Toggle = function () {
        setActive(!active);
        props.onClick();
    };
    React.useEffect(function () {
        setActive(props.active);
    }, [props.active]);
    return (React.createElement(Box, { sx: { marginLeft: "10px" } },
        React.createElement(IconButton, { disableRipple: true, color: "inherit", sx: {
                padding: 0,
                borderRadius: "1000px",
            }, component: motion.div, whileHover: {
                scale: 1.2,
                originX: 0,
                transition: { duration: 0.2 },
            }, onClick: Toggle },
            React.createElement(Typography, { sx: {
                    textTransform: 'capitalize',
                    fontWeight: active ? 'bold' : 'normal',
                } }, props.title))));
}
TagButton.defaultProps = {
    title: "Tag Name",
    active: false,
    onClick: function () { },
};
//# sourceMappingURL=TagButton.js.map