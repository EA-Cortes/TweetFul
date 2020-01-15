    
    // ---------------------------------------      Create collection   --------------------------------------- 

    /*
    dbo.createCollection("customers", function(err, res) {
      if (err) throw err;
    console.log("Collection created!");
      db.close();
     });
    */
    
    
    // ---------------------------------------          Add             --------------------------------------- 
    /*
    var myobj = {name: "Mike", lastName: "Jones", age: 45, occupation: "badass"};
    dbo.collection("customers").insertOne(myobj, (err, res)=>{
      if(err) throw err;
      else console.log("Added customer")
    });
    */

    // ---------------------------------------          Search          --------------------------------------- 
    /*
    dbo.collection("customers").find({}).toArray((err, result)=> {
      if (err) throw err;
      console.log(result);
      db.close();
      
    });
*/  