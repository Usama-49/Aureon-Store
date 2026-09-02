import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../../services/api/api";
import Loading from "../../../Components/Loading";

export default function DashboardUsers() {
  const [showAll, setShowAll] = useState(false);
  const [user,setUser]= useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        setLoading(true);
        const res = await api.get("/admin/users");
      setUser(res.data.users);
      } catch(err){
        console.log(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetch();
  },[]);

  const users = showAll ? user : user.slice(0, 3);
  
  if(loading){
    return <Loading />
  }
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500">
      {/* Go back */}
      <Link
        to="/admin"
        className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition-colors duration-300 hover:text-orange-500"
      >
        <ChevronLeft size={20} />

        <span className="text-lg font-medium">Go Back</span>
      </Link>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-orange-500/10 p-3">
          <Users size={26} className="text-orange-500" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">Recent Users</h2>

          <p className="text-sm text-zinc-400">Latest registered customers</p>
        </div>
      </div>

      {/* Users */}
      <div className="space-y-2">
        {users?.map((user) => (
          <Link key={user._id} to={`/admin/users/${user._id}`}>
            <div
              className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3 transition-all
             duration-400 ease-in-out hover:border-zinc-700 hover:bg-zinc-800/60 hover:scale-[1.01]"
            >
              <div>
                <h3 className="font-medium text-white">{user.email}</h3>

                <p
                  className="mt-1 text-sm text-zinc-600 hover:text-zinc-400 
                transition-all duration-200 ease-in-out"
                >
                  See More
                </p>
              </div>

              <ChevronRight
                size={18}
                className="text-zinc-500 transition-all duration-300 group-hover:text-orange-500"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-zinc-800 pt-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 text-sm font-medium text-orange-500 transition-all duration-300 hover:gap-3"
        >
          {showAll ? "Show Less" : "View All Users"}

          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
