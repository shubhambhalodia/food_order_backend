import express from 'express';
import { AdminRoute,VandorRoute } from './routes';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_URI } from './config';


const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/admin',AdminRoute);
app.use('/admin',VandorRoute);

mongoose.connect(MONGO_URI).then(result=>{
    console.log("success",result);
}).catch(err=>console.log(err));


app.listen(8000,()=>{
    console.log('app is listening on port 8000');
})