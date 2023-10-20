import express from 'express';
import mongoose, { model,Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app=express();

app.use(express.json());
const PORT=5000;


const connectMongoDB=async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI);
        if(conn){
            console.log("api is working")
        }
    
};
connectMongoDB();

const productSchema = new Schema({
    name:String,
    description:String,
    price:Number,
    productImg:String,
    brand:String
});

const Product = model('Product' ,productSchema);




app.get('/products', async (req,res)=>{

    const totalproduct = await Product.find()
    res.json({
        success:true,
        data:totalproduct,
        messege:"successfully get all students",
    })
})

app.post('/product', async (req,res)=>{
        const {name,description,price,productImg,brand}=req.body;

      

        const newProduct = new Product({
                name: name,
                description: description,
                price: price,
                productImg:productImg,
                brand: brand,

        })

        const savedProduct = await newProduct.save();
      

        res.json({
            name:true,
            data:savedProduct,
            messege:"successfully added new data"

        })

})


app.get('/product', async(req,res)=>{
        const {name}=req.query;
       
        const productFind= await Product.findOne({name:name})
       
        res.send({
            name:true,
            data:productFind,
            message:"successfully data found"
        })
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})