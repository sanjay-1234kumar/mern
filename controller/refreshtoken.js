import { DBRefresh } from "../model";
import CustomErrorHandler from "../service/customErrorHandler";

let RefreshToken={


    async deleteRefreshToken(req,res,next){

console.log("this function delet the refresh token which is prsent on the data");


console.log(req.body);

let token=req.body.token;

if(!token){
console.log("req.body.token mai token nahi deya gya hai");
    return next(CustomErrorHandler.unAuthorized('token not found '));
}

// check the token is present on the databse
try {
   
   let refdelete= await DBRefresh.findOne({token:req.body.token});

   console.log(refdelete);

   if(!refdelete){

    return next(CustomErrorHandler.unAuthorized("token not found in the databse"));
   }

   try {
       
    let finalresult=await DBRefresh.findByIdAndDelete(refdelete._id);
    console.log(finalresult);
    return res.json({data:"token is successfully ",status:true});
    
   } catch (error) {
       
    return next(error);

   }
  


    
} catch (error) {
    
    return next(error);
}

      

    }


};







export default RefreshToken;
