import React from 'react'

import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

function CopyToClipboard() {
    const copyContent = () => {
        console.log('coplied to clipboard')
        navigator.clipboard.writeText(window.location.href)
    }

    return (
        <Tooltip title="Copy to Clipboard">
            <IconButton color="primary" onClick={copyContent} sx={{padding: 0, margin: 1}}>
                <ContentCopyIcon />
                {/* <Typography variant='caption'>Copy to Clipboard</Typography> */}
            </IconButton>
        </Tooltip>
    )
}

export default CopyToClipboard