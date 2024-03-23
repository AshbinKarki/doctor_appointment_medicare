import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext.jsx';
import MyBookings from './MyBookings.jsx';
import Profile from './Profile.jsx';
import useGetProfile from '../../hooks/useFetchData.jsx';
import { BASE_URL, token } from '../../config.js';
import Loading from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MyAccount = () => {
    const { dispatch } = useAuthContext();
    const [tab, setTab] = useState('bookings');

    const navigate = useNavigate();

    const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/profile/me`);

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

    const deleteUserHandle = async () => {
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
            const res =  fetch(`${BASE_URL}/users/${userData._id}`, {
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
        <section>
            <div className="max-w-[1170px] px-5 mx-auto">
                {loading && !error && <Loading />}

                {error && !loading && <Error errMessage={error} />}

                {!loading && !error && (
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="pb-[50px] px-[30px] rounded-md">
                            <div className="flex items-center justify-center">
                                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                                    <img
                                        src={userData.photo}
                                        alt=""
                                        className="w-full h-full rounded-full"
                                    />
                                </figure>
                            </div>

                            <div className="text-center mt-4">
                                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                                    {userData.name}
                                </h3>
                                <p className="text-textColor text-[15px] leading-6 font-medium">
                                    {userData.email}
                                </p>
                                <p className="text-textColor text-[15px] leading-6 font-medium">
                                    Blood Type:
                                    <span className="ml-2 text-headingColor text-[22px] leading-8">
                                        {userData.bloodType}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-[50px] md:mt-[100px]">
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">
                                    Logout
                                </button>
                                <button
                                    onClick={deleteUserHandle}
                                    className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white"
                                >
                                    Delete account
                                </button>
                            </div>
                        </div>

                        <div className="md:col-span-2 md:px-[30px]">
                            <div>
                                <button
                                    onClick={() => setTab('bookings')}
                                    className={`${tab === 'bookings' && 'bg-primaryColor text-white font-bormal'} p-2 mr-5 px-5 
                                rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid
                                border-primaryColor`}
                                >
                                    My Bookings
                                </button>

                                <button
                                    onClick={() => setTab('settings')}
                                    className={`${tab === 'settings' && 'bg-primaryColor text-white font-bormal'} py-2 px-5 
                                rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid
                                border-primaryColor`}
                                >
                                    Profile Settings
                                </button>
                            </div>

                            {tab === 'bookings' && <MyBookings />}
                            {tab === 'settings' && <Profile user={userData} />}

                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyAccount;