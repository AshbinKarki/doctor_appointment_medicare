/* eslint-disable react/prop-types */
import { BiMenu } from 'react-icons/bi';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Tabs = ({ tab, setTab, doctorId }) => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();


    const handleLogout = () => {
        Swal.fire({
            title: "Do you want to Logout?",
            showCancelButton: true,
            confirmButtonText: "Logout",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("Logout", "", "success");
              
        dispatch({ type: 'LOGOUT' });
        navigate('/');
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
    navigate('/');

            }
    }) };


  const  deleteDoctorHandle = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff0000",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("Delete", "", "success");
              const res =  fetch(`${BASE_URL}/doctors/${doctorId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        )
        navigate('/login');
      handleLogout();
    } 
 else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
navigate('/');

  
  }})

};

  

    return (
        <div>
            <span className="lg:hidden">
                <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
            <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
                <button
                    onClick={() => setTab('overview')}
                    className={`${tab === 'overview'
                        ? 'bg-indigo-100 text-primaryColor'
                        : 'bg-transparent text-headingColor'
                        } w-full btn mt-0 rounded-md`}
                >
                    Overview
                </button>

                <button
                    onClick={() => setTab('appointments')}
                    className={`${tab === 'appointments'
                        ? 'bg-indigo-100 text-primaryColor'
                        : 'bg-transparent text-headingColor'
                        } w-full btn mt-0 rounded-md`}
                >
                    Appointments
                </button>

                <button
                    onClick={() => setTab('settings')}
                    className={`${tab === 'settings'
                        ? 'bg-indigo-100 text-primaryColor'
                        : 'bg-transparent text-headingColor'
                        } w-full btn mt-0 rounded-md`}
                >
                    Profile
                </button>

                <div className="mt-[100px] w-full">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">
                        Logout
                    </button>
                    <button
                        onClick={deleteDoctorHandle}
                        className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                        Delete account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tabs;