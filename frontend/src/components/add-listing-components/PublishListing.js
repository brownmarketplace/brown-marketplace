import React from 'react'
import { Link } from 'react-router-dom'
import { AwesomeButtonProgress } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";

function PublishListing() {
  return (
    <div style={{ marginTop: "24px" }}>
        <Link to="">
          <AwesomeButtonProgress type="secondary" onPress={(elt) => elt + 1}> {/* replace with async call during integration*/}
            Publish
          </AwesomeButtonProgress>
        </Link>
    </div>
  )
}

export default PublishListing