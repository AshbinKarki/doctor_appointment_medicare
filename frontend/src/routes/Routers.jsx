import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Doctors from '../pages/Doctors/Doctors';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import Contact from '../pages/Contact';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import MyAccount from '../Dashboard/user-account/MyAccount';
import Dashboard from '../Dashboard/doctor-account/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import CheckoutSuccess from '../pages/CheckoutSuccess';
import Admin from '../pages/Admin';
import AdminDoctors from '../pages/AdminDoctors';
import AdminUsers from '../pages/AdminUsers';
import AdminUpdate from '../pages/AdminUpdate';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/services' element={<Services />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctors/:id' element={<DoctorDetails />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={
           <ProtectedRoute allowedRoles={['admin']}> <Admin /> </ProtectedRoute>} >
            <Route path='users' element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
            <Route path='alldoctor' element={<ProtectedRoute allowedRoles={['admin']}><AdminDoctors /></ProtectedRoute>} />
        <Route path='alldoctor/:id/edit' element={<ProtectedRoute allowedRoles={['admin']}><AdminUpdate /></ProtectedRoute>} />
           
            
        </Route>
       

        <Route path='/admin/delete/:id' element={
            <ProtectedRoute allowedRoles={['admin']}>
            <Admin />
            
        </ProtectedRoute>} />


            <Route path='/checkout-success' element={<CheckoutSuccess />} />
            <Route
                path='/users/profile/me'
                element={
                    <ProtectedRoute allowedRoles={['patient']}>
                        <MyAccount />
                    </ProtectedRoute>}
            />
            <Route
                path='/doctors/profile/me'
                element={
                    <ProtectedRoute allowedRoles={['doctor']}>
                        <Dashboard />
                    </ProtectedRoute>}
            />
             
            
        </Routes>
    );
};

export default Routers;