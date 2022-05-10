import React, { useState, useEffect } from 'react'

// mui
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function AddToWishList() {
  const [isInWishlist, setIsInWishlist] = useState(false)

  // read from database
  const readDatabase = () => {
    console.log('reading from database')
    const valueFromDatabase = false
    setIsInWishlist(valueFromDatabase)
  }

  // write to database
  const writeDatabase = () => {
    console.log(isInWishlist ? 'removed from wishlist' : 'added to wishlist');
  }

  // retrieve data from database
  useEffect(() => {
    readDatabase()
  }, []);

  // event listener
  const toggleWishList = () => {
    writeDatabase()
    setIsInWishlist(!isInWishlist)
  }

  return (
    <Tooltip title="Add to wishlish">
      <IconButton color="primary" onClick={toggleWishList} sx={{ padding: 0, margin: 1 }}>
        {isInWishlist
          ? <FavoriteIcon />
          : <FavoriteBorderIcon />
        }
        {/* <Typography variant='caption'>Wishlish</Typography> */}
      </IconButton>
    </Tooltip >
  );
}

AddToWishList.defaultProps = {
  productID: null,
  userID: null,
}

export default AddToWishList;