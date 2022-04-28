import React from 'react';
import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import './tag.css'

function Tag(props) {
  return (
    <Button variant="contained">Contained</Button>
    // <StarIcon></StarIcon>
    // <a href=""><div className="tag">tag1</div></a>
  );
}

Tag.defaultProps = {
  tagName: "tag name",
}

export default Tag;