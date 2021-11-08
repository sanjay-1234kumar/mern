
import {DBSubCatergory} from '../../model/index';


const MySubcatergory={

     getSubcatergroyPublic :async(req,res,next)=>{

        console.log(req.query);
        

        const{search}=req.query;

        if(!req.query.search){

            return next("search qrey is not proved user");
        }

        try {

          const document=await DBSubCatergory.find({$text:{$search:search}});

          return res.json(document);

        } catch (error) {
            
            
            return next(error);

        }

    },
    getSubcatergroyPublicId:async(req,res,next)=>{

 console.log(req.query);

        const{search}=req.query;

        if(!req.query.search){

            return next("search qrey is not proved user");
        }

        try {

          const document=await DBSubCatergory.find({alt:search});

          return res.json(document);

        } catch (error) {
            
            return next(error);

        }
    },

};


export default MySubcatergory;
