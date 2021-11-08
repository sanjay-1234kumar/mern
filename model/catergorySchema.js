
import mongoose from 'mongoose';

import {APP_URL} from '../config/index';


let Schema=mongoose.Schema;

// admin schema

let catergorySchema=new Schema({
    name:{type:String,required:true},
   image:{type:String,required:true,get:(image)=>{

    return `${APP_URL}/${image}`
}},
 
   child:{type:Array,required:true},
   alt:{type:String,required:true},

   
},{timestamps:true,toJSON:{getters:true},id:false});


catergorySchema.index({alt:1});


export default mongoose.model('DBCatergory',catergorySchema);

// we have 


