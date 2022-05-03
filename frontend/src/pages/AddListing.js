import React from 'react'
import BoilerplateHeader from '../components/BoilerplateHeader'
import Footer from '../components/Footer'
import AddPhotos from '../components/add-listing-components/AddPhotos'
import AddDetails from '../components/add-listing-components/AddDetails'
import AddTags from '../components/add-listing-components/AddTags'
import ChooseCategory from '../components/add-listing-components/ChooseCategory'
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
                    <AddDetails />
                    <AddTags />
                    <ChooseCategory />
                    <PublishListing />
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default AddListing