require('dotenv').config()
// require('express-async-errors');

const express=require('express')
const app=express();
const cors=require('cors')

app.use(express.json())
app.use(express.urlencoded({extented:true}))
app.use(cors())
//routers

const authRouter=require('./routes/auth')
const productRouter=require('./routes/product')
const orderRouter=require('./routes/order')
const adminRouter=require('./routes/admin')
// error handler
const notFoundMiddleware=require('./middlewares/not-found')
const errorHandlerMiddleware=require('./middlewares/error-handler')

app.get('/',(req,res)=>{
    res.send("my cart")
})
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/product',productRouter)
app.use('/api/v1/product/order',orderRouter)
app.use('/api/v1/admin',adminRouter)

const PORT= process.env.PORT||5000;

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT,()=>console.log("running"))