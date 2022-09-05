import React from 'react'
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import WhiteTextField from './WhiteTextField';
import './add-details.css'

function AddDetails({handleInputChange, productDesc}) {

  return (
    <div className="add-details">
        <div>
            Description
        </div>
        <div style={{ marginTop: "10px" }}>
          <FormControl sx={{ marginTop: "4px", width: 400 }}>
            <WhiteTextField
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
          </FormControl>
        </div>
    </div>
  )
}

export default AddDetails