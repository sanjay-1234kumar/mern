
import {DBCatergory} from '../../model/index';



const MySubcatergory={

    getAllCatergoryPublic:async(req,res,next)=>{

        try {
            const document=await DBCatergory.find();

            return res.json(document);

        } catch (error) {
            
            return next(error);

        }
    },

    getSingleCatergoryPublic:async(req,res,next)=>{

        console.log(req.query);

        const {search}=req.query;

        
        if(!req.query.search){

            return next({status:405,message:"query is reuired"});
        }

        try {
            
            const document=await DBCatergory.findOne({alt:search});
            
            return res.json(document);

        } catch (error) {
            
            return next(error);

            

        }

    }


};



export default MySubcatergory;
