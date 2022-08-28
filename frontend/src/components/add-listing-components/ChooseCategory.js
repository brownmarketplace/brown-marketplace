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
        
        {/* <FormControl sx={{ minWidth: 120, marginTop: "12px", width: 400 }}>
            <InputLabel htmlFor="grouped-select">Category</InputLabel>
            <Select 
              defaultValue="" 
              id="grouped-select" 
              label="Grouping"
              onChange={handleInputChange}
              value={productSubcategory}
              name="productSubcategory"
              className="details-text"
            >
              <MenuItem value="">
                  <em>None</em>
              </MenuItem>
              
              <ListSubheader>Room Decor</ListSubheader>
                <MenuItem value="Plushies">Plushies</MenuItem>
                <MenuItem value="Plants">Plants</MenuItem>
                <MenuItem value="Lights">Lights</MenuItem>
                <MenuItem value="Posters">Posters</MenuItem>
                <MenuItem value="Tapestries">Tapestries</MenuItem>
                <MenuItem value="Other room decor">Other room decor</MenuItem>
              <ListSubheader>Furniture</ListSubheader>
                <MenuItem value="Chairs">Chairs</MenuItem>
                <MenuItem value="Couches">Couches</MenuItem>
                <MenuItem value="Mattresses">Mattresses</MenuItem>
                <MenuItem value="Pillows">Pillows</MenuItem>
                <MenuItem value="Other furniture">Other furniture</MenuItem>
              <ListSubheader>Clothing</ListSubheader>
                <MenuItem value="Tops">Tops</MenuItem>
                <MenuItem value="Pants">Pants</MenuItem>
                <MenuItem value="Dresses">Dresses</MenuItem>
                <MenuItem value="Shoes">Shoes</MenuItem>
                <MenuItem value="Coats and jackets">Coats and jackets</MenuItem>
                <MenuItem value="Other clothing">Other clothing</MenuItem>
              <ListSubheader>Accessories</ListSubheader>
                <MenuItem value="Necklaces">Necklaces</MenuItem>
                <MenuItem value="Bracelets">Bracelets</MenuItem>
                <MenuItem value="Earrings">Earrings</MenuItem>
                <MenuItem value="Hair clips">Hair clips</MenuItem>
                <MenuItem value="Other accessories">Other accessories</MenuItem>
              <ListSubheader>Books</ListSubheader>
                <MenuItem value="Textbooks">Textbooks</MenuItem>
                <MenuItem value="Fiction">Fiction</MenuItem>
                <MenuItem value="Nonfiction">Nonfiction</MenuItem>
                <MenuItem value="Poetry">Poetry</MenuItem>
                <MenuItem value="Other books">Other books</MenuItem>
              <ListSubheader>Electronics and related</ListSubheader>
                <MenuItem value="Speakers">Speakers</MenuItem>
                <MenuItem value="Phones">Phones</MenuItem>
                <MenuItem value="Devices">Devices</MenuItem>
                <MenuItem value="Other electronics and related">Other electronics and related</MenuItem>
              <ListSubheader>Other</ListSubheader>
                <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
            </Select>
        </FormControl> */}
    </div>
  );
}

export default ChooseCategory