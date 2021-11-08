
import express from 'express';


let router =express.Router();

import {
SubCatergory,
Product,
User,
Admin,
RefreshToken,
MySubcatergory,
MyProduct,
Catergory,
MyCatergory,
AllCount
} from '../controller/index';


import auth from '../middleware/authorization';



// post for sub catergory only for admin

// it is complted
router.post('/addsubcatergory',SubCatergory.addSubCatergory);// private admin 

// it is complted
// get for all subcatergory 
router.get('/getsubcatergory',SubCatergory.getAllSubCatergory);// public 


// get for single subcatergory 
// it is completed
router.get('/getsubcatergory/:id',SubCatergory.getSingleSubCatergory);// public 

// it is completed
// update  for single subcatergory 
router.put('/updatesubcatergory/:id',SubCatergory.updateSubCatergory);// private admin

// it is completed
// update  for single subcatergory 
router.delete('/deletesubcatergory/:id',SubCatergory.deleteSubCatergory);// private admin

// route for catergory 

// it is completed
// post addcatergory 
router.post('/addcatergory',Catergory.addCatergory);


// it is completed 
// get all catergory
router.get('/getcatergory',Catergory.getAllCatergory);

// get single catergroy

// it completed 
router.get('/getcatergory/:id',Catergory.getSingleCatergory);

// upadate catergory

// it is completed
router.put('/updatecatergory/:id',Catergory.updateCatergory);

// delete Catergory 
// it is completed
router.delete('/deletecatergory/:id',Catergory.deleteCatergory);


// it is completed
router.post('/addproduct',Product.addProduct);// private admin

// it is completed
// get all  product 
router.get('/getproduct',Product.getAllProduct);// public 

// it is completed 
//get a single product with help of id
router.get('/getproduct/:id',Product.getSingleProduct);// public 

// upadate a single product only for admin

// it is completed
router.put('/updateproduct/:id',Product.updateSingleProduct);// private admin 

// delete a single product for admin

// it is completed
router.delete('/deleteproduct/:id',Product.deleteSingleProduct);// private admin


// post for user
// it is completed
router.post('/adduser',User.addUser);// public 

// get all   details of  user
// it is complted 
router.get('/getuser',User.getAllUser);// private admin 

// get a single user 

// it is completed is 
router.get('/getuser/:id',User.getSingleUser);// private admin

// update a single user 

// it is completed 
router.put('/updateuser/:id',User.updateUser);// private admin

// delete a single user

// it is completed 
router.delete('/deleteuser/:id',User.deleteUser);// private admin



// post for admin 

router.post('/addadmin',Admin.addAdmin);// private admin this is url hiding 


 //get all admin  for only who is admin and role admin

 router.post('/loginadmin',Admin.loginAdmin);// gernerate refresh token
 
 // get single admin data 

 // it is commpleted 
 router.get('/getadmin',auth,Admin.getSingleAdmin);// private admin





 // for deleting the refresh token it is only for admin 
 // it is completed
 router.post('/delete/refreshtoken',RefreshToken.deleteRefreshToken);


router.get('/check',auth,(req,res,next)=>{

    res.json({status:true,message:"he is authoirized user"});
});

// public routes for app

// public route for getting subcatergrory with qrey

// it is completed  for query 
router.get('/public/getsubcatergory',MySubcatergory.getSubcatergroyPublic);


router.get('/public/getsubcatergoryid',MySubcatergory.getSubcatergroyPublicId);

// it completed 
router.get('/public/getallcatergory',MyCatergory.getAllCatergoryPublic);

// it completed
router.get('/public/getsinglecatergory',MyCatergory.getSingleCatergoryPublic);



// for products
// it is completed
router.get('/public/getproduct',MyProduct.getProductPublic);
// router for youtube data

router.get('/public/getvideo',MyProduct.getProductVideo);



// router for dashboard data

// it is is completed
router.get('/dashboard/count-data',AllCount.getAllCount);// count [{np:"",data:4},{nuser:"",data:5}];

// it is completed
router.get('/dashboard/user-data',AllCount.getUserCount);// [{january:"8","febauray":"8",march:""}]

// it is completed
router.get('/dashboard/catergory-data',AllCount.getProductCount);

// it is completed
router.get('/dashboard/luser-data',AllCount.getLastestUsers);




export default router;




