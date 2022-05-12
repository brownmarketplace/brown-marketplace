import React from 'react'
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import './add-details.css'

function AddDetails({handleInputChange, productDesc}) {

  return (
    <div className="add-details">
        <div>
            <Chip 
            label="Item Details" 
            className="details-chip" 
            color="primary" 
            />
        </div>
        <div style={{ marginTop: "10px" }}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              variant="outlined"
              placeholder="Enter item description."
              className="details-text"
              onChange={handleInputChange}
              value={productDesc}
              name="productDesc"
            />
        </div>
    </div>
  )
}

export default AddDetails