import React, { useState } from "react"; 

// Component Imports
import TinderCard from "react-tinder-card";

// CSS Import
import './product-cards.css'

function ProductCards() {
    const [products, setProducts] = useState([
        {
            name: 'Mushroom Crochets',
            url: 'https://embed.filekitcdn.com/e/pZVtAQBFhqs4ADp3yRAnVv/6J9S2S2ez1N2JNCkbxCfKt'
        },
        {
            name: 'Mushroom Crochets',
            url: 'https://embed.filekitcdn.com/e/pZVtAQBFhqs4ADp3yRAnVv/6J9S2S2ez1N2JNCkbxCfKt'
        },
        {
            name: 'Mushroom Crochets',
            url: 'https://embed.filekitcdn.com/e/pZVtAQBFhqs4ADp3yRAnVv/6J9S2S2ez1N2JNCkbxCfKt'
        },
        {
            name: 'Mushroom Crochets',
            url: 'https://embed.filekitcdn.com/e/pZVtAQBFhqs4ADp3yRAnVv/6J9S2S2ez1N2JNCkbxCfKt'
        },
        {
            name: 'Mushroom Crochets',
            url: 'https://embed.filekitcdn.com/e/pZVtAQBFhqs4ADp3yRAnVv/6J9S2S2ez1N2JNCkbxCfKt'
        }
        ]);


    // create a list of example data for the cards
    const characters = [
    {
        name: 'Mushroom Crochets',
        url: 'https://embed.filekitcdn.com/e/pZVtAQBFhqs4ADp3yRAnVv/6J9S2S2ez1N2JNCkbxCfKt'
    },
    {
        name: 'Mushroom Crochets',
        url: 'https://embed.filekitcdn.com/e/pZVtAQBFhqs4ADp3yRAnVv/6J9S2S2ez1N2JNCkbxCfKt'
    },
    {
        name: 'Mushroom Crochets',
        url: 'https://embed.filekitcdn.com/e/pZVtAQBFhqs4ADp3yRAnVv/6J9S2S2ez1N2JNCkbxCfKt'
    },
    {
        name: 'Mushroom Crochets',
        url: 'https://embed.filekitcdn.com/e/pZVtAQBFhqs4ADp3yRAnVv/6J9S2S2ez1N2JNCkbxCfKt'
    },
    {
        name: 'Mushroom Crochets',
        url: 'https://embed.filekitcdn.com/e/pZVtAQBFhqs4ADp3yRAnVv/6J9S2S2ez1N2JNCkbxCfKt'
    }
    ]

    // create state for the cards and the direction they are swiped in
    const [lastDirection, setLastDirection] = useState()

    const [drawerOpen, toggleDrawer] = useState(false)

    // create state for the cards and the direction they are swiped in
    const swiped = (direction, nameToDelete) => {
        setLastDirection(direction)
    }

    // create state for the cards and the direction they are swiped in
    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
        // TODO: this is for action when a card is swiped out of the screen
    }

    return (
        <div className="cards-container">
            {products.map(product => (
                <TinderCard
                    className="swipe"
                    // give each card a unique key, efficient to re-render
                    key={product.name}
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
    );
}

export default ProductCards;