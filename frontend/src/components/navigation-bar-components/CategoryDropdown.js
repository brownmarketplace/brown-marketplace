import React from "react";
import { Box, Button, Link, Menu, MenuItem, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function CategoryDropdown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const buttonId = "simple-menu";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        // aria-owns={buttonId}
        aria-haspopup="true"
        onClick={handleClick}
        // onMouseOver={handleClick}
        disableRipple
        color="inherit"
        sx={{
          borderRadius: "1000px",
        }}
      >
        <Typography sx={{ textTransform: 'capitalize' }}>
          {props.title}
        </Typography>
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        // id={buttonId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      // MenuListProps={{ onMouseLeave: handleClose }}
      >
        {props.items.map((item, idx) =>
          <Link href={item.href} key={idx}
            underline="hover"
            color="inherit">
            <MenuItem disableRipple>
              <Typography textAlign="center">{item.title}</Typography></MenuItem>
          </Link>)}
      </Menu>
    </Box>
  );
}

CategoryDropdown.defaultProps = {
  title: "Pages",
  items: [
    { title: "Page 1", href: "/page_1" },
    { title: "Page 2", href: "/page_2" },
    { title: "Page 3", href: "/page_3" },
  ],
}