import React from 'react';
import { Link } from 'react-router-dom';
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
function PublishListing(props) {
    return (React.createElement("div", { style: { marginTop: "24px" } },
        React.createElement(Link, { to: "" },
            React.createElement(AwesomeButton, { type: "secondary", userId: props.userId, productId: props.productId, onPress: props.handleFormSubmit }, "Publish"))));
}
export default PublishListing;
//# sourceMappingURL=PublishListing.js.map