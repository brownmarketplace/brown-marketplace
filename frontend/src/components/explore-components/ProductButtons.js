import React from "react";

// MUI Icons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';


// CSS Import
// import './product-buttons.css'

function ProductButtons() {
    return (
        <div className="product-buttons">
            <IconButton className="left">
                <CloseIcon fontSize="large" />
            </IconButton>
            <IconButton className="repeat">
                <ReplayIcon fontSize="large" />
            </IconButton>
            <IconButton className="bookmark">
                <StarRateIcon fontSize="large" />
            </IconButton>
            <IconButton className="right">
                <FavoriteIcon fontSize="large" />
            </IconButton>
        </div>
    )
}

export default ProductButtons;