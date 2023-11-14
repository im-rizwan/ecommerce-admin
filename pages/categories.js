import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [editedCategory,setEditedCategory]=useState(null);//{name,parentCategory
    const [name,setName]=useState("");
    const [categories,setCategories]=useState([]);
    const [parentCategory,setParentCategory]=useState("");
    useEffect(()=>{
        fetchCategories();
    },[]);
    function fetchCategories(){
        axios.get('/api/categories').then(result =>{
            setCategories(result.data);
        });
    }
    async function saveCategory(ev){
        ev.preventDefault();
        const data = {name,parentCategory};
        if(editedCategory){
            data._id=editedCategory._id;
            await axios.put('/api/categories/',data);
            setEditedCategory(null);
        }
        else{
            console.log(data,"here");
            await axios.post('/api/categories/',data);
    
        
        }
        setName("");
        setParentCategory("");
        fetchCategories();
        

    }
    function editCategory(category){
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
    }
    return(
        <Layout>

            <h1>Categories</h1>
            <label >{editedCategory?`Edit category "${editedCategory.name}"`:"create New category"} </label>
            <form onSubmit={saveCategory} className="flex gap-1">
            <div className="flex">
            <input className="mb-0 mr-1" 
            type="text" 
            placeholder={'category name'}
            value={name}
            onChange={ev=>setName(ev.target.value)}/>
            <select className="mb-0 mr-1" 
            onChange={ev=>setParentCategory(ev.target.value)}
            value={parentCategory}>
                <option value="">No parent category

                </option>
                {categories.length>0 && categories.map(category=>(
                            <option value={category._id}>{category.name}</option>
                        ))}
            </select>
                <button className="bg-blue-900 text-white rounded-md py-1 px-2">save</button>
            </div>
            </form>
            <table className="basic mt-4">
                <thead >
                    <tr>
                        <td>Category name</td>
                        <td>Parent category</td>
                        <td></td>
                        <td></td>
                        
                    </tr>
                    
                </thead>
                <tbody>
                        {categories.length>0 && categories.map(category=>(
                            <tr>
                                <td>{category.name}</td>
                                <td>{category?.parent?.name}</td>
                                <td>
                            <div className="flex gap-2">
                            <button className="bg-blue-900 text-white rounded-md py-1 px-2 " onClick={()=>editCategory(category)}>edit</button>
                            <button className="bg-blue-900 text-white rounded-md py-1 px-2 ">delete</button>
                            </div>
                        </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            
        </Layout>
    );
}