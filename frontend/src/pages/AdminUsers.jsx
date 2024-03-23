import React, { useEffect, useState } from 'react';
import {  token } from '../config.js';



const AdminUsers = () => {

    const [users, setUsers] = useState([]);

    const getAllUsertoAdmin = async() =>{
        try {
            const res = await fetch("http://localhost:5000/api/v1/admin/users",{
                method : "GET",
                headers:{
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            console.log(`users ${data}`);
            setUsers(data);
        } catch (error) {
           console.log(error); 
        }
    };

    const deleteAlluser =async (id) =>{
        try {
            const res = await fetch(`http://localhost:5000/api/v1/admin/users/delete/${id}`,{
                method : "DELETE",
                headers:{
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            console.log(`alluser after delete ${data}`);
            if(res.ok){
                getAllUsertoAdmin();
            }
        } catch (error) {
           console.log(error); 
        }
    };

  useEffect(() => {
    getAllUsertoAdmin();
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
                        Gender
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                        action
                    </th>
                </tr>
            </thead>

            <tbody> 
   {users.map((curUser,index) =>{
  return <tr key={index}>
  
  <th scope="row" className="flex items-center px-6 py-4 text-gray-900 ">
                           
                            <div className="pl-3">
                                <div className="text-base font-semibold">{curUser.name}</div>
                               <div className="text-normal text-gray-500">{curUser.email}</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">{curUser.gender}</td>
        
                        <td className="px-6 py-4">{curUser.role}</td>
<td><button  className =" btn bg-red-500"onClick={()=> deleteAlluser(curUser._id)}>Delete</button></td>
                

                        
  
  
  
  
  
  
  
  </tr>
  
  
   })}
   </tbody>
   </table>
   
    </>
  )
}

export default AdminUsers