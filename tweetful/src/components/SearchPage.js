import React, {useState, useEffect} from 'react';
import SearchForm from './SearchForm';
import '../style/SearchPage.css';


const SearchPage = ()=> {
    return(
        <div className="searchPageWrapper">
            <div className="searchPageHalf">
                <SearchForm/>
            </div>
            <div className="searchPageHalf">
                Recent Searches will show here
            </div>
            
        </div>
    );
}

export default SearchPage;