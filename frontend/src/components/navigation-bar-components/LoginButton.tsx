import * as React from 'react';
import { Button, Typography } from '@mui/material';

import { GoogleLogin } from 'react-google-login';

export default function LoginButton(props: { handleLogin: any }) {
    return (
        <GoogleLogin
            clientId="1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com"
            render={renderProps => (
                <Button variant="outlined"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    sx={{
                        borderRadius: "1000px",
                        textTransform: "none",
                        color: "inherit",
                        borderColor: "inherit",
                        paddingLeft: 3,
                        paddingRight: 3,
                    }}>
                    <Typography color="inherit">Log&nbsp;In</Typography>
                </Button>
            )}
            buttonText="Login"
            onSuccess={props.handleLogin}
            onFailure={props.handleLogin}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    );
}