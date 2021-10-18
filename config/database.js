const MongoClient = require("mongoose");


module.exports = async ()=>{
    try{
        MongoClient.connect(process.env.dbConnect, {
            useNewUrlParser: true, useUnifiedTopology: true
        })
            .then(() => console.log('db connected !'))
            .catch(err => console.log(`${err}`));
        
    }catch(err){
        console.log(`database not connected : \n ${err}`);
    }
}