import React from 'react';
import Chip from '@mui/material/Chip';
import tags from './tags';

import './add-details.css'

function ChooseTags({handleInputChange, productTags}) {

  return (
    <div className="add-details">
        <div>
          Add Tags 🏷
        </div>
        <div style={{ marginTop: "10px" }}>
          {tags.map((c) => (
            <Chip
              key={c.id}
              label={c.name}
              className="clickableTags"
              onClick={() => handleInputChange(c.id, productTags)}
              variant={productTags.has(c.id) ? "filled" : "outlined"}
            />
          ))}

        {/* <FormControl sx={{ width: 400 }}>
            <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                className="details-text"
                multiple
                name="productTags"
                value={productTags}
                onChange={handleInputChange}
                input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                >
                {tags.map((tag) => (
                    <MenuItem
                        key={tag}
                        value={tag}
                        style={getStyles(tag, productTags, theme)}
                    >
                        {tag}
                    </MenuItem>
                ))}
            </Select>
        </FormControl> */}
        </div>
    </div>
  );
}

export default ChooseTags