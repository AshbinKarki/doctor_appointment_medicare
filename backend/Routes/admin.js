import express from 'express';
const router = express.Router();
import {
     getAllDoctortoAdmin, 
     getAllUsertoAdmin,deleteAlldoctorById ,
     deleteAlluserById, getAllDoctorById,updateAllDoctorById } from '../Controller/adminController.js';

import { authenticate, restrict } from '../auth/verifyToken.js';


router.route("/users", authenticate,restrict(['admin'])).get(getAllUsertoAdmin);
router.route("/alldoctor", authenticate,restrict(['admin'])).get(getAllDoctortoAdmin);
router.route("/alldoctor/:id", authenticate,restrict(['admin'])).get(getAllDoctorById);
router.route("/alldoctor/update/:id", authenticate,restrict(['admin'])).put(updateAllDoctorById);



router.route("/alldoctor/delete/:id", authenticate,restrict(['admin'])).delete(deleteAlldoctorById);
router.route("/users/delete/:id", authenticate,restrict(['admin'])).delete(deleteAlluserById);




 export default router;