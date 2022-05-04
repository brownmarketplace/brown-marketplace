import React from 'react';

import Button from '@mui/material/Button';

function Tag(props) {
  // get products by props.tagName
  // const showProducts = () => {
  //   props.setProductIds(Array.from({ length: 6 }, (v, k) => k + 1))
  // }

  return (
    <Button variant="text" size="large" color="inherit"
      onClick={() => props.setTag(props.tagName)}
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        // marginLeft: 10,
        marginRight: 20,
      }}>
      {props.tagName}
    </Button>
  );
}

Tag.defaultProps = {
  tagName: "tag name",
}

export default Tag;