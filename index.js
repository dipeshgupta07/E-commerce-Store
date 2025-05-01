const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");

const Cakes = require("./models/cakes.js");
const Orders = require("./models/orders.js");
const methodOverride = require("method-override");
require("dotenv").config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));






main().then(()=>{
    console.log("connected succesfully");
})

.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dilipbakery');

  
}


// let order1 = new Orders({
//         name: "Dipesh gupta",
//         mobile: 7903152759,
//         address: "Darbhangiya Tola",
//         message: "Happy Birthday Kishu",
//         cake: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiiGJvzD5y_b3qCB-lKs6UONxfeIYPWachQw&s",
//         del_date: "15/04/2025",
//         created_at: new Date()
//     });
    
//     order1.save().then((res)=>{
//         console.log(res);
//     })






app.get("/", (req, res)=>{
    res.render("index.ejs");
});









app.get('/product/:id', async (req, res) => {
    let {id} = req.params;
    let product = await Cakes.findById(id);
    console.log(product)
    
  
    res.render('desc.ejs', {product});
  });
  

  app.get('/flavours/:flv', async (req, res) => {
    let {flv} = req.params;
    let products = await Cakes.find({flavour: flv});
    console.log(products)
    
  
    res.render('product.ejs', {products});
  });
  
app.get("/order/:id", async (req, res)=>{

  let {id} = req.params;
    let product = await Cakes.findById(id);
    console.log(product)
    
  
    res.render('order.ejs', {product});

})

app.post("/order/:id", async (req, res)=>{
  let {id} = req.params;
  let product = await Cakes.findById(id);
  let {name: name, mobile: mobile, address: address, message: message, date: date} = req.body;
  let order1 = new Orders({
        name: name,
        mobile: mobile,
        address: address,
        message: message,
        cake: product.img,
        date: date,
        created_at: new Date()
    });
    
    order1.save().then((res)=>{
        console.log(res);
    });
    
    let ordersms = `New Order Recieved as \nName : ${name}, \nMobile : ${mobile}, \nAddress: ${address}, \nMessage on Cake: ${message} , \nimage: ${product.img}, \nDelivery date: ${date}`

    client.messages
    .create({
        body: ordersms,
        from: process.env.TWILIO_FROM_NUMBER,
        to: process.env.TO_NUMBER,
    })
    .then(message => console.log(message.sid));





  
  
  res.render("thankyou.ejs", {order1})



})


console.log(Cakes.find())




app.listen(8080, ()=>{
    console.log("Server is listening");
})










