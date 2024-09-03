import express from 'express';
import { AdminRoute,VandorRoute } from './routes';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_URI } from './config';
import path from 'path';

const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/images', express.static(path.join(__dirname,'images')))
console.log(path.join(__dirname, 'images'))
app.use('/admin',AdminRoute);
app.use('/vendor',VandorRoute);

mongoose.connect(MONGO_URI).then(result=>{
    console.log("success");
}).catch(err=>console.log(err));


app.listen(3000,()=>{
    console.log('app is listening on port 3000');
})