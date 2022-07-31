import React from 'react';
import { Link } from 'react-router-dom';
import Title from './boilerplate-components/Title';
import ProfilePageButton from './boilerplate-components/ProfilePageButton';
import xButton from "../images/back-button.png";
import pfp from "../images/profile-pic.png";
import './boilerplate-header.css';
function BoilerplateHeader(props) {
    return (React.createElement("div", { className: "boilerplate-header" },
        React.createElement(Link, { to: -1 },
            React.createElement("img", { src: xButton, alt: "back", className: "xButton", style: { width: 50, height: 50 } })),
        React.createElement(Link, { to: "/explore", className: "title-link" },
            React.createElement(Title, { title: "Brown Marketplace", height: 50, style: { height: 50 } })),
        props.showProfile && React.createElement(ProfilePageButton, { userID: props.userID, userPicture: pfp }),
        !props.showProfile && React.createElement("div", null)));
}
BoilerplateHeader.defaultProps = {
    showProfile: true
};
export default BoilerplateHeader;
//# sourceMappingURL=BoilerplateHeader.js.map