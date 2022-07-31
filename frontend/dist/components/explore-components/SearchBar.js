import React, { useRef, useState } from "react";
// CSS styles
import './search-bar.css';
// MUI styles
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
function SearchBar() {
    var _a = useState(''), input = _a[0], setInput = _a[1];
    var _b = useState(false), isFocused = _b[0], toggleIsFocused = _b[1];
    var searchRef = useRef(null);
    // Search function that routes to the search results
    var search = function (e) {
        e.preventDefault();
        // Route to the category search page for the input "category/input"
        window.location.href = "/category/".concat(input);
    };
    return (React.createElement("div", { className: "search-bar-container" },
        React.createElement("div", { className: "search-bar ".concat(isFocused ? "on-focus" : "no-focus"), ref: searchRef },
            React.createElement(Paper, { elevation: isFocused ? 3 : 0 },
                React.createElement("form", { className: "search-icon" },
                    React.createElement(IconButton, { type: "submit", onClick: search },
                        React.createElement(SearchIcon, { className: "search-icon" })),
                    React.createElement("input", { value: input, onChange: function (e) { return setInput(e.target.value); }, onFocus: function () { return toggleIsFocused(true); }, onBlur: function () { return setTimeout(function () { return toggleIsFocused(false); }, 500); }, className: "search-input", placeholder: "Search" }))))));
}
export default SearchBar;
//# sourceMappingURL=SearchBar.js.map