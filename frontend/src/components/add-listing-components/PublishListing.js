import React from 'react'
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";

import '../../pages/boilerplate-page.css'

function PublishListing(props) {

  return (
    <div style={{ marginTop: "24px" }}>
        {/* <Link to=""> */}
          <Button 
            userId={props.userId}
            productId={props.productId}
            onClick={props.handleFormSubmit}
            variant="contained" type="submit" sx={{ 
              borderRadius: '28px', 
              backgroundColor: '#92A3FD', 
              color: 'white',
              boxShadow: "none"
            }}>
              <span className="poppinsMediumFont">
                Create 
              </span>
          </Button>
          {/* <AwesomeButton 
            type="secondary" 
            userId={props.userId}
            productId={props.productId}
            onPress={props.handleFormSubmit}
          >
            Publish
          </AwesomeButton> */}
        {/* </Link> */}
    </div>
  )
}

export default PublishListing