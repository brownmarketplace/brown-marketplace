import React from 'react';
import BoilerplateHeader from '../components/BoilerplateHeader';
import defaultProfilePicture from '../images/pfp.png';
import './boilerplate-page.css';
function BoilerplatePage(props) {
    return (React.createElement("div", { className: "boilerplate" },
        React.createElement(BoilerplateHeader, { title: props.title, userPicture: props.pfp }),
        React.createElement("div", { style: { textAlign: 'center', marginTop: '30px' } }, "Put your content here.")));
}
BoilerplatePage.defaultProps = {
    title: "placeholder",
    pfp: defaultProfilePicture
};
export default BoilerplatePage;
//# sourceMappingURL=BoilerplatePage.js.map