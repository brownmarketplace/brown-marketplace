import React from 'react'
import TextField from '@mui/material/TextField';
import { styled } from "@mui/material/styles";

const WhiteTextField = styled(TextField)({
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

export default WhiteTextField