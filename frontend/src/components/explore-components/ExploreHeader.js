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
                    path: "/category/room-decor/plushies"
                },
                {
                    name: "Plants",
                    icon: "",
                    path: "/category/room-decor/plants"
                },
                {
                    name: "Lights",
                    icon: "",
                    path: "/category/room-decor/lights"
                },
                {
                    name: "Posters",
                    icon: "",
                    path: "/category/room-decor/posters"
                },
                {
                    name: "Tapestries", 
                    icon: "",
                    path: "/category/room-decor/tapestries"
                },
                {
                    name: "Other Room Decor",
                    icon: "",
                    path: "/category/room-decor/other-room-decor"
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
                    path: "/category/clothing/tops"
                },
                {
                    name: "Pants",
                    icon: "",
                    path: "/category/clothing/pants"

                },
                {
                    name: "Dresses",
                    icon: "",
                    path: "/category/clothing/dresses"
                },
                {
                    name: "Shoes",
                    icon: "",
                    path: "/category/clothing/shoes"
                },
                {
                    name: "Coats and Jackets", 
                    icon: "",
                    path: "/category/clothing/coats-and-jackets"
                },
                {
                    name: "Other Clothing",
                    icon: "",
                    path: "/category/clothing/other-clothing"
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
                    path: "/category/clothing/chairs"
                },
                {
                    name: "Couches",
                    icon: "",
                    path: "/category/clothing/couches"
                },
                {
                    name: "Mattresses",
                    icon: "",
                    path: "/category/clothing/mattresses"
                },
                {
                    name: "Pillows",
                    icon: "",
                    path: "/category/clothing/pillows"
                },
                {
                    name: "Other Furniture",
                    icon: "",
                    path: "/category/clothing/other-furniture"
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
                    path: "/category/clothing/necklace"
                },
                {
                    name: "Bracelet",
                    icon: "",
                    path: "/category/clothing/bracelet"
                },
                {
                    name: "Earrings",
                    icon: "",
                    path: "/category/clothing/earrings"
                },
                {
                    name: "Hair Clips",
                    icon: "",
                    path: "/category/clothing/hair-clips"
                },
                {
                    name: "Other Accessories", 
                    icon: "",
                    path: "/category/clothing/other-accessories"
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
                    path: "/category/books/textbooks"
                },
                {
                    name: "Fiction",
                    icon: "",
                    path: "/category/books/fiction"
                },
                {
                    name: "Nonfiction",
                    icon: "",
                    path: "/category/books/nonfiction"
                },
                {
                    name: "Poetry",
                    icon: "",
                    path: "/category/books/poetry"
                },
                {
                    name: "Other Books", 
                    icon: "",
                    path: "/category/books/other-books"
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
                    path: "/category/electronics-and-related/speakers"
                },
                {
                    name: "Phones",
                    icon: "",
                    path: "/category/electronics-and-related/phones"
                },
                {
                    name: "Devices",
                    icon: "",
                    path: "/category/electronics-and-related/devices"
                },
                {
                    name: "Other Electronics & Related",
                    icon: "",
                    path: "/category/electronics-and-related/other-electronics-and-related"
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
                    path: "/category/other/miscellaneous"
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