import * as React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

export default function ShareButton() {
    const copyToClipboard = () => {
        console.log('coplied to clipboard')
        navigator.clipboard.writeText(window.location.href)
    }

    return (
        <Tooltip title="Copy to Clipboard">
            <IconButton
                color="inherit"
                disableRipple
                onClick={copyToClipboard}>
                <ContentCopy fontSize="medium"/>
            </IconButton>
        </Tooltip>
    );

    // return (
    //     <Tooltip title="Copy to Clipboard">
    //         <Button variant="outlined" disableRipple onClick={copyToClipboard}
    //             sx={{
    //                 borderRadius: "10px",
    //                 textTransform: "none",
    //                 color: "inherit",
    //                 borderColor: "inherit",
    //             }}>
    //             <Stack direction="row" spacing={1} alignItems="center">
    //                 <IosShareIcon />
    //                 <Typography>Share</Typography>
    //             </Stack>
    //         </Button>
    //     </Tooltip>
}