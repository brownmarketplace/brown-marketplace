import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
function CopyToClipboard() {
    var copyContent = function () {
        console.log('coplied to clipboard');
        navigator.clipboard.writeText(window.location.href);
    };
    return (React.createElement(Tooltip, { title: "Copy to Clipboard" },
        React.createElement(IconButton, { color: "primary", onClick: copyContent, sx: { padding: 0, margin: 1 } },
            React.createElement(ContentCopyIcon, null))));
}
export default CopyToClipboard;
//# sourceMappingURL=CopyToClipboard.js.map