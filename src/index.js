const express=require('express');
const path= require("path");
const bcrypt=require("bcrypt");
const collection=require("./config")
const deviceColl = require('./creditcontroller');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.set('view engine','ejs');
app.get("/",(req,res)=>{
    res.render("login");
});
// app.get('/all-blogs',(req,res)=>{
//     credit.find().then((result)=>{
//         res.send(result);
//     }).catch((err)=>{
//         console.log(err);
//     })
// })

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.get("/steptostep",(req,res)=>{
    res.render("steptostep");
});

app.get("/recycle",(req,res)=>{
    res.render("recycle");
});


app.get("/reuse",(req,res)=>{
    res.render("reuse");
});

app.get("/article",(req,res)=>{
    res.render("article");
});
app.get("/home",(req,res)=>{
    res.render("home");
});
app.get("/credit",(req,res)=>{
    res.render("credit");
})

app.get("/map",(req,res)=>{
    res.render("map")
})

app.use(express.static("public"));

//adding data to the database(through signup form)
app.post("/signup",async(req,res)=>{
    const {password,email}=req.body;
    const existingmail=await collection.findOne({mail:email});
    if(existingmail){
         res.status(400).send('<script>alert("Email already registered. Please login to your account."); window.location.href = "/login";</script>');
    }
    else{
    const hashedPassword = await bcrypt.hash(password, 10);
    const data={
        name:req.body.username,
        password:hashedPassword,
        mail:req.body.email
    }
    const userdata=await collection.insertMany(data);
    console.log(userdata);
    res.redirect("/home");
}
});

app.post("/login",async(req,res)=>{
 
    const {email,password}=req.body;
    const emailexists=await collection.findOne({mail:email});
    if(!emailexists){
        res.status(400).send('<script>alert("Entered Email is incorrect or does not exist.");window.location.href="/login";</script>');
    }
    else{
        const match= await bcrypt.compare(password,emailexists.password);
        if (!match) {
             res.send('<script>alert("Password is incorrect! Please try again."); window.location.href="/login";</script>');
        }
        else{
            res.redirect("/home");
        }}
  
});



//For credit System


app.get("/credits",async(req,res)=>{
    try {
        // Fetch all device types from the database
        const devices = await deviceColl.find().distinct('DeviceType');
        console.log(devices);
        const deviceData = {};
        for (const deviceType of devices) {
            const brands = await deviceColl.find({ DeviceType: deviceType }).distinct('brand');
            deviceData[deviceType] = brands;
            
            
        }
       console.log(deviceData)
        res.render('credits', { deviceData });
    } catch (error) {
        console.error('Error fetching device types:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/calculate', async (req, res) => {
    try {
        const { deviceType, deviceBrand } = req.body;
        // Retrieve the data from the database based on deviceType and deviceBrand
        const data = await deviceColl.findOne({ DeviceType: deviceType, brand: deviceBrand });
        // Send the retrieved data back to the client
        console.log(data)
        res.json(data);
    } catch (error) {
        console.error('Error calculating credits:', error);
        res.status(500).send('Internal Server Error');
    }
});



const port=process.env.port ||8000;
app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
});




  
