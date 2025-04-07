const testUserController =(req,res)=>{
    try{
        res.status(200).send('<h1>test user Api</h1>')
        
    }
    catch(error){
         console.log("error In Test Api",error);
    }
};
module.exports={testUserController};