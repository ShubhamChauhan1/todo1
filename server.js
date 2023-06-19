import express  from "express";
import mongoose from "mongoose";
import "./user.js";
const user = mongoose.model("User")

const app = express()
const PORT = 5000

app.use(express.json())

mongoose.connect("mongodb+srv://schauhan:0kFKB7tDn8y8xNQE@auth.1qgeoma.mongodb.net/")

mongoose.connection.on("connected", ()=> console.log("connected to database"))
mongoose.connection.on("error", ()=> console.log(error))

app.post("/create", (req, res) =>{

    console.log(req.body)
    const {title, description, status}= req.body

    let newUser = new user ({
        title : title,
        description: description,
        status: status
    })

    newUser.save() // most database operations are async in nature so
        .then((savedUser) => {
            if(!savedUser){
                return res.send({error: "User not saved"})
            }
        
            return res.send({success:true, message:"user saved successfully", data:savedUser})
    })

      .catch(err=>console.log(err))

    // res.send({success:true, message:"user saved successfully", data: req.body })
    
    // res.send({status:"not completed"})
    
})
app.get("/read", (req,res)=>{
    res.send({success:true, message:"data", data: user })
})




app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
} )