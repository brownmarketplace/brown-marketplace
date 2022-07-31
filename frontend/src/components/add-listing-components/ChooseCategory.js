import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './add-details.css'

const categories = [
  "Room Decor", "Furniture", "Clothing", "Accessories",
  "Books", "Electronics and related", "Other"
]

const roomDecorSub = [
  "Plushies", "Plants", "Lights", "Posters", "Tapestries",
  "Other room decor"
]

const furnitureSub = [
  "Chairs", "Couches", "Mattresses", 
  "Pillows", "Other furniture"

]

const clothingSub = [
  "Tops", "Pants", "Dresses", "Shoes",
  "Coats and jackets", "Other clothing"

]

const accessoriesSub = [
  "Necklaces", "Bracelets", "Earrings",
  "Hair clips", "Other accessories"

]

const booksSub = [
  "Textbooks", "Fiction", "Nonfiction", 
  "Poetry", "Other books"

]

const electronicsSub = [
  "Speakers", "Phones", "Devices", 
  "Other electronics and related"

]

const otherSub = [
  "Miscellaneous"
]

function ChooseCategory({handleInputChange, productSubcategory}) {

  const [selectedCats, setSelectedCats] = useState([]);
  const [selected, setSelected] = useState(false);

  const isSelected = (specificCat) => {
    if (selectedCats.includes(specificCat)) {
      return true
    } else {
      return false
    }
  }

  const handleClick = (event, specificCat) => {
    console.log(specificCat)
    if (!selectedCats.includes(specificCat)) {
      setSelectedCats([specificCat])
      console.log("added to selectedCats")
    } else {
      setSelectedCats([])
      console.log("removed from selectedCats")
    }
  }

  return (
    <div style={{ marginTop: '20px', marginLeft: '40px', marginRight: '20px', fontSize: "1.6vw" }}>
        <div>
            Choose a Category 🗃
        </div>
        <div style={{ marginTop: "10px" }}>
        {
          categories.map(cat =>
            <Chip
              label={cat}
              onClick={event => handleClick(event, cat)}
              color={isSelected(cat) ? "primary" : "default"}
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