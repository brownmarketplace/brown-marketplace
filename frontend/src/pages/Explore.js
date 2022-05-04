import React, { useState } from 'react'

// Component Imports
import BoilerplateHeader from '../components/BoilerplateHeader'
import ExploreHeader from '../components/explore-components/ExploreHeader'
import Footer from '../components/Footer'
import SearchBar from '../components/explore-components/SearchBar'
import Title from '../components/boilerplate-components/Title'
import TinderCard from 'react-tinder-card'

// CSS Imports
import './boilerplate-page.css'
import './explore.css'

// Image Icon Imports
import defaultProfilePicture from '../images/pfp.png'

function Explore(props) {
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
    <div className="boilerplate">
        <ExploreHeader title={props.title} userPicture={props.pfp}/>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
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
        </div>
    </div>
  )
}

Explore.defaultProps = {
  title: "Brown Marketplace",
  pfp: defaultProfilePicture
}

export default Explore