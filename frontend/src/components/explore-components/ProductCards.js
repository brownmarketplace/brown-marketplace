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

// MUI Icons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

// Database Imports
import { ref, set, get, onValue, query, orderByChild, equalTo, child }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from '../../backend/Database/DBInstance'


function ProductCards(props) {
    const [products, setProducts] = useState([]);  
    // const [products, setProducts] = useState(sample);  
    const [pids, setPids] = useState([])  

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

    const postRequestRecommendations = () => {
        console.log("Calling postRequestRecommendations")
        
        const postConfig = {headers: {
            // 'Content-Type': 'application/json;charset=UTF-8',
            // "Access-Control-Allow-Origin": "*",
        }}

        // Send the user id to backend
        let toSend = {user: "u1"}
        const recommendUrl = "http://127.0.0.1:4567/recommend"
        
        console.log("Entering post request")
        
        axios.post(recommendUrl, toSend, postConfig)
            // .then(() => console.log("post ran"))
            .then((response) => {
                console.log("recommendation loaded successfully");
                // setPids(response.data['result']);
                console.log("Making call", response.data)
                console.log("pids: " + pids)
            })
            .catch(e => console.log("Erroring"))
            // wait for the response to come back, then set the products
    }


    const getRecommendations = () => {
        console.log("Calling getRecommendations")
        
        // clear current products
        setProducts([])   
        
        
        const postConfig = {headers: {
            // 'Content-Type': 'application/json;charset=UTF-8',
            // "Access-Control-Allow-Origin": "*",
        }}

        // Send the user id to backend
        let toSend = {user: "u1"}
        const recommendUrl = "http://127.0.0.1:4567/recommend"
        
        console.log("Entering post request")
        
        axios.post(recommendUrl, toSend, postConfig)
            // .then(() => console.log("post ran"))
            .then((response) => {
                console.log("recommendation loaded successfully");
                console.log("data: " + response.data['result'])
                setPids(response.data['result']);
                console.log("pids: " + pids)
                // loop through the pids array to get the product IDs from the database, and set products to the products array
                response.data['result'].forEach(pid => {
                    onValue(ref(database, 'products/' + pid), (snapshot) => {
                        setProducts(products => [...products, snapshot.val()])
                    }
                )})
                console.log("current products: " + products)
            })
            .catch(e => console.log("Erroring"))
            .then(() => {
                console.log("FINISHED")
            })

        console.log("Finished loading recc's")
    }

    const addToLikedList = (userID, productID) => {
        console.log("Added to liked list")
        const likedListRef = ref(database, 'users/' + userID + '/liked-items/' + productID);
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

    const childRefs = useMemo(
        () => 
        Array(products.length)
            .fill(0)
            .map((i) => React.createRef()), [props.isLoggedIn]
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < products.length - 1

    const canSwipe = currentIndex >= 0

    const firstSwipe = currentIndex === -1 && products.length > 0

    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
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
                        onSwipe={(dir) => swiped(dir, product.name, index)}
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
                                    {product.name}
                                </Typography>
                                {/* Set character limit so all cards are uniform */}
                                <Typography variant="body2" color="text.secondary">
                                    {/* If description exceeds on line, replace with ellipsis */}
                                    {product.description.length > 70 ? product.description.substring(0, 70) + " [...]" : product.description}    
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
                <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} className="left" onClick={() => swipe('left')}>
                {/* <IconButton style={{ backgroundColor: (!canSwipe || firstSwipe) && '#c3c4d3' }} className="left" onClick={() => swipe('left')}> */}
                    <CloseIcon fontSize="large" />
                </IconButton>
                <IconButton style={{ backgroundColor: !canGoBack && '#c3c4d3' }} className="repeat" onClick={() => goBack()}>
                {/* <IconButton style={{ backgroundColor: (!canGoBack || firstSwipe) && '#c3c4d3' }} className="repeat" onClick={() => goBack()}> */}
                    <ReplayIcon fontSize="large" />
                </IconButton>
                <IconButton style={{ backgroundColor: !canSwipe  && '#c3c4d3' }} className="bookmark" onClick={() => addToLikedList("u3", "p3")}>
                {/* <IconButton style={{ backgroundColor: (!canSwipe || firstSwipe) && '#c3c4d3' }} className="bookmark" onClick={() => addToLikedList("u3", "p3")}> */}
                    <FavoriteIcon fontSize="large" />
                </IconButton>
                <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} className="right" onClick={() => swipe('right')}>
                {/* <IconButton style={{ backgroundColor: (!canSwipe || firstSwipe) && '#c3c4d3' }} className="right" onClick={() => swipe('right')}> */}
                    <ShoppingBagIcon fontSize="large" />
                </IconButton>
                {/* <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} className="rec" onClick={postRequestRecommendations}>
                {/* <IconButton style={{ backgroundColor: (!canSwipe || firstSwipe) && '#c3c4d3' }} className="right" onClick={() => swipe('right')}> */}
                    {/* <CloseIcon fontSize="large" /> */}
                {/* </IconButton> */} 
            </div>
            {/* If can't swipe, display "Swipe to get Started" */}
            {/* {firstSwipe && <div className='swipe-to-get-started'>
                <Typography variant="h5" color="textPrimary">
                    Swipe to get started
                </Typography>
            </div>} */}
        </div>
    );
}

export default ProductCards;