// Database Imports
import { ref, set }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from '../../backend/Database/DBInstance'

// MUI Icons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import React from 'react'
import { CardActionArea, Tooltip, Zoom, styled } from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';

// Styles for the light tooltip under the buttons
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

/**
 * Button component that is used with the Tinder-style card component.
 * Users can swipe left, undo their swipe, like the current card, or swipe right 
 * to view the product page for that product.
 * 
 * Contains a function to add to the user's liked products.
 */
function ProductButtonsV2({ products, currentIndex, canSwipe, canGoBack, canLike, setCanLike, userID, goBack, swipe }) {

    /**
     * Function to add to the user's liked products.
     */
    const addToLikedList = () => {
        // get produt id of current product
        const pid = products[currentIndex].id

        const likedListRef = ref(database, 'users/' + userID + '/liked-items/' + pid);
        set(likedListRef, "true")
    }

    return (
        <div>
            <div className='buttons'>
                {/* Swipe Left */}
                <LightTooltip
                TransitionComponent={Zoom} 
                title="Swipe Left"
                >
                <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} disabled={!canSwipe} className="left" onClick={() => swipe('left')}>
                    <CloseIcon fontSize="large" />
                </IconButton>
                </LightTooltip>

                {/* Undo */}
                <LightTooltip
                TransitionComponent={Zoom} 
                title="Undo Swipe"
                >
                <IconButton style={{ backgroundColor: !canGoBack && '#c3c4d3'}} disabled={!canGoBack} className="repeat" onClick={() => goBack()}>
                    <ReplayIcon fontSize="large" />
                </IconButton>
                </LightTooltip>

                {/* Like */}
                <LightTooltip
                TransitionComponent={Zoom}
                title="Add to Like List"
                >
                <IconButton style={{ 
                    backgroundColor: 
                    (!canLike && '#0088ff') || (!canSwipe && '#c3c4d3'),
                    
                    // if canLike is false, set color to white, otherwise set to color: #62b4f9 !important;
                    color: (!canLike && 'white') || '#62b4f9',
                
                }} disabled={!canSwipe || !canLike} className="like"
                // When clicked, make the button turn red and disable it and go to the next card
                onClick={() => {
                    addToLikedList()
                    setCanLike(false)
                }
                }>
                    <FavoriteIcon fontSize="large" />
                </IconButton>
                </LightTooltip>

                {/* Swipe Right */}
                <LightTooltip
                TransitionComponent={Zoom}
                title="View Product"
                >
                <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} disabled={!canSwipe} className="right" onClick={() => swipe('right')}>
                    <ShoppingBagIcon fontSize="large" />
                </IconButton>
                </LightTooltip>
            </div>
        </div>
    )
}

// default props for the product buttons component
ProductButtonsV2.defaultProps = {
    products: [],
    currentIndex: 0,
    canSwipe: true,
    canGoBack: true,
    canLike: true,
    setCanLike: () => {},
    userID: '',
    goBack: () => {},
    swipe: () => {},
}

export default ProductButtonsV2;