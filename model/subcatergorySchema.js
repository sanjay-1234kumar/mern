
import mongoose from 'mongoose';

import {APP_URL} from '../config/index';


let Schema=mongoose.Schema;
// text serach on name on name feild an parent feild 

let subcatergorySchema=new Schema({
    name:{type:String,required:true},
   parent:{type:String,required:true},
    image:{type:String,required:true,get:(image)=>{

        return `${APP_URL}/${image}`;
    }},

alt:{type:String,required:true},
  
},{timestamps:true,toJSON:{getters:true},id:false});

subcatergorySchema.index({name:'text',parent:'text'});



// model.find({$text:{$search:search string}})


export default mongoose.model('DBSubCatergory',subcatergorySchema);


