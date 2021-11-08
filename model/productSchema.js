import mongoose from 'mongoose';

import {APP_URL} from '../config/index';


let Schema=mongoose.Schema;

// text search on two feild p_catergory and p_subcatergory

let productSchema=new Schema({
    
    name:{type:String,required:true},
    description:{type:String,required:true},
    reviews:{type:Number,required:true},
    p_catergory:{type:String,required:true},
    p_subcatergory:{type:String,required:true},
    image:{type:String,required:true,get:(image)=>{

        return `${APP_URL}/${image}`
    }},
    buynow:{type:String,required:true},
p_subalt:{type:String,required:true},
p_cateralt:{type:String,required:true},


   
},{timestamps:true,toJSON:{getters:true},id:false});// text search on p_catergory and p_subcatergory

productSchema.index({p_subalt:1,p_cateralt:1});


// movies.find({$text:{$search:searchstring}}).limit(5).sort({rating:1})




export default mongoose.model('DBProduct',productSchema);

