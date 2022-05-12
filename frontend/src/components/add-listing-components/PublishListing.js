import React from 'react'
import { Link } from 'react-router-dom'
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";

function PublishListing(props) {

  return (
    <div style={{ marginTop: "24px" }}>
        <Link to="">
          <AwesomeButton 
            type="secondary" 
            userId={props.userId}
            productId={props.productId}
            onPress={props.handleFormSubmit}
          >
            Publish
          </AwesomeButton>
        </Link>
    </div>
  )
}

export default PublishListing