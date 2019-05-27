const express = require('express');
// const path = require('path');
const app = express();

// import API_Keys from './API_Keys'
// import * as passport from 'passport';
// import {Strategy, User} from 'passport-twitter';


// const path = require('path');
// const express = require('express');


app.get('/api/customers', (req, res)=>{
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Mary', lastName: 'Jane'},
        {id: 3, firstName: 'Steve', lastName: 'Smith'}
    ];
    res.json(customers);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port: ' + PORT));