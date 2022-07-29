import * as React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

export default function AddToFavoriteButton() {
    const [inList, setInList] = React.useState<boolean>(false);

    function onClick() {
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