import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

// Component Imports
import Title from '../boilerplate-components/Title'
import ProfilePageButton from '../boilerplate-components/ProfilePageButton'
import SearchBar from '../explore-components/SearchBar'
import ProductCards from './ProductCards'

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
    const navigate = useNavigate()

    // create a list of dummy categories
    const categories = [
        {
            name: "Room Decor",
            icon: <LightbulbIcon />,
            path: "/category/room-decor",
            subcats: [
                {
                    name: "Plushies",
                    icon: "",
                    path: "/category/plushies"
                },
                {
                    name: "Plants",
                    icon: "",
                    path: "/category/plants"
                },
                {
                    name: "Lights",
                    icon: "",
                    path: "/category/lights"
                },
                {
                    name: "Posters",
                    icon: "",
                    path: "/category/posters"
                },
                {
                    name: "Tapestries", 
                    icon: "",
                    path: "/category/tapestries"
                },
                {
                    name: "Other Room Decor",
                    icon: "",
                    path: "/category/other-room-decor"
                },
            ]
        },
        {
            name: "Clothing",
            icon: <LocalOfferIcon />,
            path: "/category/clothing",
            subcats: [
                {
                    name: "Tops",
                    icon: "",
                    path: "/category/tops"
                },
                {
                    name: "Pants",
                    icon: "",
                    path: "/category/pants"

                },
                {
                    name: "Dresses",
                    icon: "",
                    path: "/category/dresses"
                },
                {
                    name: "Shoes",
                    icon: "",
                    path: "/category/shoes"
                },
                {
                    name: "Coats and Jackets", 
                    icon: "",
                    path: "/category/coats-and-jackets"
                },
                {
                    name: "Other Clothing",
                    icon: "",
                    path: "/category/other-clothing"
                },
            ]
        },
        {
            name: "Furniture",
            icon: <ChairIcon />,
            path: "/category/furniture",
            subcats: [
                {
                    name: "Chairs",
                    icon: "",
                    path: "/category/chairs"
                },
                {
                    name: "Couches",
                    icon: "",
                    path: "/category/couches"
                },
                {
                    name: "Mattresses",
                    icon: "",
                    path: "/category/mattresses"
                },
                {
                    name: "Pillows",
                    icon: "",
                    path: "/category/pillows"
                },
                {
                    name: "Other Furniture",
                    icon: "",
                    path: "/category/other-furniture"
                },
            ]
        },
        {
            name: "Accessories",
            icon: <DiamondIcon />,
            path: "/category/accessories",
            subcats: [
                {
                    name: "Necklace",
                    icon: "",
                    path: "/category/necklace"
                },
                {
                    name: "Bracelet",
                    icon: "",
                    path: "/category/bracelet"
                },
                {
                    name: "Earrings",
                    icon: "",
                    path: "/category/earrings"
                },
                {
                    name: "Hair Clips",
                    icon: "",
                    path: "/category/hair-clips"
                },
                {
                    name: "Other Accessories", 
                    icon: "",
                    path: "/category/other-accessories"
                },
            ]
        },
        {
            name: "Books",
            icon: <MenuBookIcon />,
            path: "/category/books",
            subcats: [
                {
                    name: "Textbooks",
                    icon: "",
                    path: "/category/textbooks"
                },
                {
                    name: "Fiction",
                    icon: "",
                    path: "/category/fiction"
                },
                {
                    name: "Nonfiction",
                    icon: "",
                    path: "/category/nonfiction"
                },
                {
                    name: "Poetry",
                    icon: "",
                    path: "/category/poetry"
                },
                {
                    name: "Other Books", 
                    icon: "",
                    path: "/category/other-books"
                },
            ]
        },
        {
            name: "Electronics & Related",
            icon: <PhoneIphoneIcon />,
            path: "/category/electronics-and-related",
            subcats: [
                {
                    name: "Speakers",
                    icon: "",
                    path: "/category/speakers"
                },
                {
                    name: "Phones",
                    icon: "",
                    path: "/category/phones"
                },
                {
                    name: "Devices",
                    icon: "",
                    path: "/category/devices"
                },
                {
                    name: "Other Electronics & Related",
                    icon: "",
                    path: "/category/other-electronics-and-related"
                },
            ]
        },
        {
            name: "Other",
            icon: <PendingIcon />,
            path: "/category/other",
            subcats: [
                {
                    name: "Miscellaneous",
                    icon: "",
                    path: "/category/miscellaneous"
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
            <Title title={props.title} />
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
        { props.showProfile && <ProfilePageButton userPicture={pfp}/> }
        { !props.showProfile && <div/> } 
    </div>
    )
}

ExploreHeader.defaultProps = {
  showProfile: true
}

export default ExploreHeader