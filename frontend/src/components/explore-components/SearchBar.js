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
    const [isFocused, toggleIsFocused] = useState(false)
    const searchRef = useRef(null)

    return (
        <div className="search-bar-container">
            <div className={`search-bar ${isFocused ? "on-focus" : "no-focus"}`} ref={searchRef}>
                <Paper elevation={isFocused ? 3 : 0}>
                    <div className="search-icon">
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>
                        <input
                            onChange={e => console.log(e.currentTarget.value)}
                            onFocus={() => toggleIsFocused(true)}
                            onBlur={() => setTimeout(() => toggleIsFocused(false), 500)}
                            className="search-input"
                            placeholder="Search"/>
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default SearchBar