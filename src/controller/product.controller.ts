import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import { parseBody } from "../utility/parseBody";


export const productController= async(req: IncomingMessage ,res: ServerResponse)=> {
   const url=req.url;
   const method=req.method;
   const urlParts=url?.split("/");
   let id : number | null =urlParts && urlParts[1] ==='products'? Number(urlParts[2]): null;
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
}else if(method ==="POST" && url ==="/products"){
      const body= await parseBody(req);
      // console.log("Body:", body);
      const products = readProduct();
      const newProduct={
         id: Date.now(),
         ...body,
      };
      //console.log("New Product:", newProduct);
      products.push(newProduct);
      insertProduct(products);
      console.log(products);

      res.writeHead(200,{'content-type':"application/json"})
      res.end(JSON.stringify({message: "Product created successfully",
      data: newProduct
   })
   );
}
   

}