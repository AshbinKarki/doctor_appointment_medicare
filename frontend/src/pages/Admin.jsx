

import { useAuthContext } from '../context/AuthContext';

import { BASE_URL } from '../config.js';
import useFetchData from '../hooks/useFetchData';
import { NavLink, useNavigate , Outlet} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';



const Admin = () => {

    
  const { data : alldoctors} = useFetchData(`${BASE_URL}/doctors`);
    

  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

 
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
};



  return (

       <section>
       <header>
        <div className=' text-center ' >
            <nav>
                <ul>
<li className="w-full bg-[#325d37] p-3 text-[16px] leading-7 rounded-md text-white"><NavLink to='/admin/users'>
    Users</NavLink>
                    </li>
                    <ul></ul>
                    <li className="w-full bg-[#3f598b] p-3 text-[16px] leading-7 rounded-md text-white pt-4">
                <NavLink to='/admin/alldoctor'>Doctors</NavLink></li>
        
                    

                </ul>
            </nav>
            
        </div>
       </header>
       <Outlet/>
          
<div className="mt-[50px] md:mt-[100px]">
<button
onClick={handleLogout}
className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">
Logout
</button>
    </div>
</section>
  )
}

export default Admin;