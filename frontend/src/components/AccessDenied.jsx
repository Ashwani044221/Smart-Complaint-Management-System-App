function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="bg-[#1e293b] p-8 rounded-xl text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-3">
          Access Denied
        </h1>

        <p className="text-gray-300">
          Only administrators can access the Dashboard.<span className="text-green-500">Login with Admin Credentail.</span>
          
        </p>
      </div>
    </div>
  );
}

export default AccessDenied;