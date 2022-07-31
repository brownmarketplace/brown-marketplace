import * as React from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
// components
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export default function DropdownMenu(props) {
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var _b = React.useState(props.options[0]), selectedOption = _b[0], setSelectedOption = _b[1];
    function handleClick(event) {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }
    function handleClose() {
        setAnchorEl(null);
    }
    return (React.createElement(Box, null,
        React.createElement(Button, { "aria-owns": "sorting-key-menu", "aria-haspopup": "true", onClick: handleClick, disableRipple: true, color: "inherit", sx: {
                borderRadius: "10px",
                paddingTop: 0,
                paddingBottom: 0,
                textTransform: "none",
                marginLeft: "10px",
            } },
            React.createElement(Typography, { variant: "h6" }, selectedOption),
            React.createElement(KeyboardArrowDownIcon, null)),
        React.createElement(Menu, { id: "sorting-key-menu", anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleClose }, props.options.map(function (option, idx) {
            return React.createElement(MenuItem, { disableRipple: true, onClick: function () { handleClose(); setSelectedOption(option); props.optionSetter(option); } },
                React.createElement(Typography, { textAlign: "center" }, option));
        }))));
}
DropdownMenu.defaultProps = {
    options: ['price', 'option 2', 'option 3'],
    optionSetter: function () { },
};
//# sourceMappingURL=DropdownMenu.js.map