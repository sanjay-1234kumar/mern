
import Joi from 'joi';
import multer from 'multer';

import path from 'path';

import fs from 'fs';

import { DBCatergory,DBSubCatergory } from '../model/index';

import {APP_URL} from '../config/index';


// setting of multer of multer 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {


        cb(null, 'caterupload/');


    },
    filename: (req, file, cb) => {
        const unique_name = `${Date.now()}-${Math.round(Math.random() * 100000)}${path.extname(file.originalname)}`;
        cb(null, unique_name);
    }
});

const upload = multer({ storage: storage, }).single('image');




const Catergory = {

    addCatergory: async (req, res, next) => {

        upload(req, res, async (err) => {

            if (err) {

                

                return next(err);

            }
            // file is uploaded 
            console.log(req.body);
            console.log(req.file);

            if (!req.file) {
                // custom error error provided
                return next('image must provide');

            }

            const ImagePath = req.file.destination + req.file.filename;

            console.log(ImagePath);

            let productschema = Joi.object({
                name: Joi.string().required(),
                image: Joi.string().required(),
                
               

            });


            const Mycatergory = {
                name: req.body.name,
                image: ImagePath,
                
               

            };

            const { error } = productschema.validate(Mycatergory);

            if (error) {
                // we need to delete uplode file from the computer 

                fs.unlink(`${appRoot}/${ImagePath}`, (err) => {

                    if (err) {

                        return next(err);
                    }

                });

            }

            // validation is over we data in to databse


            // mycatergory={ name:"req.body.name",image:'upload/gf1.jpg}

        let parentDoc;

try {
    
parentDoc = await DBSubCatergory.find({parent:req.body.name});


} catch (error) {

    return next(error);


    
}

console.log("this is parent doc we need ");


console.log(parentDoc);
// i want convert into json



let mjson;

mjson=parentDoc.map((item)=>{

    let hj=item;

hj.image=`${item.image}`;


return hj;



});

console.log("this is m json");
console.log(mjson);






Mycatergory.child=mjson;


let ms=req.body.name;




let i;

for(i=0;i<10;i++){

  ms=ms.replace(" ","-");
  ms=ms.replace(",","");


}

ms=ms.replace("-&","");

Mycatergory.alt=ms;




            const documnet = new DBCatergory(Mycatergory);

            try {

                const result = await documnet.save();

                return res.json(result);

            } catch (error) {
                
                return next(error);
            }



        });




    },
    getAllCatergory: async (req, res, next) => {

        try {

            const document = await DBCatergory.find();

            return res.json(document);


        } catch (error) {

            return next(error);

        }


    },
    getSingleCatergory: async (req, res, next) => {

        // get single data 

        const{id}=req.params;
        
        try {

            const document=await DBCatergory.findById(id);

            if(!document){

                return next("catergory documnet not while finding");

            }

            return res.json(document);

            
        } catch (error) {
            
            return next(error);

        }

    },
    updateCatergory: async (req, res, next) => {

        const {id}=req.params;
console.log(req.body);

try {

    const document=await DBCatergory.findById(id);

    if(!document){

        return next("catregory document not found while upadting");

    }

    try {
        
        const upadted_document=await DBCatergory.findByIdAndUpdate(document._id,req.body);

        return res.json(upadted_document);


    } catch (error) {

        return next(error);

        
    }
    
} catch (error) {

    return next(error);

    
}



    },
    deleteCatergory: async (req, res, next) => {

        const{id}=req.params;

        console.log(id);

        try {

            const document=await DBCatergory.findById(id);

            if(!document){

                return next("documnet catergory while deleting the document");
            }

            const ImagePath=document._doc.image;

console.log(ImagePath);

            fs.unlink(`${appRoot}/${ImagePath}`,(err)=>{

                if(err){
console.log("image is not deleted from the computer");

return next(err);


                }
            });


            try {

                const deleted_document=await DBCatergory.findByIdAndDelete(document._id);

                return res.json(deleted_document);

                
            } catch (error) {
                
                return next(error);

            }

            
        } catch (error) {
            
            return next(error);

        }


    }


};




export default Catergory;
