import * as React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Share } from "@mui/icons-material";

export default function ShareButton() {
    function onClick(event) {
        // copy to clipboard
        // share on social media
    };

    return (
        <Button variant="outlined" disableRipple onClick={onClick}
            sx={{
                borderRadius: "10px",
                textTransform: "none",
                color: "inherit",
                borderColor: "inherit",
            }}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Share />
                <Typography>Share</Typography>
            </Stack>
        </Button>
    );
}