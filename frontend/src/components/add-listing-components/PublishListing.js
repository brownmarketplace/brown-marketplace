import React from 'react'
import Button from "@mui/material/Button";
import "react-awesome-button/dist/styles.css";
import '../../pages/boilerplate-page.css'

function PublishListing(props) {

  return (
    <div style={{ marginTop: "24px" }}>
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
    </div>
  )
}

export default PublishListing