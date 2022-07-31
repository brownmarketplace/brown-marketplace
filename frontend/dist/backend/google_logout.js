import { GoogleLogout } from 'react-google-login';
// Load the data from backend
function GoogleLogoutButton() {
    var responseGoogle = function (response) {
        console.log(response);
    };
    return (React.createElement("div", null,
        React.createElement(GoogleLogout, { clientId: "1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com", buttonText: "Logout", onLogoutSuccess: function () { return console.log("success"); }, onFailure: responseGoogle })));
}
export default GoogleLogoutButton;
//# sourceMappingURL=google_logout.js.map