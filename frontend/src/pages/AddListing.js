import React from 'react'
import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import AddPhotos from '../components/add-listing-components/AddPhotos'
import AddName from '../components/add-listing-components/AddName'
import AddDetails from '../components/add-listing-components/AddDetails'
import AddPrice from '../components/add-listing-components/AddPrice'
import ChooseCategory from '../components/add-listing-components/ChooseCategory'
import AddTags from '../components/add-listing-components/AddTags'
import PublishListing from '../components/add-listing-components/PublishListing'
import defaultProfilePicture from '../images/pfp.png'

import './boilerplate-page.css'

function AddListing() {
    const addListingStyle = {
        marginTop: '60px',
        marginLeft: '60px',
        marginBottom: "20px"
    }

    return (
        <div className="boilerplate">
            <BoilerplateHeader title="Make A Listing!" userPicture={defaultProfilePicture} showProfile={false}/>
            <div style={addListingStyle}>
                    <AddPhotos />
                    <AddName />
                    <AddDetails />
                    <AddPrice />
                    <ChooseCategory />
                    <AddTags />                    
                    <PublishListing />
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default AddListing