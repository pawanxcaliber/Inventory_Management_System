import { response, Router } from "express";
const router=Router();

router.post('/',(req,res)=>{
    try{
        const{name,rollno,email}=req.body;
        console.log({name,rollnol,email});

        res.json({
            responseMessage:"Working",
    
        });


     } 
     catch(error){
        console.log(error);

        }
    
});

export default router;
