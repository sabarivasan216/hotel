const express = require('express')
const cors = require('cors')
const morgan=require('morgan')
const dotenv = require('dotenv')
const connectDB =require('./config/db')
//env configure
dotenv.config()
//db connection
connectDB();
const app =express();
//middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
//route
app.use('/api/v1/test',require("./routes/testRouter"));
app.use('/api/v1/auth',require('./routes/authRoutes'))
app.get('/',(req,res)=>{
    return res.status(200).send("<h1>welcome to food app</h1>")
});

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server  running on ${port}`);    
});