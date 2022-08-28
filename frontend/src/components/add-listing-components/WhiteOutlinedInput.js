import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from "@mui/material/styles";

const WhiteOutlinedInput = styled(OutlinedInput)({
    backgroundColor: "#FFFFFF",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none"
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none"
      }
    }
});

export default WhiteOutlinedInput