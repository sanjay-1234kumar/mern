
import Joi from 'joi';

import multer from 'multer';

import path from 'path';

import fs from 'fs';





import { DBSubCatergory } from '../model/index';

// setting of multer function

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'subupload/');

    },
    filename: (req, file, cb) => {
        const unique_name = `${Date.now()}-${Math.round(Math.random() * 10000)}${path.extname(file.originalname)}`;
        cb(null, unique_name);


    },

});

const subupload = multer({ storage: storage }).single('image');



let SubCatergory = {

    async addSubCatergory(req, res, next) {
        // addSubCatergory like refrigators tvs ac,beauty,baby

        subupload(req, res, async (err) => {

            //checking of error
            if (err) {
                console.log("error in the uploaing...");
                console.log(err);

                return next(err);

            }

            if (!req.file) {

                return next('image is not provide by user');

            }
            console.log(req.body);
            console.log(req.file);
            const ImagePath = req.file.destination + req.file.filename;

            console.log(ImagePath);

            // checking valiadtion error
            let subCatergoryschema = Joi.object({
                name: Joi.string().required(),
                parent: Joi.string().required(),
                image: Joi.string().required()

            });


            const { error } = subCatergoryschema.validate({
                name: req.body.name,
                parent: req.body.parent,
                image: ImagePath
            });

            if (error) {
                // error of valiadtaion we need to remove the uploded file from the computer
                fs.unlink(`${appRoot}/${ImagePath}`, (err) => {

                    if (err) {
                        console.log("error in deleting uploded file ");

                        return next(err);

                    }
                });

                return next(error);
            }
            // validaiton completed

            // databse coding start

            let ms=req.body.name;

let i;

for(i=0;i<10;i++){

  ms=ms.replace(" ","-");
  ms=ms.replace(",","");


}

ms=ms.replace("-&","");

            const document = new DBSubCatergory({
                name: req.body.name,
                parent: req.body.parent,
                image: ImagePath,
                alt:ms,
            });

            try {

                const result = await document.save();

                return res.json(result);


            } catch (error) {

                return next(error);

            }





        });




    },

    async getAllSubCatergory(req, res, next) {

        try {
            const document = await DBSubCatergory.find();

            return res.json(document);

        } catch (error) {

            return next(error);

        }
        

    },


    async getSingleSubCatergory(req, res, next) {

        console.log(req.params);
        const { id } = req.params;
        try {
            const document = await DBSubCatergory.findById(id);

            if (!document) {
                console.log("Subacter document not found");

                return next("Suabcatergory document not found or inavalid id");


            }

            return res.json(document);


        } catch (error) {

            return next(error);

        }

    },

    async updateSubCatergory(req, res, next) {
        console.log(req.params);

        console.log(req.body);

        const { id } = req.params;

        try {

            const document = await DBSubCatergory.findById(id);

            if (!document) {

                return next("document not found for upadate");
            }

            try {

                const upadate_document = await DBSubCatergory.findByIdAndUpdate(document._id, req.body);

                return res.json(upadate_document);


            } catch (error) {

                return next(error);

            }

        } catch (error) {

            return next(error);

        }

    },

    async deleteSubCatergory(req, res, next) {
        console.log(req.params);
        const { id } = req.params;



        try {
            const document = await DBSubCatergory.findById(id);

            if (!document) {

                return next("document not found for deleting");

            }

            const image_path = document._doc.image;

            console.log(image_path);

            fs.unlink(`${appRoot}/${image_path}`, (err) => {

                if (err) {
                    console.log("document image is not deledted");
                    return next(err);

                }

            });

            try {
                const deleted_document = await DBSubCatergory.findByIdAndDelete(document._id);

                return res.json(deleted_document);


            } catch (error) {

                return next(error);


            }



        } catch (error) {

            return next(error);

        }
    }




};




export default SubCatergory;
