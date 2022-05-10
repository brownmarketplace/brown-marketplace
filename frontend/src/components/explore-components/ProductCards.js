import React, { useState, useMemo, useRef } from 'react'
import { useNavigate } from "react-router-dom";

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

function ProductCards() {
    const [products, setProducts] = useState([
        {
            name: 'Frog',
            url: 'https://www.aquariumofpacific.org/images/exhibits/Magnificent_Tree_Frog_900.jpg',
            description: 'Cool animal that lives on Earth',
            price: '$10'
        },
        {
            name: 'Flamingo',
            url: 'https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg',
            description: 'Cool animal that lives on Earth',
            price: '$10'
        },
        {
            name: 'Fox',
            url: 'https://i.pinimg.com/564x/ef/49/37/ef493790714a037449d62d3f2a6fccbf.jpg',
            description: 'Cool animal that lives on Earth',
            price: '$10'
        },
        {
            name: 'Seal',
            url: 'https://i.pinimg.com/564x/0e/81/6e/0e816e21de2f3ed8f12b3b8426a35bac.jpg',
            description: 'Cool animal that lives on Earth and is really cute!',
            price: '$10'
        },
        {
            name: 'Meerkat',
            url: 'https://i.pinimg.com/564x/94/d4/ac/94d4acf4890271614be7018e7f035efe.jpg',
            description: 'Cool animal that lives on Earth',
            price: '$10000'
        },
        {
            name: 'Mushroom Crochets',
            url: 'https://embed.filekitcdn.com/e/pZVtAQBFhqs4ADp3yRAnVv/6J9S2S2ez1N2JNCkbxCfKt',
            description: 'Cool animal that lives on Earth',
            price: '$10'
        },
        ]);    

    const [currentIndex, setCurrentIndex] = useState(products.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)
    const navigate = useNavigate()

    const childRefs = useMemo(
        () =>
        Array(products.length)
            .fill(0)
            .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < products.length - 1

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (dir, name, idx) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid

        // if swipe was right, go to "/product/product-name"
        if (dir === 'right') {
            navigate(`/product/${name}`)
        }
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < products.length) {
        await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    // increase current index and show card
    const goBack = async () => {
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
                        key={product.name}
                        // update current index when card is swiped
                        onSwipe={(dir) => swiped(dir, product.name, index)}
                        // when card leaves screen, update current index
                        onCardLeftScreen={(dir) => outOfFrame(dir, product.name, index)}
                        // only allow swiping left or right
                        preventSwipe={['up', 'down']}
                    >
                        <Card sx={{ maxWidth: 600 }} elevation={2}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={product.url}
                                alt="green iguana"
                            />
                            <CardContent className='product-card'>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                {/* Set character limit so all cards are uniform */}
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <div className='price'>
                                {/* <Paper backgroundColor="#7fadff" className="price" elevation={1}> */}
                                    <Typography variant="h5" color="white">
                                        {product.price}
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
                    <CloseIcon fontSize="large" />
                </IconButton>
                <IconButton style={{ backgroundColor: !canGoBack && '#c3c4d3' }} className="repeat" onClick={() => goBack()}>
                    <ReplayIcon fontSize="large" />
                </IconButton>
                <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} className="bookmark" onClick={() => alert("Boomarked!")}>
                    <StarRateIcon fontSize="large" />
                </IconButton>
                <IconButton style={{ backgroundColor: !canSwipe && '#c3c4d3' }} className="right" onClick={() => swipe('right')}>
                    <FavoriteIcon fontSize="large" />
                </IconButton>
            </div>
        </div>
    );
}

export default ProductCards;