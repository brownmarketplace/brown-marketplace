import React from 'react'
import Button from '@mui/material/Button';
import database from "../../backend/Database/DBInstance"
import { ref, update, get, query, orderByChild, equalTo }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

function SoldButton(props) {
  /*
    This method toggles the sold flag of the product. The sold flag is either true or false.
    */
    var updateSoldFlag = (e) => {

      // execute frontend change
      e.target.disabled = true; // untested TODO

      // now execute backend change
      const id = props.productId;
      console.log("in update sold flag...")
      console.log("props.productId is:")
      console.log(props.productId)

      const q = query(ref(database, 'products/'), orderByChild('id'), equalTo(id));
      let currSoldFlag = "false";
      get(q).then(snapshot => {
          snapshot.forEach(function(childSnapshot) {
              console.log(childSnapshot.val().sold);
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
          disabled={false}
          onClick={e => updateSoldFlag(e)}
        >
          Sold
        </Button>
    </div>
  )
}

export default SoldButton