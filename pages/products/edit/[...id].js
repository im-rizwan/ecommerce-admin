import ProductForm from "@/components/ProductForm";
import Layout from "@/components/layout";

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
export default function EditProuctPage(){
    const [productInfo,setProductInfo]=useState(null);
    const router = useRouter();
    const {id} = router.query;

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response =>{
            //console.log(response.data);
            setProductInfo(response.data);
        });    
    },[id]);
    //console.log(productInfo.title);
    return(
        <Layout>
            <h1 className="">Edit Product</h1>
            
            {productInfo && (<ProductForm {...productInfo}/>)}
           
        </Layout>
    );
}