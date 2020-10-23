const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

let db = mongoose.connection;

db.once('open',()=>console.log("Connected to MongoDB"));

db.on('error',(err)=>console.log(err));
