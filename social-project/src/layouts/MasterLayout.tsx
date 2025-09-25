import { Outlet } from "react-router-dom"
import Sidebar from "../component_helper/Sidebar"
import MessengerSidebar from "../component_helper/Messenger"
import Header from "../component_helper/Header"
import RightSidebar from "../component_helper/RightSidebar"

const MasterLayout = () => {
    return (
        <div className='main-layout'>
            <div className="d-flex col-12">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="bg-white h-100vh w-100 hide-scrollbar col-7" style={{ overflowY: 'auto' }}>
                    <Header />
                    <div className="d-flex">
                        <Outlet />
                        <RightSidebar />
                    </div>
                </div>
                <div className="col-3">
                    <MessengerSidebar />
                </div>
            </div>
        </div>
    )
}

export { MasterLayout }