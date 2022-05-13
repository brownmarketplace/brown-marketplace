import React from 'react'
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import './add-details.css'

function AddPhotos({handleInputChange, productImgUrls}) {

    return (
        <div className="add-details">
            <div>
                <Chip 
                label="Item Photos" 
                className="details-chip" 
                color="primary" 
                />
            </div>
            <div style={{ marginTop: "10px" }}>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={5}
                        variant="outlined"
                        placeholder="Enter up to 6 comma-separated image urls."
                        className="details-text"
                        onChange={handleInputChange}
                        name="productImgUrls"
                        value={productImgUrls}
                    />
                </div>
        </div>
    )
}

export default AddPhotos
