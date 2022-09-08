import * as React from "react";
import { Box, Button, Link, Menu, MenuItem, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Category } from "../../models/types";

type CategoryDropdownProps = {
  category: Category,
};

export default function CategoryDropdown(props: CategoryDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  React.useEffect(() => {
    props.category.subcategories.sort();
  }, [props.category])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        aria-haspopup="true"
        onClick={handleClick}
        disableRipple
        color="inherit"
        sx={{ borderRadius: "1000px" }}>
        <Typography textTransform="capitalize">
          {props.category.title}
        </Typography>
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        MenuListProps={{ onMouseLeave: handleClose }}
        onClose={handleClose}>
        <MenuItemButton title={props.category.title} href={`/result/${props.category.title}`} />
        {props.category.subcategories.map((subcategory, idx) =>
          <MenuItemButton key={idx} title={subcategory} href={`/result/${props.category.title}/${subcategory}`} />)}
      </Menu>
    </Box>
  );
}

function MenuItemButton(props: { title: string, href: string }) {
  return (
    <Link href={props.href}
      underline="hover"
      color="inherit">
      <MenuItem disableRipple>
        <Typography
          textAlign="center"
          textTransform="capitalize">
          {props.title}
        </Typography>
      </MenuItem>
    </Link>
  );
}