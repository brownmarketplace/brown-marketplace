import * as React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Share } from "@mui/icons-material";
export default function ShareButton() {
    function onClick(event) {
        // copy to clipboard
        // share on social media
    }
    ;
    return (React.createElement(Button, { variant: "outlined", disableRipple: true, onClick: onClick, sx: {
            borderRadius: "10px",
            textTransform: "none",
            color: "inherit",
            borderColor: "inherit",
        } },
        React.createElement(Stack, { direction: "row", spacing: 1, alignItems: "center" },
            React.createElement(Share, null),
            React.createElement(Typography, null, "Share"))));
}
//# sourceMappingURL=ShareButton.js.map