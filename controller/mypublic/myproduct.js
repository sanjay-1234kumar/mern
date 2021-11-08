
import {DBProduct} from '../../model/index';


import {API_KEY} from '../../config/index';

import axios from 'axios';

const MyProduct={

getProductPublic: async(req,res,next)=>{
    console.log(req.query);

    const{search}=req.query;

    if(!req.query.search){
        return next("search qrey is not proved user");
    }

    try {

        const document=await DBProduct.find({p_subalt:search}).sort({reviews:-1}).limit(20).exec();

        return res.json(document);

        
    } catch (error) {
        
        return next(error);

    }

},

getProductVideo: async(req,res,next)=>{

console.log(req.query);

const{search}=req.query;

if(!req.query.search){

    

    return next("sarch qurey is empty please send ");


}

console.log("axios related work");


const config={
    method:'get',
    url:'https://youtube.googleapis.com/youtube/v3/search',
    params: {
        part:'snippet',
        maxResults:2,
        q:search,
        key:API_KEY
      },
};


try {
    
const result=await axios(config);

console.log("we are result");



const {items}=result.data;

console.log(items);



return res.json(items);


} catch (error) {
    
    console.log("yout data error");
    return next(error);
}




},




};


export default MyProduct;
