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

    // react-router-dom for navigation
    const navigate = useNavigate()


    return (
    <div className="boilerplate-header">
        {/* On click, returns to the previous page. */}
        <img src={hamburger} alt="categories" className="categories-button" onClick={() => toggleDrawer(true)} />

        <div>
            <Title className="title" title={props.title} />
            <div className="search-bar-container">
                <SearchBar />
            </div>
            {console.log("Before render, isLoggedIn is: ", isLoggedIn)}
            <ProductCards isLoggedIn={isLoggedIn} />
        </div>

        {/* Define Categories Drawer */}
        <Drawer
        PaperProps={{
            sx: {
              backgroundColor: "#FFEFD7",
            }
          }}
        anchor="left" 
        open={drawerOpen} 
        onClose={() => toggleDrawer(false)}>
            <div>
                <Typography ml={2} mt={2} variant="h5" className="drawer-title">
                    Categories
                </Typography>
            </div>

            <List className="categories">   
                {/*Create Buttons for each category */}
                {categories.map(category => (
                    <><ListItemButton key={category.name}
                    onClick={() => navigate(category.path)}>
                        <ListItemIcon>
                            {category.icon}
                        </ListItemIcon>
                        <ListItemText primary={category.name} />
                    </ListItemButton>
                    <List component="div" disablePadding>
                        {/*Create Buttons for each subcategory */}
                        {category.subcats.map(subcat =>  (
                            <ListItemButton sx={{ pl: 4 }} key={subcat.name} 
                            //  On click, go to the subcategory page
                            onClick={() => navigate(subcat.path)}>
                                <ListItemIcon>
                                    {subcat.icon}
                                </ListItemIcon>
                                <ListItemText primary={subcat.name} />
                            </ListItemButton>
                        ))}
                    </List>
                    
                    <Divider /></>    
                ))}
            </List>
        </Drawer>

        {/* If showProfile is true, render ProfilePageButton.
        Else, render empty div to keep the header layout consistent (flex: space-around). */}
        {/* { props.showProfile && <ProfilePageButton userPicture={pfp}/> } */}

        {/* if not logged in, show GoogleLogin, else show ProfilePage */}
        {props.userID ? 
        
        // <Grid
        // container
        // xs={1}
        // direction="column"
        // justifyContent="center"
        // alignItems="center"
        // >
        <div className='profile-container'>
            <ProfilePageButton userPicture={pfp}/>
            <GoogleLogout
                clientId="1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={props.logoutState}
                // onFailure={responseGoogle}
            />
        </div>
        /* </Grid> */
    : 
        <div>
            <GoogleLogin
                clientId="1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={props.loginState}
                onFailure={props.loginState}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>}
        {/* { !props.showProfile && <div>
            <GoogleLogin
                clientId="1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div> } */}
        {/* { props.showProfile && <ProfilePageButton userPicture={pfp}/> }  */}

    
    </div>
    )
}

ExploreHeader.defaultProps = {
  showProfile: false
}

export default ExploreHeader