import { Ban } from "lucide-react";
import ConfirmModal from "../../ConfirmModal";
import { useState } from "react";
import api from "../../../services/api/api";

export default function UserActions({isBanned, id, onUpdate}) {
  const [confirming, setConfirming] = useState(false);
  const [show,setShow] = useState(false);
    const handleBan = async ()=>{
      try{
        setConfirming(true);
        const res = await api.patch(`/admin/users/${id}`,{});
        onUpdate(res.data.isBanned);
        
      } catch(err){
        console.log(err.response?.data?.message || "Something went wrong");
      } finally {
        setConfirming(false);
        setShow(false);
      }
    };
  
  return (
    <div className="rounded-2xl border border-red-500/20 bg-zinc-900 p-6 transition-all duration-300 hover:border-red-500/60">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>

        <p className="mt-1 text-sm text-zinc-400">
          These actions are irreversible or may significantly affect the user's account.
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <button onClick={()=>setShow(true)} className="flex w-full items-center justify-center gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-5 py-3 font-medium text-yellow-400 transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500/20">
          <Ban size={20} />
          {isBanned ? "Unban User" :"Ban User"}
        </button>
      </div>
      <ConfirmModal onConfirm={handleBan} isOpen={show} onCancel={()=>setShow(false)} isConfirming={confirming}/>
    </div>
  );
}
