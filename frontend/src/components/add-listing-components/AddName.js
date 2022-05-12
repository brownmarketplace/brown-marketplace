import React from 'react'
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import './add-details.css'

function AddName({handleInputChange, productName}) {
    return (
        <div className="add-details">
            <div>
                <Chip 
                label="Item Name" 
                className="details-chip" 
                color="primary" 
                />
            </div>
            <div style={{ marginTop: "10px" }}>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    variant="outlined"
                    placeholder="Enter item name."
                    className="details-text"
                    onChange={handleInputChange}
                    value={productName}
                    name="productName"
                />
            </div>
        </div>
    )
}

export default AddName