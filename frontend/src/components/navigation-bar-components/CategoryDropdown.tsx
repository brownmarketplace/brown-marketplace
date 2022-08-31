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
        // onMouseOver={handleClick}
        disableRipple
        color="inherit"
        sx={{
          borderRadius: "1000px",
        }}>
        <Typography textTransform="capitalize">
          {props.category.title}
        </Typography>
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        // MenuListProps={{ onMouseLeave: handleClose }}
        onClose={handleClose}>
        {props.category.subcategories.map((subcategory, idx) =>
          <Link href={`/result/${props.category.title}/${subcategory}`}
            key={idx}
            underline="hover"
            color="inherit">
            <MenuItem disableRipple>
              <Typography
                textAlign="center"
                textTransform="capitalize">
                {subcategory}
              </Typography>
            </MenuItem>
          </Link>)}
      </Menu>
    </Box>
  );
}