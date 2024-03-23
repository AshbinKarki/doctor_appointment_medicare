import User from "../models/UserSchema.js";
import Doctor from '../models/DoctorSchema.js';


 export const getAllUsertoAdmin  = async (req , res) =>{
try {
   const users = await User.find().select('-password');
   res.status(200).json(users); 
} catch (error) {
    res
    .status(500)
    .json({ success: false, message: 'Error ' });
}
};

export const getAllDoctortoAdmin  = async (req , res) =>{
    try {
       const alldoctor = await Doctor.find().select('-password');
       res.status(200).json(alldoctor); 
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: 'Error ' });
    }
    };

    export const getAllDoctorById = async (req ,res) =>{
        try {
            const id = req.params.id;
           const data= await Doctor.findOne({_id:id}, {password:0})
           return res.status(200).json(data);
        } catch (error) {
            res
            .status(500)
            .json({ success: false, message: 'Error ' });
        }
    };

 export const updateAllDoctorById = async(req, res) =>{
    try {
        const id = req.params.id;
        const updateduser = req.body;
        const updatealldoctor = await Doctor.findByIdAndUpdate({ _id: id },{
            $set: {
                isApproved: "approved",

            }
        });
        return res.status(200).json(updatealldoctor);
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: 'Error ' }); 
    }
 };


    export const deleteAlldoctorById = async (req ,res) =>{
        try {
            const id = req.params.id;
            await Doctor.deleteOne({_id: id});
           return res.status(200).json({message:"Deleted successfully"});
        } catch (error) {
            res
            .status(500)
            .json({ success: false, message: 'Error ' });
        }
    };

    export const deleteAlluserById = async (req ,res) =>{
        try {
            const id = req.params.id;
            await User.deleteOne({_id: id});
           return res.status(200).json({message:"Deleted successfully"});
        } catch (error) {
            res
            .status(500)
            .json({ success: false, message: 'Error ' });
        }
    };

