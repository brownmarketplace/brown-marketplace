import * as React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
export default function AddToFavoriteButton() {
    var _a = React.useState(false), inList = _a[0], setInList = _a[1];
    function onClick() {
        if (inList) {
            // remove from favorite list
        }
        else {
            // add to favorite list
        }
        setInList(!inList);
    }
    return (React.createElement(Button, { variant: "outlined", disableRipple: true, onClick: onClick, sx: {
            borderRadius: "10px",
            textTransform: "none",
            color: "inherit",
            borderColor: "inherit",
        } },
        React.createElement(Stack, { direction: "row", spacing: 1, alignItems: "center" },
            inList ? React.createElement(Favorite, null) : React.createElement(FavoriteBorder, null),
            React.createElement(Typography, null, inList ? "Remove from Favorite" : "Add to Favorite"))));
}
//# sourceMappingURL=AddToFavoriteButton.js.map