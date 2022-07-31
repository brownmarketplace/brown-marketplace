import { Box, Link } from "@mui/material";
import React from "react";
import { ReactComponent as LogoLight } from "./logo-light.svg";
export default function HomepageButton() {
    return (React.createElement(Box, { sx: { display: "flex", justifyContent: "center" } },
        React.createElement(Link, { href: "/home", sx: { width: "181px", height: "48px" } },
            React.createElement(LogoLight, null))));
}
//# sourceMappingURL=HomepageButton.js.map