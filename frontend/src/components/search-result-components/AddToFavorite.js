import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";

// const iconStyle = { fontSize: 50 };
const iconStyle = {};

export default function AddToFavorite() {
    const [active, setActive] = useState(false);

    const Toggle = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setActive(!active);

        // user_id, product_id
    }

    return (
        <Tooltip title="Add to favorite">
            <IconButton
                onClick={Toggle}
                // disableRipple
                sx={{
                    // padding: 0,
                    margin: 0,
                }}>
                {active ? <Favorite sx={iconStyle} /> : <FavoriteBorder sx={iconStyle} />}
            </IconButton>
        </Tooltip >
    );
}