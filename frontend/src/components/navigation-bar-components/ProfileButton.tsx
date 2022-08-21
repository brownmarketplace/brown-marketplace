import * as React from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography, Link } from "@mui/material";

// Google Login
import { GoogleLogout } from 'react-google-login';

type ProfileButtonProps = {
    userID: string,
    handleLogout: any,  // TODO: type this
}

export default function ProfileButton(props: ProfileButtonProps) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="https://i.natgeofe.com/n/46b07b5e-1264-42e1-ae4b-8a021226e2d0/domestic-cat_thumb_square.jpg" />
                </IconButton>
            </Tooltip>

            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <Link href={"/profile/" + props.userID} color="inherit" sx={{ textDecoration: 'none' }}>
                    <MenuItem>
                        <Typography>Profile</Typography>
                    </MenuItem>
                </Link>
                <GoogleLogout
                    clientId="1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com"
                    render={renderProps => (
                        <MenuItem
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <Typography>Log&nbsp;Out</Typography>
                        </MenuItem>
                    )}
                    buttonText="Logout"
                    onLogoutSuccess={props.handleLogout}
                />
            </Menu>
        </Box>
    );
}