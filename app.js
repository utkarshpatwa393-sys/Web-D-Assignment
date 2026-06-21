const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Vehicle = require("./models/Vehicle");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/vehicleDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


// Home
app.get("/", async (req, res) => {

    let search = req.query.search || "";
    let sort = req.query.sort || "";

    let query = {};

    if(search){
        query.vehicleName = {
            $regex: search,
            $options: "i"
        };
    }

    let vehicles;

    if(sort === "asc"){
        vehicles = await Vehicle.find(query).sort({price:1});
    }
    else if(sort === "desc"){
        vehicles = await Vehicle.find(query).sort({price:-1});
    }
    else{
        vehicles = await Vehicle.find(query);
    }

    res.render("index",{vehicles});
});


//THIS IS THE ROUTE THAT WILL HANDLE THE BUTTONS

// Add VEHICLES
app.get("/add",(req,res)=>{
    res.render("add");
});


// Create
app.post("/vehicles", async(req,res)=>{

    await Vehicle.create(req.body);

    res.redirect("/");
});


// Edit Form
app.get("/vehicles/:id/edit", async(req,res)=>{

    const vehicle = await Vehicle.findById(req.params.id);

    res.render("edit",{vehicle});
});


// Update 
app.put("/vehicles/:id", async(req,res)=>{

    await Vehicle.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    res.redirect("/");
});


// Delete
app.delete("/vehicles/:id", async(req,res)=>{

    await Vehicle.findByIdAndDelete(req.params.id);

    res.redirect("/");
});

app.listen(3000,()=>{
    console.log("Server Running");
});