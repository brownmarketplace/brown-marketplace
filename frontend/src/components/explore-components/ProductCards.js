import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Component Imports
import TinderCard from "react-tinder-card";

// CSS Import
import './product-cards.css'

// MUI Components
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

// MUI Icons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';

// Database Imports
import { ref, set, get, onValue, query, orderByChild, equalTo, child }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from '../../backend/Database/DBInstance'


function ProductCards(props) {
    const [products, setProducts] = useState([]);  
    // const [products, setProducts] = useState(sample);  
    const [pids, setPids] = useState([])  

    // state for liked ToolTip component
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
        addToLikedList();
    };

    const [currentIndex, setCurrentIndex] = useState(products.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)
    const navigate = useNavigate()

    const getAllProducts = () => {
        console.log("Calling getAllProds")

        // clear current products
        setProducts([])
        
        const unsubscribe = onValue(ref(database, 'products'), (snapshot) => {
            // save all of the childSnapshots in an array
            let i = 1;
            snapshot.forEach(childSnapshot => {
                setProducts(products => [...products, childSnapshot.val()])
                i++;
            })      
        });

        return () => {
            // unsubscribe / cleanup from the database
            unsubscribe();
        }
    }

    const getRecommendations = () => {
        console.log("Calling getRecommendations")
        
        // clear current products
        setProducts([])   

        const postConfig = {headers: {}}
        
        const recommendUrl = "http://127.0.0.1:4567/recommend"
        axios.post(recommendUrl, postConfig)
            .then((response) => {
                setPids(response.data['result']);

                // loop through the pids array to get the product IDs from the database, and set products to the products array
                response.data['result'].forEach(pid => {
                    onValue(ref(database, 'products/' + pid), (snapshot) => {
                        setProducts(products => [...products, snapshot.val()])
                    }
                )})
            })
            .catch(e => console.log("Erroring"))
    }

    const addToLikedList = () => {
        console.log("Added to liked list")

        // get produt id of current product
        const pid = products[currentIndex].id

        const likedListRef = ref(database, 'users/' + props.userID + '/liked-items/' + pid);
        set(likedListRef, "true")
    }

    useEffect(() => {
        // if not logged in, show all products, else show recommendations
        if (!props.isLoggedIn) {
            console.log("Not logged in")
            getAllProducts()
        } else {
            console.log("Logged in")
            getRecommendations()
        }
    }, [props.isLoggedIn])

    let childRefs = useMemo(
        () => 
        Array(products.length)
            .fill(0)
            .map((i) => React.createRef()), [products]
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < products.length - 1

    const canSwipe = currentIndex >= 0

    const firstSwipe = currentIndex === -1 && products.length > 0

    // set last direction and decrease current index
    const swiped = (direction, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (dir, name, idx, id) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
      
        // if swipe was right, go to "/product/product-name"
        if (dir === 'right') {
            navigate(`/product/${id}`)
        }
    }

    const swipe = async (dir) => {
        console.log("refs: ", childRefs)
        if (canSwipe && currentIndex < products.length) {
        await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    // increase current index and show card
    const goBack = async () => {
        console.log("refs: ", childRefs)
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
    }

    return (
        <div className='swiper-container'>
            <div className="cards-container">
                {products.map((product, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className="swipe"
                        // give each card a unique key, efficient to re-render
                        key={product.id}
                        // update current index when card is swiped
                        onSwipe={(dir) => swiped(dir, index)}
                        // when card leaves screen, update current index
                        onCardLeftScreen={(dir) => outOfFrame(dir, product.name, index, product.id)}
                        // only allow swiping left or right
                        preventSwipe={['up', 'down']}
                    >
                        <Card sx={{ maxWidth: 600 }} elevation={2}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={product.pictures}
                                alt="product picture"
                            />
                            <CardContent className='product-card'>
                                <Typography gutterBottom variant="h5" component="div">
                                    {/* If name exceeds limit, replace with ellipsis */}
                                    {product.name.length > 25 ? product.name.substring(0, 20) + "..." : product.name}
                                </Typography>
                                {/* Set character limit so all cards are uniform */}
                                <Typography variant="body2" color="text.secondary">
                                    {/* If description exceeds on line, replace with ellipsis */}
                                    {product.description.length > 50 ? product.description.substring(0, 50) + " [...]" : product.description}    
                                </Typography>
                                <div className='price'>
                                {/* <Paper backgroundColor="#7fadff" className="price" elevation={1}> */}
                                    <Typography variant="h5" color="white">
                                        {/* If the price's first digit is not dollar sign, add it */}
                                        {product.price.charAt(0) !== '$' ? `$${product.price}` : product.price}
                                    </Typography>
                                {/* </Paper> */}
                                </div>
                            </CardContent>
                            </Card>
                    </TinderCard>
                ))}
            </div>
            <div className='product-buttons'>
                {/* Log currentIndex */}
                {console.log("currentIndex: ", currentIndex)}
                {/* Log can swipe and canGoBack */}
                {console.log("canSwipe: ", canSwipe, "canGoBack: ", canGoBack)}
                {/* Log refs */}
                {console.log("refs: ", childRefs)}
                <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} className="left" onClick={() => swipe('left')}>
                {/* <IconButton style={{ backgroundColor: (!canSwipe || firstSwipe) && '#c3c4d3' }} className="left" onClick={() => swipe('left')}> */}
                    <CloseIcon fontSize="large" />
                </IconButton>
                <IconButton style={{ backgroundColor: !canGoBack && '#c3c4d3' }} className="repeat" onClick={() => goBack()}>
                {/* <IconButton style={{ backgroundColor: (!canGoBack || firstSwipe) && '#c3c4d3' }} className="repeat" onClick={() => goBack()}> */}
                    <ReplayIcon fontSize="large" />
                </IconButton>

                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                    <Tooltip
                        PopperProps={{
                        disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title="Liked!"
                    >
                        <IconButton style={{ backgroundColor: !canSwipe  && '#c3c4d3' }} className="like" onClick={() => 
                            // add product
                            handleTooltipOpen()}>
                        {/* <IconButton style={{ backgroundColor: (!canSwipe || firstSwipe) && '#c3c4d3' }} className="bookmark" onClick={() => addToLikedList("u3", "p3")}> */}
                            <FavoriteIcon fontSize="large" />
                        </IconButton>
                        {/* <Button onClick={handleTooltipOpen}>Click</Button> */}
                    </Tooltip>
                    </div>
                </ClickAwayListener>

                <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} className="right" onClick={() => swipe('right')}>
                {/* <IconButton style={{ backgroundColor: (!canSwipe || firstSwipe) && '#c3c4d3' }} className="right" onClick={() => swipe('right')}> */}
                    <ShoppingBagIcon fontSize="large" />
                </IconButton>
            </div>

            {/* If user is logged in, display the listing button, else blank */}
            {props.isLoggedIn ?
            <div className="listing-container">
            <Tooltip title="Add new listing">
                <Button
                    className='new-listing'
                    variant={'outlined'}
                    // add more border radius
                    sx={{
                        borderRadius: '25%',
                        border: '1px solid #c3c4d3',
                        // on hover, change border color
                        '&:hover': {
                            borderColor: '#c3c4d3',
                        },
                    }}
                    onClick={() => navigate('/sell')}
                >
                    <AddIcon fontSize="large" />
                </Button>   
            </Tooltip>
        </div> : null}
        </div>
    );
}

export default ProductCards;