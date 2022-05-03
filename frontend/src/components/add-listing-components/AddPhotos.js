import React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

function AddPhotos() {
    const Input = styled('input')({
        display: 'none',
    });

    return (
        <div>
            <Chip 
            label="Item Photos" 
            className="details-chip" 
            color="primary" 
            />
            <div style={{ marginTop: "10px" }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button variant="outlined" component="span">
                        <span style={{ fontSize: '16px' }}>
                            Add Photos
                        </span>
                    </Button>
                </label>
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" />
                </label>
            </Stack>
        </div>
    </div>
  )
}

export default AddPhotos