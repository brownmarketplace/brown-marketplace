import React, { useState, useMemo, useRef } from 'react'

// Component Imports
import TinderCard from "react-tinder-card";

// CSS Import
import './product-cards.css'

function ProductCards() {
    const [products, setProducts] = useState([
        {
            name: 'Frog',
            url: 'https://www.aquariumofpacific.org/images/exhibits/Magnificent_Tree_Frog_900.jpg'
        },
        {
            name: 'Flamingo',
            url: 'https://i.pinimg.com/564x/e6/33/34/e63334958361afd77c65e8cdf0ad62ac.jpg'
        },
        {
            name: 'Fox',
            url: 'https://i.pinimg.com/564x/ef/49/37/ef493790714a037449d62d3f2a6fccbf.jpg'
        },
        {
            name: 'Seal',
            url: 'https://i.pinimg.com/564x/0e/81/6e/0e816e21de2f3ed8f12b3b8426a35bac.jpg'
        },
        {
            name: 'Meerkat',
            url: 'https://i.pinimg.com/564x/94/d4/ac/94d4acf4890271614be7018e7f035efe.jpg'
        },
        {
            name: 'Mushroom Crochets',
            url: 'https://embed.filekitcdn.com/e/pZVtAQBFhqs4ADp3yRAnVv/6J9S2S2ez1N2JNCkbxCfKt'
        },
        ]);



    

    const [currentIndex, setCurrentIndex] = useState(products.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

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

    const outOfFrame = (name, idx) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
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
        <div>
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
                        onCardLeftScreen={() => outOfFrame(product.name, index)}
                        // only allow swiping left or right
                        preventSwipe={['up', 'down']}
                    >
                        <div 
                        style={{ backgroundImage: `url(${product.url})` }}
                        className="product-card">
                            <h3>{product.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className='buttons'>
                <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
                <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
                <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
            </div>
        </div>
    );
}

export default ProductCards;