const express=require("express")
const router=express.Router()
const User=require("../models/Users")
const Order=require("../models/Orders")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const dotEnv = require("dotenv");
dotEnv.config();
const jwtSecret = process.env.jwtSecret


const login =  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.set('Authorization', authToken);
        res.json({ success, authToken })


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
}
const adminlogin=async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.set('Authorization', authToken);
        res.json({ success, authToken })


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
}

const foodData =  async (req, res) => {
    try {
        // console.log( JSON.stringify(global.foodData))
        // const userId = req.user.id;
        // await database.listCollections({name:"food_items"}).find({});
        
        res.send([global.foodData,global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
}

const orderData=  async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    
    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
}

const myOrderData =  async (req, res) => {
    try {
        
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

}

const createUser=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:false, errors: errors.array() })
    }
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create(
            {
                name:req.body.name,
                password:securePass,
                email:req.body.email,
                location:req.body.location

            }
        )
        res.json({success:true})
        // const recipientEmail = req.body.email;
        // const subject = 'Welcome to MunchMate!';
        // const message = `Hello ${req.body.name},\n\nWelcome to MunchMate! We're excited to have you on board.`;

        // // Send the welcome email using the sendEmail function
        // const emailReq = { body: { recipientEmail, subject, message } }; // Prepare email request object

        // await sendEmail(emailReq, res); // Send the email

        // // If email is sent successfully, return the success response
        // return res.json({ success: true, message: 'User registered successfully, email sent!' });

    } catch (error) {
        console.log(error);
        
        res.json({success:false})
    }
}

const getNameInfo=async(req,res)=>{
    const email = req.query.email;
    const user=User.findOne({"email":email})
    res.json({"username":user.name})
    
}

module.exports={
    login,
    adminlogin,
    foodData,
    orderData,
    myOrderData,
    createUser,
    getNameInfo
}