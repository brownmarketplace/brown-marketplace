import React from 'react';
import Chip from '@mui/material/Chip';

import './add-details.css'

const categories = [
  "Room Decor", "Furniture", "Clothing", "Accessories",
  "Books", "Electronics and related", "Other"
]

function ChooseCategory({handleInputChange, productCat}) {

  return (
    <div style={{ marginTop: '20px', fontSize: "1.6vw" }}>
        <div>
            Choose a Category 🗃
        </div>
        <div style={{ marginTop: "10px" }}>
        {
          categories.map(cat =>
            <Chip
              label={cat}
              value={cat}
              name="productCat"
              onClick={() => handleInputChange(cat)}
              variant={productCat === cat ? "filled" : "outlined"}
              className="clickableTags"
            />
          )
          
        }
        </div>
    </div>
  );
}

export default ChooseCategory