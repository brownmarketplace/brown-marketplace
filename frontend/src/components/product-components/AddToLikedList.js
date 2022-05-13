import React, { useState, useEffect } from 'react'

// mui
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

// database
import { ref, get, set, remove, onValue, query, orderByChild, equalTo, child }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js"
import database from '../../backend/Database/DBInstance'

function AddToLikedList(props) {
  const [isInLikedlist, setIsInLikedlist] = useState(false)

  // database endpoint
  const likedListRef = ref(database, 'users/' + props.userID + '/liked-items/' + props.productID)

  // read from database
  const getIsLiked = () => {
    onValue(likedListRef, (snapshot) => {
      const likedList = snapshot.val()
      setIsInLikedlist(likedList === 'true')
    })
  }

  // write to database
  const writeToLikedList = () => {
    console.log(isInLikedlist ? 'removing from wishlist' : 'adding to wishlist')
    isInLikedlist
      ? remove(likedListRef)
      : set(likedListRef, "true")
  }

  // retrieve data from database
  useEffect(() => {
    if (props.userID == null) {
      return
    }
    getIsLiked()
  }, [props])

  // event listener
  const toggleLikedList = () => {
    if (props.userID == null) {
      console.log("please log in")
      return
    }
    writeToLikedList()
    setIsInLikedlist(!isInLikedlist)
  }

  return (
    <Tooltip title="Add to liked lish">
      <IconButton color="primary" onClick={toggleLikedList} sx={{ padding: 0, margin: 1 }}>
        {isInLikedlist
          ? <FavoriteIcon />
          : <FavoriteBorderIcon />
        }
      </IconButton>
    </Tooltip >
  )
}

AddToLikedList.defaultProps = {
  productID: null,
  userID: null,
}

export default AddToLikedList