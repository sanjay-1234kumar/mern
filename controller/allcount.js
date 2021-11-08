
import { DBCatergory, DBProduct, DBUser, DBSubCatergory } from '../model/index';

const AllCount = {

    getAllCount: async (req, res, next) => {

        const all_data = [];

        
        try {

            const n_product = await DBProduct.find().countDocuments();

            all_data.push({
                name: 'total number of products',
                data: n_product,
            });

            const n_catergory = await DBCatergory.find().countDocuments();

            all_data.push({
                name: "total number of catergory ",
                data: n_catergory,
            });

            const n_subcatergory = await DBSubCatergory.find().countDocuments();

            all_data.push(
                {
                    name: "total number of subactergory ",
                    data: n_subcatergory,
                }
            );

            const n_user = await DBUser.find().countDocuments();

            all_data.push({
                name: "total number of user ",
                data: n_user,
            });



            return res.json(all_data);



        } catch (error) {


            return next();

        }
        // [{name:"total number of user ",data:4},{}]

    },

    getUserCount: async (req, res, next) => {

        console.log("we are finding fisrt array of user");

        try {

            let document = await DBUser.find();// [{4,4,5,5,6,7,7}]

            const myuser = document.map((item) => {



                console.log(item.date);


                let d = new Date(item.date);

                let d2 = d.toJSON().slice(5, 7);

                return (parseInt(d2));


            });


            let data = [{
                name: "january",
                value: 0,

            }, {
                name: "febuary",
                value: 0,

            },
            {
                name: "march",
                value: 0,

            },
            {
                name: "April",
                value: 0,

            },
            {
                name: "may",
                value: 0,

            },
            {
                name: "june",
                value: 0,

            },
            {
                name: "july",
                value: 0,

            },
            {
                name: "august",
                value: 0,

            },
            {
                name: "stpember",
                value: 0,

            },
            {
                name: "octumber",
                value: 0,

            },
            {
                name: "novebermer",
                value: 0,

            },
            {
                name: "december",
                value: 0,

            }


            ];


            let i, j;

            const check = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

            for (i = 0; i < check.length; i++) {

                let count = 0;

                for (j = 0; j < myuser.length; j++) {

                    // 1==8
                    if (check[i] == myuser[j]) {
                        count++;
                    }
                }

                // set data to 

                data[i].value = count;



            }


// [{name:"jaunray",value:0},{name:"febaury",value:0},{name:""}]

            return res.json(data);



        } catch (error) {


            return next(error);

        }

    },

getProductCount: async(req,res,next)=>{

    // applinces 9 electronics 

    console.log("product count")
    let  mylist=[];


    try {

        let ra=await DBCatergory.find({});

     

        let nar=ra.map((item)=>{

            let rt=item.name;

            return rt;

        });

        mylist=nar;


        let finalar=[];

        let i=0;

        for(i=0;i<mylist.length;i++){

            try {

                let red=await DBProduct.find({p_catergory:mylist[i]}).countDocuments();



finalar.push({
    name:mylist[i],
    value:red
});


                
            } catch (error) {
                
                return next(error);

            }

        }





        return res.json(finalar);



        
    } catch (error) {
        
        return next(error);
    }


},


getLastestUsers:async (req,res,next)=>{

try {
    
    const document=await DBUser.find().sort({_id:-1}).limit(10);

    return res.json(document);



} catch (error) {
    

    return next(error);

}



},


};




export default AllCount;


