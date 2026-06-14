import { useEffect, useState } from "react";
//import Dashboard from "../pages/Dashboard";

function StatusCards({totalcomplaints,escalatedCount,topIssue}) {
    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      {/* Card 1 */}
      <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700">
        <p className="text-slate-400">Total Complaints</p>

        <h2 className="text-4xl font-bold mt-2">
          {totalcomplaints}
        </h2>
      </div>

      {/* Card 2 */}
      <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700">
        <p className="text-slate-400">Escalated</p>

        <h2 className="text-4xl font-bold mt-2 text-red-400">
          {escalatedCount}
        </h2>
      </div>

      {/* Card 3 */}
      <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700">
        <p className="text-slate-400">
          Avg Resolution Time
        </p>

        <h2 className="text-4xl font-bold mt-2 text-green-400">
          4.2h
        </h2>
      </div>

      {/* Card 4 */}
      <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-700">
        <p className="text-slate-400">Top Issue</p>

        <h2 className="text-4xl font-bold mt-2 text-blue-400">
          {topIssue}
        </h2>
      </div>

    </div>
  )
}

export default StatusCards