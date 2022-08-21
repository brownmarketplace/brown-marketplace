import * as React from "react";
import { Button, IconButton, Tooltip, Stack, Typography } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import IosShareIcon from '@mui/icons-material/IosShare';

export default function ShareButton() {
    const copyToClipboard = () => {
        console.log('coplied to clipboard')
        navigator.clipboard.writeText(window.location.href)
    }

    return (
        <Tooltip title="Copy to Clipboard">
            <Button variant="outlined" disableRipple onClick={copyToClipboard}
                sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    color: "inherit",
                    borderColor: "inherit",
                }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <IosShareIcon />
                    <Typography>Share</Typography>
                </Stack>
            </Button>
        </Tooltip>
    )

    return (
        <IconButton
            color="inherit"
            disableRipple
            sx={{ padding: 0, margin: 1 }}
            onClick={copyToClipboard}>
            <ContentCopy />
        </IconButton>
    );
}