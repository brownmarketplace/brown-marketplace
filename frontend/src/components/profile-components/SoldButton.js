import React from 'react'
import Button from '@mui/material/Button';

function SoldButton() {
  return (
    <div style={{ marginLeft: "10px" }}>
        <Button variant="outlined" color="error" size="small">
            Sold
        </Button>
    </div>
  )
}

export default SoldButton