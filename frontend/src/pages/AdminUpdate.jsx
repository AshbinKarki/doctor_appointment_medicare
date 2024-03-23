import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {  token } from '../config.js';
import { toast } from 'react-toastify';




const AdminUpdate = () => {
    const [data, setData] = useState({
    email: "",
    isApproved: "",
    name: "",

    });

    const params =useParams();

    const getsigAllDoctorById =async () =>{
        try {
            const res = await fetch(`http://localhost:5000/api/v1/admin/alldoctor/${params.id}`,{
                method : "GET",
                headers:{
                    

                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            console.log(`alldoctor before update ${data}`);
            setData(data);
        } catch (error) {
           console.log(error); 
        }
    };

    useEffect(() => {
        getsigAllDoctorById();
    },[]);

    const handleInput = (e)  => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
             ...data,
             [name]: value,
        });
    };

 const  handleSubmit = async(e) => {
e.preventDefault();

try {
    const res = await fetch(`http://localhost:5000/api/v1/admin/alldoctor/update/${params.id}`,{
                method : 'put',
                headers:{
                    "Content-Type": "application/json/",
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(data),
                
                
            });
            if(res.ok){
        toast.success("updated successfully");
            }else{
                toast.error("not updated");
            }
    } catch (error) {
      toast.error(error);
    }


    
 };

 
 

  return (
    <>
    <section>
    <div className='text-center'>
        <form onSubmit={handleSubmit} >
            <div className='pb-4'>
        <label htmlFor='isApproved'>Status : </label>
            <input className='light bg-lime-100' type='text'
             name='isApproved' id='isApproved' 
             autoComplete='off' value={data.isApproved}  required/>
            </div>
            <div className='pb-4'>
            <label htmlFor='email'>Email :</label>
            <input className='light bg-lime-100' type='text'
             name='email' id='email' 
             autoComplete='off' value={data.email}  required/>
         </div>
         <div className='pb-3'>
            <label htmlFor='name'>Name :</label>
            <input className='light bg-lime-100' type='text'
             name='name' id='name' 
             autoComplete='off' value={data.name} required/>
         </div>
        
         <div>
         <button
            type="submit"
            className=" bg-primaryColor text-white text-[18px] leading-[30px] py-3 px-4 rounded-lg">
            Approve as doctor
          </button>
            
            </div>   
        </form>
       </div> 
    </section>
</>
  );
};

export default AdminUpdate;