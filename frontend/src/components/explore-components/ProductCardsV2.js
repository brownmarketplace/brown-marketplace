// Database Imports
import { ref, onValue }
  from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import database from '../../backend/Database/DBInstance'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import React, { useState, useEffect, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import { Card, CardContent, CardMedia, CardActionArea, Typography, Stack, styled } from '@mui/material';
import { motion } from "framer-motion";
import SellerAvatar from './SellerAvatar'
import ProductButtonsV2 from "./ProductButtonsV2.js";

// Styles for card action area
const StyledCardActionArea = styled(CardActionArea)(({ theme }) => `
    .MuiCardActionArea-focusHighlight {
        background: transparent;
    }
`);

/**
 * Card components that defines the Tinder-style card component.
 * Contains logic to swipe left, undo their swipe, like the current card, or swipe right,
 * and shares state with the ProductButtonsV2 component.
 */
function ProductCardsV2 (props) {
  // DB and navigation
  const [products, setProducts] = useState([]); 
  const [canLike, setCanLike] = useState(true);
  const [pids, setPids] = useState([])  
  const [pfps, setPfps] = useState([])
  const [lastDirection, setLastDirection] = useState()
  const navigate = useNavigate()
  // card animation state
  const [currentIndex, setCurrentIndex] = useState(products.length - 1)
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  /**
   * Function that gets all the products from the database and sets them to the state.
   * This is called when the component is first rendered, and if the user
   * is not currently logged in.
   */
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

  /**
   * Function that gets products from the Recommendation System and sets them to the state.
   * This is called when the component is first rendered, and if the user
   * is currently logged in.
   * 
   * It makes a post request to the Recommendation System API endpoint to retieve Product ID's,
   * which are then used to retrieve the products from the database.
   */
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

  const getPfps = (prods) => {
    let pfps = []
    console.log("PRODS", prods)
    console.log("LENGTH", prods.length)
    // for each product, get the seller id and query DB to get the pfp
    prods.forEach(product => {
        onValue(ref(database, 'users/' + product.seller), (snapshot) => {
            console.log("SNAP", snapshot.val())
            // setPfps(pfps => [...pfps, snapshot.val().profilePic])
            pfps.push(snapshot.val().profilePic)
        }
    )})

    return pfps
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

  /**
   * Called when the page is rendering or if the user logs in/out, the
   * useEffect determines whether the user is logged in or not, and calls the appropriate function
   * for product retrieval.
   */
  useEffect(() => {
    console.log("USERID", props.userID)
    // if userID is null, get all products
    if (props.userID === null) {
      console.log("logged out")
    } else {
      console.log("logged in")
    }
    console.log("IS LOGGED IN", props.isLoggedIn)
    // if not logged in, show all products, else show recommendations
    if (!props.isLoggedIn) {
        console.log("Not logged in")
        getAllProducts()
    } else {
        console.log("Logged in")
        getAllProducts()
        // getRecommendations()
    }
  }, [props.isLoggedIn])
 
  /**
   * useMemo is used to memoize the products array, so that the component does not re-render
   * unnecessarily.
   */
  let childRefs = useMemo(
    () => 
    Array(products.length)
        .fill(0)
        .map((i) => React.createRef()), [products]
  )

  /**
   * Function that updates the current index of the card,
   * updated when the user drags the card or uses the swipe buttons.
   */
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  /**
   * Variable used to determine if the user is able to undo their swipe.
   */
  const canGoBack = currentIndex < products.length - 1

  /**
   * Variable used to determine if the user is able to swipe anymore.
   * 
   */
  const canSwipe = currentIndex >= 0

  /**
   * Function that is called once the card is swiped by dragging rather than by buttons.
   * It sets the last direction of the swipe, and updates the current index.
   * 
   * It also sets canLike back to true, so that the user can like the next product.
   */
  const swiped = (direction, index) => {
    if (canLike) {
      setCanLike(true)
    }
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  /**
   * Function called when the card has left the screen using the swipe buttons rather
   * than by dragging.
   * 
   * It sets canLike to true, so that the user can like the next product,
   * and handles edge cases where a user may swipe a card and then swipe it back 
   * before it has left the screen.
   * 
   * If the swipe was right, the user is navigated to the product page.
   */
  const outOfFrame = (dir, idx, id) => {
    if (!canLike) {
      setCanLike(true)
    }
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
      
    // if swipe was right, go to "/product/product-name"
    if (dir === 'right') {
        navigate(`/productV2/${id}`)
    }
  }

  /**
   * Function that is called when the user swipes the card,
   * and checks if the user can swipe and if the currentIndex is valid.
   * 
   * It uses childRefs to get the current card, and then calls the swipe function on the card.
   * 
   * It also ensures that the user can only like a product once.
   */
  const swipe = async (dir) => {
    if (!canLike) {
        setCanLike(true)
    }
    if (canSwipe && currentIndex < products.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  /**
   * Function that is called when the user presses the undo button.
   * It re-enables the user to swipe again.
   */
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
      <div className='cardContainer'>
        {/* Generate cards for all retrieved products */}
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
                  // if the product has a picture, use that, else use a placeholder
                  image={product.pictures ? product.pictures[0] : 'https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I'}
                  alt={product.name}
                  />
                  <div className='price'>
                    <Typography variant="h5" color="black" style={{ fontWeight: 600 }}>
                        ${parseInt(product.price).toFixed(0)}
                    </Typography>
                  </div>
                  <CardContent
                    className="product-card">
                      <SellerAvatar userID={product.seller} />
                      <Stack spacing={0.5}>
                        {/* Product Name */}
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

        {/* Product Buttons */}
        <ProductButtonsV2
          products={products}
          currentIndex={currentIndex}
          canSwipe={canSwipe}
          canGoBack={canGoBack}
          canLike={canLike}
          setCanLike={setCanLike}
          userID={props.userID}
          goBack={goBack}
          swipe={swipe}
          isLoggedIn={props.isLoggedIn}
        />
    </div>
  )
}

// Default props for the component
ProductCardsV2.defaultProps = {
  userID: '',
  isLoggedIn: false
}

export default ProductCardsV2;