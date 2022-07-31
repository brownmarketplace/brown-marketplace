import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import database from "../../backend/Database/DBInstance";
import { ref, update, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
function SoldButton(props) {
    var _a = useState(props.isSold), isDisabled = _a[0], setIsDisabled = _a[1];
    useEffect(function () {
        setIsDisabled(props.isSold);
    }, [props.isSold]);
    /*
      This method toggles the sold flag of the product. The sold flag is either true or false.
      */
    var updateSoldFlag = function () {
        setIsDisabled(true);
        // now execute backend change
        var id = props.productId;
        var q = query(ref(database, 'products/'), orderByChild('id'), equalTo(id));
        var currSoldFlag = "false";
        get(q).then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                if (childSnapshot.val().sold === "false") {
                    currSoldFlag = "true";
                }
                update(ref(database, 'products/' + id), {
                    sold: currSoldFlag
                });
            });
        });
    };
    return (React.createElement("div", { style: { marginLeft: "10px" } },
        React.createElement(Button, { variant: "outlined", color: "success", size: "small", disabled: isDisabled, onClick: updateSoldFlag }, isDisabled ? ("Sold") : ("Sell"))));
}
export default SoldButton;
//# sourceMappingURL=SoldButton.js.map