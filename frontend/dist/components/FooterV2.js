import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
// components
var footerText = "Copyright © 2022 Brown Marketplace. All rights reserved.";
export default function FooterV2() {
    return (React.createElement(AppBar, { position: "static", sx: {
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "60px",
            paddingBottom: "20px",
            margin: 0
        } },
        React.createElement(Typography, null, footerText)));
}
//# sourceMappingURL=FooterV2.js.map