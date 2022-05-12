import * as React from 'react';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ChooseCategory({handleInputChange, productCategory}) {

  {/* var categories = ["Room Decor", "Furniture", "Clothing", "Accessories", "Books", "Electronics & related", "Other"]
    var subcategoryMap = {
      "Room Decor": ["Plushies", "Plants", "Lights", "Posters", "Tapestries", "Other room decor"],
      'Furniture': ["Chairs", "Couches", "Mattresses", "Pillows", "Other furniture"],
      'Clothing': ["Tops", "Pants", "Dresses", "Shoes", "Coats and Jackets", "Other Clothing"],
      'Accessories': ["Necklace", "Bracelet", "Earrings", "Hair clips", "Other accessories"],
      'Books': ["Textbooks", "Fiction", "Nonfiction", "Poetry", "Other books"],
      'Electronics & related': ["Speakers", "Phones", "Devices", "Other electronics and related"],
      'Other': ['Miscellaneous']
    } */}

  // const CategoryList = (props) => {
  //   const subs = subcategoryMap[props.category]
  //   return [
  //       <ListSubheader>{props.category}</ListSubheader>,
  //       subs.map(sub => {
  //         return (
  //           <MenuItem value={1}>{sub}</MenuItem>
  //         )
  //       })
  //     ]   
  // }

  return (
    <div style={{ marginTop: "24px" }}>
        <div>
            <Chip 
            className="details-chip"
            label="Item Category" 
            color="primary" 
            sx={{ borderRadius: "4px !important" }}
            />
        </div>
        <FormControl sx={{ minWidth: 120, marginTop: "12px", width: 400 }}>
            <InputLabel htmlFor="grouped-select">Category</InputLabel>
            <Select 
              defaultValue="" 
              id="grouped-select" 
              label="Grouping"
              onChange={handleInputChange}
              value={productCategory}
              name="productCategory"
            >
              <MenuItem value="">
                  <em>None</em>
              </MenuItem>
              {/* {
                categories.map((elt) =>
                    <CategoryList category={elt}/>
                )
              } */}
              
            {/* Hardcoded for now because when I use categories.map, the categories and subcategories show up but cannot be selected. */}
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
        </FormControl>
    </div>
  );
}

export default ChooseCategory