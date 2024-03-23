
import React, { useEffect, useState } from 'react';
import {  token } from '../config.js';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const AdminDoctors = () => {

    const [alldoctor ,setDoctor] = useState([]);

    const getAllDoctortoAdmin = async() =>{
        try {
            const res = await fetch("http://localhost:5000/api/v1/admin/alldoctor",{
                method : "GET",
                headers:{
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            console.log(`alldoctor ${data}`);
            setDoctor(data);
        } catch (error) {
           console.log(error); 
        }
    };

    const deleteAlldoctor =async (id) =>{
        try {
            const res = await fetch(`http://localhost:5000/api/v1/admin/alldoctor/delete/${id}`,{
                method : "DELETE",
                headers:{
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            console.log(`alldoctor after delete ${data}`);
            if(res.ok){
                getAllDoctortoAdmin();
            }
        } catch (error) {
           console.log(error); 
        }
    };

  useEffect(() => {
    getAllDoctortoAdmin();
  }, []);


  return (
    <>
    <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                  
                   
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        View
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Edit
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Delete
                    </th>
                </tr>
            </thead>

            <tbody> 


    {alldoctor.map((curUser,index) =>{
   return <tr key={index}>
   <th scope="row" className="flex items-center px-6 py-4 text-gray-900 ">
                           
   <div className="pl-2">
       <div className="text-base font-semibold">{curUser.name}</div>
       <div className="text-normal text-gray-500">{curUser.email}</div>
   </div>
</th>
<td className="px-6 py-4">{curUser.ticketPrice}</td>

<td className="px-6 py-4">{curUser.isApproved}</td>
<td className='px-6 py-4'><Link
          to={`/doctors/${curUser._id}`}
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none">
          <BsArrowRight className="group-hover:text-white w-6 h-5" />
        </Link></td>
<td className='px-6 py-4'><Link to ={`/admin/alldoctor/${curUser._id}/edit`}>Edit</Link></td>
<td ><button className='btn bg-red-500' onClick={()=> deleteAlldoctor(curUser._id)}>Delete</button></td>



</tr>
    })}
    
    </tbody>
    </table>

     </>
  )
}

export default AdminDoctors;