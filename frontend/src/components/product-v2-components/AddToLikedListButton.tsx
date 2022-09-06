import * as React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

// databse
import { readInLikedList, addToLikedList, removeFromLikedList } from "../../backend/Database/UserDB/readDatabaseV2";

type AddToLikedListButtonProps = {
    productId: string,
    userID: string,
}

export default function AddToLikedListButton(props: AddToLikedListButtonProps) {
    const [inLikedList, setInLikedList] = React.useState<boolean>(false);

    function toggleLikedList() {
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
        async function fetchInLikedList() {
            const response = await readInLikedList(props.userID, props.productId);
            setInLikedList(response);
        }

        fetchInLikedList();
    }, [props.userID, props.productId]);

    return (
        <Tooltip title="Add to liked list">
            <IconButton
                color="inherit"
                disableRipple
                onClick={toggleLikedList}>
                {inLikedList ? <Favorite fontSize="medium"/> : <FavoriteBorder fontSize="medium"/>}
            </IconButton>
        </Tooltip >
    );

    // return (
    //     <Tooltip title="Add to liked list">
    //         <Button variant="outlined" disableRipple onClick={onClick}
    //             sx={{
    //                 borderRadius: "1000px",
    //                 textTransform: "none",
    //                 color: "inherit",
    //                 borderColor: "inherit",
    //             }}>
    //             {inLikedList ? <Favorite /> : <FavoriteBorder />}
    //             {/* <Stack direction="row" spacing={1} alignItems="center">
    //                 {inLikedList ? <Favorite /> : <FavoriteBorder />}
    //                 <Typography>{inLikedList ? "Remove from Liked List" : "Add to Liked List"}</Typography>
    //             </Stack> */}
    //         </Button>
    //     </Tooltip >
    // );
}