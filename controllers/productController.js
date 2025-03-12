let products=require('../statics/repository');


const getProducts=(request,resp)=>{

    const response={
        success:true,
        message:"Products Retrieved!!!",
        data:{...products.slice(0,30)}
    }
    
    resp.send(response);

};


const getProductByID=(req,resp)=>{

   const product = products.find(obj => obj.id ===parseInt(req.params.id));

   console.log(req.params.id);
    
   if (!product ){
    
    resp.status=404;
    resp.send({"message":"The Product does not exist!!!"});

   }

    
   
    resp.send(product);

};


const createProduct=(req, resp)=>{

    const data = req.body;
    
    const itExist = products.find(obj=>obj.title===data.title && obj.description===data.description);
   
// console.log(data.title,data.description);

    if(itExist!=undefined){
        

        return resp.status(409).send({success:false, message:"Product Already Exist!!!"});
    }


    products.push({
        ID:products.length+1,
        ...data
    });
    
const newObj=getObject(products,data.title,data.description);

    resp.send({status: 201, message:`Product has been added!!!\n The Product ID is ${newObj.id}`});


};



const deleteProduct = (req, resp)=>{
    const productID= req.params.id;
    const product= products.find((prd)=>prd.id===parseInt(productID));

    if(!product){

        const rspMsg={
            success: false,
            message: `Book not found`
        };

        return resp.status(404).send(rspMsg);

    }

    const newArray = products.filter(item => item.id !== product.id);

products=[...newArray];

};


function getObject(iterable, title, description) {
    const obj = iterable.find(obj=>obj.title===title && obj.description===description);
    
    if(!obj){
        return {"message":"No Object found"} ;
    }

    

    return obj;
}


module.exports={
    getProducts,
    createProduct, 
    getProductByID,
    deleteProduct,
}