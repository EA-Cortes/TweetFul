import React, {useState} from 'react';

const SearchForm = ()=>{
    const [keyword, setKeyword] = useState("");
    const [isOn, setIsOn] = useState(false);
    
    return(
        isOn?
        <div>
            <p>Looking for {keyword}</p>
            <button onClick={e =>foo()}>Want to try a different hashtag?</button> 
        </div>
        :
        <div>
            <form>
                <input value={keyword}
                onChange={e => setKeyword(e.target.value)} 
                placeholder="Type a hashtag"
                type="text"name="isOn" 
                required>
                </input>
                
                <button type="submit" onClick={e =>foo()}>Submit</button>
            </form>                        
        </div>    
    )
    function foo(){
        // Reset keyword hook if there's already one
        if(isOn){
            setKeyword("");
        }
        setIsOn(!isOn);
    }
}




export default SearchForm;