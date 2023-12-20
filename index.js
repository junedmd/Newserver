import express from 'express';
import mongoose, { model,Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app=express();

app.use(express.json());

let counter = 0;
const apiCallCounter = (req,res,next)=>{
    counter++;
    console.log(`api calls :${counter}`)
    next();
}
app.use(apiCallCounter);
const PORT=5000;


const connectMongoDB=async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI);
        if(conn){
            console.log("api is working")
        }
    
};
connectMongoDB();

const checkApi = (req,res,next)=>{
    const {apiKey}=req.query;
    if(apiKey==="juned"){
       
        next();
    }
    else{
        return res.status(401).json({
            success:false,
            message:'api key is invalid'
        })
    }
}

const validateParams = (req,res,next)=>{
    const {title ,description,price}=req.body
    
    if(!title){
        return res.send({
            success:true,
            message:'title is missing'
        })
    }
    if(!description){
        return res.send({
            success:true,
            message:'description is missing'
        })
    }
    if(!price){
        return res.send({
            success:true,
            message:'price is missing'
        })
    }
    next();
}

app.post("/orders", checkApi,validateParams, async(req,res)=>{
    res.json({
        success:true,
        data:{},
        message:"order is created "
    })
})

app.get("/orders",checkApi,async(req,res)=>{
    res.json({
        success:true,
        data:[],
        message:"Orders gets successfully"
    })
})

app.get('/poha',(req,res)=>{
    res.send('api is working')
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
