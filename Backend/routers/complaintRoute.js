import express  from 'express';
import complaintData from '../model/data.js';
import authMiddleware from '../middleware/authMiddleware.js';


const route = express.Router();

route.post("/",authMiddleware, async(req,res) =>{
    try{

     const { category, subject, name, roomno, severity: userSeverity } = req.body;

     let severity = userSeverity;

   const normalizedCategory = category.trim().toLowerCase();

// Rule 1: WiFi & Electricity always High
if (normalizedCategory === "wifi" || normalizedCategory === "electricity") {
  severity = "High";
} else {

  // Rule 2: For other categories
  if (userSeverity === "High") {
    severity = "Medium";  // downgrade
  } else if (userSeverity === "Medium") {
    severity = "Medium";
  } else {
    severity = "Low";
  }

}


    const newComplaint = new complaintData({
        user:req.user.id,
        category,
        subject,
        severity,
        name,
        roomno,
        date: new Date()
    });
    //console.log(newComplaint);
    const saveComplaint = await newComplaint.save();
    res.json(saveComplaint);
    }catch(err){
        res.status(400).json({error: err.message});
    }
  

});

route.get("/",authMiddleware, async(req,res) =>{
    try{
        //console.log("Logged User:", req.user);
        const getComplaint = await complaintData.find({user:req.user.id});

        for(const complaint of getComplaint){
            let maxAge=(Date.now() -complaint.createdAt.getTime())/(1000 * 60 * 60);

            if(complaint.status !== "Resolved" && complaint.status !== "Escalated"){
              if(complaint.severity =="High" && maxAge > 12 ){
               complaint.status = "Escalated";
               await complaint.save();
            }else if(complaint.severity =="Medium" && maxAge > 48){
              complaint.status = "Escalated";
              await complaint.save();
            }else if(complaint.severity == "Low" && maxAge > 72){
              complaint.status = "Escalated";
              await complaint.save();
            }
          }  
        }

        res.json(getComplaint);
    }catch(err){
        res.status(500).json({error:err.message});
    }
    
});

route.put("/:id",authMiddleware, async(req,res) =>{
  try{
    const updatedComplaint = await complaintData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updatedComplaint);

  }catch(err){
    res.status(500).json({ message: "Error updating complaint" });
  }
});    

route.delete("/:id",authMiddleware, async(req,res) =>{
  try{
     const deletedComplaint = await complaintData.findByIdAndDelete(req.params.id);

    if (!deletedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Only owner can delete
      if (deletedComplaint.user.toString() !== req.user.id) {
        return res.status(403).json({
          message: "You can delete only your own complaints"
        });
      }

      await deletedComplaint.deleteOne();

  res.json({message: "Complaint deleted successfully"});
  }catch(err){
    res.status(500).json({ message: "Error deleting complaint" });
  }
});

export default route;