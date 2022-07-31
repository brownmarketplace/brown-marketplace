import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React from "react";
export default function ProfileButton(props) {
    var _a = React.useState(null), anchorElUser = _a[0], setAnchorElUser = _a[1];
    var handleOpenUserMenu = function (event) {
        setAnchorElUser(event.currentTarget);
    };
    var handleCloseUserMenu = function () {
        setAnchorElUser(null);
    };
    return (React.createElement(Box, null,
        React.createElement(Tooltip, { title: "Open settings" },
            React.createElement(IconButton, { onClick: handleOpenUserMenu, sx: { p: 0 } },
                React.createElement(Avatar, { alt: "Remy Sharp", src: "https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg" }))),
        React.createElement(Menu, { sx: { mt: '45px' }, id: "menu-appbar", anchorEl: anchorElUser, anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, keepMounted: true, transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }, open: Boolean(anchorElUser), onClose: handleCloseUserMenu }, props.settings.map(function (setting) { return (React.createElement(MenuItem, { key: setting, onClick: handleCloseUserMenu },
            React.createElement(Typography, null, setting))); }))));
}
ProfileButton.defaultProps = {
    settings: ['Profile', 'Account', 'Dashboard', 'Logout'],
};
//# sourceMappingURL=ProfileButton.js.map