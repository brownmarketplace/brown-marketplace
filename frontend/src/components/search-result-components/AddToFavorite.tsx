import * as React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

// const iconStyle = { fontSize: 50 };
const iconStyle = {};

export default function AddToFavorite() {
    const [active, setActive] = React.useState(false);

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