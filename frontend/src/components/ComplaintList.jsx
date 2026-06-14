
import ComplaintRow from "./ComplaintRow";

function ComplaintList({ complaints=[],onDelete, onStatusChange, isAdmin=false,page=1,setPage,totalPages=1,showPagination=false}) {
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-300 px-8 py-16">

      <h2 className="text-3xl font-bold text-white mb-8">
        My Complaints
      </h2>

      {/* Header */}
      <div className="grid grid-cols-7 gap-4 bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-3 font-semibold text-gray-400 text-sm mb-3">
        <div>Category</div>
        <div>Subject</div>
        <div>Severity</div>
        <div>Status</div>
        <div>Name</div>
        <div>Room</div>
        <div>Date</div>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {complaints && complaints.length > 0 ? (
          complaints.map((complaint) => (
            <ComplaintRow
              key={complaint._id}
              complaint={complaint}
              onDelete={onDelete}
              onStatusChange={onStatusChange} 
              isAdmin={isAdmin}
            />
          ))
        ) : (
          <p className="text-gray-400">No complaints found</p>
        )}
      </div>

      {showPagination && (<div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-slate-700 rounded"
          >
            Previous
          </button>
        
          <span className="text-white">
            Page {page}
          </span>
        
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-slate-700 rounded"
          >
            Next
          </button>
       </div>)}

    </div>
  );
}

export default ComplaintList;