import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SearchForm = ()=> {
    const [keyword, setKeyword] = useState("");
    const [isOn, setIsOn] = useState(false);
    // useEffect(() => { 
        // axios.post(`/sendFormData`, {"name": "pete"})
        // .then(res => {
        //   console.log(res);
        //   console.log(res.data);
        // })
    // });

    return(
        isOn?
        <div>
            <p>Looking for {keyword}</p>
            <button onClick={e =>foo()}>Want to try a different hashtag?</button> 
        </div>
        :
        <div>
        <h2>Search for:</h2>
            <form>
                <input value={keyword}
                onChange={e => setKeyword(e.target.value)} 
                placeholder="Type a hashtag"
                type="text"name="isOn">
                </input>
                
                <button type="submit" onClick={e =>foo()} onClick={e =>sendData({keyword})}>Submit</button>
            </form>                        
        </div>    
        
    )

    
    function foo(){
        // Reset keyword hook if there's already one
        if(isOn){
            setKeyword("");
        }
        setIsOn(true);
    }

    function sendData(searchFor){
        axios.post(`/sendFormData`, {keyword})
        .then(res => {
          console.log("response in server");
        //   console.log(res);
        //   console.log(res.data);
        })
    }
}

export default SearchForm;