import React from 'react'
import BoilerplateHeader from '../components/BoilerplateHeader'
import Search from '../components/Search'
import Footer from '../components/Footer'
import CategoriesContainer from '../components/CategoriesContainer'
import defaultProfilePicture from '../images/pfp.png'

import TinderCard  from 'react-tinder-card'
import { useState } from 'react'  

import './home-page.css'

const Home = (props) => {
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
        <div className="home">
            <BoilerplateHeader title={props.title} userPicture={props.pfp}/>
            <CategoriesContainer />
            <Search />
            <div className='swipe-container'>
                <div className='card-container'>
                    {/* for each character in the data, make a new TinderCard */}
                    {characters.map((character) =>
                        <TinderCard 
                            className='swipe' 
                            key={character.name} 
                            onSwipe={(dir) => swiped(dir, character.name)} 
                            onCardLeftScreen={() => outOfFrame(character.name)}>
                                <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                    <h3>{character.name}</h3>
                                </div>
                        </TinderCard>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
      )
}   

// default title and profile picture
Home.defaultProps = {
    title: "Brown Marketplace",
    pfp: defaultProfilePicture
}

export default Home;