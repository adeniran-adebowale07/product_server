const express=require('express');
const app=express();



const productRoutes= require("./routes/productRoutes");
const PORT=2330;







app.use(express.json());
app.use("/products", productRoutes);



app.get("/",(req, resp)=>{

    resp.status=200;
    resp.send(JSON.stringify({message:"I am still alive..."}))
    resp.end();
});





app.listen(PORT, ()=>{

    console.log(`Server listening to port: ${PORT}`);
});