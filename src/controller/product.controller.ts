import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";


export const productController=(req: IncomingMessage ,res: ServerResponse)=>{
   const url=req.url;
   const method=req.method;
   const urlParts=url?.split("/");
   const id=urlParts && urlParts[1] ==='products'? Number(urlParts[2]): null;
   console.log("this is the actual id",id)
   if(url === '/products' && method === 'GET'){
//     const product={
//         id:1,
//         name :'product-1'
//     }
   const products = readProduct();
   res.writeHead(200,{'content-type':"application/json"})
   res.end(JSON.stringify({message: "Product retrived successfully",
   data: products
   }));
  
   }else if(method==='GET' && id !==null ){
      const products = readProduct();
      const product = products.find((p)=> p.id === id);
      //console.log(product);
      res.writeHead(200,{'content-type':"application/json"})
      res.end(JSON.stringify({message: "Product retrived successfully",
   data: product
   })
   );
}
   

}