const mongoose=require("mongoose");
const db="mongodb+srv://oosedatabase:Vlnsrra8SIpPeBjt@cluster0.ljekmsz.mongodb.net/";
const connect=mongoose.connect(db);


connect.then(()=>{
    console.log("Database Successfully Connected");
})
.catch(()=>{
    console.log("Some error Occured!");
});


const myschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
});
const collection=new mongoose.model("user",myschema);
module.exports=collection;


  


