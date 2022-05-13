import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import database from "../../backend/Database/DBInstance"
import { ref, update, get, query, orderByChild, equalTo }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

function SoldButton(props) {

  let [isDisabled, setIsDisabled] = useState(props.isSold)

  useEffect(() => {
      setIsDisabled(props.isSold);
  }, [props.isSold])

  /*
    This method toggles the sold flag of the product. The sold flag is either true or false.
    */
    var updateSoldFlag = () => {

      setIsDisabled(true)

      // now execute backend change
      const id = props.productId;

      const q = query(ref(database, 'products/'), orderByChild('id'), equalTo(id));
      let currSoldFlag = "false";
      get(q).then(snapshot => {
          snapshot.forEach(function(childSnapshot) {
              if (childSnapshot.val().sold === "false") {
                  currSoldFlag = "true";
              }
              update(ref(database, 'products/' + id), {
                  sold: currSoldFlag
              })
          })
      })
  }

  return (
    <div style={{ marginLeft: "10px" }}>
        <Button 
          variant="outlined" 
          color="error" 
          size="small"
          disabled={isDisabled}
          onClick={updateSoldFlag}
        >
          Sold
        </Button>
    </div>
  )
}

export default SoldButton