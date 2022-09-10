import * as React from 'react';
import { AppBar, Box, Typography } from '@mui/material';

function FooterText() {
    const footerText = "Copyright © 2022 Brown Marketplace. All rights reserved."

    return (
        <Box >
            <Typography style={{ display: 'inline-block' }}>
                {"Copyright © 2022"}&nbsp;
            </Typography>
            <Typography style={{ display: 'inline-block' }} sx={{
                fontWeight: "fontWeightBold",
            }}>
                {"Brown"}&nbsp;
            </Typography>
            <Typography style={{ display: 'inline-block' }} sx={{
                background: "-webkit-linear-gradient(45deg, #92A3FD, #9DCEFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "fontWeightBold",
            }}>
                {"Marketplace"}
            </Typography >
            <Typography style={{ display: 'inline-block' }}>
                {". All rights reserved."}
            </Typography>
        </Box>
    );
}

export default function FooterV2() {
    return (
        // <Paper component="footer" square variant="outlined" color="secondary"
        //     sx={{
        //         border: "1px solid #DBDBDB",
        //         width: "100%",
        //         paddingLeft: "5%",
        //         paddingRight: "5%",
        //         paddingTop: "30px",
        //         paddingBottom: "20px",
        //         position: "fixed",
        //         buttom: 0,
        //     }}>
        //     <Typography>
        //         {footerText}
        //     </Typography>
        // </Paper >
        <AppBar color="secondary" position="sticky" elevation={0}
            sx={{
                border: "1px solid #DBDBDB",
                width: "100%",
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingTop: "30px",
                paddingBottom: "20px",
            }}>
            <FooterText />
        </AppBar>
    );
}
