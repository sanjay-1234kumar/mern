
// error handling code for application 

import { ValidationError } from "joi";
import CustomErrorHandler from "../service/customErrorHandler";

const errorHandler=(err,req,res,next)=>{

    let status=500;

    let data={
        message:'internal sever error',
        originalerr:err
    }

    console.log("error in the application");
    
    console.log(data.originalerr);
    
   
    if(err instanceof ValidationError){

        status=403;
        data.message=err.message;

return res.status(status).json({status,message:data.message});
        
    }

    if(err instanceof CustomErrorHandler){

        status=err.status;
        data.message=err.message;


        return res.status(status).json({status,message:data.message});
    }



    return res.status(status).json({status,message:data.message});
    



}


export default errorHandler;


