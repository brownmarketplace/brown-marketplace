import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
function ClearButton(props) {
    return (React.createElement("div", { style: { marginTop: "24px" } },
        React.createElement(AwesomeButton, { type: "secondary", onPress: function (e) { return props.handleSubmit(e); } }, "Clear")));
}
export default ClearButton;
//# sourceMappingURL=ClearButton.js.map