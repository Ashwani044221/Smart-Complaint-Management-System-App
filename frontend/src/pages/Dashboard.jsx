import StatusCards from "../components/dashboard/StatusCards"
import ComplaintList from "../components/ComplaintList"
import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  //Pagination work 
  const [totalPages, setTotalPages] = useState(1);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [page,setPage] =useState(1);

  // complaints store 
  const [complaints, setComplaints] = useState([]);

  // get all commplaints from backend
  const fetchComplaints = async () => {
    try {
      const res = await API.get(`/api/complaints/page?page=${page}`);
      console.log(res.data);

    // Pagin
      setComplaints(res.data.complaints);
      setTotalPages(res.data.totalPages);
      setTotalComplaints(res.data.totalComplaints);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [page]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await API.put(`/api/complaints/${id}`, { status: newStatus });
      setComplaints(prev => prev.map(c => c._id === id ? res.data : c));
      fetchComplaints();
    } catch (err) {
      console.error("Status Update Error:", err);
    }
  };

  // Total complaints
   const countcomplaint = totalComplaints;

   // Escalated complaints
   const escalatedCount = complaints.filter(c => c.status ==="Escalated").length;

   // Top issue
   let countwifi=0;
   let countelectricity=0;
   let countmaint=0;
   let countwater=0;
   let countother=0;
   for(const complaint of complaints){
    if(complaint.category =="WiFi"){
        countwifi++;
    }else if(complaint.category=="Electricity"){
      countelectricity++;
    }else if(complaint.category =="Water Issue"){
      countwater++;
    }else if(complaint.category =="Maintenance"){
      countmaint++;
    }else {
      countother++
    }
   }

   let topIssue = "Wifi";
   let topCount = countwifi;

   if (countelectricity > topCount) {
     topIssue = "Electricity";
     topCount = countelectricity;
   }
   
   if (countwater > topCount) {
     topIssue = "Water Issue";
     topCount = countwater;
   }
   
   if (countmaint > topCount) {
     topIssue = "Maintenance";
     topCount = countmaint;
   }
   
   if (countother > topCount) {
     topIssue = "Other";
     topCount = countother;
   }
   
  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <StatusCards totalcomplaints={countcomplaint} escalatedCount={escalatedCount} topIssue={topIssue}/>

      <ComplaintList
        complaints={complaints}
        isAdmin={true}
        onStatusChange={handleStatusChange}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        showPagination={true}
        //onDelete={onDelete}
      />

    </div>
  )
}

export default Dashboard