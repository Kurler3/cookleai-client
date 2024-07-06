import { Outlet } from "react-router-dom";
import { DASHBOARD_DRAWER_ID } from "../../utils/constants";
import DashboardSideBar from "./DashboardSideBar";

const Dashboard = () => {
    return (
        <div className="flex h-screen overflow-hidden drawer lg:drawer-open">

            <DashboardSideBar />
           
            {/* RIGHT SIDE   */}
            <div className="flex-1 drawer-content flex justify-start items-start">
          
                {/* BUTTON TO OPEN DRAWER */}
                <label 
                    htmlFor={DASHBOARD_DRAWER_ID} 
                    aria-label="open sidebar" 
                    className="btn btn-square btn-ghost lg:hidden"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-current">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>

                {/* DASHBOARD CONTENT */}

                <Outlet />
            </div>
        </div>
    )
};

export default Dashboard;