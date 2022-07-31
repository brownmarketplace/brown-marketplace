import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
// components
import HomepageButton from './navigation-bar-components/HomepageButton';
import ProfileButton from './navigation-bar-components/ProfileButton';
import NavDropdown from './navigation-bar-components/NavDropdown';
import NavSearchBar from './navigation-bar-components/NavSearchBar';
var settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export default function NavigationBar() {
    return (React.createElement(AppBar, { position: "static", sx: {
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "10px",
            paddingBottom: "10px",
        } },
        React.createElement(Stack, { direction: { xs: "column", sm: "row" }, spacing: 1, justifyContent: "space-between", alignItems: "center" },
            React.createElement(HomepageButton, null),
            React.createElement(NavDropdown, null),
            React.createElement(NavSearchBar, null),
            React.createElement(ProfileButton, null))));
}
//# sourceMappingURL=NavigationBar.js.map