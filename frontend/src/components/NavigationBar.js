import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';

// components
import HomepageButton from './navigation-bar-components/HomepageButton';
import ProfileButton from './navigation-bar-components/ProfileButton';
import NavDropdown from './navigation-bar-components/NavDropdown';
import NavSearchBar from './navigation-bar-components/NavSearchBar';
import { Typography } from '@mui/material';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function NavigationBar() {
    return (
        <AppBar color="transparent" elevation={0} position="static"
            sx={{
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingTop: "20px",
                paddingBottom: "0px",
            }}>
            {/* <Toolbar> */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                justifyContent="space-between"
                alignItems="center">
                <HomepageButton />
                <NavDropdown />
                <NavSearchBar />
                <ProfileButton />
            </Stack>
            {/* </Toolbar> */}
        </AppBar >
    );
}
