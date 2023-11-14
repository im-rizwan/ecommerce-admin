import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

export default function Products() {
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        axios.get('/api/products').then(response =>{
           setProducts(response.data);
        });
    },[]);
    return (
        <Layout>
            
            <Link href={"/products/new"} className="bg-blue-900 text-white rounded-md py-1 px-2">
               add new product
            </Link>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>
                            product name
                        </td>
                        <td></td>

                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>(
                       <tr key={product._id}>
                        <td>{product.title}</td>
                        <td>
                        
                            <Link href={'/products/edit/'+product._id} className="mx-1 ">
                                Edit
                            </Link>
                            <Link href={'/products/delete/'+product._id} className="mx-1 ">
                                delete
                            </Link>
                            
                            

                            
                        </td>
                        
                        
                       </tr> 
                    ))}
                </tbody>
            </table>
            
        </Layout>
        
    );
} 