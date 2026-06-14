import express, { Router } from 'express';
import complaintData from '../model/data.js';
import authMiddleware from '../middleware/authMiddleware.js';

const route = express.Router();

// Pagination 
route.get('/page',authMiddleware, async(req,res) => {
    try{
        const page=Number(req.query.page) || 1;
        const limit=6;

       const complaints= await complaintData.find()
        .skip((page-1) * limit)
        .limit(limit);

       const totalComplaints =await complaintData.countDocuments();
       const totalPages =Math.ceil(totalComplaints / limit);

        res.json({complaints,totalComplaints,totalPages});
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

export default route;