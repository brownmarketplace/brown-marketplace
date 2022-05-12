import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

// Component Imports
import Title from '../boilerplate-components/Title'
import ProfilePageButton from '../boilerplate-components/ProfilePageButton'
import SearchBar from '../explore-components/SearchBar'
import ProductCards from './ProductCards'
import {GoogleLogin, GoogleLogout, useGoogleLogin} from 'react-google-login';

// Image Imports
import hamburger from "../../images/hamburger.png"
import pfp from "../../images/profile-pic.png"

// CSS Imports
import '../boilerplate-header.css'
import './explore-header.css'

// MUI Icons
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ChairIcon from '@mui/icons-material/Chair';
import StarBorder from '@mui/icons-material/StarBorder';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DiamondIcon from '@mui/icons-material/Diamond';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PendingIcon from '@mui/icons-material/Pending';

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

function ExploreHeader(props) {
    // State for Categories Drawer
    const [drawerOpen, toggleDrawer] = useState(false) 
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // State for login
    const responseGoogle = (response) => {
        // make the props.showprofilepage true
        setIsLoggedIn(true)
        console.log(response);
    }

    const logoutState = () => {
        // make the props.showprofilepage true
        setIsLoggedIn(false);
    }

    // react-router-dom for navigation
    const navigate = useNavigate()

    // create a list of dummy categories
    const categories = [
        {
            name: "Room Decor",
            icon: <LightbulbIcon />,
            path: "/category/Room Decor",
            subcats: [
                {
                    name: "Plushies",
                    icon: "",
                    path: "/category/Room Decor/Plushies"
                },
                {
                    name: "Plants",
                    icon: "",
                    path: "/category/Room Decor/Plants"
                },
                {
                    name: "Lights",
                    icon: "",
                    path: "/category/Room Decor/Lights"
                },
                {
                    name: "Posters",
                    icon: "",
                    path: "/category/Room Decor/Posters"
                },
                {
                    name: "Tapestries", 
                    icon: "",
                    path: "/category/Room Decor/Tapestries"
                },
                {
                    name: "Other room decor",
                    icon: "",
                    path: "/category/Room Decor/Other room decor"
                },
            ]
        },
        {
            name: "Clothing",
            icon: <LocalOfferIcon />,
            path: "/category/Clothing",
            subcats: [
                {
                    name: "Tops",
                    icon: "",
                    path: "/category/Clothing/Tops"
                },
                {
                    name: "Pants",
                    icon: "",
                    path: "/category/Clothing/Pants"

                },
                {
                    name: "Dresses",
                    icon: "",
                    path: "/category/Clothing/Dresses"
                },
                {
                    name: "Shoes",
                    icon: "",
                    path: "/category/Clothing/Shoes"
                },
                {
                    name: "Coats and Jackets", 
                    icon: "",
                    path: "/category/Clothing/Coats and Jackets"
                },
                {
                    name: "Other Clothing",
                    icon: "",
                    path: "/category/Clothing/Other Clothing"
                },
            ]
        },
        {
            name: "Furniture",
            icon: <ChairIcon />,
            path: "/category/Furniture",
            subcats: [
                {
                    name: "Chairs",
                    icon: "",
                    path: "/category/Furniture/Chairs"
                },
                {
                    name: "Couches",
                    icon: "",
                    path: "/category/Furniture/Couches"
                },
                {
                    name: "Mattresses",
                    icon: "",
                    path: "/category/Furniture/Mattresses"
                },
                {
                    name: "Pillows",
                    icon: "",
                    path: "/category/Furniture/Pillows"
                },
                {
                    name: "Other furniture",
                    icon: "",
                    path: "/category/Furniture/Other furniture"
                },
            ]
        },
        {
            name: "Accessories",
            icon: <DiamondIcon />,
            path: "/category/Accessories",
            subcats: [
                {
                    name: "Necklace",
                    icon: "",
                    path: "/category/Accessories/Necklace"
                },
                {
                    name: "Bracelet",
                    icon: "",
                    path: "/category/Accessories/Bracelet"
                },
                {
                    name: "Earrings",
                    icon: "",
                    path: "/category/Accessories/Earrings"
                },
                {
                    name: "Hair clips",
                    icon: "",
                    path: "/category/Accessories/Hair clips"
                },
                {
                    name: "Other accessories", 
                    icon: "",
                    path: "/category/Accessories/Other accessories"
                },
            ]
        },
        {
            name: "Books",
            icon: <MenuBookIcon />,
            path: "/category/Books",
            subcats: [
                {
                    name: "Textbooks",
                    icon: "",
                    path: "/category/Books/Textbooks"
                },
                {
                    name: "Fiction",
                    icon: "",
                    path: "/category/Books/Fiction"
                },
                {
                    name: "Nonfiction",
                    icon: "",
                    path: "/category/Books/Nonfiction"
                },
                {
                    name: "Poetry",
                    icon: "",
                    path: "/category/Books/Poetry"
                },
                {
                    name: "Other books", 
                    icon: "",
                    path: "/category/Books/Other books"
                },
            ]
        },
        {
            name: "Electronics & related",
            icon: <PhoneIphoneIcon />,
            path: "/category/Electronics & related",
            subcats: [
                {
                    name: "Speakers",
                    icon: "",
                    path: "/category/Electronics & related/Speakers"
                },
                {
                    name: "Phones",
                    icon: "",
                    path: "/category/Electronics & related/Phones"
                },
                {
                    name: "Devices",
                    icon: "",
                    path: "/category/Electronics & related/Devices"
                },
                {
                    name: "Other electronics and related",
                    icon: "",
                    path: "/category/Electronics & related/Other electronics and related"
                },
            ]
        },
        {
            name: "Other",
            icon: <PendingIcon />,
            path: "/category/Other",
            subcats: [
                {
                    name: "Miscellaneous",
                    icon: "",
                    path: "/category/Other/Miscellaneous"
                },
            ]
        }
    ]

    const handleClick = (path) => {
        navigate(path)
    }


    return (
    <div className="boilerplate-header">
        {/* On click, returns to the previous page. */}
        <img src={hamburger} alt="categories" className="categories-button" onClick={() => toggleDrawer(true)} />

        <div>
            <Title className="title" title={props.title} />
            <div className="search-bar-container">
                <SearchBar />
            </div>
            <ProductCards />
        </div>

        {/* Define Categories Drawer */}
        <Drawer className='drawer'
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
        {console.log(isLoggedIn)}
        {isLoggedIn ? <div>
        <ProfilePageButton userPicture={pfp}/>
        <GoogleLogout
            clientId="1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={()=>setIsLoggedIn(false)}
            // onFailure={responseGoogle}
        />
    </div> : <div>
            <GoogleLogin
                clientId="1059069811880-vd8dfe9l4qc3imjvrk7r6c5p46sm68nm.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
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