import React from "react";
// MUI Icons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
// CSS Import
// import './product-buttons.css'
function ProductButtons() {
    return (React.createElement("div", { className: "product-buttons" },
        React.createElement(IconButton, { className: "left" },
            React.createElement(CloseIcon, { fontSize: "large" })),
        React.createElement(IconButton, { className: "repeat" },
            React.createElement(ReplayIcon, { fontSize: "large" })),
        React.createElement(IconButton, { className: "bookmark" },
            React.createElement(StarRateIcon, { fontSize: "large" })),
        React.createElement(IconButton, { className: "right" },
            React.createElement(FavoriteIcon, { fontSize: "large" }))));
}
export default ProductButtons;
//# sourceMappingURL=ProductButtons.js.map