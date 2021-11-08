
import Joi from 'joi';
import multer from 'multer';

import path from 'path';

import fs from 'fs';


import {DBProduct} from '../model/index';





// setting of multer of multer 

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{


        cb(null,'uploads/');


    },
    filename:(req,file,cb)=>{
        const unique_name=`${Date.now()}-${Math.round(Math.random()*1E9) }${path.extname(file.originalname)}`;
cb(null,unique_name);
    }
});

const upload=multer({storage:storage,}).single('image');



let Product = {

    async addProduct(req, res, next) {


        // fisrt uploading the file

        upload(req,res,async(err)=>{
            // error handling while uploading the image
if(err){
    console.log("error in the uploading product image");
   return next(err);

}
// file is uploaded 
console.log(req.body);
console.log(req.file);

if(!req.file){
// custom error error provided
    return next('image must provide');

}

const ImagePath=req.file.destination+req.file.filename;

console.log(ImagePath);

let productschema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    reviews: Joi.number().required(),
    p_catergory: Joi.string().required(),
    p_subcatergory: Joi.string().required(),
    image: Joi.string().required(),
    buynow: Joi.string().required(),
 

});

const MyProduct={
    name:req.body.name,
    description:req.body.description,
    reviews:req.body.reviews,
    p_catergory:req.body.p_catergory,
    p_subcatergory:req.body.p_subcatergory,
    image:ImagePath,
    buynow:req.body.buynow,
    

};
// checking valiadation error
const {error}=productschema.validate(MyProduct);

// valiadtion error 
if(error){

    console.log("validation error of product ");
    // we need to remove uploaded file 
fs.unlink(`${appRoot}/${ImagePath}`,(err)=>{


    if(err){
console.log("internal sever of while deleting the uploaded image ");
        return next(err);
    }
});

    return next(error);

}

// all validation is over 

let i;

let palt=req.body.p_catergory;

let subalt=req.body.p_subcatergory;

for(i=0;i<10;i++){

    palt=palt.replace(" ","-");
    palt=palt.replace(",","");
  subalt=subalt.replace(" ","-");
  subalt=subalt.replace(",","");


  
  }

  
  palt=palt.replace("-&","");

  subalt=subalt.replace("-&","");

  MyProduct.p_subalt=subalt;

  MyProduct.p_cateralt=palt;
  

console.log(MyProduct);

const document=new DBProduct(MyProduct);

try {
    
    const result=await document.save();

    return res.json(result);


} catch (error) {

    return next(error);

    
}





        });


       
      
       

    },
    async getSingleProduct(req, res, next) {

        console.log(req.params);
        const{id}=req.params;


        try {
const document=await DBProduct.findById(id);

if(!document){

    console.log("document not found while searching the doument invalid id");

    return next("document not found ");
}


            return res.json(document);

        } catch (error) {
            
            return next(error);

        }
        

    },
    async getAllProduct(req,res,next){

try {
    const result=await DBProduct.find();

    return res.json(result);

} catch (error) {

    return next (error);

}

        
    },

    async updateSingleProduct(req, res, next) {

        console.log(req.params);
        console.log(req.body);

        const{id}=req.params;


       try {
           const document =await DBProduct.findById(id);

console.log(document);

           if(!document){
               console.log("document not found or invliad id");
               return  next('document not found ');

           }
           // document found 

       

           // we need to update the data 
           try {

            const upadated_document=await DBProduct.findByIdAndUpdate(document._id,req.body);

            return res.json(upadated_document);

               
           } catch (error) {
               
            return next(error);


           }

       } catch (error) {
           
        return next(error);

       }

    },
    async deleteSingleProduct(req, res, next) {

        console.log(req.params);
        const {id}=req.params;

        try {
            const document=await DBProduct.findById({_id:id});

            if(!document){

                console.log("document not found");
                return next('Product Not found Invalid Id');

            }
console.log(document);
console.log(document.image);

const impath=document._doc.image;
const documentId=document._id;

console.log(impath);


    
    fs.unlink(`${appRoot}/${impath}`,(err)=>{
if(err){
    console.log("error occur file system error when we are deleting from databse");

    return next(error);

}
    });
    // file is delete then we need to delete data from the databse 

    try {
        
        const deleted_doc=await DBProduct.findByIdAndDelete(documentId);

        return res.json(deleted_doc);


    } catch (error) {

        return next(error);

        
    }


            
        } catch (error) {
            
            console.log("products find error");
            return next(error);

        }

       
    }

};






export default Product;
