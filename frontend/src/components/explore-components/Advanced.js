// Database Imports
import { ref, set, get, onValue, query, orderByChild, equalTo, child }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from '../../backend/Database/DBInstance'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// MUI Icons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import { Card, CardContent, CardMedia, CardActionArea, Grid, Typography, Tooltip, Zoom, Box, Stack, CardActions, styled } from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { motion } from "framer-motion";


const StyledCardActionArea = styled(CardActionArea)(({ theme }) => `
    .MuiCardActionArea-focusHighlight {
        background: transparent;
    }
`);

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));



const db = [
  {
    name: 'Richard Hendricks',
    url: 'https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I'
  },
  {
    name: 'Erlich Bachman',
    url: 'https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I'
  },
  {
    name: 'Monica Hall',
    url: 'https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I'
  },
  {
    name: 'Jared Dunn',
    url: 'https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I'
  }
]

function Advanced (props) {
  // DB and navigation
  const [products, setProducts] = useState([]); 
  const [canLike, setCanLike] = useState(true);
  const [pids, setPids] = useState([])  
  const [pfps, setPfps] = useState([])
  const navigate = useNavigate()
  // card animation state
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  // DB functions
  const getAllProducts = () => {
    console.log("Calling getAllProds")

    // clear current products
    setProducts([])
    
    const unsubscribe = onValue(ref(database, 'products'), (snapshot) => {
        // save all of the childSnapshots in an array
        let i = 0;
        snapshot.forEach(childSnapshot => {
            setProducts(products => [...products, childSnapshot.val()])
            // add pfp to pfps
            // console.log("SNAP", childSnapshot.val().seller)
            setPfps(pfps => [...pfps, getPfp(childSnapshot.val().seller)])
            i++;
        })

        updateCurrentIndex(i-1)
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

            console.log("Receiving product ids from /recommend", response.data['result'])
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

  const getPfps = () => {
    console.log("Retrieving pfps")
    console.log("PRODUCTS", products)
    // for each product, get the seller id and query DB to get the pfp
    products.forEach(product => {
        onValue(ref(database, 'users/' + product.seller), (snapshot) => {
            console.log("SNAP", snapshot.val())
            setPfps(pfps => [...pfps, snapshot.val().profilePic])
        }
    )})
  }

  const printPFPs = () => {
    console.log("PRINTING PFPs")
    console.log(pfps)
  }

  const getPfp = async (sellerID, id) => {
    console.log("Calling getPfp")
    console.log("PFPS", pfps)
    // given a user ID, query DB for that user's pfp
    await onValue(ref(database, 'users/' + sellerID), (snapshot) => {
        // console.log("Getting pfp for user", sellerID, id, snapshot.val())
        if (snapshot.val()['profilePic']) {
            // print the pfp
            console.log("Printing pfp", snapshot.val()['profilePic'])
            return snapshot.val()['profilePic']
        } 

        return 'https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I'
    })
  }

  const addToLikedList = () => {
    console.log("Added to liked list")

    // get produt id of current product
    const pid = products[currentIndex].id

    const likedListRef = ref(database, 'users/' + props.userID + '/liked-items/' + pid);
    set(likedListRef, "true")
  }

  // const getEverything = async () => {
  //   console.log("Calling getEverything")
  //   // get all products
  //   await getAllProducts()
  //   // get pfps
  //   await getPfps()
  // }

  useEffect(() => {
    const getEverything = async () => {
        // get all products
        await getAllProducts()
        // get pfps
        // await getPfps()
    }

    getEverything().catch(e => console.log("Erroring"))

    // // if not logged in, show all products, else show recommendations
    // if (!props.isLoggedIn) {
    //     console.log("Not logged in")
    //     getAllProducts()
    // } else {
    //     console.log("Logged in")
    //     getEverything()
    //     // getRecommendations()
    // }
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

  // set last direction and decrease current index
  const swiped = (direction, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (dir, idx, id) => {
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
      
    // if swipe was right, go to "/product/product-name"
    if (dir === 'right') {
        navigate(`/product/${id}`)
    }
  }

  const swipe = async (dir) => {
    console.log(currentIndex)
    // if canLike is false, set to true
    if (!canLike) {
        setCanLike(true)
    }
    if (canSwipe && currentIndex < products.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    // if canLike is false, set to true
    if (!canLike) {
        setCanLike(true)
    }

    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {products.map((product, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={product.id}
            onSwipe={(dir) => swiped(dir, index)}
            onCardLeftScreen={(dir) => outOfFrame(dir, index, product.id)}
            // only allow swiping left or right
            preventSwipe={['up', 'down']}
          >
            <Card 
              variant="outlined"
              sx={{ maxWidth: 380,
                    borderRadius: "10px" }} 
              elevation={0}
              component={motion.div}
              whileHover={{
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                scale: 1.05,
                transition: { duration: 0.2 },
              }}>
                <StyledCardActionArea
                  disableRipple
                >
                  <CardMedia
                  component="img"
                  height="360"
                  image={product.pictures[0]}
                  alt={product.name}
                  />
                  <div className='price'>
                    <Typography variant="h5" color="white">
                        {/* If the price's first digit is not dollar sign, add it */}
                        ${parseInt(product.price).toFixed(0)}
                    </Typography>
                  </div>
                  <CardContent
                    className="product-card">
                      <Avatar
                      // get the image from the product's seller pfp
                      src={printPFPs()}
                        // src={"https://lh3.googleusercontent.com/a/AATXAJyvgt7jlsYmgwJF9xaEIj4_ho9cfFLVZE8dc4A3=s96-c"}
                        sx={{ width: 72, height: 72, marginLeft: 1, marginRight: 2}} 
                      />
                      <Stack spacing={0.5}>
                        {/* Header */}
                        <Stack direction={{ sm: "column", md: "row" }} justifyContent="space-between">
                          <Typography variant="h5"
                            sx={{
                              lineHeight: "32px",
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: '1',
                              WebkitBoxOrient: 'vertical',
                            }}>{product.name}</Typography>
                        </Stack>

                          {/* Product description */}
                          <Typography variant="caption" color="text.secondary" align="left"
                            sx={{
                              lineHeight: "16px",
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: '3',
                              WebkitBoxOrient: 'vertical',
                            }}>{product.description}</Typography>
                      </Stack>
                  </CardContent>
                </StyledCardActionArea>

            </Card>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        {/* Swipe Left */}
        <LightTooltip
          TransitionComponent={Zoom} 
          title="Swipe Left"
        >
          <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} disabled={!canSwipe} className="left" onClick={() => swipe('left')}>
            {/* <IconButton style={{ backgroundColor: (!canSwipe || firstSwipe) && '{#c3c4d3' }} className="left" onClick={() => swipe('left')}> */}
            <CloseIcon fontSize="large" />
          </IconButton>
        </LightTooltip>

        {/* Undo */}
        <LightTooltip
          TransitionComponent={Zoom} 
          title="Undo Swipe"
        >
          <IconButton style={{ backgroundColor: !canGoBack && '#c3c4d3'}} disabled={!canGoBack} className="repeat" onClick={() => goBack()}>
            {/* <IconButton style={{ backgroundColor: (!canGoBack || firstSwipe) && '#c3c4d3' }} className="repeat" onClick={() => goBack()}> */}
            <ReplayIcon fontSize="large" />
          </IconButton>
        </LightTooltip>

        {/* Like */}
        <LightTooltip
          TransitionComponent={Zoom}
          title="Add to Like List"
        >
          <IconButton style={{ 
            
            backgroundColor: 
            (!canLike && '#0088ff') || (!canSwipe && '#c3c4d3'),
            
            // if canLike is false, set color to white, otherwise set to color: #62b4f9 !important;
            color: (!canLike && 'white') || '#62b4f9',
          
          }} disabled={!canSwipe || !canLike} className="like"
          // When clicked, make the button turn red and disable it and go to the next card
          onClick={() => {
            addToLikedList()
            setCanLike(false)
          }
          }>
          {/* <IconButton style={{ backgroundColor: (!canSwipe || firstSwipe) && '#c3c4d3' }} className="bookmark" onClick={() => addToLikedList("u3", "p3")}> */}
              <FavoriteIcon fontSize="large" />
          </IconButton>
        </LightTooltip>

        {/* Swipe Right */}
        <LightTooltip
          TransitionComponent={Zoom}
          title="View Product"
        >
        <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} disabled={!canSwipe} className="right" onClick={() => swipe('right')}>
          {/* <IconButton style={{ backgroundColor: (!canSwipe || firstSwipe) && '#c3c4d3' }} className="right" onClick={() => swipe('right')}> */}
              <ShoppingBagIcon fontSize="large" />
          </IconButton>
        </LightTooltip>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  )
}

export default Advanced