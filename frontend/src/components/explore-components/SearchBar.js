import React, {useEffect, useRef, useState} from "react";

// CSS styles
import './search-bar.css'

// MUI styles
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
    const [input, setInput] = useState('');
    const [isFocused, toggleIsFocused] = useState(false)
    const searchRef = useRef(null)

    // Search function that routes to the search results
    const search = e => {
        e.preventDefault();
        // Route to the category search page for the input "category/input"
        window.location.href = `/category/${input}`
    }


    return (
        <div className="search-bar-container">
            <div className={`search-bar ${isFocused ? "on-focus" : "no-focus"}`} ref={searchRef}>
                <Paper elevation={isFocused ? 3 : 0}>
                    {/* Used a form and made IconButton type submit to detect clicking enter */}
                    <form className="search-icon">
                        <IconButton type="submit" onClick={search}>
                            <SearchIcon className="search-icon"/>
                        </IconButton>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onFocus={() => toggleIsFocused(true)}
                            onBlur={() => setTimeout(() => toggleIsFocused(false), 500)}
                            className="search-input"
                            placeholder="Search"/>
                    </form>
                </Paper>
            </div>
        </div>
    )
}

export default SearchBar