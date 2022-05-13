import React from 'react'
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";

function ClearButton(props) {

  return (
    <div style={{ marginTop: "24px" }}>
        <AwesomeButton type="secondary" onPress={(e) => props.handleSubmit(e)}>
            Clear
        </AwesomeButton>        
    </div>
  )
}

export default ClearButton