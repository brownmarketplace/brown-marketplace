import { Button, Stack, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import React, { useState } from "react";

export default function AddToFavoriteButton() {
    const [inList, setInList] = useState(false);

    function onClick(event) {
        if (inList) {
            // remove from favorite list
        } else {
            // add to favorite list
        }
        setInList(!inList);
    }

    return (
        <Button variant="outlined" disableRipple onClick={onClick}
            sx={{
                borderRadius: "10px",
                textTransform: "none",
                color: "inherit",
                borderColor: "inherit",
            }}>
            <Stack direction="row" spacing={1} alignItems="center">
                {inList ? <Favorite /> : <FavoriteBorder />}
                <Typography>{inList ? "Remove from Favorite" : "Add to Favorite"}</Typography>
            </Stack>
        </Button>
    );
}