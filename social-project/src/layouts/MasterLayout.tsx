import { Outlet } from "react-router-dom"
import Sidebar from "../component_helper/Sidebar"
import MessengerSidebar from "../component_helper/Messenger"
import Header from "../component_helper/Header"
import RightSidebar from "../component_helper/RightSidebar"

const MasterLayout = () => {
    return (
        <div className='main-layout h-100vh'>
            <div className="d-flex h-100">
                <Sidebar/>
                <div className="bg-white h-100vh w-100 hide-scrollbar" style={{overflowY: 'auto'}}>
                    <Header />
                    <div className="d-flex">
                        <div className="bg-gray d-flex flex-column gap-8px flex-1 py-16 px-16">
                            <Header />
                            <Outlet />
                        </div>
                        <RightSidebar />
                    </div>
                </div>
                <MessengerSidebar />
            </div>
        </div>
    )
}

export { MasterLayout }