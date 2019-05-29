import React, {Component} from 'react';

class TwitterAPI extends Component{
    constructor(){
        super();
        this.state = {
            customers: []
        }
    }

    componentDidMount(){
        fetch('/api/customers')
            .then(res => res.json())
            .then(customers => this.setState({customers},
                () => console.log('Customers fetched..', customers)));
    }

    render(){
    return(
        <div className="container" >
        <a style={loginButton} href="http://localhost:5000/auth/twitter">Sign in with Twitter</a>
            <h2>Customers</h2>
            <div>Coming from Twitter API </div> 
            <ul style ={style}>
                {this.state.customers.map(customer => 
                    <li key = {customer.id}>{customer.firstName} {customer.lastName} </li>
                )}
            </ul>
        </div>   
    )};
};

const style  = {
    listStyle: "none"
}

const loginButton = {
    color: "white",
    // border: "2px solid black",
    padding: "10px"
}
export default TwitterAPI;