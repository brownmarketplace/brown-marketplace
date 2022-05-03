import * as React from 'react';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ChooseCategory() {
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
        <FormControl sx={{ minWidth: 120, marginTop: "12px" }}>
            <InputLabel htmlFor="grouped-select">Category</InputLabel>
            <Select defaultValue="" id="grouped-select" label="Grouping">
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {/* Need to replace with actual category data later */}
            <ListSubheader>Clothing</ListSubheader>
            <MenuItem value={1}>Tops</MenuItem>
            <MenuItem value={2}>Bottoms</MenuItem>
            <MenuItem value={3}>Shoes</MenuItem>
            <MenuItem value={4}>Accessories</MenuItem>
            <ListSubheader>Room Decor</ListSubheader>
            <MenuItem value={5}>Lamps</MenuItem>
            <MenuItem value={6}>Posters</MenuItem>
            </Select>
        </FormControl>
    </div>
  );
}

export default ChooseCategory