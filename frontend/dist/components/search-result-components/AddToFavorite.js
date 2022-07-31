import * as React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
// const iconStyle = { fontSize: 50 };
var iconStyle = {};
export default function AddToFavorite() {
    var _a = React.useState(false), active = _a[0], setActive = _a[1];
    var Toggle = function (event) {
        event.stopPropagation();
        event.preventDefault();
        setActive(!active);
        // user_id, product_id
    };
    return (React.createElement(Tooltip, { title: "Add to favorite" },
        React.createElement(IconButton, { onClick: Toggle, 
            // disableRipple
            sx: {
                // padding: 0,
                margin: 0,
            } }, active ? React.createElement(Favorite, { sx: iconStyle }) : React.createElement(FavoriteBorder, { sx: iconStyle }))));
}
//# sourceMappingURL=AddToFavorite.js.map