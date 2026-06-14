import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen">

      {/* HERO SECTION */}
      <section className="pt-28 pb-32 bg-linear-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Smart Complaint Management System
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            A centralized platform for hostel residents to report and monitor 
            complaints related to water, electricity, WiFi, and maintenance.  
            Designed to ensure accountability and SLA-based resolution tracking.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/Mycomplaints"
              className="px-8 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition shadow-lg"
            >
              Raise Complaint
            </Link>

            <Link
              to="/my-complaints"
              className="px-8 py-3 border border-blue-500 rounded-lg text-blue-300 hover:bg-slate-800 transition"
            >
              Track Complaint
            </Link>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <span className="text-blue-400 font-semibold uppercase">
            Core Features
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-12">
            System Capabilities
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-3">
                Real-Time Status Tracking
              </h3>
              <p className="text-slate-300">
                Monitor complaint lifecycle from Pending to Resolved with 
                timestamps and status updates.
              </p>
            </div>

            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-3">
                SLA-Based Escalation
              </h3>
              <p className="text-slate-300">
                High severity complaints automatically escalate if not 
                resolved within defined time limits.
              </p>
            </div>

            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-3">
                Admin Monitoring Dashboard
              </h3>
              <p className="text-slate-300">
                Filter, paginate, and analyze complaint data 
                to improve hostel operations.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 bg-slate-800 text-center text-slate-400">
        <p>
          © 2025 Smart Complaint Management System — Academic Demo Project
        </p>
      </footer>

    </div>
  );
}

export default Home;