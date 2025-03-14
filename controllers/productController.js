var products=require('../statics/repository');


const getProducts=(request,resp)=>{

   
    

    if(Object.keys(request.query).length===0){
        const response={
            success:true,
            message:"Products Retrieved!!!",
            data:{...products.slice(0,30)}
        }
        
       return  resp.send(response);
    }

    
    let filteredList=[];
    let queryList=Object.keys(request.query);
    let idx =queryList.findIndex(txt=>txt=='limit')
    if (idx===-1){ 
        filteredList=queryProductRepo(products,request.query);

       return resp.status(200).send({success: true, data: [...filteredList]})


       

    }
    
    let {limit, ...newQueryList}=request.query
    
    filteredList=queryProductRepo(products,newQueryList);

    
   return  resp.status(200).send({success: true, data: filteredList.slice(0,limit)})
   


};


const getProductByID=(req,resp)=>{

   const product = products.find(obj => obj.id ===parseInt(req.params.id));

   
    
   if (!product ){
    
    resp.status=404;
    resp.send({"message":"The Product does not exist!!!"});

   }

    
   
    resp.send(product);

};


const createProduct=(req, resp)=>{

    const data = req.body;
    
    const itExist = products.find(obj=>obj.title===data.title && obj.description===data.description);
   


    if(itExist!=undefined){
        

        return resp.status(409).send({success:false, message:"Product Already Exist!!!"});
    }


    products.push({
        id:products.length+1,
        ...data
    });
    
const newObj=getObject(products,data.title,data.description);

    resp.send({status: 201, message:`Product has been added!!!\n The Product ID is ${newObj.id}`});
    

};


const updateProduct=(req, resp)=>{

    let product = products.find(obj => obj.id ===parseInt(req.params.id));
    const indx = products.findIndex(obj=>obj.id==product.id);

   
     
    if (!product ){
     
     resp.status(404).send({success:false, message:"The Product does not exist!!!"});
 
    }


    const data=req.body;
    let updatedProduct={...product,...data};

    

    products[indx]=updatedProduct;

    resp.status(200).send({success:true, message:"Updated Successfully"});


    

    
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

    const newArray = products.filter(obj=> obj.id !== product.id);

products=[...newArray];

resp.send({success: true, message:`Product has been deleted Succesfully!!!`});


};


function getObject(itrble, title, description) {
    const objt = itrble.find(obj=>obj.title===title && obj.description===description);
    
    if(!objt){
        return {"message":"No Object found"} ;
    }

    

    return objt;
}


function queryProductRepo(arr, qry){
let newArray=[];



for(const key in qry){

    
    
    let ret=arr.filter(
        
         obj => obj[key].toString().toLowerCase().includes(qry[key].toLowerCase())
       
    
    );

newArray=newArray.concat(ret)

   
}

 return newArray;

}


module.exports={
    getProducts,
    createProduct, 
    getProductByID,
    deleteProduct,
    updateProduct,
}