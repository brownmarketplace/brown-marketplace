import * as React from "react";
import { Button, IconButton, Tooltip, Stack, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

// databse
import { readInLikedList, addToLikedList, removeFromLikedList } from "../../backend/Database/UserDB/readDatabaseV2";

type AddToLikedListButtonProps = {
    productId: string,
    userID: string,
}

export default function AddToLikedListButton(props: AddToLikedListButtonProps) {
    const [inLikedList, setInLikedList] = React.useState<boolean>(false);

    function onClick() {
        if (props.userID == null) {
            console.log("please log in");
            return;
        }
        if (inLikedList) {
            removeFromLikedList(props.userID, props.productId);
        } else {
            addToLikedList(props.userID, props.productId);
        }
        setInLikedList((prev) => !prev);
    }

    React.useEffect(() => {
        readInLikedList(props.userID, props.productId, setInLikedList);
    }, []);

    return (
        <Tooltip title="Add to liked list">
            <Button variant="outlined" disableRipple onClick={onClick}
                sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    color: "inherit",
                    borderColor: "inherit",
                }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    {inLikedList ? <Favorite /> : <FavoriteBorder />}
                    <Typography>{inLikedList ? "Remove from Liked List" : "Add to Liked List"}</Typography>
                </Stack>
            </Button>
        </Tooltip >
    );

    return (
        <IconButton
            color="inherit"
            disableRipple
            sx={{ padding: 0, margin: 1 }}
            onClick={onClick}>
            {inLikedList ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
    );
}