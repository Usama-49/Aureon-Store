import {CircleCheckBig} from "lucide-react";
import {Link} from "react-router-dom";

export default function OrderConfirmation({deliveryDetails}) {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-110 w-140 border-1 border-green-400/80 rounded-xl bg-gray-900/80">
          <div className="flex items-center justify-center">
            <CircleCheckBig className="mt-6 text-green-400 h-18 w-18" />
          </div>
          <div className="flex items-center justify-center">
            <p className="mt-3 text-2xl font-bold">Order Confirmed!</p>
          </div>
          <div className="flex items-center justify-center w-[80%] mx-auto ">
            <p className="text-gray-400 mt-3 text-center text-sm ">Your Transaction is Complete. A confirmation email has been sent to Your Acoount.</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col mt-5 w-80 h-30 bg-green-400/15 rounded-xl border-1 border-green-400">
              <h2 className="font-semibold text-green-200 p-1 mt-1 ml-2">{deliveryDetails?.name}</h2>
              <p className="text-sm text-green-200/60 ml-3 mb-2 line-clamp-1">{deliveryDetails?.adress}</p>
              <p className="text-sm text-green-200/60 ml-3 mb-2">
                {deliveryDetails?.city}, {deliveryDetails?.zip}
              </p>
            </div>
            <Link to={"/home"}>
              <button className="mt-5 cursor-pointer flex px-3 items-center justify-center flex-row max-auto py-2 bg-orange-600 border border-orange-500 text-white text-md font-semibold rounded-full hover:bg-orange-600/40 transition-all duration-200">
                <span className="ml-2">Continue Shopping</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
