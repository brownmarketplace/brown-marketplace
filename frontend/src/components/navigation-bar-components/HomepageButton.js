import { Box, Link } from "@mui/material";
import React from "react";
import { ReactComponent as LogoLight } from "./logo-light.svg";
import { ReactComponent as LogoDark } from "./logo-dark.svg";

export default function HomepageButton() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link href="/home" sx={{ width: "181px", height: "48px" }}>
                <LogoLight />
                {/* <LogoDark /> */}
            </Link>
        </Box>
    );
}