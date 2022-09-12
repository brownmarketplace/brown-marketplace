import * as React from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography, Link } from "@mui/material";

// Google Login
import { GoogleLogout } from 'react-google-login';

// types
import { UserInfo } from "../../models/types";

// database
import { readUserInfo } from "../../backend/Database/ProductDB/readDatabaseV2";

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

    const [userInfo, setUserInfo] = React.useState<UserInfo>({} as UserInfo);

    React.useEffect(() => {
        async function fetchUserInfo() {
            const response = await readUserInfo(props.userID);
            setUserInfo(response);
        }

        fetchUserInfo();
    }, [props.userID]);

    return (
        <Box>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={userInfo.name} src={userInfo.profilePicture} />
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
                onClose={handleCloseUserMenu}>
                <Link href={"/profile"} color="inherit" sx={{ textDecoration: 'none' }}>
                    <MenuItem>
                        <Typography>Profile</Typography>
                    </MenuItem>
                </Link>
                <GoogleLogout
                    clientId="1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com"
                    render={renderProps => (
                        <MenuItem
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}>
                            <Typography>Log&nbsp;Out</Typography>
                        </MenuItem>
                    )}
                    buttonText="Logout"
                    onLogoutSuccess={props.handleLogout} />
            </Menu>
        </Box>
    );
}