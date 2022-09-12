import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';

// components
import HomepageButton from './navigation-bar-components/HomepageButton';
import NavDropdown from './navigation-bar-components/NavDropdown';
import LoginButton from './navigation-bar-components/LoginButton';
import ProfileButton from './navigation-bar-components/ProfileButton';

type NavigationBarProps = {
    userID: string,
    loginState: any,
    logoutState: any,
}

export default function NavigationBar(props: NavigationBarProps) {
    // authentication
    const [isLoggedIn, setIsLoggedIn] = React.useState(typeof props.userID !== 'undefined'); // TODO: better handle 'uu'

    return (
        <AppBar color="transparent" elevation={0} position="static"
            sx={{
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingTop: "20px",
                paddingBottom: "0px",
            }}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                justifyContent="space-between"
                alignItems="center">
                <HomepageButton />
                <NavDropdown />
                {!isLoggedIn && <LoginButton handleLogin={(response) => { props.loginState(response); setIsLoggedIn(true) }} />}
                {isLoggedIn && <ProfileButton userID={props.userID} handleLogout={(response) => { props.logoutState(response); setIsLoggedIn(false) }} />}
            </Stack>
        </AppBar >
    );
}