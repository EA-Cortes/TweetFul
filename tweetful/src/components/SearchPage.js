import React, {useState, useEffect} from 'react';
import axios from 'axios';

import SearchForm from './SearchForm';
import '../style/SearchPage.css';


const SearchPage = ()=> {
    useEffect(() =>{
        fetchDBs();
    }, []);

    const [DBs, setDBs] = useState([]);

    const fetchDBs = async () =>{
        const data = await fetch(
            '/getDBs'
        );

        const dbs = await data.json();
        // console.log(dbs);
        setDBs(dbs);
    }

    return(
        <div className="searchPageWrapper">
            <div className="searchPageHalf">
                <SearchForm/>
            </div>
            <div className="searchPageHalf">
                <h1>Recent Searches:</h1>
                {DBs.map(db => (
                    <p key={db.name}>{db.name}</p>
                ))}
            </div>
            
        </div>
    );

    function getDBs(){
        axios.get(`/getDBs`)
        .then(res => {
        //   console.log("response in server");
        //   console.log(res);
          console.log(res.data);
        })
    }
}

export default SearchPage;