import React from 'react';
import ExploreHeader from '../components/explore-components/ExploreHeader';
// CSS Imports
import './boilerplate-page.css';
import './explore.css';
// Image Icon Imports
import defaultProfilePicture from '../images/pfp.png';
function Explore(props) {
    return (React.createElement("div", { className: "boilerplate" },
        React.createElement(ExploreHeader, { userID: props.userID, loginState: props.loginState, logoutState: props.logoutState, title: props.title, userPicture: props.pfp }),
        React.createElement("div", { style: { textAlign: 'center', marginTop: '30px' } }, "Empty")));
}
Explore.defaultProps = {
    title: "Brown Marketplace",
    pfp: defaultProfilePicture
};
export default Explore;
//# sourceMappingURL=Explore.js.map