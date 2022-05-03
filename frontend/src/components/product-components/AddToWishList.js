import React, { useState } from 'react'

import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function AddToWishList() {
    const [isInWishlist, setIsInWishlist] = useState(false) // Get from api
    const addWishlist = () => {
        console.log(isInWishlist ? 'removed from wishlist' : 'added to wishlist');
        setIsInWishlist(!isInWishlist);
    }

    return (
        <Tooltip title="Add to wishlish">
            <IconButton color="primary" onClick={addWishlist} sx={{padding: 0, margin: 1}}>
                {isInWishlist
                    ? <FavoriteIcon />
                    : <FavoriteBorderIcon />
                }
                {/* <Typography variant='caption'>Wishlish</Typography> */}
            </IconButton>
        </Tooltip >
    );
}

export default AddToWishList;