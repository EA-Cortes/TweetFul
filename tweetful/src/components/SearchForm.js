import React, {useState} from 'react';

const SearchForm = ()=>{
    const [keyword, setKeyword] = useState("");

    return(
        <form>
            <input value={keyword}
            onChange={e => setKeyword(e.target.value)} 
            placeholder="Type a hashtag"
            type="text"name="firstName" 
            required>
            </input>

            <button type="submit">Submit</button>
    </form>
    )
}

export default SearchForm;