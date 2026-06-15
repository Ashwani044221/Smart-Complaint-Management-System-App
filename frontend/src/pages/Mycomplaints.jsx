import {useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import API from "../api/axios";
import ComplaintList from "../components/ComplaintList";

function Mycomplaints() {
  const navigate =useNavigate();
   const [formData, setFormData] = useState({
        category: "",
        subject: "",
        severity: "",
        name:"",
        roomno:""
     });

     const HandleChange = (e) =>{
        setFormData({
          ...formData,
          [e.target.name]:e.target.value
        });
      };
    
      const[complaints,setComplaints] = useState([]);

      const fetchComplaint = async() =>{
          try{
            const res = await API.get("/api/complaints");
            setComplaints(res.data);
          }catch(err){

            if (err.response?.status === 401) {
              navigate("/login");
            }

            console.error(err);
          }
      };

      useEffect(() =>{
        fetchComplaint();
      },[]); 

      const handleDelete = async (id) => {
      try {
      await API.delete(`/api/complaints/${id}`);

      setComplaints(prev => prev.filter(c => c._id !== id));

      } catch (err) {
      console.error("Delete error:", err);
      }
     };
    
      const HandleSubmit = async(e) =>{
        e.preventDefault();
        try{
        
        const res = await API.post("/api/complaints", formData);
        

        setComplaints(prev => [...prev, res.data]);
        
        setFormData({
        category: "",
        subject: "",
        severity: "",
        name:"",
        roomno:""
        });
       
        }catch(err){
          console.error("Error submitting complaint:", err);
        }
        
      };
  return (
    //min-h-[calc(100vh-64px)]
    <div className=" bg-[#0f172a] text-gray-300">
      <div className="w-full px-8 py-20">

        <h2 className="text-3xl font-bold text-white mb-8">
          Raise New Complaint
        </h2>

        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-md">

          <form className="grid grid-cols-6 gap-6 items-end" onSubmit={HandleSubmit}>

            {/* Category */}
            <div>
              <label className="text-sm text-gray-400">Category</label>
              <select name="category" value={formData.category} onChange={HandleChange}  
              required
              className="w-full mt-1 p-2 rounded-lg bg-[#0f172a] border border-slate-700 text-white focus:border-blue-600 outline-none">
                <option value="">Select Category</option>
                <option>WiFi</option>
                <option>Electricity</option>
                <option>Water Issue</option>
                <option>Maintenance</option>
                <option>Other</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm text-gray-400">Subject</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={HandleChange} 
                placeholder="Enter complaint subject"
                className="w-full mt-1 p-2 rounded-lg bg-[#0f172a] border border-slate-700 text-white focus:border-blue-600 outline-none"
              />
            </div>

            {/* Severity */}
            <div>
              <label className="text-sm text-gray-400">Severity</label>
              <select name="severity" value={formData.severity} required onChange={HandleChange}  className="w-full mt-1 p-2 rounded-lg bg-[#0f172a] border border-slate-700 text-white focus:border-blue-600 outline-none">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={HandleChange} 
                placeholder="Your name"
                className="w-full mt-1 p-2 rounded-lg bg-[#0f172a] border border-slate-700 text-white focus:border-blue-600 outline-none"
              />
            </div>

            {/* Room */}
            <div>
              <label className="text-sm text-gray-400">Room No</label>
              <input
                type="text"
                name="roomno"
                required
                value={formData.roomno}
                 onChange={HandleChange} 
                placeholder="Room number"
                className="w-full mt-1 p-2 rounded-lg bg-[#0f172a] border border-slate-700 text-white focus:border-blue-600 outline-none"
              />
            </div>

            {/* Submit */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition duration-300 shadow-md"
              >
                Submit
              </button>
            </div>

          </form>

        </div>
            <ComplaintList complaints={complaints} onDelete={handleDelete} isAdmin={false} showPagination={false} />
      </div>
    </div>
  );
}

export default Mycomplaints;