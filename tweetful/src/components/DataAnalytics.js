import React, {useState, useEffect} from 'react';
import '../style/DataAnalytics.css';

const DataAnalytics = ()=> {
    const [paid, setPaid] = useState(false);
    
    useEffect(()=>{
        checkPaid();
    });

    return(
        paid?
        <div className="dataWrapper">
            You've paid for stuff
        </div>
        :
        <div className="dataWrapper">
            {"This feature is only available after you've unlocked a paid search."}
        </div>
    )

    function checkPaid(){
        if(5>3){
            setPaid(true);
        }
    }
}



export default DataAnalytics;