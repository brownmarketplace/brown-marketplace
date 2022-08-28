import React from 'react'
import Chip from '@mui/material/Chip';
import './add-details.css'

function ChooseSubInner({ subs, productSubcategory, handleInputChange }) {
    return (
        <div style={{ marginTop: '20px', fontSize: "1.6vw" }}>
            <div>
                Choose a Subcategory 🗃
            </div>

            <div style={{ marginTop: "10px" }}>
                {
                    subs.map(sub =>
                        <Chip
                        label={sub}
                        value={sub}
                        name="productSubcategory"
                        onClick={() => handleInputChange(sub)}
                        variant={productSubcategory === sub ? "filled" : "outlined"}
                        className="clickableTags"
                        />
                    )    
                }
            </div>
        </div>
    )
}

export default ChooseSubInner