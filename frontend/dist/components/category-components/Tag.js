import React from 'react';
import Button from '@mui/material/Button';
function Tag(props) {
    return (React.createElement(Button, { variant: "text", size: "large", color: "inherit", onClick: props.setTag, style: {
            textTransform: 'none',
            paddingTop: 0,
            paddingBottom: 0,
            // paddingLeft: 10,
            // paddingRight: 10,
            // marginLeft: 10,
            marginRight: 10,
        } }, props.tagName));
}
Tag.defaultProps = {
    tagName: "tag name",
    setTag: function () { return null; },
};
export default Tag;
//# sourceMappingURL=Tag.js.map