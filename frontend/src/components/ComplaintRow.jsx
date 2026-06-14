const ComplaintRow = ({ complaint, onDelete,isAdmin,onStatusChange }) => {
  return (
    <div className="bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-300">

      {/* Main Row */}
      <div className="grid grid-cols-7 gap-4 items-center">

        <div>{complaint.category}</div>

        <div className="truncate">{complaint.subject}</div>

        <div>{complaint.severity}</div>

        {!isAdmin ? ( <div className={`font-medium ${
            complaint.status === "pending"
              ? "text-blue-400"
              : complaint.status === "In Progress"
              ? "text-yellow-400"
              : complaint.status === "Escalated"
              ? "text-red-400"
              : "text-green-400" }`}>
            {complaint.status} </div> ) : ( 
              <select value={complaint.status} 
              onChange={(e) => onStatusChange( complaint._id, e.target.value ) } 
              className=" bg-[#0f172a] border border-slate-700 rounded-lg px-3 py-2 text-white " > 
              <option>Pending</option> 
              <option>In Progress</option> 
              <option>Resolved</option> 
              <option>Escalated</option>
              </select> 
            )} 

        <div>{complaint.name}</div>

        <div>{complaint.roomno}</div>

        <div className="text-gray-400">
          {new Date(complaint.createdAt).toLocaleDateString()}
        </div>

      </div>

      {/* Delete Button Row */}
      { !isAdmin && <div className="flex justify-end ">
        <button
          onClick={() => onDelete(complaint._id)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
        >
          Delete
        </button>
      </div> }

    </div>
  );
};

export default ComplaintRow;