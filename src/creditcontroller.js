const mongoose=require("mongoose");
const db="mongodb+srv://oosedatabase:Vlnsrra8SIpPeBjt@cluster0.ljekmsz.mongodb.net/";
const connect=mongoose.connect(db);


connect.then(()=>{
    console.log("Database Successfully Connected-credit");
})
.catch(()=>{
    console.log("Some error Occured!");
});

const deviceSchema = new mongoose.Schema({  //schema for device
    
    DeviceID: {
        type: Number,
        required: true
    },
    DeviceType: {
        type: String,
        required: true
    },
    metaltype: {
        type: String,
        required:true
    },
    credit:{
        type:Number,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    brand: {
        type: String,
        required: true
    }
});



const devicecollection = mongoose.model("device", deviceSchema);

module.exports = devicecollection;