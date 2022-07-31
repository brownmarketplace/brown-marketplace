import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

// Component Imports
import Title from '../boilerplate-components/Title'
import ProfilePageButton from '../boilerplate-components/ProfilePageButton'
import SearchBar from '../explore-components/SearchBar'
import ProductCards from './ProductCards'
import {GoogleLogin, GoogleLogout, useGoogleLogin} from 'react-google-login';
// a variable that stores the categories and their respective MUI icon and subcategories
import categories from "./categories"

// Image Imports
import hamburger from "../../images/hamburger.png"
import pfp from "../../images/profile-pic.png"

// CSS Imports
import '../boilerplate-header.css'
import './explore-header.css'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Container from '@mui/material/Container'
import Search from '@mui/icons-material/Search'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { ListItemIcon } from '@mui/material'
import Typography from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid'

function ExploreHeader(props) {
    // State for Categories Drawer
    const [drawerOpen, toggleDrawer] = useState(false) 
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    return (
    <div className="boilerplate-header">
        <div>
            <ProductCards userID={props.userID} />
        </div>
    </div>
    )
}

ExploreHeader.defaultProps = {
  showProfile: false
}

export default ExploreHeader