import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

// components

const footerText = "Copyright © 2022 Brown Marketplace. All rights reserved."

export default function FooterV2() {
    return (
        <AppBar position="static"
            sx={{
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingTop: "60px",
                paddingBottom: "20px",
                margin: 0
            }}>
            <Typography>
                {footerText}
            </Typography>
        </AppBar >
    );
}
