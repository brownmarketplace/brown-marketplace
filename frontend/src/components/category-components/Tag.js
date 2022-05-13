import React from 'react'

import Button from '@mui/material/Button'

function Tag(props) {
  return (
    <Button variant="text" size="large" color="inherit"
      onClick={props.setTag}
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10,
        marginRight: 10,
      }}>
      {props.tagName}
    </Button>
  )
}

Tag.defaultProps = {
  tagName: "tag name",
  setTag: () => null,
}

export default Tag