import React from "react";
import { Box, Button, Link, Menu, MenuItem, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function CategoryDropdown(props) {
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    function handleClick(event) {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }
    function handleClose() {
        setAnchorEl(null);
    }
    var buttonId = "simple-menu";
    return (React.createElement(Box, { sx: { flexGrow: 1 } },
        React.createElement(Button
        // aria-owns={buttonId}
        , { "aria-haspopup": "true", onClick: handleClick, 
            // onMouseOver={handleClick}
            disableRipple: true, color: "inherit", sx: {
                borderRadius: "1000px",
            } },
            React.createElement(Typography, { sx: { textTransform: 'capitalize' } }, props.title),
            React.createElement(KeyboardArrowDownIcon, null)),
        React.createElement(Menu
        // id={buttonId}
        , { 
            // id={buttonId}
            anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleClose }, props.items.map(function (item, idx) {
            return React.createElement(Link, { href: item.href, key: idx, underline: "hover", color: "inherit" },
                React.createElement(MenuItem, { disableRipple: true },
                    React.createElement(Typography, { textAlign: "center" }, item.title)));
        }))));
}
CategoryDropdown.defaultProps = {
    title: "Pages",
    items: [
        { title: "Page 1", href: "/page_1" },
        { title: "Page 2", href: "/page_2" },
        { title: "Page 3", href: "/page_3" },
    ],
};
//# sourceMappingURL=CategoryDropdown.js.map