import * as React from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";

// components
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type DropdownMenuProps = {
    options: string[],
    optionSetter: React.Dispatch<React.SetStateAction<string>>,
}

export default function DropdownMenu(props: DropdownMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedOption, setSelectedOption] = React.useState<string>(props.options[0]);

    function handleClick(event) {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <Box>
            <Button
                aria-owns="sorting-key-menu"
                aria-haspopup="true"
                onClick={handleClick}
                disableRipple
                color="inherit"
                sx={{
                    borderRadius: "10px",
                    paddingTop: 0,
                    paddingBottom: 0,
                    textTransform: "none",
                    marginLeft: "10px",
                }}>
                <Typography variant="h6">{selectedOption}</Typography>
                <KeyboardArrowDownIcon />
            </Button>
            <Menu
                id="sorting-key-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {props.options.map((option, idx) =>
                    <MenuItem disableRipple onClick={() => { handleClose(); setSelectedOption(option); props.optionSetter(option); }}>
                        <Typography textAlign="center">{option}</Typography>
                    </MenuItem>)}
            </Menu>
        </Box>
    );
}

DropdownMenu.defaultProps = {
    options: ['price', 'option 2', 'option 3'],
    optionSetter: () => { },
}